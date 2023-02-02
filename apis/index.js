import axios from "axios";

export const apiInstance = axios.create({
  baseURL: "http://localhost:3001/admin",
});
export const apiAuthInstance = axios.create({
  baseURL: "http://localhost:3001/admin",
});

// request 인터셉터
apiAuthInstance.interceptors.request.use(
  async function (config) {
    const token = await JSON.parse(localStorage.getItem("token"));
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// normal instance response 인터셉터
apiInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (!error.response) {
      alert("서버와 연결할 수 없습니다. 일시적인 문제 일 수 있습니다.");
    }
    return Promise.reject(error);
  }
);
// Auth instance response 인터셉터
apiAuthInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (!error.response) {
      alert("서버와 연결할 수 없습니다. 일시적인 문제 일 수 있습니다.");
    }
    return Promise.reject(error);
  }
);
