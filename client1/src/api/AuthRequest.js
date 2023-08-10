import axios from "axios";

const API = axios.create({baseURL: "http://localhost:3000"});

export const logIn = (formdata) =>API.post('/login',formdata);
export const signUp = (formdata) =>API.post('/register',formdata);
export const verifyEmail = (api_key,email) =>API.get(`/http://apilayer.net/api/check?access_key=${"X1n00ruXlVVZGfRXjDDan9MaN54ChqYV"}&email=${"leulkahssaye1000@gmail.com"}`);

//export const getBranchAndUpdateAuthData  = (user_id) =>API.get(`/branchname/${user_id}`);