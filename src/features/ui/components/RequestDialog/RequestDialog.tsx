"use client";

import { DropoffAddressForm } from "@/features/Dropoff/components/DropoffAddressForm";

import { DropoffPersonalDetailForm } from "@/features/Dropoff/components/DropoffPersonalDetailForm";
import { DropoffsInfo } from "@/features/Dropoff/components/DropoffsInfo";
import { PackageDetailForm } from "@/features/Dropoff/components/PackageDetailForm";
import { SuccessCard } from "@/features/Dropoff/components/SuccessCard";
import { PickupAddressForm } from "@/features/Pickup/components/PickupAddressForm";
import { PickupDateForm } from "@/features/Pickup/components/PickupDateForm";
import { PickupPersonalDetailForm } from "@/features/Pickup/components/PickupPersonalDetailForm";
import { Button } from "@/features/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/features/ui/dialog";
import { FormStepType } from "@/types";
import { useEffect, useState } from "react";
import { LuBox, LuChevronLeft, LuTruck } from "react-icons/lu";

export const RequestDialog = (props: FormStepType) => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://sandbox.sendstack.africa/api/v1/locations",
          {
            headers: {
              app_id: "0273264",
              app_secret: "CV5KFQ1ND243N66SPCCXD3W633V27K5K",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setLocations(jsonData.data[0].locals);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <div className="flex items-center gap-2">
            <LuBox className="w-6 h-6" />
            <span>Send Package</span>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-screen box-border hover:overflow-y-auto dark:text-slate-50">
        {props.formStep && props.formStep > 1 && (
          <Button
            variant={"ghost"}
            size={"icon"}
            onClick={() =>
              props.onStepChange &&
              props.onStepChange(props.formStep ? props.formStep - 1 : 1)
            }
            className="absolute left-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-slate-100 data-[state=open]:text-slate-500 dark:ring-offset-slate-950 dark:focus:ring-slate-800 dark:data-[state=open]:bg-slate-800 dark:data-[state=open]:text-slate-400"
          >
            <LuChevronLeft className="w-4 h-4" />
          </Button>
        )}
        <DialogHeader>
          <DialogTitle className="flex justify-center">
            <div className="flex p-1 border rounded-3xl">
              <Button
                variant={
                  props.formStep && props.formStep < 4 ? "default" : "ghost"
                }
                className="flex items-center gap-2 px-4 cursor-pointer h-9 rounded-3xl"
                onClick={() => props.onStepChange && props.onStepChange(1)}
              >
                <LuBox className="w-4 h-4" />
                <span className="text-sm">Pickup</span>
              </Button>
              <Button
                variant={
                  props.formStep && props.formStep > 3 ? "default" : "ghost"
                }
                className="flex items-center gap-2 px-4 h-9 rounded-3xl"
                onClick={() => props.onStepChange && props.onStepChange(4)}
              >
                <LuTruck className="w-4 h-4" />
                <span className="text-sm">Dropoff</span>
              </Button>
            </div>
          </DialogTitle>
          <DialogDescription className="text-lg font-medium text-center text-slate-900">
            {props.formStep === 1 && "Sender details"}
            {props.formStep === 2 && "Pickup address"}
            {props.formStep === 3 && "Pickup date"}
            {props.formStep === 4 && "Receiver details"}
            {props.formStep === 5 && "Dropoff address"}
            {props.formStep === 6 && "Dropoff Item details"}
            {props.formStep === 7 && "Result"}
          </DialogDescription>
        </DialogHeader>
        {props.formStep === 1 && (
          <PickupPersonalDetailForm onNext={props.onNext} />
        )}
        {props.formStep === 2 && (
          <PickupAddressForm
            onPrev={props.onPrev}
            onNext={props.onNext}
            locations={locations}
          />
        )}
        {props.formStep === 3 && (
          <PickupDateForm onPrev={props.onPrev} onNext={props.onNext} />
        )}
        {props.formStep === 4 && (
          <DropoffPersonalDetailForm
            onPrev={props.onPrev}
            onNext={props.onNext}
          />
        )}
        {props.formStep === 5 && (
          <DropoffAddressForm
            onPrev={props.onPrev}
            onNext={props.onNext}
            locations={locations}
          />
        )}
        {props.formStep === 6 && <PackageDetailForm onNext={props.onNext} />}
        {props.formStep === 7 && (
          <DropoffsInfo
            onNext={props.onNext}
            onStepChange={props.onStepChange}
          />
        )}

        {props.formStep === 8 && (
          <SuccessCard onStepChange={props.onStepChange} />
        )}
      </DialogContent>
    </Dialog>
  );
};
