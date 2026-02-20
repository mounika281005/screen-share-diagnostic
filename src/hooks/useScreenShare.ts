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

  // --------------------------------
  // Cleanup helper
  // --------------------------------
  const cleanup = useCallback((targetStream?: MediaStream | null) => {
    const activeStream = targetStream ?? stream;

    if (activeStream) {
      activeStream.getTracks().forEach((track) => {
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
  }, [stream]);

  // --------------------------------
  // Stop
  // --------------------------------
  const stop = useCallback(() => {
    cleanup(stream);
    setStream(null);
    setDuration(0);
    setStatus("stopped");
  }, [cleanup, stream]);

  // --------------------------------
  // Start
  // --------------------------------
  const start = useCallback(async () => {
    if (status === "requesting") return;

    try {
      setStatus("requesting");

      const mediaStream = await navigator.mediaDevices.getDisplayMedia({
        video: { frameRate: { ideal: 30 } },
        audio: false,
      });

      // Ensure old stream is cleared
      cleanup(stream);

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
          cleanup(mediaStream);
          setStream(null);
          setDuration(0);
          setStatus("stopped");
        };
      }

    } catch (err: unknown) {
      if (err instanceof DOMException) {
        if (err.name === "NotAllowedError") {
          setStatus("denied");
        } else if (err.name === "AbortError") {
          setStatus("cancelled");
        } else {
          setStatus("error");
        }
      } else {
        setStatus("error");
      }
    }
  }, [status, stream, cleanup]);

  // --------------------------------
  // Attach stream to video
  // --------------------------------
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  // --------------------------------
  // Cleanup on unmount
  // --------------------------------
  useEffect(() => {
    return () => {
      cleanup(stream);
    };
  }, [cleanup, stream]);

  // --------------------------------
  // Metadata extraction
  // --------------------------------
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