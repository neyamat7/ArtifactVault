import { useEffect, useState } from "react";
import {
  HiCalendar,
  HiCheckCircle,
  HiExclamationCircle,
  HiEye,
  HiFilter,
  HiHeart,
  HiLocationMarker,
  HiOutlineHeart,
  HiSearch,
  HiUser,
} from "react-icons/hi";
import { Link } from "react-router";

// Mock data for liked artifacts
const mockLikedArtifacts = [
  {
    id: 1,
    artifactName: "Rosetta Stone",
    artifactImage: "/placeholder.svg?height=600&width=800",
    artifactType: "Documents",
    shortDescription:
      "The key to deciphering Egyptian hieroglyphics, discovered in 1799 near the town of Rosetta.",
    createdAt: "196 BC",
    discoveredAt: "1799",
    presentLocation: "British Museum, London",
    likedDate: "2023-11-15",
    addedBy: "Dr. Sarah Johnson",
    likes: 1247,
  },
  {
    id: 2,
    artifactName: "Tutankhamun's Death Mask",
    artifactImage: "/placeholder.svg?height=600&width=800",
    artifactType: "Art",
    shortDescription:
      "A gold mask that was placed over the face of Pharaoh Tutankhamun's mummy.",
    createdAt: "1323 BC",
    discoveredAt: "1922",
    presentLocation: "Egyptian Museum, Cairo",
    likedDate: "2023-11-20",
    addedBy: "Prof. Ahmed Hassan",
    likes: 2156,
  },
  {
    id: 3,
    artifactName: "Venus de Milo",
    artifactImage: "/placeholder.svg?height=600&width=800",
    artifactType: "Sculptures",
    shortDescription:
      "An ancient Greek statue and one of the most famous works of ancient Greek sculpture.",
    createdAt: "100 BC",
    discoveredAt: "1820",
    presentLocation: "Louvre Museum, Paris",
    likedDate: "2023-11-22",
    addedBy: "Dr. Marie Dubois",
    likes: 1834,
  },
  {
    id: 4,
    artifactName: "Dead Sea Scrolls",
    artifactImage: "/placeholder.svg?height=600&width=800",
    artifactType: "Documents",
    shortDescription:
      "Ancient Jewish religious manuscripts found in the Qumran Caves near the Dead Sea.",
    createdAt: "150 BC - 70 AD",
    discoveredAt: "1946-1956",
    presentLocation: "Shrine of the Book, Jerusalem",
    likedDate: "2023-11-25",
    addedBy: "Dr. David Cohen",
    likes: 987,
  },
  {
    id: 5,
    artifactName: "Terracotta Army",
    artifactImage: "/placeholder.svg?height=600&width=800",
    artifactType: "Sculptures",
    shortDescription:
      "A collection of terracotta sculptures depicting the armies of Qin Shi Huang.",
    createdAt: "210-209 BC",
    discoveredAt: "1974",
    presentLocation: "Xi'an, China",
    likedDate: "2023-11-28",
    addedBy: "Dr. Li Wei",
    likes: 3421,
  },
  {
    id: 6,
    artifactName: "Mona Lisa",
    artifactImage: "/placeholder.svg?height=600&width=800",
    artifactType: "Art",
    shortDescription:
      "A half-length portrait painting by Italian artist Leonardo da Vinci.",
    createdAt: "1503-1519",
    discoveredAt: "N/A",
    presentLocation: "Louvre Museum, Paris",
    likedDate: "2023-12-01",
    addedBy: "Prof. Isabella Romano",
    likes: 5672,
  },
];

