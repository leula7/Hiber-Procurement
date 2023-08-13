import React, { useState } from "react";
import { useSelector } from 'react-redux';
import "./ItemForm.css";

const  ItemForm = ()=> {

    const {authData} = useSelector((state)=>state.authReducer)
    const [spec, setSpec] = useState({
        brand: '',
        cpu: '',
        gpu: '',
        ram: '',
        storage: ''
    });

    const [visible, setVisible] = useState(false);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setSpec(prevState => ({
            ...prevState,
            [name]: value
        }));

        if (name === 'brand' && value==="Other") {

            if(visible === true){
                setVisible(false);
            }else{
                setVisible(true);
            }
        }
            
        if (name === 'graphics' && value==="Other") {
            if(visible === true){
                setVisible(false);
            }else{
                setVisible(true);
            }
        }
        else if (name === 'ram' && value==="Other") {
            if(visible === true){
                setVisible(false);
            }else{
                setVisible(true);
            }
        }
        if (name === 'storage' && value ==="Other") {
            if(visible === true){
                setVisible(false);
            }else{
                setVisible(true);
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(spec);
      };
    
      return (
        <div className="container">
            <form onSubmit={handleSubmit}>
               {
                
               }
                {/* Processor */}
                <div className="form-group">
                    <label htmlFor="cpu">CPU|Processor: {authData.user_id}</label>
                    <select id="cpu" name="cpu" value={spec.cpu} onChange={handleChange} required>
                        <option value="">Select Processor</option>
                        <option value="Intel Core i5-3470">Intel Core i5-3470</option>
                        <option value="AMD FX 8350">AMD FX 8350</option>
                        <option value="Other">Other</option>
                    </select>
                    {visible && spec.cpu === "cpu" &&(
                        <input type="text" id="cpuOther" name="cpu" value={spec.cpu} onChange={handleChange} placeholder="Enter the CPU name" required />
                    )}
                </div>

                {/* GRAPHICS */}
                <div className="form-group">
                    <label htmlFor="gpu">Graphics Card:</label>
                    <select id="gpu" name="gpu" value={spec.gpu} onChange={handleChange} required>
                        <option value="">Choose a graphics card</option>
                        <option value="NVIDIA GTX 660">NVIDIA GTX 660</option>
                        <option value="AMD Radeon HD 7870">AMD Radeon HD 7870</option>
                        <option value="Other">Other</option>
                    </select>
                    {visible && spec.gpu === "Other" && (
                        <input type="text" id="gpuOther" name="gpu" value={spec.gpu} onChange={handleChange} placeholder="Enter the GPU name" required />
                    )}
                </div> 

                {/* RAM */}
                <div className="form-group">
                    <label htmlFor="cpu">RAM</label>
                    <select id="ram" name="ram" value={spec.ram} onChange={handleChange} required>
                        <option value="">--</option>
                        <option value="4">4GB</option>
                        <option value="8">8GB</option>
                        <option value="16">16GB</option>
                        <option value="32">32GB</option>
                        <option value="Other">Other</option>
                    </select>
                    {visible && spec.ram === "Other" && (
                        <input type="number" id="ram" name="ram" value={spec.ram} onChange={handleChange} placeholder="Enter Ram value" required />
                    )}
                </div>
                    
                {/* STORAGE  */}
                <div className="form-group">
                    <label htmlFor="storage" value={spec.storage}>STORAGE:</label>
                    <select id="storage" name="storage"  onChange={handleChange}>
                        <option value="">Select storage</option>
                        <option value="hdd">HDD</option>
                        <option value="ssd">SSD</option>
                        <option value="Other">Other</option>
                    </select>
                    {visible && spec.storage === "Other" && (
    
                        <input  type="number" id="storageother" 
                                name="storage" value={spec.storage} 
                                onChange={handleChange} 
                                placeholder="Enter Storage Type" required />
                    )}
                </div>

                 {/* BRAND */}
                 <div className="form-group">
                    <label htmlFor="brand">Brand:</label>
                    <select id="brand" name="brand" value={spec.brand} onChange={handleChange} required>
                        <option value="">--Please choose Brand--</option>
                        <option value="hp">HP</option>
                        <option value="dell">DELL</option>
                        <option value="apple">Apple</option>
                        <option value="Other">Other</option>
                    </select>
                    {visible && spec.brand==="Other" &&(
                        <input type="text" id="brandOther" name="brand" value={spec.brandOther} onChange={handleChange} placeholder="Enter the Brand Name" required />
                    )}
                </div>
                <button onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    );
  }


export default ItemForm;
