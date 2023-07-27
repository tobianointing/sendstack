import axios from "@/services/axios";
import { AuthModel, Drop, Pickup } from "@/types";

export const fetchEstimatedPrice = async (
  pickup: Pickup,
  drop: Drop,
  headers: AuthModel
) => {
  try {
    const response = await axios.post(
      "/deliveries/price",
      {
        pickupCode: pickup.locationCode,
        dropoffCode: drop.locationCode,
        pickupDate: pickup.pickupDate,
      },

      {
        headers: {
          app_id: headers.app_id,
          app_secret: headers.app_secret,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status == 401) {
      return error.response.data;
    }
    console.log(error);
    return;
  }
};
