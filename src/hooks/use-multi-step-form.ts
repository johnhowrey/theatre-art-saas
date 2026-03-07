"use client";

import { useState, useCallback } from "react";

export function useMultiStepForm(totalSteps: number) {
  const [currentStep, setCurrentStep] = useState(0);

  const goToNext = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
  }, [totalSteps]);

  const goToPrev = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const goToStep = useCallback(
    (step: number) => {
      if (step >= 0 && step < totalSteps) {
        setCurrentStep(step);
      }
    },
    [totalSteps]
  );

  return {
    currentStep,
    totalSteps,
    progress: ((currentStep + 1) / totalSteps) * 100,
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === totalSteps - 1,
    goToNext,
    goToPrev,
    goToStep,
  };
}
