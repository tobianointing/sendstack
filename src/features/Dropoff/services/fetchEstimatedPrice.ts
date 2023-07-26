import { Drop, Pickup } from "@/types";

export const fetchEstimatedPrice = async (pickup: Pickup, drop: Drop) => {
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
          pickupCode: pickup.locationCode,
          dropoffCode: drop.locationCode,
          pickupDate: pickup.pickupDate,
        }),
      }
    );

    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
