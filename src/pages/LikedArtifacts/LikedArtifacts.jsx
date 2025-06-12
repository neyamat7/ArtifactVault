import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { AiFillLike } from "react-icons/ai";
import { HiCalendar, HiHeart, HiLocationMarker, HiUser } from "react-icons/hi";
import { Link } from "react-router";
import useAuth from "../../context/AuthContext/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function LikedArtifacts() {
  const axiosSecure = useAxiosSecure();

  const [artifacts, setArtifacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchLikedArtifacts = async () => {
      setIsLoading(true);
      try {
        const response = await axiosSecure.get(
          `/artifacts/liked?email=${user?.email}`
        );
        const data = response.data;
        setArtifacts(data);
      } catch (error) {
        console.error("Error fetching liked artifacts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLikedArtifacts();
  }, [user?.email, axiosSecure]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-700 text-xl">
            Loading your liked artifacts...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <Helmet>
        <title>Liked Artifacts | ArtifactVault</title>
      </Helmet>
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center gap-3 mb-4">
            <HiHeart className="h-10 w-10 text-white" />
            <h1 className="text-4xl font-bold text-white">Liked Artifacts</h1>
          </div>
          <p className="text-amber-100 text-lg max-w-3xl">
            Your collection of favorite historical artifacts from around the
            world.
          </p>
          <div className="mt-4 text-amber-100">
            <span className="text-2xl font-semibold">{artifacts.length}</span>{" "}
            artifacts in your favorites
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-7xl py-8 px-4">
        {artifacts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <HiHeart className="h-10 w-10 text-amber-500" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              No liked artifacts yet
            </h2>

            <Link
              to="/artifacts"
              className="inline-flex items-center px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors"
            >
              Explore Artifacts
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artifacts.map((artifact) => (
              <div
                key={artifact._id}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-slate-200 hover:shadow-lg transition-shadow"
              >
                <div className="aspect-video bg-slate-200 relative overflow-hidden">
                  <img
                    src={artifact.artifactImage}
                    alt={artifact.artifactName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-amber-500 text-white text-xs font-medium px-2 py-1 rounded">
                    {artifact.artifactType}
                  </div>
                  <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded flex items-center gap-1">
                    <AiFillLike />
                    {artifact.likes.length}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-bold text-slate-800 mb-2">
                    {artifact.artifactName}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4 overflow-hidden line-clamp-2">
                    {artifact.shortDescription}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-slate-500">
                      <HiCalendar className="h-4 w-4 mr-2 text-amber-500" />
                      <span>Created: {artifact.createdAt}</span>
                    </div>
                    <div className="flex items-center text-sm text-slate-500">
                      <HiLocationMarker className="h-4 w-4 mr-2 text-amber-500" />
                      <span className="truncate">
                        {artifact.presentLocation}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-slate-500">
                      <HiUser className="h-4 w-4 mr-2 text-amber-500" />
                      <span className="truncate">
                        Added by {artifact.adderName}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                    <div className="flex space-x-2">
                      <Link
                        to={`/artifacts/${artifact._id}`}
                        className="flex items-center justify-center p-2 px-4 bg-amber-200 text-amber-700 rounded-md hover:bg-amber-200 transition-colors font-bold"
                        aria-label={`View ${artifact.artifactName}`}
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
