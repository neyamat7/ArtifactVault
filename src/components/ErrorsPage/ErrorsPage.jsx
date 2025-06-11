import { useState } from "react";
import { Link } from "react-router";

// Icons
import {
  HiArrowLeft,
  HiCog,
  HiHome,
  HiLightningBolt,
  HiRefresh,
} from "react-icons/hi";

export default function ErrorPage() {
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = () => {
    setIsRetrying(true);
    setTimeout(() => {
      setIsRetrying(false);
      window.location.reload();
    }, 1500);
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-slate-100 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -left-20 w-60 h-60 bg-amber-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 left-1/4 w-72 h-72 bg-slate-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Error Icon and Animation */}
          <div className="mb-8 relative">
            <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-red-100 to-orange-100 rounded-full shadow-lg mb-6 relative">
              <HiLightningBolt className="absolute -top-2 -right-2 h-8 w-8 text-amber-500 opacity-70" />
              <HiLightningBolt className="absolute -bottom-2 -left-2 h-6 w-6 text-orange-500 opacity-70" />
            </div>

            {/* 404 Text */}
            <div className="relative">
              <h1 className="text-8xl md:text-9xl font-bold text-slate-800 mb-4 relative">
                4<span className="text-red-500 animate-pulse">0</span>4
              </h1>
              <div className="absolute inset-0 text-8xl md:text-9xl font-bold text-red-500/20 animate-pulse">
                4<span className="text-amber-500">0</span>4
              </div>
            </div>
          </div>

          {/* Error Message */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Oops! Something went wrong
            </h2>
            <p className="text-xl text-slate-600 mb-6 max-w-2xl mx-auto leading-relaxed">
              We couldn't find the artifact you're looking for. It might have
              been moved, deleted, or lost in the digital sands of time.
            </p>

            {/* Error details card */}
            <div className="bg-white rounded-lg shadow-lg border border-slate-200 p-6 max-w-2xl mx-auto mb-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <HiCog className="h-6 w-6 text-amber-500 animate-spin" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-slate-800 mb-2">
                    What happened?
                  </h3>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• The page you requested could not be found</li>
                    <li>• The artifact might have been archived or removed</li>
                    <li>• There could be a temporary server issue</li>
                    <li>• The URL might contain a typo</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={handleRetry}
              disabled={isRetrying}
              className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-lg font-semibold shadow-lg disabled:opacity-50 transition-all flex items-center gap-2 min-w-[160px]"
            >
              {isRetrying ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Retrying...
                </>
              ) : (
                <>
                  <HiRefresh className="h-5 w-5" />
                  Try Again
                </>
              )}
            </button>

            <button
              onClick={handleGoBack}
              className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-8 py-4 rounded-lg font-semibold transition-all flex items-center gap-2"
            >
              <HiArrowLeft className="h-5 w-5" />
              Go Back
            </button>

            <Link
              to="/"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold shadow-lg transition-all flex items-center gap-2"
            >
              <HiHome className="h-5 w-5" />
              Home Page
            </Link>
          </div>

          {/* Help Section */}
          {/* <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-8 border border-amber-200">
            <div className="flex items-center justify-center gap-3 mb-4">
              <HiSupport className="h-6 w-6 text-amber-600" />
              <h3 className="text-xl font-semibold text-slate-800">
                Need Help?
              </h3>
            </div>
            <p className="text-slate-600 mb-6">
              If you continue to experience issues, our support team is here to
              help you navigate through any problems.
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 border border-amber-200 hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-slate-800 mb-2">
                  Search Artifacts
                </h4>
                <p className="text-sm text-slate-600 mb-3">
                  Browse our collection of historical artifacts
                </p>
                <Link
                  to="/search"
                  className="text-amber-600 hover:text-amber-700 text-sm font-medium"
                >
                  Start Searching →
                </Link>
              </div>

              <div className="bg-white rounded-lg p-4 border border-amber-200 hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-slate-800 mb-2">
                  Contact Support
                </h4>
                <p className="text-sm text-slate-600 mb-3">
                  Get help from our technical team
                </p>
                <Link
                  to="/support"
                  className="text-amber-600 hover:text-amber-700 text-sm font-medium"
                >
                  Get Support →
                </Link>
              </div>

              <div className="bg-white rounded-lg p-4 border border-amber-200 hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-slate-800 mb-2">
                  Report Issue
                </h4>
                <p className="text-sm text-slate-600 mb-3">
                  Help us improve by reporting problems
                </p>
                <Link
                  to="/report"
                  className="text-amber-600 hover:text-amber-700 text-sm font-medium"
                >
                  Report Bug →
                </Link>
              </div>
            </div>
          </div> */}

          {/* Footer Message */}
          <div className="text-center mt-20">
            <p className="text-slate-500 text-sm">
              Error Code: 404 | Timestamp: {new Date().toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
