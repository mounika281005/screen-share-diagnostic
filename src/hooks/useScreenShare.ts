import { useEffect, useRef, useState, useCallback, useMemo } from "react";

export type ScreenShareStatus =
  | "idle"
  | "requesting"
  | "granted"
  | "denied"
  | "cancelled"
  | "error"
  | "stopped";

interface Metadata {
  width?: number;
  height?: number;
  frameRate?: number;
  displaySurface?: string;
}

export function useScreenShare() {
  const [status, setStatus] = useState<ScreenShareStatus>("idle");
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [duration, setDuration] = useState<number>(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const intervalRef = useRef<number | null>(null);

  // ----------------------------
  // Stop Stream Safely
  // ----------------------------
  const stop = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => {
        try {
          track.stop();
        } catch {}
      });
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setStream(null);
    setDuration(0);
    setStatus("stopped");
  }, [stream]);

  // ----------------------------
  // Start Screen Share
  // ----------------------------
  const start = useCallback(async () => {
    if (status === "requesting") return;

    try {
      setStatus("requesting");

      const mediaStream = await navigator.mediaDevices.getDisplayMedia({
        video: { frameRate: { ideal: 30 } },
        audio: false,
      });

      // Prevent stream reuse
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }

      setStream(mediaStream);
      setStatus("granted");
      setDuration(0);

      const startTime = Date.now();

      intervalRef.current = window.setInterval(() => {
        setDuration(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);

      const track = mediaStream.getVideoTracks()[0];
      if (track) {
        track.onended = () => {
          stop();
        };
      }
    } catch (error: any) {
      if (error?.name === "NotAllowedError") {
        setStatus("denied");
      } else if (error?.name === "AbortError") {
        setStatus("cancelled");
      } else {
        setStatus("error");
      }
    }
  }, [status, stream, stop]);

  // ----------------------------
  // Attach Stream to Video
  // ----------------------------
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  // ----------------------------
  // Cleanup on Unmount
  // ----------------------------
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [stream]);

  // ----------------------------
  // Extract Metadata
  // ----------------------------
  const metadata: Metadata | null = useMemo(() => {
    if (!stream) return null;

    const track = stream.getVideoTracks()[0];
    if (!track) return null;

    const settings = track.getSettings();

    return {
      width: settings.width,
      height: settings.height,
      frameRate: settings.frameRate,
      displaySurface: settings.displaySurface,
    };
  }, [stream]);

  return {
    status,
    start,
    stop,
    videoRef,
    metadata,
    duration,
  };
}