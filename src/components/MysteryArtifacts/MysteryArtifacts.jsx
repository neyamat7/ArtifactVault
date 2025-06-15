import { motion } from "framer-motion";
import {
  HiChat,
  HiEye,
  HiLightBulb,
  HiQuestionMarkCircle,
} from "react-icons/hi";
import { mysteryArtifacts } from "../../data/mysteryArtifactsData";
import Badge from "../Badge/Badge";
import Button from "../Button/Button";

const getStatusStyle = (status) => {
  const baseClasses = "border rounded px-2 py-1 text-sm font-medium";

  switch (status) {
    case "Unsolved":
      return `${baseClasses} bg-red-500/50 text-white border-red-500/30`;
    case "Debated":
      return `${baseClasses} bg-amber-500 text-white border-amber-500/30`;
    case "Partially Solved":
      return `${baseClasses} bg-blue-500/80 text-white border-blue-500/30`;
    default:
      return `${baseClasses} bg-slate-500/70 text-white border-slate-500/30`;
  }
};

export default function MysteryArtifacts() {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center rounded-full px-4 py-2 text-purple-800 text-sm font-medium mb-4 bg-gradient-to-r from-purple-100 to-purple-200">
            <HiQuestionMarkCircle className="mr-2 h-4 w-4" />
            Unsolved Mysteries
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Mystery <span className="text-amber-600">Artifacts</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Explore artifacts that continue to puzzle researchers and
            archaeologists. Join the discussion and share your theories.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {mysteryArtifacts.map((artifact, index) => (
            <motion.div
              key={artifact.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.2 }}
              whileHover={{ y: -5 }}
            >
              <div className=" rounded-lg border border-slate-200 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-white group">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src={artifact.image}
                    alt={artifact.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge
                      variant="custom"
                      className={getStatusStyle(artifact.status)}
                    >
                      {artifact.status}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-xl mb-2">
                      {artifact.name}
                    </h3>
                  </div>
                </div>
                <div className="p-6 pb-3">
                  <p className="text-slate-600 line-clamp-2 leading-relaxed">
                    {artifact.mystery}
                  </p>
                </div>
                <div className="p-6 pt-0">
                  <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                    <div className="flex items-center gap-1">
                      <HiLightBulb className="h-4 w-4" />
                      <span>{artifact.theories} theories</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <HiChat className="h-4 w-4" />
                      <span>{artifact.discussions} discussions</span>
                    </div>
                  </div>
                  <Button variant="secondary" className="w-full">
                    <HiEye className="mr-2 h-4 w-4" />
                    Investigate Mystery
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl p-8 text-center bg-gradient-to-r from-amber-100 to-amber-200"
        >
          <HiQuestionMarkCircle className="h-16 w-16 text-amber-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-slate-800 mb-2">
            Have a Theory?
          </h3>
          <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
            Join our community of researchers and amateur archaeologists. Share
            your insights and help solve these ancient mysteries.
          </p>
          <Button size="lg">Join the Discussion</Button>
        </motion.div>
      </div>
    </section>
  );
}