export default function LikedArtifacts() {
  const [artifacts, setArtifacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [notification, setNotification] = useState(null);

  // Simulate loading data
  useEffect(() => {
    setTimeout(() => {
      setArtifacts(mockLikedArtifacts);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter and sort artifacts
  const filteredAndSortedArtifacts = artifacts
    .filter((artifact) => {
      const matchesSearch =
        artifact.artifactName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        artifact.shortDescription
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        artifact.addedBy.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterType
        ? artifact.artifactType === filterType
        : true;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return new Date(b.likedDate) - new Date(a.likedDate);
        case "oldest":
          return new Date(a.likedDate) - new Date(b.likedDate);
        case "popular":
          return b.likes - a.likes;
        case "name":
          return a.artifactName.localeCompare(b.artifactName);
        default:
          return 0;
      }
    });

  // Get unique artifact types for filter dropdown
  const artifactTypes = [
    ...new Set(artifacts.map((artifact) => artifact.artifactType)),
  ].sort();

  const handleUnlike = (id) => {
    // Simulate unlike API call
    setArtifacts(artifacts.filter((artifact) => artifact.id !== id));

    // Show notification
    setNotification({
      type: "success",
      message: "Artifact removed from liked items",
    });

    // Hide notification after 3 seconds
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  if (isLoading) {
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

      {/* Search, Filter and Sort Bar */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="container mx-auto max-w-7xl py-4 px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative w-full lg:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiSearch className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search liked artifacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>

            <div className="flex gap-4 w-full lg:w-auto">
              <div className="relative w-full md:w-48">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiFilter className="h-5 w-5 text-slate-400" />
                </div>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="block w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 appearance-none bg-white"
                >
                  <option value="">All Types</option>
                  {artifactTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="block w-full md:w-48 px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 appearance-none bg-white"
              >
                <option value="recent">Recently Liked</option>
                <option value="oldest">Oldest Liked</option>
                <option value="popular">Most Popular</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-7xl py-8 px-4">
        {filteredAndSortedArtifacts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <HiHeart className="h-10 w-10 text-amber-500" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              {searchTerm || filterType
                ? "No artifacts found"
                : "No liked artifacts yet"}
            </h2>
            <p className="text-slate-600 mb-6">
              {searchTerm || filterType
                ? "Try adjusting your search or filter criteria."
                : "Start exploring artifacts and like the ones you find interesting!"}
            </p>
            <Link
              to="/artifacts"
              className="inline-flex items-center px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors"
            >
              Explore Artifacts
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedArtifacts.map((artifact) => (
              <div
                key={artifact.id}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-slate-200 hover:shadow-lg transition-shadow"
              >
                <div className="aspect-video bg-slate-200 relative overflow-hidden">
                  <img
                    src={artifact.artifactImage || "/placeholder.svg"}
                    alt={artifact.artifactName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-amber-500 text-white text-xs font-medium px-2 py-1 rounded">
                    {artifact.artifactType}
                  </div>
                  <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded flex items-center gap-1">
                    <HiHeart className="h-3 w-3" />
                    {artifact.likes.toLocaleString()}
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
                        Added by {artifact.addedBy}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                    <div className="text-xs text-slate-500">
                      Liked on{" "}
                      {new Date(artifact.likedDate).toLocaleDateString()}
                    </div>
                    <div className="flex space-x-2">
                      <Link
                        to={`/artifacts/${artifact.id}`}
                        className="flex items-center justify-center p-2 bg-amber-100 text-amber-700 rounded hover:bg-amber-200 transition-colors"
                        aria-label={`View ${artifact.artifactName}`}
                      >
                        <HiEye className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => handleUnlike(artifact.id)}
                        className="flex items-center justify-center p-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                        aria-label={`Unlike ${artifact.artifactName}`}
                      >
                        <HiOutlineHeart className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Stats Section */}
      {artifacts.length > 0 && (
        <div className="bg-white border-t border-slate-200 py-8">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-amber-600">
                  {artifacts.length}
                </div>
                <div className="text-sm text-slate-600">Total Liked</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">
                  {artifactTypes.length}
                </div>
                <div className="text-sm text-slate-600">Different Types</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-600">
                  {Math.round(
                    artifacts.reduce(
                      (sum, artifact) => sum + artifact.likes,
                      0
                    ) / artifacts.length
                  )}
                </div>
                <div className="text-sm text-slate-600">Avg. Popularity</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-600">
                  {new Set(artifacts.map((artifact) => artifact.addedBy)).size}
                </div>
                <div className="text-sm text-slate-600">Contributors</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 opacity-0 translate-y-5 animate-[fadeInUp_0.3s_ease-out_forwards]">
          <div
            className={`flex items-center gap-3 px-6 py-4 rounded-lg shadow-lg ${
              notification.type === "success"
                ? "bg-green-600 text-white"
                : "bg-red-600 text-white"
            }`}
          >
            {notification.type === "success" ? (
              <HiCheckCircle className="h-5 w-5 text-white" />
            ) : (
              <HiExclamationCircle className="h-5 w-5 text-white" />
            )}
            <span>{notification.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}
