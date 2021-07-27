import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import { navigate } from "../navigation/navigatorRef";
import jwt_decode from "jwt-decode";

/*
 ** Local:           http://localhost:5000/
 */
const api = axios.create({
  baseURL: "https://cronoz.herokuapp.com/",
});

api.interceptors.request.use(
  async (config) => {
    if (
      config.url &&
      !config.url.endsWith("login") &&
      !config.url.endsWith("refresh") &&
      !config.url.endsWith("sign_up")
    ) {
      const accessToken = await AsyncStorage.getItem("@Cronoz:accessToken");
      if (accessToken == null) return config;

      const decoded: any = jwt_decode(accessToken);
      const userTokenExpiration = new Date(decoded["exp"] * 1000 || 0);
      const today = new Date();
      if (today > userTokenExpiration) {
        // refresh the token here
        const userRefreshToken = await AsyncStorage.getItem(
          "@Cronoz:refreshToken"
        );
        api
          .post("/refresh", null, {
            headers: {
              Authorization: "Bearer " + userRefreshToken,
            },
          })
          .then(async (response) => {
            const newAccessToken = response.data.access_token;
            await AsyncStorage.setItem(
              "@Cronoz:accessToken",
              newAccessToken
            );
            config.headers.Authorization = `Bearer ${newAccessToken}`;
          })
          .catch(() => {
            navigate("Login", {});
          });
      } else {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (error) => {
    // I cand handle a request with errors here
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    // Return a successful response back to the calling service
    return response;
  },
  async (error) => {
    // Return any error which is not due to authentication back to the calling service
    if (error.response.status !== 401) {
      return new Promise((_, reject) => {
        reject(error);
      });
    }

    // Logout user if token refresh didn't work or user is disabled
    if (error.config.url == "/refresh") {
      await AsyncStorage.clear();
      navigate("Login", {});

      return new Promise((_, reject) => {
        reject(error);
      });
    }

    const userRefreshToken = await AsyncStorage.getItem(
      "@Cronoz:refreshToken"
    );
    if (userRefreshToken) {
      api
        .post("/refresh", null, {
          headers: {
            Authorization: "Bearer " + userRefreshToken,
          },
        })
        .then(async (response) => {
          const config = error.config;
          const newAccessToken = response.data.access_token;
          config.headers.Authorization = `Bearer ${newAccessToken}`;
          await AsyncStorage.setItem("@Cronoz:accessToken", newAccessToken);

          return new Promise((resolve, reject) => {
            axios
              .request(config)
              .then((response) => {
                resolve(response);
              })
              .catch((error) => {
                reject(error);
              });
          });
        })
        .catch((err) => {
          navigate("Login", {});
        });
    } else {
      navigate("Login", {});
    }
  }
);

export default api;