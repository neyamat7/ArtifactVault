import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { HiChevronRight, HiHeart } from "react-icons/hi";
import { Link } from "react-router";
import Button from "../Button/Button";
import Card from "../Card/Card";

export default function Featured() {
  const [featured, setFeatured] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchFeaturedArtifacts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "https://server-alpha-livid.vercel.app/artifacts/featured"
        );
        setFeatured(response.data);
      } catch (error) {
        console.error("Error fetching featured artifacts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFeaturedArtifacts();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-700 text-xl">
            Loading featured artifacts...
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50">
     

      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center rounded-full px-4 py-2 text-amber-800 text-sm font-medium mb-4 bg-gradient-to-r from-amber-100 to-amber-200">
            <HiHeart className="mr-2 h-4 w-4" />
            Most Loved Artifacts
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Featured <span className="text-amber-600">Discoveries</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Explore our community's most beloved historical treasures, ranked by
            popularity and historical significance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((artifact) => (
            <motion.div
              key={artifact._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Card artifact={artifact} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <Link to="/artifacts">
            <Button
              size="lg"
              className="px-12 py-3 text-lg font-semibold shadow-xl hover:shadow-2xl cursor-pointer"
            >
              See All Artifacts
              <HiChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
