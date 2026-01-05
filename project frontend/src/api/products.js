import API from "./api";

export const getProducts = () => API.get("/products");
export const filterByCategory = (cat) => API.get(`/filters/category/${cat}`);
