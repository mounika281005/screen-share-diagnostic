import { useNavigate } from "react-router-dom";
import { useScreenShare } from "../hooks/useScreenShare";
import Button from "../components/Button";
import StatusBadge from "../components/StatusBadge";
import PageWrapper from "../components/PageWrapper";

export default function ScreenTest() {
  const navigate = useNavigate();
  const { status, start, stop, videoRef, metadata, duration } =
    useScreenShare();

  return (
    <PageWrapper>
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg border border-gray-200 p-10">

          {/* Header */}
          <div className="flex items-center justify-between mb-20">
            <h1 className="text-2xl font-semibold text-gray-900">
              Screen Share Session
            </h1>
            <StatusBadge status={status} />
          </div>

          {/* Idle */}
          {status === "idle" && (
            <div className="flex justify-center">
              <Button onClick={start}>
                Start Screen Sharing
              </Button>
            </div>
          )}

          {/* Requesting */}
          {status === "requesting" && (
            <div className="text-center text-yellow-600 animate-pulse">
              Waiting for screen selection...
            </div>
          )}

          {/* Granted */}
          {status === "granted" && (
            <div className="space-y-8">

              {/* Video Preview */}
              <div className="border border-gray-200 rounded-xl overflow-hidden shadow-md animate-scaleFadeIn">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full"
                />
              </div>

              {/* Diagnostic Cards */}
              <div className="grid md:grid-cols-2 gap-6 text-sm">

                {/* Stream Metadata */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300">
                  <p className="font-semibold text-blue-700 mb-2">
                    Stream Metadata
                  </p>
                  <p className="text-blue-900">
                    Resolution: {metadata?.width} x {metadata?.height}
                  </p>
                  <p className="text-blue-900">
                    Frame Rate: {metadata?.frameRate}
                  </p>
                  <p className="text-blue-900">
                    Display Surface: {metadata?.displaySurface}
                  </p>
                </div>

                {/* Session Info */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300">
                  <p className="font-semibold text-green-700 mb-2">
                    Session Info
                  </p>

                  {/* Active Indicator */}
                  <div className="flex items-center gap-2 text-green-900 mb-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                    </span>
                    <span>Active</span>
                  </div>

                  <p className="text-green-900">
                    Duration: {duration}s
                  </p>
                </div>

              </div>

              {/* Stop Button */}
              <div className="flex justify-center">
                <Button variant="danger" onClick={stop}>
                  Stop Sharing
                </Button>
              </div>

            </div>
          )}

          {/* End / Error States */}
          {(status === "denied" ||
            status === "cancelled" ||
            status === "error" ||
            status === "stopped") && (
            <div className="space-y-6 text-center">

              <div className="bg-gray-100 border border-gray-300 rounded-xl p-6 shadow-sm">

                {status === "denied" && (
                  <p className="text-red-600">
                    Permission denied by user or browser policy.
                  </p>
                )}

                {status === "cancelled" && (
                  <p className="text-orange-600">
                    Screen selection was cancelled.
                  </p>
                )}

                {status === "error" && (
                  <p className="text-red-700">
                    Unexpected error occurred.
                  </p>
                )}

                {status === "stopped" && (
                  <p className="text-gray-700">
                    Screen sharing session ended.
                  </p>
                )}

              </div>

              <div className="flex justify-center gap-4">
                <Button onClick={start}>
                  Retry
                </Button>
                <Button variant="secondary" onClick={() => navigate("/")}>
                  Back to Home
                </Button>
              </div>

            </div>
          )}

        </div>
      </div>
    </PageWrapper>
  );
}