import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import PageWrapper from "../components/PageWrapper";

export default function Home() {
  const navigate = useNavigate();

  const isSecureContext =
    typeof window !== "undefined" &&
    (window.isSecureContext ||
      window.location.hostname === "localhost");

  const isSupported =
    typeof navigator !== "undefined" &&
    navigator.mediaDevices &&
    typeof navigator.mediaDevices.getDisplayMedia === "function";

  const canUseScreenShare = isSecureContext && isSupported;

  const handleStart = () => {
    if (!canUseScreenShare) return;
    navigate("/screen-test");
  };

  return (
    <PageWrapper>
      <div className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">

        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-100 opacity-30 blur-3xl rounded-full"></div>

        <div className="relative z-10 w-full max-w-5xl">

          {/* Hero Section */}
          <div className="text-center mb-20">

            <h1 className="text-5xl font-semibold text-gray-900 mb-6 leading-tight">
              Screen Share
              <span className="block text-blue-600">
                Test App
              </span>
            </h1>

            <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed mb-10">
              A browser-native validation tool engineered to test permission handling,
              stream lifecycle management, and real-time metadata diagnostics
              using native Web APIs.
            </p>

            <div className="flex justify-center">
              <Button
                onClick={handleStart}
                disabled={!canUseScreenShare}
              >
                Start Screen Test
              </Button>
            </div>

            {/* Unsupported Message */}
            {!canUseScreenShare && (
              <div className="mt-6 border border-red-200 bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg max-w-md mx-auto">
                Screen capture API is not available in this environment.
                Please use a secure HTTPS connection or localhost in a supported browser (Chrome / Edge).
              </div>
            )}

          </div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Permission Intelligence
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Explicit handling of granted, denied, cancelled, and error states
                using native browser APIs.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Stream Lifecycle Control
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Detects manual termination and unexpected stream endings with
                guaranteed resource cleanup.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Real-Time Diagnostics
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Live display of resolution, frame rate, display surface,
                and session duration metrics.
              </p>
            </div>

          </div>

        </div>
      </div>
    </PageWrapper>
  );
}
