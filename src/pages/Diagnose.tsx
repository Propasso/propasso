import { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/PageLayout";
import DiagnoseIntro from "@/components/diagnose/DiagnoseIntro";
import DiagnoseQuestionComponent from "@/components/diagnose/DiagnoseQuestion";
import DiagnoseProgress from "@/components/diagnose/DiagnoseProgress";
import DiagnoseResults from "@/components/diagnose/DiagnoseResults";
import {
  allQuestions,
  TOTAL_QUESTIONS,
  calculateScores,
  extractSnapshot,
} from "@/data/diagnoseData";

type Phase = "intro" | "questions" | "results";

const Diagnose = () => {
  const [phase, setPhase] = useState<Phase>("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

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
        <title>Exit Readiness Diagnose | Propasso</title>
        <meta
          name="description"
          content="Ontdek in 5 minuten hoe goed uw bedrijf en u persoonlijk voorbereid zijn op een toekomstige overdracht. Gratis diagnose met directe resultaten."
        />
      </Helmet>

      {phase === "intro" && <DiagnoseIntro onStart={handleStart} />}

      {phase === "questions" && (
        <section className="py-12 md:py-20 min-h-[60vh] flex flex-col items-center justify-center">
          <div className="container px-4">
            <DiagnoseProgress currentQuestion={currentIndex} />
            <DiagnoseQuestionComponent
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
        <DiagnoseResults scores={scores} snapshot={snapshot} answers={answers} />
      )}
    </PageLayout>
  );
};

export default Diagnose;
