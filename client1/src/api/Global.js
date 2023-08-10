import axios from "axios";


const API = axios.create({baseURL: "http://localhost:3000"});
export const Items  = () =>API.get(`/items`);
export const branchs  = () =>API.get(`/branch`);
