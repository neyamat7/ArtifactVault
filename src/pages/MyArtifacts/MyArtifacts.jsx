import { useEffect, useState } from "react";
import {
  HiCalendar,
  HiCollection,
  HiLocationMarker,
  HiPencil,
  HiPlus,
  HiTrash,
} from "react-icons/hi";
import { Link } from "react-router";

// Mock data for artifacts
const mockArtifacts = [
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
    addedDate: "2023-05-15",
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
    addedDate: "2023-06-22",
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
    addedDate: "2023-07-10",
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
    addedDate: "2023-08-05",
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
    addedDate: "2023-09-18",
  },
];

export default function MyArtifacts() {
  const [artifacts, setArtifacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading data
  useEffect(() => {
    setTimeout(() => {
      setArtifacts(mockArtifacts);
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-700 text-xl">Loading your artifacts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 py-12 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-4">My Artifacts</h1>
          <p className="text-amber-100 text-lg">
            Manage your collection of historical artifacts. Update details or
            remove items as needed.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-7xl py-8 px-4">
        {artifacts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <HiCollection className="h-10 w-10 text-amber-500" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              No artifacts found
            </h2>
            <p className="text-slate-600 mb-6">
              {searchTerm || filterType
                ? "Try adjusting your search or filter criteria."
                : "You haven't added any artifacts yet."}
            </p>
            <Link
              to="/artifacts/new"
              className="inline-flex items-center px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors"
            >
              <HiPlus className="h-5 w-5 mr-2" />
              Add Your First Artifact
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artifacts.map((artifact) => (
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
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-bold text-slate-800 mb-2">
                    {artifact.artifactName}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                    {artifact.shortDescription}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-slate-500">
                      <HiCalendar className="h-4 w-4 mr-2 text-amber-500" />
                      <span>Created: {artifact.createdAt}</span>
                    </div>
                    <div className="flex items-center text-sm text-slate-500">
                      <HiCalendar className="h-4 w-4 mr-2 text-amber-500" />
                      <span>Discovered: {artifact.discoveredAt}</span>
                    </div>
                    <div className="flex items-center text-sm text-slate-500">
                      <HiLocationMarker className="h-4 w-4 mr-2 text-amber-500" />
                      <span className="truncate">
                        {artifact.presentLocation}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                    <div className="text-xs text-slate-500">
                      Added on{" "}
                      {new Date(artifact.addedDate).toLocaleDateString()}
                    </div>
                    <div className="flex space-x-2">
                      <Link
                        to={`/artifacts/${artifact.id}/edit`}
                        className="flex items-center justify-center p-2 bg-amber-100 text-amber-700 rounded hover:bg-amber-200 transition-colors"
                        aria-label={`Edit ${artifact.artifactName}`}
                      >
                        <HiPencil className="h-4 w-4" />
                      </Link>
                      <button
                        className="flex items-center justify-center p-2 bg-slate-100 text-slate-700 rounded hover:bg-slate-200 transition-colors"
                        aria-label={`Delete ${artifact.artifactName}`}
                      >
                        <HiTrash className="h-4 w-4" />
                      </button>
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
