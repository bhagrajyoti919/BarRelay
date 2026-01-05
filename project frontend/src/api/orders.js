import API from "./api";

export const checkout = (data) => API.post("/orders/checkout", data);
export const orderHistory = () => API.get("/orders/history");
export const cancelOrder = (id) => API.post(`/orders/cancel/${id}`);
export const refundOrder = (id) => API.post(`/orders/refund/${id}`);
