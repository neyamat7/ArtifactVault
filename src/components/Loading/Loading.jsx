

const Loading = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="text-center">
        {/* Main Loading Animation */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full border-4 border-amber-200 animate-spin"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-amber-500 animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl animate-pulse">⚡</span>
          </div>
        </div>

        {/* Loading Text */}
        <h2 className="text-xl font-semibold text-slate-800 mb-2">{message}</h2>
        <p className="text-slate-600 text-sm">Please wait a moment</p>

        {/* Loading Dots */}
        <div className="flex justify-center gap-1 mt-4">
          <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
          <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
        </div>
      </div>
    </div>
  )
}

export default Loading
