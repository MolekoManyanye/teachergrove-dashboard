
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

// Mock quiz data
const quizQuestions = [
  {
    id: 1,
    number: 12,
    question: "Speciation occurs when",
    options: [
      {
        label: "A",
        text: "the gene pool of an existing species becomes too small to support a viable population."
      },
      {
        label: "B",
        text: "selection pressures cause significant changes to the allele frequencies of a population."
      },
      {
        label: "C",
        text: "genetic drift is no longer occurring within populations."
      },
      {
        label: "D",
        text: "gene flow is no longer occurring between populations."
      }
    ]
  },
  {
    id: 2,
    number: 13,
    question: "An error during DNA replication resulted in the following change to mRNA transcripts.",
    additionalContent: (
      <div className="my-4 border rounded-lg p-4 bg-gray-50">
        <table className="w-full text-sm">
          <tbody>
            <tr className="border-b">
              <td className="py-2">mRNA before</td>
              <td className="py-2 font-mono">AUGAAGUUUGGCAUC ... (continued)</td>
            </tr>
            <tr>
              <td className="py-2">mRNA after</td>
              <td className="py-2 font-mono">AUGAAGUUUGCAUCG ... (continued)</td>
            </tr>
          </tbody>
        </table>
      </div>
    ),
    question2: "The DNA replication error most likely involved",
    options: [
      { label: "A", text: "deletion of cytosine." },
      { label: "B", text: "insertion of guanine." },
      { label: "C", text: "substitution of uracil with guanine." },
      { label: "D", text: "substitution of guanine with cytosine." }
    ]
  }
];

const StudentAssessments = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleAnswerSelect = (questionId: number, answer: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const currentQuestion = quizQuestions[currentQuestionIndex];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card className="bg-white shadow-lg">
        <CardHeader className="border-b border-gray-100">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-serif">Biology Assessment</CardTitle>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-4 h-4" />
              <span className="text-sm">45:00 remaining</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Question Number */}
            <div className="text-lg font-serif font-bold border-b border-gray-200 pb-2">
              QUESTION {currentQuestion.number}
            </div>

            {/* Question Text */}
            <div className="text-gray-800 space-y-4">
              <p>{currentQuestion.question}</p>
              {currentQuestion.additionalContent}
              {currentQuestion.question2 && <p>{currentQuestion.question2}</p>}
            </div>

            {/* Options */}
            <div className="space-y-4 mt-6">
              {currentQuestion.options.map((option) => (
                <button
                  key={option.label}
                  onClick={() => handleAnswerSelect(currentQuestion.id, option.label)}
                  className={`w-full text-left p-4 rounded-lg border ${
                    selectedAnswers[currentQuestion.id] === option.label
                      ? "border-mint-600 bg-mint-50"
                      : "border-gray-200 hover:border-mint-600 hover:bg-gray-50"
                  } transition-colors`}
                >
                  <div className="flex gap-4">
                    <span className="font-serif text-gray-700">({option.label})</span>
                    <span className="text-gray-800">{option.text}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
          disabled={currentQuestionIndex === 0}
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        <div className="text-sm text-gray-600">
          Question {currentQuestionIndex + 1} of {quizQuestions.length}
        </div>
        <Button
          onClick={() => setCurrentQuestionIndex(prev => Math.min(quizQuestions.length - 1, prev + 1))}
          disabled={currentQuestionIndex === quizQuestions.length - 1}
          className="bg-mint-600 hover:bg-mint-700"
        >
          Next <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default StudentAssessments;
