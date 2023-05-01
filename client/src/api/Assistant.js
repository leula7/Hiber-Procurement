import axios from "axios";


const API = axios.create({baseURL: "http://localhost:3000"});
export const waiting = (user_id) =>API.get(`/waiting-requests/${user_id}`);
export const approves = (user_id) =>API.get(`/approved-requests/${user_id}`);
export const sendRequest = (request,config) =>API.post('/request',request,config);
//jse