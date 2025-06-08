"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useParams } from "react-router";
import Badge from "../../components/Badge/Badge";
import Button from "../../components/Button/Button";

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

// Mock artifact data - this would come from your database/API
const mockArtifact = {
  id: 1,
  artifactName: "Rosetta Stone",
  artifactImage: "/placeholder.svg?height=600&width=800",
  artifactType: "Documents",
  historicalContext:
    "The Rosetta Stone is a granodiorite stele inscribed with three versions of a decree issued in Memphis, Egypt in 196 BC during the Ptolemaic dynasty on behalf of King Ptolemy V Epiphanes. The top and middle texts are in Ancient Egyptian using hieroglyphic and Demotic scripts respectively, while the bottom is in Ancient Greek. The decree has only minor differences between the three versions, making the Rosetta Stone key to deciphering Egyptian hieroglyphs, thereby opening a window into ancient Egyptian history.",
  shortDescription:
    "The key to deciphering Egyptian hieroglyphics, discovered in 1799 near the town of Rosetta.",
  createdAt: "196 BC",
  discoveredAt: "1799",
  discoveredBy: "Pierre-François Bouchard",
  presentLocation: "British Museum, London",
  adderName: "Dr. Sarah Johnson",
  adderEmail: "sarah.johnson@archaeology.edu",
  likes: 2453,
  views: 15672,
  dateAdded: "2024-01-15",
  category: "Ancient Egypt",
  material: "Granodiorite",
  dimensions: "114 cm × 72 cm × 28 cm",
  weight: "760 kg",
  condition: "Good",
  significance:
    "Critical breakthrough in understanding ancient Egyptian writing systems",
};

export default function ArtifactDetails() {
  const { id } = useParams();
  const [artifact] = useState(mockArtifact); // In real app, fetch based on id
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(artifact.likes);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikeCount((prev) => prev - 1);
      setIsLiked(false);
    } else {
      setLikeCount((prev) => prev + 1);
      setIsLiked(true);
    }
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link
            to="/artifacts"
            className="inline-flex items-center text-slate-600 hover:text-amber-600 transition-colors group"
          >
            <HiArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Artifacts
          </Link>
        </motion.div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Left Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Main Image */}
            <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-white">
              <div className="aspect-[4/3] relative">
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-slate-200 animate-pulse flex items-center justify-center">
                    <HiPhotograph className="h-16 w-16 text-slate-400" />
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
                <div className="absolute top-4 left-4">
                  <Badge style={getTypeStyle(artifact.artifactType)}>
                    {artifact.artifactType}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.7)",
                      color: "white",
                    }}
                  >
                    {artifact.category}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-lg border border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <HiHeart className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-800">
                      {likeCount.toLocaleString()}
                    </p>
                    <p className="text-sm text-slate-600">Likes</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-lg border border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <HiEye className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-800">
                      {artifact.views.toLocaleString()}
                    </p>
                    <p className="text-sm text-slate-600">Views</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Header */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
                {artifact.artifactName}
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed mb-6">
                {artifact.shortDescription}
              </p>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button
                  onClick={handleLike}
                  variant={isLiked ? "primary" : "outline"}
                  className="flex items-center gap-2"
                >
                  {isLiked ? (
                    <HiHeart className="h-5 w-5 fill-current" />
                  ) : (
                    <HiOutlineHeart className="h-5 w-5" />
                  )}
                  {isLiked ? "Liked" : "Like"} ({likeCount.toLocaleString()})
                </Button>
                <Button
                  variant="outline"
                  onClick={handleShare}
                  className="flex items-center gap-2"
                >
                  <HiShare className="h-5 w-5" />
                  Share
                </Button>
              </div>
            </div>

            {/* Historical Context */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <HiDocumentText className="h-6 w-6 text-amber-600" />
                Historical Context
              </h2>
              <p className="text-slate-700 leading-relaxed">
                {artifact.historicalContext}
              </p>
            </div>

            {/* Artifact Information */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <HiTag className="h-6 w-6 text-amber-600" />
                Artifact Information
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">
                      Created
                    </label>
                    <div className="flex items-center gap-2 text-slate-800">
                      <HiCalendar className="h-4 w-4 text-slate-400" />
                      <span>{artifact.createdAt || "Unknown"}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">
                      Discovered
                    </label>
                    <div className="flex items-center gap-2 text-slate-800">
                      <HiClock className="h-4 w-4 text-slate-400" />
                      <span>{artifact.discoveredAt || "Unknown"}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">
                      Discovered By
                    </label>
                    <div className="flex items-center gap-2 text-slate-800">
                      <HiUser className="h-4 w-4 text-slate-400" />
                      <span>{artifact.discoveredBy || "Unknown"}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">
                      Material
                    </label>
                    <span className="text-slate-800">
                      {artifact.material || "Not specified"}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">
                      Present Location
                    </label>
                    <div className="flex items-center gap-2 text-slate-800">
                      <HiLocationMarker className="h-4 w-4 text-slate-400" />
                      <span>{artifact.presentLocation || "Unknown"}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">
                      Dimensions
                    </label>
                    <span className="text-slate-800">
                      {artifact.dimensions || "Not specified"}
                    </span>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">
                      Weight
                    </label>
                    <span className="text-slate-800">
                      {artifact.weight || "Not specified"}
                    </span>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">
                      Condition
                    </label>
                    <Badge
                      style={{
                        backgroundColor: "rgba(34, 197, 94, 0.2)",
                        color: "rgb(34, 197, 94)",
                      }}
                    >
                      {artifact.condition || "Unknown"}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Significance */}
            {artifact.significance && (
              <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-2xl p-6 border border-amber-200">
                <h2 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <HiGlobeAlt className="h-5 w-5 text-amber-600" />
                  Historical Significance
                </h2>
                <p className="text-slate-700 leading-relaxed">
                  {artifact.significance}
                </p>
              </div>
            )}

            {/* Contributor Information */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <h2 className="text-xl font-bold text-slate-800 mb-4">
                Contributed By
              </h2>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                  <HiUser className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800">
                    {artifact.adderName}
                  </p>
                  <p className="text-slate-600 text-sm">
                    {artifact.adderEmail}
                  </p>
                  <p className="text-slate-500 text-xs">
                    Added on {new Date(artifact.dateAdded).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
