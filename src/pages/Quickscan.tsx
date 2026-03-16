import { useState, useCallback, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import QuickscanIntro from "@/components/quickscan/QuickscanIntro";
import QuickscanQuestionComponent from "@/components/quickscan/QuickscanQuestion";
import QuickscanProgress from "@/components/quickscan/QuickscanProgress";
import QuickscanResults from "@/components/quickscan/QuickscanResults";
import {
  allQuestions,
  TOTAL_QUESTIONS,
  calculateScores,
  extractSnapshot,
} from "@/data/diagnoseData";

type Phase = "intro" | "questions" | "results";

// Debug mock answers to skip straight to results via ?debug=results
const DEBUG_ANSWERS: Record<number, string> = {
  1: '€3–10 mln', 2: '25–50', 3: 'Eigenaar-ondernemer', 4: 'Gezonde winst', 5: '3–5 jaar',
  6: '4', 7: '3', 8: '3', 9: '2', 10: '4',
  11: '3', 12: '4', 13: '2', 14: '3', 15: '4',
  16: '2', 17: '3', 18: '2', 19: '3', 20: '4',
};

const Quickscan = () => {
  const [searchParams] = useSearchParams();
  const isDebugResults = searchParams.get("debug") === "results";

  const [phase, setPhase] = useState<Phase>(isDebugResults ? "results" : "intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>(isDebugResults ? DEBUG_ANSWERS : {});

  const handleStart = useCallback(() => {
    setPhase("questions");
    setCurrentIndex(0);
  }, []);

  const handleSelect = useCallback(
    (value: string) => {
      setAnswers((prev) => ({ ...prev, [allQuestions[currentIndex].id]: value }));
    },
    [currentIndex]
  );

  const handleNext = useCallback(() => {
    if (currentIndex === TOTAL_QUESTIONS - 1) {
      setPhase("results");
    } else {
      setCurrentIndex((i) => i + 1);
    }
  }, [currentIndex]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  }, [currentIndex]);

  const currentQuestion = allQuestions[currentIndex];
  const selectedValue = answers[currentQuestion?.id];
  const scores = phase === "results" ? calculateScores(answers) : null;
  const snapshot = phase === "results" ? extractSnapshot(answers) : null;

  return (
    <PageLayout>
      <Helmet>
        <title>Exit Readiness Quickscan | Propasso</title>
        <meta
          name="description"
          content="Ontdek in 5 minuten hoe goed uw bedrijf en u persoonlijk voorbereid zijn op een toekomstige overdracht. Gratis quickscan met directe resultaten."
        />
      </Helmet>

      {phase === "intro" && <QuickscanIntro onStart={handleStart} />}

      {phase === "questions" && (
        <section className="py-12 md:py-20 min-h-[60vh] flex flex-col items-center justify-center">
          <div className="container px-4">
            <QuickscanProgress currentQuestion={currentIndex} />
            <QuickscanQuestionComponent
              question={currentQuestion}
              currentIndex={currentIndex}
              selectedValue={selectedValue}
              onSelect={handleSelect}
              onNext={handleNext}
              onPrev={handlePrev}
              canGoBack={currentIndex > 0}
              isLast={currentIndex === TOTAL_QUESTIONS - 1}
            />
          </div>
        </section>
      )}

      {phase === "results" && scores && snapshot && (
        <QuickscanResults scores={scores} snapshot={snapshot} answers={answers} />
      )}
    </PageLayout>
  );
};

export default Quickscan;
