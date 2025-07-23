"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, RotateCcw, Trophy, Timer, Target } from "lucide-react"

export default function CodingGame() {
  const [currentChallenge, setCurrentChallenge] = useState(0)
  const [userCode, setUserCode] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [gameStarted, setGameStarted] = useState(false)

  const challenges = [
    {
      id: 1,
      title: "Reverse a String",
      description: "Write a function that reverses a string",
      starterCode: 'function reverseString(str) {\n  // Your code here\n  return "";\n}',
      testInput: "hello",
      expectedOutput: "olleh",
      solution: 'function reverseString(str) {\n  return str.split("").reverse().join("");\n}',
      points: 10,
    },
    {
      id: 2,
      title: "Find Maximum",
      description: "Find the maximum number in an array",
      starterCode: "function findMax(arr) {\n  // Your code here\n  return 0;\n}",
      testInput: "[1, 5, 3, 9, 2]",
      expectedOutput: "9",
      solution: "function findMax(arr) {\n  return Math.max(...arr);\n}",
      points: 15,
    },
    {
      id: 3,
      title: "Palindrome Check",
      description: "Check if a string is a palindrome",
      starterCode: "function isPalindrome(str) {\n  // Your code here\n  return false;\n}",
      testInput: "racecar",
      expectedOutput: "true",
      solution: 'function isPalindrome(str) {\n  return str === str.split("").reverse().join("");\n}',
      points: 20,
    },
  ]

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (gameStarted && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
    } else if (timeLeft === 0) {
      setGameStarted(false)
    }
    return () => clearTimeout(timer)
  }, [gameStarted, timeLeft])

  useEffect(() => {
    setUserCode(challenges[currentChallenge].starterCode)
  }, [currentChallenge])

  const runCode = () => {
    setIsRunning(true)

    setTimeout(() => {
      try {
        const challenge = challenges[currentChallenge]

        // Simple code execution simulation
        if (userCode.includes("split") && userCode.includes("reverse") && challenge.id === 1) {
          setResult("✅ Correct! Output: " + challenge.expectedOutput)
          setScore(score + challenge.points)
        } else if (userCode.includes("Math.max") && challenge.id === 2) {
          setResult("✅ Correct! Output: " + challenge.expectedOutput)
          setScore(score + challenge.points)
        } else if (userCode.includes("split") && userCode.includes("reverse") && challenge.id === 3) {
          setResult("✅ Correct! Output: " + challenge.expectedOutput)
          setScore(score + challenge.points)
        } else {
          setResult("❌ Try again! Expected: " + challenge.expectedOutput)
        }
      } catch (error) {
        setResult("❌ Error in code execution")
      }

      setIsRunning(false)
    }, 1000)
  }

  const resetGame = () => {
    setCurrentChallenge(0)
    setUserCode(challenges[0].starterCode)
    setResult(null)
    setScore(0)
    setTimeLeft(60)
    setGameStarted(false)
  }

  const startGame = () => {
    setGameStarted(true)
    setTimeLeft(60)
    setScore(0)
    setCurrentChallenge(0)
    setUserCode(challenges[0].starterCode)
    setResult(null)
  }

  const nextChallenge = () => {
    if (currentChallenge < challenges.length - 1) {
      setCurrentChallenge(currentChallenge + 1)
      setResult(null)
    }
  }

  return (
    <section id="game" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">🎮 Coding Challenge Game</h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Test your coding skills with these interactive challenges!
          </p>
        </motion.div>

        <motion.div
          className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Game Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <Trophy className="w-6 h-6 mr-2" />
                  <span className="font-bold">Score: {score}</span>
                </div>
                <div className="flex items-center">
                  <Timer className="w-6 h-6 mr-2" />
                  <span className="font-bold">Time: {timeLeft}s</span>
                </div>
                <div className="flex items-center">
                  <Target className="w-6 h-6 mr-2" />
                  <span className="font-bold">
                    Challenge: {currentChallenge + 1}/{challenges.length}
                  </span>
                </div>
              </div>

              <div className="flex space-x-2">
                {!gameStarted ? (
                  <motion.button
                    onClick={startGame}
                    className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-semibold transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Start Game
                  </motion.button>
                ) : (
                  <motion.button
                    onClick={resetGame}
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <RotateCcw className="w-4 h-4 mr-2 inline" />
                    Reset
                  </motion.button>
                )}
              </div>
            </div>
          </div>

          {/* Game Content */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentChallenge}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {challenges[currentChallenge].title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{challenges[currentChallenge].description}</p>
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <strong>Test Input:</strong> {challenges[currentChallenge].testInput}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <strong>Expected Output:</strong> {challenges[currentChallenge].expectedOutput}
                    </p>
                    <p className="text-sm text-blue-600 dark:text-blue-400">
                      <strong>Points:</strong> {challenges[currentChallenge].points}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Code Editor */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Your Code:
                    </label>
                    <textarea
                      value={userCode}
                      onChange={(e) => setUserCode(e.target.value)}
                      className="w-full h-64 p-4 bg-gray-900 text-green-400 font-mono text-sm rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none resize-none"
                      placeholder="Write your code here..."
                      disabled={!gameStarted}
                    />

                    <div className="flex space-x-4 mt-4">
                      <motion.button
                        onClick={runCode}
                        disabled={!gameStarted || isRunning}
                        className="flex items-center bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200"
                        whileHover={{ scale: gameStarted ? 1.05 : 1 }}
                        whileTap={{ scale: gameStarted ? 0.95 : 1 }}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        {isRunning ? "Running..." : "Run Code"}
                      </motion.button>

                      {result && result.includes("✅") && currentChallenge < challenges.length - 1 && (
                        <motion.button
                          onClick={nextChallenge}
                          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                        >
                          Next Challenge
                        </motion.button>
                      )}
                    </div>
                  </div>

                  {/* Output/Result */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Output:</label>
                    <div className="w-full h-64 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 overflow-auto">
                      {isRunning ? (
                        <div className="flex items-center justify-center h-full">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                          <span className="ml-2 text-gray-600 dark:text-gray-400">Running code...</span>
                        </div>
                      ) : result ? (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`font-mono text-sm ${
                            result.includes("✅")
                              ? "text-green-600 dark:text-green-400"
                              : "text-red-600 dark:text-red-400"
                          }`}
                        >
                          {result}
                        </motion.div>
                      ) : (
                        <div className="text-gray-500 dark:text-gray-400 text-sm">
                          Click "Run Code" to see the output
                        </div>
                      )}
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4">
                      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                        <span>Progress</span>
                        <span>
                          {Math.round(
                            ((currentChallenge + (result?.includes("✅") ? 1 : 0)) / challenges.length) * 100,
                          )}
                          %
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <motion.div
                          className="bg-blue-500 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{
                            width: `${((currentChallenge + (result?.includes("✅") ? 1 : 0)) / challenges.length) * 100}%`,
                          }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Game Completion */}
            {currentChallenge === challenges.length - 1 && result?.includes("✅") && (
              <motion.div
                className="mt-8 text-center p-6 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl text-white"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl font-bold mb-2">🎉 Congratulations!</h3>
                <p className="text-lg">You've completed all challenges!</p>
                <p className="text-xl font-bold mt-2">Final Score: {score} points</p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
