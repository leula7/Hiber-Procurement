import axios from "axios";


const API = axios.create({baseURL: "http://localhost:3000"});
export const approve = (user_id,requestId) =>API.put(`/requests/${user_id}/${requestId}/approve`);
export const pending  = (user_id) =>API.get(`/pending-requests/${user_id}`);
