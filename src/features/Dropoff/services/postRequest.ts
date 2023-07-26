import { Drop, Pickup } from "@/types";

type PostRequestType = {
  pickup: Pickup;
  drops: Drop[];
};

export const postRequest = async (data: PostRequestType) => {
  try {
    const response = await fetch(
      "https://sandbox.sendstack.africa/api/v1/deliveries",
      {
        headers: {
          app_id: "0273264",
          app_secret: "CV5KFQ1ND243N66SPCCXD3W633V27K5K",
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );

    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
