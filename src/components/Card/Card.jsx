import { AiFillLike } from "react-icons/ai";
import { HiEye } from "react-icons/hi";
import { Link } from "react-router";
import Button from "../Button/Button";

const Card = ({ artifact }) => {
  return (
    <div className="group bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden shadow-lg transition-all duration-500">
      <div className="aspect-[4/3] relative overflow-hidden">
        <img
          src={artifact.artifactImage}
          alt={artifact.artifactName}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
        />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-xs font-medium">
            {artifact.artifactType}
          </span>
        </div>
        <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/90 dark:bg-slate-700/90 backdrop-blur-sm rounded-full px-3 py-1">
          <AiFillLike className="h-4 w-4 text-blue-500 fill-current" />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            {artifact.likes.length}
          </span>
        </div>
      </div>
      <div className="min-h-[230px] flex flex-col">
        <div className="p-6 pb-1">
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-amber-500 transition-colors">
            {artifact.artifactName}
          </h3>
        </div>
        <div className="p-6 py-4">
          <p className="text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
            {artifact.shortDescription}
          </p>
        </div>
        <div className="flex-1"></div>
        <div className="p-6 pt-0">
          <Link to={`/artifacts/${artifact._id}`} className="w-full">
            <Button
              variant="secondary"
              className="w-full    
            transition-all duration-300 cursor-pointer"
            >
              <HiEye className="mr-2 h-4 w-4" />
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
