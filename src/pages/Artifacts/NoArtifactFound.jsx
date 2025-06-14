import { FaBoxOpen } from "react-icons/fa";

const NoArtifactFound = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px] p-6">
      <div className="max-w-md w-full text-center">
        {/* Icon Container */}
        <div className="relative mb-6">
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center shadow-lg">
            <FaBoxOpen className="text-amber-600 text-3xl" />
          </div>

          <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-300 rounded-full opacity-60"></div>
          <div className="absolute -bottom-1 -left-3 w-4 h-4 bg-amber-400 rounded-full opacity-40"></div>
        </div>

        {/* Content */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-slate-800 mb-3">
            No Artifacts Found
          </h3>

          <p className="text-slate-600 leading-relaxed">
            Wanna break the silence? Upload or tweak your search.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoArtifactFound;
