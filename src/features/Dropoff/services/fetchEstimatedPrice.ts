import { DropLocation, Pickup } from "@/types";

export const fetchEstimatedPrice = async (
  pickup_details: Pickup,
  dropoff_details: DropLocation
) => {
  console.log("pickup_details", pickup_details);
  console.log("dropoff_details", dropoff_details);
  try {
    const response = await fetch(
      "https://sandbox.sendstack.africa/api/v1/deliveries/price",
      {
        headers: {
          app_id: "0273264",
          app_secret: "CV5KFQ1ND243N66SPCCXD3W633V27K5K",
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          pickupCode: pickup_details.locationCode,
          dropoffCode: dropoff_details.locationCode,
          pickupDate: pickup_details.pickupDate,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
