import axios from "axios";

// export const nextServer = axios.create({
//   baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
//   withCredentials: false,
// });

export const nextServer = axios.create({
  // Якщо ми в браузері — використовуємо відносний шлях,
  // якщо на сервері — повний з .env
  baseURL:
    typeof window === "undefined"
      ? `${process.env.NEXT_PUBLIC_API_URL}/api`
      : "/api",
  withCredentials: false,
});
