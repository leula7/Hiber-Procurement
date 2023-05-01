import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { getItems, setUnitPrices, updateCatagory, updateItems } from '../../api/MarketOfficer';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getCatagories } from '../../api/MarketOfficer';
import "./market.css";
import 'bootstrap/dist/css/bootstrap.min.css';


function SetUnitPrice() {
  const [items,setItems] = useState([]);
  const [cats,setCats] = useState([]);
  const {authData} = useSelector((state)=>state.authReducer);
  const [catagory,setcatagory] = useState({catagory: -1});
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpanded = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const updateItem = async (item_id,cat_id,item_name,cata_Name,price) => {
    const currentItem = items.find(item => item.item_id === item_id);
    console.log(currentItem.price !== parseInt(price));

    if (currentItem.price !== parseInt(price)) {
      const updatePrice = await setUnitPrices(item_id,price);
      alert(updatePrice.data.message);
    }
    if(currentItem.cata_Name !==cata_Name){
      const updatedCatagory = await updateCatagory(cat_id,cata_Name)
      alert(updatedCatagory.data.message);
    }

    if(currentItem.item_name !==item_name){
      const updatedItem = await updateItems(item_id,item_name);
      alert(updatedItem.data.message);
    }
  };

  //get item
  useEffect(()=>{
    const getItem = async ()=>{
      const response = await getItems(catagory.catagory);
      setItems(response.data);
    }
    getItem();
  },[authData,catagory,items]);

  //get catagories
  useEffect(()=>{
    const getCat = async ()=>{
      const response = await getCatagories();
      setCats(response.data);
    }
    getCat();
  },[authData]);

  return (
    <>
        <Header />
          <div className="content" style={{ width: '100%' }}>
            <select onChange={(event)=>setcatagory({catagory: event.target.value})}>
              <option key={-1} value={-1}>All</option>
              {cats.map((cat)=>(
                <option key={cat.cat_id} value={cat.cat_id}>{cat.cata_Name}</option>
              ))}
            </select>
            <div className="container-fluid py-5 ">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  {items.map((item,index) => (
                    <div key={`${item.item_id}-${index}`} className="card mb-3">

                      <div className="card-header d-flex justify-content-between align-items-center"
                        onClick={() => toggleExpanded(item.item_id)}>

                          <div className="fw-bold">{item.item_name}</div>
                          <div className="arrow">
                            {expandedId === item.item_id ? (
                              <i className="bi bi-chevron-up"></i>
                            ) : (
                              <i className="bi bi-chevron-down"></i>
                            )}
                          </div>

                      </div>
                      <div className={"collapse " +(expandedId === item.item_id ? "show" : "")}>
                      
                      <div className="card-body">
                        <form onSubmit={(e) => {e.preventDefault();
                            updateItem(item.item_id,item.cat_id,e.target.item_name.value,e.target.cata_Name.value,e.target.item_price.value);}}>
                          {/* item_name */}
                          <div className="mb-3">
                            <label htmlFor="item_name" className="form-label">
                              Item Name
                            </label>

                            <input type="text"
                              id="item_name"
                              name="item_name"
                              className="form-control"
                              defaultValue={item.item_name} />

                          </div>
                            {/* cata_Name */}
                          <div className="mb-3">
                            <label htmlFor="cat_id" className="form-label">
                              Category Name
                            </label>
                            <input
                              type="text"
                              id="cata_Name"
                              name="cata_Name"
                              className="form-control"
                              defaultValue={item.cata_Name}/>
                          </div>
                          {/* price */}
                          <div className="mb-3">
                            <label htmlFor="item_price" className="form-label">Item Price</label>
                            <input
                              type="number"
                              id="item_price"
                              name="item_price"
                              className="form-control"
                              defaultValue={item.price}
                            />
                          </div>
                          <button type="submit" className="btn btn-primary m-2">Update</button>
                        </form>
                      </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        <Footer />
    </>
  );
}

export default SetUnitPrice;