import { motion } from "framer-motion";
import { HiChevronRight, HiHeart } from "react-icons/hi";
import { Link } from "react-router";
import Button from "../Button/Button";
import Card from "../Card/Card";

const featuredArtifacts = [
  {
    id: 1,
    name: "Rosetta Stone",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "The key to deciphering Egyptian hieroglyphics, discovered in 1799 near the town of Rosetta.",
    likes: 2453,
    category: "Ancient Egypt",
  },
  {
    id: 2,
    name: "Antikythera Mechanism",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "Ancient Greek analog computer used to predict astronomical positions and eclipses.",
    likes: 1872,
    category: "Ancient Greece",
  },
  {
    id: 3,
    name: "Dead Sea Scrolls",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "Ancient Jewish religious manuscripts found in the Qumran Caves near the Dead Sea.",
    likes: 1654,
    category: "Ancient Judaism",
  },
  {
    id: 4,
    name: "Terracotta Army",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "Collection of terracotta sculptures depicting the armies of Qin Shi Huang, the first Emperor of China.",
    likes: 1432,
    category: "Ancient China",
  },
  {
    id: 5,
    name: "Nebra Sky Disc",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "Bronze Age disc featuring gold symbols representing astronomical phenomena and cosmic concepts.",
    likes: 1287,
    category: "Bronze Age",
  },
  {
    id: 6,
    name: "Baghdad Battery",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "Ancient clay jars containing copper cylinders and iron rods, possibly used as galvanic cells.",
    likes: 1156,
    category: "Ancient Mesopotamia",
  },
];

export default function Featured() {
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
          {featuredArtifacts.map((artifact, index) => (
            <motion.div
              key={artifact.id}
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
              className="px-12 py-3 text-lg font-semibold shadow-xl hover:shadow-2xl"
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
