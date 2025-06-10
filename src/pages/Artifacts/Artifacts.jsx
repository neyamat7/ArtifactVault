import { useState } from "react";

// Icons
import Card from "../../components/Card/Card";

// Mock artifacts data
const mockArtifacts = [
  {
    id: 1,
    name: "Rosetta Stone",
    image: "/placeholder.svg?height=300&width=400",
    category: "Documents",
    createdAt: "196 BC",
    presentLocation: "British Museum, London",
    discoveredBy: "Pierre-François Bouchard",
    description:
      "The key to deciphering Egyptian hieroglyphics, discovered in 1799 near the town of Rosetta.",
    likes: 1247,
    isLiked: false,
  },
  {
    id: 2,
    name: "Tutankhamun's Mask",
    image: "/placeholder.svg?height=300&width=400",
    category: "Jewelry",
    createdAt: "1323 BC",
    presentLocation: "Egyptian Museum, Cairo",
    discoveredBy: "Howard Carter",
    description:
      "Golden funeral mask of the Egyptian pharaoh Tutankhamun, one of the most famous artifacts.",
    likes: 2156,
    isLiked: true,
  },
  {
    id: 3,
    name: "Venus de Milo",
    image: "/placeholder.svg?height=300&width=400",
    category: "Sculptures",
    createdAt: "130-100 BC",
    presentLocation: "Louvre Museum, Paris",
    discoveredBy: "Yorgos Kentrotas",
    description:
      "Ancient Greek sculpture believed to depict Aphrodite, the Greek goddess of love and beauty.",
    likes: 892,
    isLiked: false,
  },
  {
    id: 4,
    name: "Terracotta Army",
    image: "/placeholder.svg?height=300&width=400",
    category: "Sculptures",
    createdAt: "210-209 BC",
    presentLocation: "Xi'an, China",
    discoveredBy: "Local farmers",
    description:
      "Collection of terracotta sculptures depicting the armies of Qin Shi Huang, the first Emperor of China.",
    likes: 1834,
    isLiked: false,
  },
  {
    id: 5,
    name: "Dead Sea Scrolls",
    image: "/placeholder.svg?height=300&width=400",
    category: "Documents",
    createdAt: "408 BC - 318 AD",
    presentLocation: "Various Museums",
    discoveredBy: "Bedouin shepherds",
    description:
      "Ancient Jewish religious manuscripts found in the Qumran Caves near the Dead Sea.",
    likes: 743,
    isLiked: true,
  },
  {
    id: 6,
    name: "Stonehenge",
    image: "/placeholder.svg?height=300&width=400",
    category: "Religious Items",
    createdAt: "3100-1600 BC",
    presentLocation: "Wiltshire, England",
    discoveredBy: "Ancient discovery",
    description:
      "Prehistoric monument consisting of a ring of standing stones, each around 13 feet high.",
    likes: 1456,
    isLiked: false,
  },
  {
    id: 7,
    name: "Mona Lisa",
    image: "/placeholder.svg?height=300&width=400",
    category: "Art",
    createdAt: "1503-1519",
    presentLocation: "Louvre Museum, Paris",
    discoveredBy: "Leonardo da Vinci",
    description:
      "Half-length portrait painting by Leonardo da Vinci, considered an archetypal masterpiece.",
    likes: 3421,
    isLiked: true,
  },
  {
    id: 8,
    name: "Machu Picchu",
    image: "/placeholder.svg?height=300&width=400",
    category: "Religious Items",
    createdAt: "1450 AD",
    presentLocation: "Cusco Region, Peru",
    discoveredBy: "Hiram Bingham III",
    description:
      "15th-century Inca citadel located in the Eastern Cordillera of southern Peru.",
    likes: 2087,
    isLiked: false,
  },
];

export default function Artifacts() {
  const [artifacts, setArtifacts] = useState(mockArtifacts);

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Discover <span className="text-amber-600">Artifacts</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Explore our curated collection of historical artifacts from around
              the world
            </p>
          </div>
        </div>
      </div>

      {/* Artifacts Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {artifacts.map((artifact) => (
            <Card artifact={artifact} />
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            Load More Artifacts
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white border-t border-slate-200 mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-amber-600 mb-2">
                {artifacts.length}
              </div>
              <div className="text-slate-600">Total Artifacts</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-600 mb-2">
                {artifacts
                  .reduce((sum, artifact) => sum + artifact.likes, 0)
                  .toLocaleString()}
              </div>
              <div className="text-slate-600">Total Likes</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-600 mb-2">
                {new Set(artifacts.map((a) => a.category)).size}
              </div>
              <div className="text-slate-600">Categories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-600 mb-2">
                {new Set(artifacts.map((a) => a.presentLocation)).size}
              </div>
              <div className="text-slate-600">Locations</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
