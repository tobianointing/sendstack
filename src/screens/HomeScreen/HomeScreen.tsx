"use client";

import { AuthContext } from "@/contexts/AuthProviders";
import { RequestDialog } from "@/features/ui/components/RequestDialog";
import { currencyFormatter } from "@/lib/utils";
import Image from "next/image";
import { useContext, useState } from "react";

export const HomeScreen = () => {
  const { auth } = useContext(AuthContext);

  const [formStep, setFormStep] = useState(1);

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
      <div className="flex flex-col items-start p-3 border rounded-lg dark:text-slate-50">
        <h1 className="text-sm text-center text-slate-800 dark:text-slate-50">
          Balance
        </h1>
        <p className="text-2xl font-semibold first-letter:font-bold first-letter:text-xs first-letter:mr-1 first-letter:text-primary">
          ₦{currencyFormatter(auth?.balance || 0)}
        </p>
      </div>
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
