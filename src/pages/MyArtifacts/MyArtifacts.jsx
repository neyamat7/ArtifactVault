import { useState } from "react";
import { Link } from "react-router";

// Icons
import {
  HiCalendar,
  HiCollection,
  HiLocationMarker,
  HiPencil,
  HiPlus,
  HiTrash,
} from "react-icons/hi";

// Mock artifacts data
const mockArtifacts = [
  {
    id: 1,
    artifactName: "Rosetta Stone",
    artifactImage: "/placeholder.svg?height=200&width=300",
    artifactType: "Documents",
    createdAt: "196 BC",
    presentLocation: "British Museum, London",
    discoveredBy: "Pierre-François Bouchard",
  },
  {
    id: 2,
    artifactName: "Tutankhamun's Mask",
    artifactImage: "/placeholder.svg?height=200&width=300",
    artifactType: "Jewelry",
    createdAt: "1323 BC",
    presentLocation: "Egyptian Museum, Cairo",
    discoveredBy: "Howard Carter",
  },
  {
    id: 3,
    artifactName: "Venus de Milo",
    artifactImage: "/placeholder.svg?height=200&width=300",
    artifactType: "Sculptures",
    createdAt: "130-100 BC",
    presentLocation: "Louvre Museum, Paris",
    discoveredBy: "Yorgos Kentrotas",
  },
  {
    id: 4,
    artifactName: "Terracotta Army",
    artifactImage: "/placeholder.svg?height=200&width=300",
    artifactType: "Sculptures",
    createdAt: "210-209 BC",
    presentLocation: "Xi'an, China",
    discoveredBy: "Local farmers",
  },
  {
    id: 5,
    artifactName: "Dead Sea Scrolls",
    artifactImage: "/placeholder.svg?height=200&width=300",
    artifactType: "Documents",
    createdAt: "408 BC - 318 AD",
    presentLocation: "Various Museums",
    discoveredBy: "Bedouin shepherds",
  },
  {
    id: 6,
    artifactName: "Stonehenge",
    artifactImage: "/placeholder.svg?height=200&width=300",
    artifactType: "Religious Items",
    createdAt: "3100-1600 BC",
    presentLocation: "Wiltshire, England",
    discoveredBy: "Ancient discovery",
  },
];

export default function ArtifactsPage() {
  const [artifacts, setArtifacts] = useState(mockArtifacts);

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
                My <span className="text-amber-600">Artifacts</span>
              </h1>
              <p className="text-slate-600 mt-2">
                Manage your artifact collection
              </p>
            </div>
            <Link
              to="/artifacts/add"
              className="inline-flex items-center justify-center bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-colors"
            >
              <HiPlus className="mr-2 h-5 w-5" />
              Add New Artifact
            </Link>
          </div>
        </div>
      </div>

      {/* Artifacts List */}
      <div className="container mx-auto px-4 py-8">
        {artifacts.length === 0 ? (
          <div className="text-center py-16">
            <HiCollection className="mx-auto h-16 w-16 text-slate-400 mb-4" />
            <h3 className="text-xl font-semibold text-slate-600 mb-2">
              No artifacts found
            </h3>
            <p className="text-slate-500 mb-6">
              Start building your collection by adding your first artifact.
            </p>
            <Link
              to="/artifacts/add"
              className="inline-flex items-center bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <HiPlus className="mr-2 h-5 w-5" />
              Add First Artifact
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:gap-6">
            {artifacts.map((artifact) => (
              <div
                key={artifact.id}
                className="bg-white rounded-lg shadow-md border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  <div className="md:w-48 md:flex-shrink-0">
                    <img
                      src={artifact.artifactImage || "/placeholder.svg"}
                      alt={artifact.artifactName}
                      className="w-full h-48 md:h-full object-cover"
                      onError={(e) => {
                        e.target.src = "/placeholder.svg?height=200&width=300";
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-4 md:p-6">
                    <div className="flex flex-col h-full">
                      {/* Header */}
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                          <h3 className="text-xl md:text-2xl font-bold text-slate-800">
                            {artifact.artifactName}
                          </h3>
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 self-start">
                            {artifact.artifactType}
                          </span>
                        </div>

                        {/* Details */}
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm text-slate-600">
                            <HiCalendar className="h-4 w-4 mr-2 text-amber-500" />
                            <span className="font-medium mr-2">Created:</span>
                            <span>{artifact.createdAt}</span>
                          </div>
                          <div className="flex items-center text-sm text-slate-600">
                            <HiLocationMarker className="h-4 w-4 mr-2 text-amber-500" />
                            <span className="font-medium mr-2">Location:</span>
                            <span>{artifact.presentLocation}</span>
                          </div>
                          <div className="flex items-start text-sm text-slate-600">
                            <HiCollection className="h-4 w-4 mr-2 mt-0.5 text-amber-500 flex-shrink-0" />
                            <span className="font-medium mr-2">
                              Discovered by:
                            </span>
                            <span>{artifact.discoveredBy}</span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4 border-t border-slate-200">
                        <Link
                          to={`/artifacts/${artifact.id}/update`}
                          className="flex items-center justify-center bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                        >
                          <HiPencil className="mr-2 h-4 w-4" />
                          Update
                        </Link>
                        <button
                          onClick={() => confirmDelete(artifact.id)}
                          className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                        >
                          <HiTrash className="mr-2 h-4 w-4" />
                          Delete
                        </button>
                      </div>
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
