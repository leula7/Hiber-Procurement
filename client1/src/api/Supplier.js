import axios from "axios";

const API = axios.create({baseURL: "http://localhost:3000"});


export const getDocument = (supplier_id,position) =>API.get("/technical-documents/",{params: {supplier_id: supplier_id,position: position}});
export const uploadFile = (formdata) =>API.post("/upload/",formdata);
export const readFile = (username,filename,extension) =>API.get(`/api/pdfs/${username}/${filename}.${extension}`);