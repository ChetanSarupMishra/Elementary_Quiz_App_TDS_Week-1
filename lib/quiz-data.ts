export interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number // index of correct answer
  explanation: string
}

export const questions: Question[] = [
  {
    id: 1,
    question: "Which element is first in the periodic table?",
    options: ["Hydrogen", "Helium", "Lithium", "Neon", "Carbon"],
    correctAnswer: 0,
    explanation:
      "Hydrogen (H) is the first element in the periodic table with atomic number 1. It is the lightest and most abundant element in the universe.",
  },
  {
    id: 2,
    question: "What is the chemical symbol for gold?",
    options: ["Go", "Gd", "Au", "Ag", "Gl"],
    correctAnswer: 2,
    explanation:
      "The chemical symbol for gold is Au, derived from the Latin word 'aurum' meaning 'shining dawn'.",
  },
  {
    id: 3,
    question: "Which element has the atomic number 6?",
    options: ["Nitrogen", "Oxygen", "Boron", "Carbon", "Helium"],
    correctAnswer: 3,
    explanation:
      "Carbon (C) has the atomic number 6. It is the basis of all organic chemistry and is found in all known life forms.",
  },
  {
    id: 4,
    question: "What is the most abundant element in Earth's atmosphere?",
    options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Argon", "Hydrogen"],
    correctAnswer: 2,
    explanation:
      "Nitrogen (N) makes up approximately 78% of Earth's atmosphere, followed by oxygen at about 21%.",
  },
  {
    id: 5,
    question: "Which noble gas is used in bright advertising signs?",
    options: ["Argon", "Helium", "Krypton", "Neon", "Xenon"],
    correctAnswer: 3,
    explanation:
      "Neon (Ne) produces a distinctive bright reddish-orange glow when used in discharge tubes, making it ideal for advertising signs.",
  },
  {
    id: 6,
    question: "What element does the symbol 'Fe' represent?",
    options: ["Fluorine", "Fermium", "Iron", "Francium", "Flerovium"],
    correctAnswer: 2,
    explanation:
      "Fe is the chemical symbol for Iron, derived from the Latin word 'ferrum'. Iron is the most commonly used metal on Earth.",
  },
  {
    id: 7,
    question: "Which element is essential for strong bones and teeth?",
    options: ["Potassium", "Sodium", "Calcium", "Magnesium", "Phosphorus"],
    correctAnswer: 2,
    explanation:
      "Calcium (Ca) is crucial for building and maintaining strong bones and teeth. About 99% of the body's calcium is stored in bones and teeth.",
  },
  {
    id: 8,
    question: "What is the heaviest naturally occurring element?",
    options: ["Plutonium", "Uranium", "Radium", "Thorium", "Lead"],
    correctAnswer: 1,
    explanation:
      "Uranium (U) with atomic number 92 is the heaviest naturally occurring element. It is used as fuel in nuclear reactors.",
  },
  {
    id: 9,
    question: "Which element is a liquid at room temperature (besides mercury)?",
    options: ["Gallium", "Cesium", "Bromine", "Francium", "Rubidium"],
    correctAnswer: 2,
    explanation:
      "Bromine (Br) is one of only two elements that are liquid at room temperature (the other being mercury). It is a reddish-brown liquid with a strong odor.",
  },
  {
    id: 10,
    question: "What is the lightest noble gas?",
    options: ["Neon", "Argon", "Helium", "Krypton", "Xenon"],
    correctAnswer: 2,
    explanation:
      "Helium (He) is the lightest noble gas with atomic number 2. It is the second most abundant element in the observable universe.",
  },
]
