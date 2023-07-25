import boxes from "@/assets/boxes.png";
import { Button } from "@/features/ui/button";
import Image from "next/image";
import { LuCheck } from "react-icons/lu";

export const SuccessCard = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="p-2 mb-4 rounded-full bg-primary/10">
        <LuCheck className="w-8 h-8 stroke-[3px] stroke-primary" />
      </div>
      <h1 className="text-2xl font-semibold text-center text-slate-800">
        Your Request Has Been Created
      </h1>
      <Image src={boxes} alt="success card illustration" className="mt-8" />
      <p className="mt-4 text-sm text-center text-slate-500">
        Waiting for a rider to accept your request and deliver your package
      </p>
      <Button className="w-full mt-8">Sounds Good</Button>
    </div>
  );
};
