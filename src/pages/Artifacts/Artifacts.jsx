"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HiSearch, HiX } from "react-icons/hi"

// Icons
import Card from "../../components/Card/Card"

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
    description: "The key to deciphering Egyptian hieroglyphics, discovered in 1799 near the town of Rosetta.",
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
    description: "Golden funeral mask of the Egyptian pharaoh Tutankhamun, one of the most famous artifacts.",
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
    description: "Ancient Greek sculpture believed to depict Aphrodite, the Greek goddess of love and beauty.",
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
    description: "Ancient Jewish religious manuscripts found in the Qumran Caves near the Dead Sea.",
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
    description: "Prehistoric monument consisting of a ring of standing stones, each around 13 feet high.",
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
    description: "Half-length portrait painting by Leonardo da Vinci, considered an archetypal masterpiece.",
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
    description: "15th-century Inca citadel located in the Eastern Cordillera of southern Peru.",
    likes: 2087,
    isLiked: false,
  },
]

export default function Artifacts() {
  const [artifacts, setArtifacts] = useState(mockArtifacts)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredArtifacts, setFilteredArtifacts] = useState(mockArtifacts)

  // Handle search functionality
  const handleSearch = (value) => {
    setSearchTerm(value)

    if (value.trim() === "") {
      setFilteredArtifacts(artifacts)
    } else {
      const filtered = artifacts.filter(
        (artifact) =>
          artifact.name.toLowerCase().includes(value.toLowerCase()) ||
          artifact.category.toLowerCase().includes(value.toLowerCase()) ||
          artifact.description.toLowerCase().includes(value.toLowerCase()) ||
          artifact.presentLocation.toLowerCase().includes(value.toLowerCase()) ||
          artifact.discoveredBy.toLowerCase().includes(value.toLowerCase()),
      )
      setFilteredArtifacts(filtered)
    }
  }

  // Clear search
  const clearSearch = () => {
    setSearchTerm("")
    setFilteredArtifacts(artifacts)
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const searchVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        delay: 0.3,
      },
    },
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <motion.h1
              variants={headerVariants}
              initial="hidden"
              animate="visible"
              className="text-4xl md:text-5xl font-bold text-slate-800 mb-4"
            >
              Discover <span className="text-amber-600">Artifacts</span>
            </motion.h1>
            <motion.p
              variants={headerVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              className="text-xl text-slate-600 max-w-2xl mx-auto mb-8"
            >
              Explore our curated collection of historical artifacts from around the world
            </motion.p>

            {/* Search Box */}
            <motion.div variants={searchVariants} initial="hidden" animate="visible" className="max-w-md mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiSearch className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="block w-full pl-10 pr-10 py-3 border border-slate-300 rounded-lg bg-white text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                  placeholder="Search artifacts, categories, locations..."
                />
                <AnimatePresence>
                  {searchTerm && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                      onClick={clearSearch}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <HiX className="h-5 w-5 text-slate-400 hover:text-slate-600 transition-colors" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Search Results Info */}
      <AnimatePresence>
        {searchTerm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="container mx-auto px-4 py-4"
          >
            <div className="text-center">
              <p className="text-slate-600">
                {filteredArtifacts.length > 0 ? (
                  <>
                    Found <span className="font-semibold text-amber-600">{filteredArtifacts.length}</span> artifact
                    {filteredArtifacts.length !== 1 ? "s" : ""} matching "{searchTerm}"
                  </>
                ) : (
                  <>
                    No artifacts found matching "<span className="font-semibold">{searchTerm}</span>"
                  </>
                )}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Artifacts Grid */}
      <div className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {filteredArtifacts.length > 0 ? (
            <motion.div key="artifacts-grid" initial="hidden" animate="visible" variants={containerVariants}>
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                variants={containerVariants}
              >
                {filteredArtifacts.map((artifact, index) => (
                  <motion.div key={artifact.id} variants={itemVariants} custom={index}>
                    <Card artifact={artifact} />
                  </motion.div>
                ))}
              </motion.div>

              {/* Load More Button - Only show if not searching */}
              {!searchTerm && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  className="text-center mt-12"
                >
                  <button className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                    Load More Artifacts
                  </button>
                </motion.div>
              )}
            </motion.div>
          ) : (
            /* No Results Message */
            <motion.div
              key="no-results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="text-center py-16"
            >
              <div className="max-w-md mx-auto">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <HiSearch className="mx-auto h-16 w-16 text-slate-400 mb-4" />
                </motion.div>
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-xl font-semibold text-slate-600 mb-2"
                >
                  No artifacts found
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-slate-500 mb-6"
                >
                  Try adjusting your search terms or browse all artifacts.
                </motion.p>
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearSearch}
                  className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Clear Search
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Stats Section - Only show when not searching or when search has results */}
      <AnimatePresence>
        {(!searchTerm || filteredArtifacts.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white border-t border-slate-200 mt-16"
          >
            <div className="container mx-auto px-4 py-12">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
              >
                <motion.div variants={itemVariants}>
                  <div className="text-3xl font-bold text-amber-600 mb-2">
                    {searchTerm ? filteredArtifacts.length : artifacts.length}
                  </div>
                  <div className="text-slate-600">{searchTerm ? "Found" : "Total"} Artifacts</div>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <div className="text-3xl font-bold text-amber-600 mb-2">
                    {(searchTerm ? filteredArtifacts : artifacts)
                      .reduce((sum, artifact) => sum + artifact.likes, 0)
                      .toLocaleString()}
                  </div>
                  <div className="text-slate-600">Total Likes</div>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <div className="text-3xl font-bold text-amber-600 mb-2">
                    {new Set((searchTerm ? filteredArtifacts : artifacts).map((a) => a.category)).size}
                  </div>
                  <div className="text-slate-600">Categories</div>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <div className="text-3xl font-bold text-amber-600 mb-2">
                    {new Set((searchTerm ? filteredArtifacts : artifacts).map((a) => a.presentLocation)).size}
                  </div>
                  <div className="text-slate-600">Locations</div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
