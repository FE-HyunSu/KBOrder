import axios from "axios";

// axios 실행시 headers 기본값 설정.
const instance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

// axios 실행시 선처리 요청.
instance.interceptors.request.use(
  (request) => {
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// axios 실행시 후처리 요청.
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // 에러 코드 분기처리.
    return Promise.reject(error);
  }
);

export default instance;
