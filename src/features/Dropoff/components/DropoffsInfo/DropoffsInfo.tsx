import { AuthContext } from "@/contexts/AuthProviders";
import { Button } from "@/features/ui/button";
import { useToast } from "@/features/ui/use-toast";
import { DropDefault, useRequestState } from "@/store";
import { FormStepType } from "@/types";
import format from "date-fns/format";
import { useContext, useState } from "react";
import { postRequest } from "../../services/postRequest";
import { DetailItemCard } from "../DetailItemCard";

export const DropoffsInfo = (props: FormStepType) => {
  const [isLoading, setIsLoading] = useState(false);
  const [pickup, estimatedPrices, drops, setDrop] = useRequestState((state) => [
    state.pickup,
    state.estimatedPrices,
    state.drops,
    state.setDrop,
  ]);

  const { auth } = useContext(AuthContext);

  const { toast } = useToast();

  const handleNewRequest = async () => {
    const data = {
      pickup: pickup,
      drops: drops,
    };

    setIsLoading(true);
    const jsonData = await postRequest(data, auth);

    console.log(jsonData);

    if (jsonData) {
      setIsLoading(false);
      if (jsonData?.status === true) {
        props.onStepChange && props.onStepChange(8);
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: jsonData?.message,
          duration: 10000,
        });
      }
    }
  };

  const handleAddDropoff = () => {
    setDrop(DropDefault);
    props.onStepChange && props.onStepChange(4);
  };

  return (
    <div className="space-y-4">
      {drops.map((item, index) => {
        const estimatedResult = estimatedPrices.find(
          ({ dropoffId }) => dropoffId === item.locationCode
        );

        const price = estimatedResult?.price;
        console.log(pickup.pickupDate);

        return (
          <div
            className="relative flex flex-col gap-2 p-3 border rounded-lg"
            key={item.locationCode}
          >
            <div className="absolute flex items-center justify-center w-6 h-6 text-sm text-white rounded-full right-4 top-3 bg-primary">
              {index + 1}
            </div>

            <DetailItemCard
              title={"Estimated Pickup window "}
              value={`${format(
                new Date(pickup.pickupDate),
                "iiii, MMM do"
              )}, from 8 am - 2 pm`}
            />
            <DetailItemCard
              title={"Estimated Dropoff window "}
              value={`${format(
                new Date(pickup.pickupDate),
                "iiii, MMM do"
              )}, from 2 pm - 7 pm`}
            />
            <DetailItemCard title={"Delivery Price "} value={`${price}`} />

            <DetailItemCard
              title={"Receiver Name "}
              value={item.recipientName}
            />
            <DetailItemCard
              title={"Receiver Phone Number "}
              value={item.recipientNumber}
            />
          </div>
        );
      })}

      <div className="flex gap-4">
        <Button
          variant={"outline"}
          className="w-full"
          type="button"
          onClick={handleAddDropoff}
        >
          Add Dropoff
        </Button>

        <Button
          className="w-full"
          type="button"
          onClick={handleNewRequest}
          disabled={isLoading}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
