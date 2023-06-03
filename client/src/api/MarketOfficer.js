import axios from "axios";

const API = axios.create({baseURL: "http://localhost:3000"});


export const getItems = (cat_id) =>API.get(`/items/${cat_id}`);
export const getCatagories = () =>API.get('/cats');
export const getQuarterPrices = () =>API.get('/quarter-price');
export const setUnitPrices  = (item_id,price) =>API.put(`/setprice/${item_id}/${price}`);
export const updateCatagory = (cat_id,cata_Name) =>API.put(`/update-catagory/${cat_id}/${cata_Name}`);
export const updateItems = (item_id,item_name) =>API.put(`/update-item/${item_id}/${item_name}`);
export const generatedocument = () =>API.get('/generated-document');
export const filterdocument = () => API.get('/filter-document');
export const exportfilter = (filterdata) =>API.post('/filterdata',filterdata);
