import axios from "axios";

const API = axios.create({baseURL: "http://localhost:3000"});

export const sendMessage = (msgData) =>API.post('/chat',msgData);
export const messages = (sender,receiver) =>API.get(`/message/${sender}/${receiver}`);
export const users = (position) =>API.get(`/users/${position}`);
