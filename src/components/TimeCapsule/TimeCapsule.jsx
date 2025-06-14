import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { HiClock, HiGlobeAlt, HiSparkles } from "react-icons/hi";
import { timelineData } from "../../data/timelineData";
import Button from "../Button/Button";

export default function TimeCapsule() {
  const [selectedPeriod, setSelectedPeriod] = useState(0);
  console.log(selectedPeriod);

  return (
    <section className="py-20 text-white bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center rounded-full px-4 py-2 text-amber-400 text-sm font-medium mb-4 bg-amber-600/20 border border-amber-600/30">
            <HiClock className="mr-2 h-4 w-4" />
            Time Capsule Explorer
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Journey Through <span className="text-amber-400">Time</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Explore artifacts by historical periods and discover how
            civilizations evolved across millennia.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Timeline Navigation */}
          <div className="space-y-4">
            {timelineData.map((period, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div
                  className={`rounded-lg border border-slate-200 shadow-sm cursor-pointer transition-all duration-300 ${
                    selectedPeriod === index ? "shadow-xl" : ""
                  }  ${
                    selectedPeriod === index
                      ? "bg-amber-500/20 border-amber-500/50 shadow-xl"
                      : "bg-slate-800/50 border-transparent"
                  }`}
                  onClick={() => setSelectedPeriod(index)}
                >
                  <div className="p-6">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl bg-gradient-to-r ${period.color}`}
                      >
                        {period.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-amber-400 font-bold">
                            {period.period}
                          </span>
                          <span className="text-slate-400">•</span>
                          <span className="text-slate-300 text-sm">
                            {period.civilization}
                          </span>
                        </div>
                        <h3 className="text-white font-semibold mb-1">
                          {period.title}
                        </h3>
                        <p className="text-slate-400 text-sm">
                          {period.artifacts} artifacts
                        </p>
                      </div>
                      {selectedPeriod === index && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-3 h-3 rounded-full bg-amber-400"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Selected Period Details */}
          <div className="lg:pl-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedPeriod}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
                className="backdrop-blur-sm rounded-2xl p-8 bg-slate-800/80 border border-slate-700/50"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl bg-gradient-to-r ${timelineData[selectedPeriod].color}`}
                  >
                    {timelineData[selectedPeriod].icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      {timelineData[selectedPeriod].title}
                    </h3>
                    <p className="text-amber-400 font-medium">
                      {timelineData[selectedPeriod].period} •{" "}
                      {timelineData[selectedPeriod].civilization}
                    </p>
                  </div>
                </div>

                <p className="text-slate-300 text-lg leading-relaxed mb-6">
                  {timelineData[selectedPeriod].description}
                </p>

                <div className="flex items-center gap-6 mb-6">
                  <div className="flex items-center gap-2">
                    <HiGlobeAlt className="h-5 w-5 text-amber-400" />
                    <span className="text-slate-300">
                      {timelineData[selectedPeriod].artifacts} Artifacts
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <HiSparkles className="h-5 w-5 text-amber-400" />
                    <span className="text-slate-300">Interactive Timeline</span>
                  </div>
                </div>

                <Button>
                  Explore {timelineData[selectedPeriod].civilization}
                </Button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
