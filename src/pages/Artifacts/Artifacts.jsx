import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { HiSearch, HiX } from "react-icons/hi";

// Icons
import { useEffect } from "react";
import Card from "../../components/Card/Card";
import useAuth from "../../context/AuthContext/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function Artifacts() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [artifacts, setArtifacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArtifacts = async () => {
      try {
        const searchParams = searchTerm ? `searchParams=${searchTerm}` : null;

        const response = await axiosSecure.get(`/artifacts?${searchParams}`);

        const data = response.data;
        console.log(data);
        setArtifacts(data);
      } catch (error) {
        console.error("Error fetching artifacts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtifacts();
  }, [searchTerm, user?.accessToken, axiosSecure]);

  // Clear search
  const clearSearch = () => {
    setSearchTerm("");
    // setFilteredArtifacts(artifacts);
  };

  // If loading, show a simple loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-amber-600 text-3xl"
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
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

            {/* Search Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="max-w-md mx-auto"
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
                {artifacts.length > 0 ? (
                  <>
                    Found{" "}
                    <span className="font-semibold text-amber-600">
                      {artifacts.length}
                    </span>{" "}
                    artifact
                    {artifacts.length !== 1 ? "s" : ""} matching "{searchTerm}"
                  </>
                ) : (
                  <>
                    No artifacts found matching "
                    <span className="font-semibold">{searchTerm}</span>"
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
          {artifacts.length > 0 ? (
            <motion.div
              key="artifacts-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {artifacts.map((artifact, index) => (
                  <motion.div
                    key={artifact._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group"
                  >
                    <Card artifact={artifact} />
                  </motion.div>
                ))}
              </div>

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
    </div>
  );
}
