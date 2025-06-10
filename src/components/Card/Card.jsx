import { HiEye, HiHeart } from "react-icons/hi";
import { Link } from "react-router";
import Button from "../Button/Button";

const Card = ({ artifact }) => {
  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm  overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500">
      <div className="aspect-[4/3] relative overflow-hidden">
        <img
          src={artifact.image || "/placeholder.svg"}
          alt={artifact.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-xs font-medium">
            {artifact.category}
          </span>
        </div>
        <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
          <HiHeart className="h-4 w-4 text-red-500 fill-current" />
          <span className="text-sm font-medium text-slate-700">
            {artifact.likes.toLocaleString()}
          </span>
        </div>
      </div>
      <div className="p-6 pb-3 ">
        <h3 className="text-xl font-bold text-slate-800 group-hover:text-amber-600 transition-colors">
          {artifact.name}
        </h3>
      </div>
      <div className="p-6  pb-4">
        <p className="text-slate-600 line-clamp-3 leading-relaxed">
          {artifact.description}
        </p>
      </div>
      <div className="p-6 pt-0">
        <Link to={`/artifacts/${artifact.id}`} className="w-full">
          <Button
            variant="secondary"
            className="w-full group-hover:bg-gradient-to-r group-hover:from-amber-600 group-hover:to-amber-700 transition-all duration-300"
          >
            <HiEye className="mr-2 h-4 w-4" />
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
