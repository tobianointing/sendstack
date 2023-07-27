import { AuthModel } from "@/types";
import axios from "./axios";

class AuthService {
  async login(
    app_id: string,
    app_secret: string
  ): Promise<AuthModel | undefined> {
    try {
      const response = await axios.get("/wallet/balance", {
        headers: {
          "Content-Type": "application/json",
          app_id: app_id,
          app_secret: app_secret,
        },
      });

      console.log(response);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.status == 401) {
        return error.response.data;
      }
      console.log(error);
      return;
    }
  }
}

const authService = new AuthService();

export default authService;
