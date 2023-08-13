import axios from "axios";

const API = axios.create({baseURL: "http://localhost:3000"});

export const logIn = (formdata) =>API.post('/login',formdata);
export const signUp = (formdata) =>API.post('/register',formdata);
//export const getBranchAndUpdateAuthData  = (user_id) =>API.get(`/branchname/${user_id}`);