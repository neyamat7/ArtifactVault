import { HiCollection } from "react-icons/hi";
import { Link } from "react-router";

const Logo = ({ privateClasses }) => {
  return (
    <Link to="/" className="flex items-center gap-3">
      <div className="rounded-full p-2 shadow-lg bg-gradient-to-br from-amber-600 to-amber-700">
        <HiCollection className="h-6 w-6 text-white" />
      </div>
      <div>
        <h1 className={`text-xl font-bold ${privateClasses} dark:text-white`}>ArtifactVault</h1>
      </div>
    </Link>
  );
};

export default Logo;
