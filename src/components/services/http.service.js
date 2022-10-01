import axios from "axios";

let accept = "application/json";
let accessToken = "";
let qs = "";
let sanitizeParams = {};
let config = {};
const baseUrl =
  "https://chitchat-790ff-default-rtdb.asia-southeast1.firebasedatabase.app/";

export const API = {
  getHeaders(accessToken) {
    return {
      Accept: accept,
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };
  },

  makeRequest(url, reqInit, options = {}) {
    // abortPendingRequests(key);
    const headers = this.getHeaders(accessToken);
    const api_url = baseUrl + url;
    console.log("api_url, baseUrl -------> ", api_url, baseUrl);
    const init = Object.assign({}, reqInit, { headers });

    return axios({
      url: api_url,
      ...init,
      timeout: 30000,
      withCredentials: process.env.NODE_ENV === "production",
    });
  },

  getParams(queryParams = {}) {
    return queryParams;
  },

  get(path, queryParams, options = {}) {
    const getData = {
      method: "GET",
      params: this.getParams(queryParams),
      paramsSerializer: (params) => {
        return;
      },
    };
    return this.makeRequest(path, getData, options);
  },

  post(path, body, options = {}) {
    const postData = {
      method: "POST",
      data: body,
      params: this.getParams(),
      // paramsSerializer: (params) => {
      //   return qs.stringify(sanitizeParams(params), { arrayFormat: 'brackets' });
      // },
    };
    return this.makeRequest(path, postData, options);
  },

  put(path, body, options = {}) {
    const putData = {
      method: "PUT",
      data: body,
      params: this.getParams(),
      // paramsSerializer: (params) => {
      //   return qs.stringify(sanitizeParams(params), { arrayFormat: 'brackets' });
      // },
    };
    return this.makeRequest(path, putData, options);
  },

  patch(path, body, options = {}) {
    const patchData = {
      method: "PATCH",
      data: body,
      params: this.getParams(),
      paramsSerializer: (params) => {
        return qs.stringify(sanitizeParams(params), {
          arrayFormat: "brackets",
        });
      },
    };
    return this.makeRequest(path, patchData, options);
  },

  delete(path, body, options = {}) {
    const deleteData = {
      method: "DELETE",
      params: this.getParams(),
      // paramsSerializer: (params) => {
      //   return qs.stringify(sanitizeParams(params), { arrayFormat: 'brackets' });
      // },
    };
    return this.makeRequest(path, deleteData, options);
  },

  config,
};
