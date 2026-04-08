import { useState, useCallback } from "react";
import SEO from "@/components/SEO";
import { useSearchParams } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import QuickscanIntro from "@/components/quickscan/QuickscanIntro";
import QuickscanQuestionComponent from "@/components/quickscan/QuickscanQuestion";
import QuickscanProgress from "@/components/quickscan/QuickscanProgress";
import QuickscanResults from "@/components/quickscan/QuickscanResults";
import SectionTransition from "@/components/quickscan/SectionTransition";
import {
  allQuestions,
  TOTAL_QUESTIONS,
  calculateScores,
  extractSnapshot,
  sectionIntros,
  type QuestionCategory,
} from "@/data/diagnoseData";
import { pushEvent } from "@/lib/tracking";

type Phase = "intro" | "questions" | "results";

// IDs that start a new section → show transition before them
const SECTION_FIRST_IDS: Record<number, QuestionCategory> = {
  6: "attractiveness",
  11: "readiness",
  16: "owner",
  1: "snapshot",
};

// Debug mock answers to skip straight to results via ?debug=results
const DEBUG_ANSWERS: Record<number, string> = {
  1: "€3–10 mln",
  2: "Goed winstgevend met gezonde marges",
  3: "3–5 jaar",
  6: "4",
  7: "3",
  8: "3",
  9: "2",
  10: "4",
  11: "3",
  12: "4",
  13: "2",
  14: "3",
  15: "4",
  16: "2",
  17: "3",
  18: "2",
  19: "3",
  20: "4",
};

// Helper: get section info for a question index
function getSectionInfo(questionIndex: number) {
  const q = allQuestions[questionIndex];
  if (!q) return { category: "snapshot" as QuestionCategory, label: "", questionInSection: 1, sectionTotal: 3 };

  const category = q.category;
  const sectionQuestions = allQuestions.filter((sq) => sq.category === category);
  const questionInSection = sectionQuestions.findIndex((sq) => sq.id === q.id) + 1;
  const sectionTotal = sectionQuestions.length;
  const intro = sectionIntros[category];
  const label = intro?.title || "";

  return { category, label, questionInSection, sectionTotal };
}

const Quickscan = () => {
  const [searchParams] = useSearchParams();
  const isDebugResults = searchParams.get("debug") === "results";

  const [phase, setPhase] = useState<Phase>(isDebugResults ? "results" : "intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>(isDebugResults ? DEBUG_ANSWERS : {});
  const [showTransition, setShowTransition] = useState(true); // Start with transition for first section

  const handleStart = useCallback(() => {
    setPhase("questions");
    setCurrentIndex(0);
    setShowTransition(true); // Show first section transition
    window.scrollTo({ top: 0, behavior: "smooth" });
    pushEvent("quickscan_start", { event_source: "quickscan" });
  }, []);

  const handleSelect = useCallback(
    (value: string) => {
      setAnswers((prev) => ({ ...prev, [allQuestions[currentIndex].id]: value }));
    },
    [currentIndex],
  );

  const handleNext = useCallback(() => {
    if (currentIndex === TOTAL_QUESTIONS - 1) {
      setPhase("results");
      pushEvent("quickscan_complete", { event_source: "quickscan" });
    } else {
      const nextIndex = currentIndex + 1;
      const nextQuestion = allQuestions[nextIndex];
      // Check if next question starts a new section
      if (SECTION_FIRST_IDS[nextQuestion.id] !== undefined) {
        setShowTransition(true);
      }
      setCurrentIndex(nextIndex);
    }
  }, [currentIndex]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setShowTransition(false); // Never show transition when going back
      setCurrentIndex((i) => i - 1);
    }
  }, [currentIndex]);

  const handleTransitionContinue = useCallback(() => {
    setShowTransition(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const currentQuestion = allQuestions[currentIndex];
  const selectedValue = answers[currentQuestion?.id];
  const scores = phase === "results" ? calculateScores(answers) : null;
  const snapshot = phase === "results" ? extractSnapshot(answers) : null;

  // Section info for progress bar
  const sectionInfo = getSectionInfo(currentIndex);
  const answeredCount = Object.keys(answers).length;

  // Determine if we should show a transition screen
  const isTransitionScreen =
    phase === "questions" &&
    showTransition &&
    SECTION_FIRST_IDS[currentQuestion?.id] !== undefined;

  // Get transition data
  const transitionCategory = isTransitionScreen ? SECTION_FIRST_IDS[currentQuestion.id] : null;
  const transitionData = transitionCategory ? sectionIntros[transitionCategory] : null;
  const isFirstTransition = transitionCategory === "attractiveness";

  return (
    <PageLayout>
      <SEO
        title="Exit Readiness Quickscan"
        description="Ontdek in 4 minuten hoe goed jouw bedrijf en jij persoonlijk voorbereid zijn op een bedrijfsoverdracht. Gratis, direct resultaten en tips."
        canonical="https://propasso.nl/quickscan"
        ogTitle="Exit Readiness Quickscan | Propasso"
        ogDescription="Ontdek in 4 minuten hoe goed jouw bedrijf en jij persoonlijk voorbereid zijn op een bedrijfsoverdracht. Gratis, direct resultaten en tips."
        ogType="website"
      />

      {phase === "intro" && <QuickscanIntro onStart={handleStart} />}

      {phase === "questions" && (
        <section className="py-12 md:py-20 min-h-[60vh] flex flex-col items-center justify-center">
          <div className="container px-4">
            <QuickscanProgress
              answeredCount={answeredCount}
              sectionLabel={transitionData?.title || sectionInfo.label}
              sectionQuestionIndex={isTransitionScreen ? undefined : sectionInfo.questionInSection}
              sectionQuestionTotal={isTransitionScreen ? undefined : sectionInfo.sectionTotal}
              isTransition={isTransitionScreen}
            />

            {isTransitionScreen && transitionData ? (
              <SectionTransition
                title={transitionData.title}
                intro={transitionData.intro}
                isFirst={isFirstTransition}
                onContinue={handleTransitionContinue}
              />
            ) : (
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
            )}
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
