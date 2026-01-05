import API from "./api";

export const getCart = () => API.get("/cart");
export const addToCart = (data) => API.post("/cart/add", data);
