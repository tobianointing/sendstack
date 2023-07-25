import { Button } from "@/features/ui/button";
import { useRequestState } from "@/store";
import format from "date-fns/format";
import { DetailItemCard } from "../DetailItemCard";

export const EstimateDetail = () => {
  const [pickup_details, dropoff_details, estimatedPrices] = useRequestState(
    (state) => [
      state.pickup_details,
      state.dropoff_details,
      state.estimatedPrices,
    ]
  );

  return (
    <div className="space-y-4">
      <div className="p-3 space-y-4 border rounded-lg">
        <DetailItemCard
          title={"Estimated Pickup window "}
          value={`${format(
            new Date(pickup_details.pickupDate),
            "iii, MMM eo"
          )}, from 8 am - 2 pm`}
        />
        <DetailItemCard
          title={"Estimated Dropoff window "}
          value={`${format(
            new Date(pickup_details.pickupDate),
            "iii, MMM eo"
          )}, from 2 pm - 7 pm`}
        />
        <DetailItemCard
          title={"Delivery Price "}
          value={`${estimatedPrices[0].price}`}
        />
      </div>

      <Button className="w-full" type="submit">
        Continue
      </Button>
    </div>
  );
};
