import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { HiSearch, HiX } from "react-icons/hi";

// Icons
import { useEffect } from "react";
import Card from "../../components/Card/Card";
import Loading from "../../components/Loading/Loading";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import NoArtifactFound from "./NoArtifactFound";

export default function Artifacts() {
  const axiosSecure = useAxiosSecure();

  const [artifacts, setArtifacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArtifacts = async () => {
      try {
        const searchParams = searchTerm ? `searchParams=${searchTerm}` : null;

        const response = await axiosSecure.get(`/artifacts?${searchParams}`);

        const data = response.data;
        setArtifacts(data);
      } catch (error) {
        console.error("Error fetching artifacts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtifacts();
  }, [searchTerm, axiosSecure]);

  // Clear search
  const clearSearch = () => {
    setSearchTerm("");
  };

  // If loading, show a simple loading state
  if (isLoading) {
    return <Loading message="Unearthing treasures from the archives..." />;
  }

  const sortedArtifacts = [...artifacts].sort((a, b) => {
    if (sortOrder === "asc") {
      return Number(a.discoveredAt || 0) - Number(b.discoveredAt || 0);
    } else {
      return Number(b.discoveredAt || 0) - Number(a.discoveredAt || 0);
    }
  });

  return (
    <div className="min-h-screen bg-slate-100">
      <title>All Artifacts | ArtifactVault</title>

      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-slate-800 mb-4"
            >
              Discover <span className="text-amber-600">Artifacts</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-slate-600 max-w-2xl mx-auto mb-8"
            >
              Explore our curated collection of historical artifacts from around
              the world
            </motion.p>

            {/* Search and sort */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="container mx-auto flex flex-col gap-3 md:flex-row justify-between items-center"
            >
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiSearch className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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

              {/* Sort Dropdown */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="flex justify-center"
              >
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="border border-slate-300 rounded-lg px-4 py-2 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="desc">Newest First</option>
                  <option value="asc">Oldest First</option>
                </select>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Artifacts Grid */}
      <div className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait" exitBeforeEnter={false}>
          {sortedArtifacts.length > 0 ? (
            <motion.div
              key="artifacts-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedArtifacts.map((artifact, index) => (
                  <motion.div
                    key={artifact._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.2,
                      delay: index * 0.1,
                    }}
                    className="group"
                  >
                    <Card artifact={artifact} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            /* No Results Message */
            <motion.div
              key="no-results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="text-center py-16"
            >
              <NoArtifactFound />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
