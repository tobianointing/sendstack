import { Button } from "@/features/ui/button";
import { useRequestState } from "@/store";
import { FormStepType } from "@/types";
import format from "date-fns/format";
import { DetailItemCard } from "../DetailItemCard";

export const DropoffsInfo = (props: FormStepType) => {
  const [pickup_details, dropoff_details, estimatedPrices, dropoff_detail_all] =
    useRequestState((state) => [
      state.pickup_details,
      state.dropoff_details,
      state.estimatedPrices,
      state.dropoff_detail_all,
    ]);

  return (
    <div className="space-y-4">
      {dropoff_detail_all.map((item, index) => {
        const estimatedResult = estimatedPrices.find(
          ({ dropoffId }) => dropoffId === item.locationCode
        );

        const price = estimatedResult?.price;
        console.log(pickup_details.pickupDate);

        return (
          <div
            className="relative p-3 space-y-4 border rounded-lg"
            key={item.locationCode}
          >
            <div className="absolute flex items-center justify-center w-6 h-6 text-sm text-white rounded-full right-4 top-3 bg-primary">
              {index + 1}
            </div>
            <DetailItemCard
              title={"Estimated Pickup window "}
              value={`${format(
                new Date(pickup_details.pickupDate),
                "iiii, MMM do"
              )}, from 8 am - 2 pm`}
            />
            <DetailItemCard
              title={"Estimated Dropoff window "}
              value={`${format(
                new Date(pickup_details.pickupDate),
                "iiii, MMM do"
              )}, from 2 pm - 7 pm`}
            />
            <DetailItemCard
              title={"Delivery Price "}
              value={`${estimatedPrices[0].price}`}
            />
          </div>
        );
      })}

      <div className="flex gap-4">
        <Button
          variant={"outline"}
          className="w-full"
          type="button"
          onClick={() => props.onStepChange && props.onStepChange(4)}
        >
          Add Dropoff
        </Button>

        <Button className="w-full" type="button" onClick={props.onNext}>
          Continue
        </Button>
      </div>
    </div>
  );
};
