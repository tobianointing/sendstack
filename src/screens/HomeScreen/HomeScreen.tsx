"use client";

import { RequestDialog } from "@/features/ui/components/RequestDialog";
import Image from "next/image";
import { useState } from "react";

export const HomeScreen = () => {
  const [formStep, setFormStep] = useState(9);

  const handleNext = () => {
    setFormStep(formStep + 1);
  };

  const handleBack = () => {
    setFormStep(formStep - 1);
  };

  const handleStepChange = (step: number) => {
    setFormStep(step);
  };

  return (
    <>
      <Image
        src={"/sammy-line-delivery.gif"}
        width={400}
        height={300}
        alt="Home banner"
      />
      <RequestDialog
        formStep={formStep}
        onNext={handleNext}
        onPrev={handleBack}
        onStepChange={handleStepChange}
      />
    </>
  );
};
