import axios from "@/services/axios";
import { AuthModel, Drop, Pickup } from "@/types";

type PostRequestType = {
  pickup: Pickup;
  drops: Drop[];
};

export const postRequest = async (
  data: PostRequestType,
  headers: AuthModel
) => {
  try {
    const response = await axios.post("/deliveries", data, {
      headers: {
        app_id: headers.app_id,
        app_secret: headers.app_secret,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status == 401) {
      return error.response.data;
    }
    console.log(error);
    return;
  }
};
