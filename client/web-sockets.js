import io from "socket.io-client";
import { remoteProxyURL } from "./config";
let STRAPI_ENDPOINT;

if (process.env.NODE_ENV !== "production") {
  STRAPI_ENDPOINT = remoteProxyURL;
} else {
  STRAPI_ENDPOINT = remoteProxyURL;
}

export const socket = io(STRAPI_ENDPOINT);
