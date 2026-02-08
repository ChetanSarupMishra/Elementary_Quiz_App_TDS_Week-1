"use client"

import { useState, useCallback } from "react"
import type { Question } from "@/lib/quiz-data"
import { CheckCircle2, XCircle, RotateCcw, ChevronRight, Trophy, Beaker } from "lucide-react"

export function QuizClient({ questions }: { questions: Question[] }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [quizComplete, setQuizComplete] = useState(false)
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(questions.length).fill(null)
  )

  const question = questions[currentQuestion]

  const handleAnswer = useCallback(
    (index: number) => {
      if (selectedAnswer !== null) return
      setSelectedAnswer(index)
      setShowResult(true)
      const newAnswers = [...answers]
      newAnswers[currentQuestion] = index
      setAnswers(newAnswers)
      if (index === question.correctAnswer) {
        setScore((prev) => prev + 1)
      }
    },
    [selectedAnswer, answers, currentQuestion, question.correctAnswer]
  )

  const handleNext = useCallback(() => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      setQuizComplete(true)
    }
  }, [currentQuestion, questions.length])

  const handleRestart = useCallback(() => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setQuizComplete(false)
    setAnswers(new Array(questions.length).fill(null))
  }, [questions.length])

  const getOptionClasses = (index: number) => {
    const base =
      "w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-200 font-medium text-sm md:text-base flex items-center gap-3"
    if (!showResult) {
      return `${base} border-border bg-card text-card-foreground hover:border-primary/50 hover:bg-primary/5 cursor-pointer`
    }
    if (index === question.correctAnswer) {
      return `${base} border-[hsl(var(--success))] bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]`
    }
    if (index === selectedAnswer && index !== question.correctAnswer) {
      return `${base} border-destructive bg-destructive/10 text-destructive`
    }
    return `${base} border-border bg-card text-muted-foreground opacity-50`
  }

  const optionLetters = ["A", "B", "C", "D", "E"]

  if (quizComplete) {
    const percentage = Math.round((score / questions.length) * 100)
    let message = ""
    if (percentage === 100) message = "Perfect score! You're a chemistry genius!"
    else if (percentage >= 80)
      message = "Excellent work! You really know your elements!"
    else if (percentage >= 60)
      message = "Good job! Keep studying the periodic table!"
    else if (percentage >= 40)
      message = "Not bad! A bit more practice and you'll ace it!"
    else message = "Keep learning! The periodic table has so much to offer!"

    return (
      <div className="flex flex-col items-center text-center gap-6 py-8">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
          <Trophy className="w-10 h-10 text-primary" />
        </div>
        <div>
          <h2 className="text-3xl font-bold font-heading text-foreground mb-2">
            Quiz Complete!
          </h2>
          <p className="text-muted-foreground text-lg">{message}</p>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-6xl font-bold text-primary font-heading">
            {score}
          </span>
          <span className="text-2xl text-muted-foreground font-heading">
            / {questions.length}
          </span>
        </div>
        <div className="w-full max-w-xs bg-muted rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-1000"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="text-muted-foreground">{percentage}% correct</p>

        <div className="w-full max-w-md mt-4 space-y-2">
          {questions.map((q, i) => {
            const correct = answers[i] === q.correctAnswer
            return (
              <div
                key={q.id}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm ${
                  correct
                    ? "bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]"
                    : "bg-destructive/10 text-destructive"
                }`}
              >
                {correct ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 shrink-0" />
                )}
                <span className="truncate">
                  Q{i + 1}: {q.question}
                </span>
              </div>
            )
          })}
        </div>

        <button
          type="button"
          onClick={handleRestart}
          className="mt-4 inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Progress */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span className="flex items-center gap-2">
          <Beaker className="w-4 h-4" />
          Question {currentQuestion + 1} of {questions.length}
        </span>
        <span className="font-semibold text-primary">
          Score: {score}/{currentQuestion + (showResult ? 1 : 0)}
        </span>
      </div>
      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500"
          style={{
            width: `${((currentQuestion + (showResult ? 1 : 0)) / questions.length) * 100}%`,
          }}
        />
      </div>

      {/* Question */}
      <div className="py-2">
        <h2 className="text-xl md:text-2xl font-bold text-foreground font-heading leading-relaxed">
          {question.question}
        </h2>
      </div>

      {/* Options */}
      <div className="flex flex-col gap-3" role="radiogroup" aria-label="Answer options">
        {question.options.map((option, index) => (
          <button
            key={option}
            type="button"
            onClick={() => handleAnswer(index)}
            disabled={showResult}
            className={getOptionClasses(index)}
            role="radio"
            aria-checked={selectedAnswer === index}
          >
            <span className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-xs font-bold shrink-0">
              {optionLetters[index]}
            </span>
            {option}
            {showResult && index === question.correctAnswer && (
              <CheckCircle2 className="w-5 h-5 ml-auto shrink-0" />
            )}
            {showResult &&
              index === selectedAnswer &&
              index !== question.correctAnswer && (
                <XCircle className="w-5 h-5 ml-auto shrink-0" />
              )}
          </button>
        ))}
      </div>

      {/* Explanation */}
      {showResult && (
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 mt-2">
          <p className="text-sm text-foreground leading-relaxed">
            <span className="font-semibold text-primary">Explanation: </span>
            {question.explanation}
          </p>
        </div>
      )}

      {/* Next button */}
      {showResult && (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleNext}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors"
          >
            {currentQuestion < questions.length - 1
              ? "Next Question"
              : "See Results"}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}
