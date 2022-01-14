import store from "../store/index";

export default async function client(endpoint, options = {}) {
  const url = `${process.env.VUE_APP_API_BASE_URL}${endpoint}`;

  let fetchOptions = { ...options };
  if (options.method && options.method !== "GET" && options.data) {
    fetchOptions.body = JSON.stringify(options.data);
    if (!fetchOptions.headers) fetchOptions.headers = {};
    fetchOptions.headers["Content-Type"] = "application/json";
    const token = store.state.token;
    if (token) fetchOptions.headers["Authorization"] = `Token ${token}`;
  }

  const response = await fetch(url, fetchOptions);
  const data = await response.json();
  if (!response.ok) return Promise.reject({ data, status: response.status });
  return { data, status: response.status };
}
