import { questions } from "@/lib/quiz-data"
import { QuizClient } from "@/components/quiz-client"
import { Atom, FlaskConical, Sparkles } from "lucide-react"

export default function Page() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Atom className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground font-heading">
              Element Quiz
            </h1>
            <p className="text-xs text-muted-foreground">
              Test your chemistry knowledge
            </p>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-primary/5 border-b border-primary/10">
        <div className="max-w-3xl mx-auto px-4 py-8 md:py-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <FlaskConical className="w-4 h-4" />
            {questions.length} Questions
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground font-heading text-balance mb-3">
            The Periodic Table Challenge
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
            From hydrogen to uranium, see how well you know the building blocks
            of the universe. Each question tests a different aspect of chemical
            elements.
          </p>
        </div>
      </section>

      {/* Quiz Section */}
      <section className="flex-1 py-8 md:py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-card rounded-2xl border border-border shadow-sm p-6 md:p-8">
            <QuizClient questions={questions} />
          </div>
        </div>
      </section>

      {/* All Questions (server-rendered in HTML for SEO/accessibility) */}
      <section className="border-t border-border bg-card">
        <div className="max-w-3xl mx-auto px-4 py-12">
          <div className="flex items-center gap-2 mb-8">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-bold text-foreground font-heading">
              All Questions
            </h2>
          </div>
          <ol className="space-y-8">
            {questions.map((q) => (
              <li key={q.id} className="group">
                <div className="flex gap-4">
                  <span className="shrink-0 w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm font-bold flex items-center justify-center">
                    {q.id}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-3 leading-relaxed">
                      {q.question}
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                      {q.options.map((option, i) => (
                        <li
                          key={option}
                          className={`px-3 py-2 rounded-lg text-sm ${
                            i === q.correctAnswer
                              ? "bg-[hsl(var(--success))]/10 text-[hsl(var(--success))] font-medium border border-[hsl(var(--success))]/20"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {String.fromCharCode(65 + i)}. {option}
                          {i === q.correctAnswer && " \u2713"}
                        </li>
                      ))}
                    </ul>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {q.explanation}
                    </p>
                  </div>
                </div>
                {q.id < questions.length && (
                  <div className="border-b border-border mt-8" />
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-6">
        <div className="max-w-3xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            Element Quiz &mdash; Built to help you learn about the periodic
            table and chemical elements.
          </p>
        </div>
      </footer>
    </main>
  )
}
