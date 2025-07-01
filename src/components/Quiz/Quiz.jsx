import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { HiAcademicCap, HiCheck, HiRefresh, HiStar, HiX } from "react-icons/hi";
import { useNavigate } from "react-router";
import { quizQuestions } from "../../data/quizData";
import Button from "../Button/Button";
import Progress from "./Progress";

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const navigate = useNavigate();

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);

    if (answerIndex === quizQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizCompleted(false);
  };

  const progress =
    ((currentQuestion + (showResult ? 1 : 0)) / quizQuestions.length) * 100;

  if (quizCompleted) {
    return (
      <section className="py-20 bg-gradient-to-br from-amber-100 to-amber-200 dark:from-slate-700 dark:to-slate-800">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm  dark:bg-slate-800 dark:border-slate-700  ">
              <div className="p-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  <HiStar className="h-20 w-20 text-amber-600 mx-auto mb-6" />
                </motion.div>
                <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-300 mb-4">
                  Quiz Complete!
                </h2>
                <p className="text-xl text-slate-600 dark:text-slate-300 mb-6">
                  You scored{" "}
                  <span className="font-bold text-amber-600">{score}</span> out
                  of <span className="font-bold">{quizQuestions.length}</span>
                </p>
                <div className="mb-8">
                  {score === quizQuestions.length && (
                    <p className="text-green-600 font-semibold">
                      Perfect score! You're a true artifact expert! 🎉
                    </p>
                  )}
                  {score >= quizQuestions.length / 2 &&
                    score < quizQuestions.length && (
                      <p className="text-blue-600 font-semibold">
                        Great job! You know your artifacts well! 👏
                      </p>
                    )}
                  {score < quizQuestions.length / 2 && (
                    <p className="text-amber-600 font-semibold">
                      Keep exploring to learn more about these fascinating
                      artifacts! 📚
                    </p>
                  )}
                </div>
                <div className="flex gap-4 justify-center">
                  <Button onClick={resetQuiz}>
                    <HiRefresh className="mr-2 h-4 w-4" />
                    Try Again
                  </Button>
                  <Button
                    onClick={() => navigate("/artifacts")}
                    variant="outline"
                    className="dark:text-slate-400"
                  >
                    Explore More Artifacts
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-amber-100 to-amber-200 dark:from-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center rounded-full px-4 py-2 text-amber-800 dark:text-amber-200 text-sm font-medium mb-4 bg-gradient-to-r from-amber-200 to-amber-300 dark:from-amber-800 dark:to-amber-700">
            <HiAcademicCap className="mr-2 h-4 w-4" />
            Test Your Knowledge
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-slate-100 mb-4">
            Historical <span className="text-amber-600">Quiz</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Challenge yourself with questions about famous historical artifacts
            and discoveries.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-xl">
            <div className="p-6 pb-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Question {currentQuestion + 1} of {quizQuestions.length}
                </span>
                <span className="text-sm font-medium text-amber-600">
                  Score: {score}/{quizQuestions.length}
                </span>
              </div>
              <Progress
                value={progress}
                className="h-2 bg-slate-200 dark:bg-slate-700"
              />
            </div>
            <div className="p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-8 leading-relaxed">
                    {quizQuestions[currentQuestion].question}
                  </h3>

                  <div className="grid gap-4 mb-8">
                    {quizQuestions[currentQuestion].options.map(
                      (option, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() =>
                            !showResult && handleAnswerSelect(index)
                          }
                          disabled={showResult}
                          className={`p-4 rounded-lg border-2 text-left transition-all duration-300 dark:text-slate-300 ${
                            showResult
                              ? index === quizQuestions[currentQuestion].correct
                                ? "border-green-500 bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-200"
                                : index === selectedAnswer
                                ? "border-red-500 bg-red-50 text-red-800 dark:bg-red-900 dark:text-red-200"
                                : "border-slate-200 bg-slate-50 text-slate-500 dark:border-slate-700 dark:bg-slate-700 dark:text-slate-400"
                              : "border-slate-200 hover:border-amber-300 hover:bg-amber-50 dark:border-slate-700 dark:hover:border-slate-500 dark:hover:bg-slate-900 cursor-pointer"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{option}</span>
                            {showResult && (
                              <div>
                                {index ===
                                  quizQuestions[currentQuestion].correct && (
                                  <HiCheck className="h-5 w-5 text-green-600" />
                                )}
                                {index === selectedAnswer &&
                                  index !==
                                    quizQuestions[currentQuestion].correct && (
                                    <HiX className="h-5 w-5 text-red-600 dark:text-red-300" />
                                  )}
                              </div>
                            )}
                          </div>
                        </motion.button>
                      )
                    )}
                  </div>

                  {showResult && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-slate-50 dark:bg-slate-700 rounded-lg p-6 mb-6"
                    >
                      <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">
                        Explanation:
                      </h4>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                        {quizQuestions[currentQuestion].explanation}
                      </p>
                    </motion.div>
                  )}

                  {showResult && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center"
                    >
                      <Button onClick={nextQuestion} size="lg" className="px-8">
                        {currentQuestion < quizQuestions.length - 1
                          ? "Next Question"
                          : "View Results"}
                      </Button>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
