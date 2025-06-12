import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  HiArrowLeft,
  HiCalendar,
  HiClock,
  HiDocumentText,
  HiEye,
  HiGlobeAlt,
  HiHeart,
  HiLocationMarker,
  HiOutlineHeart,
  HiPhotograph,
  HiShare,
  HiTag,
  HiUser,
} from "react-icons/hi";
import { Link, useParams } from "react-router";
import Badge from "../../components/Badge/Badge";
import Button from "../../components/Button/Button";
import useAuth from "../../context/AuthContext/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function ArtifactDetails() {
  const axiosSecure = useAxiosSecure();

  const { artifactId } = useParams();
  const [artifact, setArtifact] = useState([]);
  const [isLiked, setIsLiked] = useState(false);

  const [imageLoaded, setImageLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchArtifact = async () => {
      try {
        const response = await axiosSecure.get(`/artifacts/${artifactId}`);

        const data = response.data;

        // Check if the user has liked this artifact
        const userLiked = data.likes.includes(user?.email);
        setIsLiked(userLiked);

        // Set the artifact data
        setArtifact(data);
      } catch (error) {
        console.error("Error fetching artifact:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtifact();
  }, [artifactId, isLiked, user?.email, axiosSecure]);

  const handleLike = () => {
    setIsLiked((prev) => !prev);

    //  like and dislike logic
    const action = isLiked ? "dislike" : "like";

    axiosSecure
      .patch(`/artifacts/${artifactId}`, {
        action,
        userEmail: user?.email,
      })
      .then((response) => {
        console.log("Artifact liked/disliked:", response.data);
      })
      .catch((error) => {
        console.error("Error liking/disliking artifact:", error);
      });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: artifact.artifactName,
        text: artifact.shortDescription,
        url: window.location.href,
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const getTypeStyle = (type) => {
    const styles = {
      Documents: {
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        color: "rgb(59, 130, 246)",
      },
      Weapons: {
        backgroundColor: "rgba(239, 68, 68, 0.2)",
        color: "rgb(239, 68, 68)",
      },
      Tools: {
        backgroundColor: "rgba(34, 197, 94, 0.2)",
        color: "rgb(34, 197, 94)",
      },
      Pottery: {
        backgroundColor: "rgba(245, 158, 11, 0.2)",
        color: "rgb(245, 158, 11)",
      },
      Jewelry: {
        backgroundColor: "rgba(147, 51, 234, 0.2)",
        color: "rgb(147, 51, 234)",
      },
      default: {
        backgroundColor: "rgba(100, 116, 139, 0.2)",
        color: "rgb(100, 116, 139)",
      },
    };
    return styles[type] || styles.default;
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: HiDocumentText },
    { id: "details", label: "Details", icon: HiTag },
    { id: "history", label: "History", icon: HiClock },
  ];

  if (isLoading || !user) {
    console.log("Loading artifact details...");
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-800/80 to-transparent"></div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link
              to="/artifacts"
              className="inline-flex items-center text-amber-300 hover:text-amber-200 transition-colors group"
            >
              <HiArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Artifacts
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                <div className="aspect-[4/3] relative">
                  {!imageLoaded && (
                    <div className="absolute inset-0 bg-slate-700 animate-pulse flex items-center justify-center">
                      <HiPhotograph className="h-16 w-16 text-slate-500" />
                    </div>
                  )}
                  <img
                    src={artifact.artifactImage || "/placeholder.svg"}
                    alt={artifact.artifactName}
                    className={`w-full h-full object-cover transition-opacity duration-500 ${
                      imageLoaded ? "opacity-100" : "opacity-0"
                    }`}
                    onLoad={() => setImageLoaded(true)}
                  />

                  {/* Floating badges */}
                  <div className="absolute top-6 left-6">
                    <Badge
                      style={getTypeStyle(artifact.artifactType)}
                      className="backdrop-blur-sm bg-white/90 border border-white/30 shadow-lg"
                    >
                      {artifact.artifactType}
                    </Badge>
                  </div>
                  <div className="absolute top-6 right-6">
                    <Badge
                      style={{
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                        color: "white",
                      }}
                      className="backdrop-blur-sm border border-white/30 shadow-lg"
                    >
                      {artifact.category}
                    </Badge>
                  </div>
                </div>

                {/* Glowing border effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-amber-400/20 via-transparent to-amber-400/20 pointer-events-none"></div>
              </div>

              {/* Floating stats */}
              <div className="absolute -bottom-6 left-6 right-6 grid grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-500/20 rounded-xl">
                      <HiHeart className="h-5 w-5 text-red-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">
                        {artifact.likes.length}
                      </p>
                      <p className="text-sm text-slate-300">Likes</p>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/20 rounded-xl">
                      <HiEye className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">
                        {artifact?.views}
                      </p>
                      <p className="text-sm text-slate-300">Views</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right - Title and Actions */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white space-y-8"
            >
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-amber-200 to-amber-400 bg-clip-text text-transparent"
                >
                  {artifact.artifactName}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl text-slate-300 leading-relaxed mb-8"
                >
                  {artifact.shortDescription}
                </motion.p>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex gap-4"
                >
                  <Button
                    onClick={handleLike}
                    className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                      isLiked
                        ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg shadow-red-500/25"
                        : "bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20"
                    }`}
                  >
                    {isLiked ? (
                      <HiHeart className="h-5 w-5 fill-current" />
                    ) : (
                      <HiOutlineHeart className="h-5 w-5" />
                    )}
                    {isLiked ? "Liked" : "Like"}
                  </Button>
                  <Button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
                  >
                    <HiShare className="h-5 w-5" />
                    Share
                  </Button>
                </motion.div>
              </div>

              {/* Quick Info Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                  <div className="flex items-center gap-2 mb-2">
                    <HiCalendar className="h-4 w-4 text-amber-400" />
                    <span className="text-sm text-slate-300">Created</span>
                  </div>
                  <p className="text-white font-semibold">
                    {artifact.createdAt || "Unknown"}
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                  <div className="flex items-center gap-2 mb-2">
                    <HiLocationMarker className="h-4 w-4 text-amber-400" />
                    <span className="text-sm text-slate-300">Location</span>
                  </div>
                  <p className="text-white font-semibold text-sm">
                    {artifact.presentLocation || "Unknown"}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-16">
        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center mb-12"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20">
            <div className="flex gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg"
                      : "text-slate-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Historical Context */}
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="p-2 bg-amber-500/20 rounded-xl">
                    <HiDocumentText className="h-6 w-6 text-amber-400" />
                  </div>
                  Historical Context
                </h2>
                <p className="text-slate-300 leading-relaxed text-lg">
                  {artifact.historicalContext}
                </p>
              </div>

              {/* Description */}
              {/* Historical Context */}
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="p-2 bg-amber-500/20 rounded-xl">
                    <HiDocumentText className="h-6 w-6 text-amber-400" />
                  </div>
                  Description
                </h2>
                <p className="text-slate-300 leading-relaxed text-lg">
                  {artifact.shortDescription}
                </p>
              </div>
            </div>
          )}

          {activeTab === "details" && (
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="p-2 bg-green-500/20 rounded-xl">
                  <HiGlobeAlt className="h-6 w-6 text-green-400" />
                </div>
                Discovery Information
              </h3>
              <div className="space-y-6">
                <div className="p-4 bg-white/5 rounded-2xl">
                  <div className="flex items-center gap-2 mb-2">
                    <HiClock className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-300 text-sm">Discovered</span>
                  </div>
                  <span className="text-white font-semibold">
                    {artifact.discoveredAt || "Unknown"}
                  </span>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl">
                  <div className="flex items-center gap-2 mb-2">
                    <HiUser className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-300 text-sm">
                      Discovered By
                    </span>
                  </div>
                  <span className="text-white font-semibold">
                    {artifact.discoveredBy || "Unknown"}
                  </span>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl">
                  <div className="flex items-center gap-2 mb-2">
                    <HiLocationMarker className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-300 text-sm">
                      Current Location
                    </span>
                  </div>
                  <span className="text-white font-semibold">
                    {artifact.presentLocation || "Unknown"}
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "history" && (
            <div className="space-y-8">
              {/* Timeline */}
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                  <div className="p-2 bg-purple-500/20 rounded-xl">
                    <HiClock className="h-6 w-6 text-purple-400" />
                  </div>
                  Timeline
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-6 bg-white/5 rounded-2xl">
                    <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                      <HiCalendar className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Created</h4>
                      <p className="text-slate-300">
                        {artifact.createdAt || "Unknown period"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-6 bg-white/5 rounded-2xl">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                      <HiGlobeAlt className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Discovered</h4>
                      <p className="text-slate-300">
                        {artifact.discoveredAt || "Unknown"} by{" "}
                        {artifact.discoveredBy || "Unknown"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-6 bg-white/5 rounded-2xl">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                      <HiUser className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">
                        Added to Database
                      </h4>
                      <p className="text-slate-300">
                        {new Date(artifact.dateAdded).toLocaleDateString()} by{" "}
                        {artifact.adderName}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contributor Information */}
              <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-md rounded-3xl p-8 border border-slate-600/30 shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Contributed By
                </h3>
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center">
                    <HiUser className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <p className="text-xl font-semibold text-white">
                      {artifact.adderName}
                    </p>
                    <p className="text-slate-300">{artifact.adderEmail}</p>
                    <p className="text-slate-400 text-sm">
                      Added on{" "}
                      {new Date(artifact.dateAdded).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
