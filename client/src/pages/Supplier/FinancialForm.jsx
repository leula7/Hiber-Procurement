import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useFillFinancialFormMutation, useGetFinancialFormQuery } from 'state/api';
import { toast } from 'react-toastify';

const FinancialForm = () => {

  const id = useSelector((state) => state.auth.user.user_id);
  const {bidid,participant} = useParams();
  const {data:datosh} = useGetFinancialFormQuery(bidid);
  const naviate=useNavigate();
  console.log(datosh)
  const [FillFinancialForm] = useFillFinancialFormMutation();
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    fetchItemNames();
  }, [datosh]);

  const fetchItemNames = () => {
    // Fetch data from the database and initialize the form with the retrieved values
    const data = datosh;
  
    if (data) {
      const initialItemValues = data.map((item) => ({
        bid_id: item.bid_id,
        bid_item_id: item.bid_item_id,
        item_id: item.item_id,
        item_name: item.item_name,
        quantity: item.quantity,
        price: 0,
      }));
  
      formik.setValues({ items: initialItemValues });
    }
  };
  

  const formik = useFormik({
    initialValues: {
      items: [],
    },
    validationSchema: Yup.object().shape({
      items: Yup.array()
        .of(
          Yup.object().shape({
            quantity: Yup.number().integer().required('Quantity is required'),
            price: Yup.number().positive('Price must be a positive number').required('Price is required'),
          })
        )
        .required('At least one item is required'),
    }),
    onSubmit: async (values) => {
      const result = values.items.map((item) => ({
        price: item.price,
        bid_item_id: item.bid_item_id,
        bid_participate_id: Number(participant)
      }));

      console.log(result);
    const response= await FillFinancialForm(result);
    console.log(response)
    toast.success(response.data.message)
      setIsSubmitted(true);
      naviate("/mytender")
    },
  });

  const { handleSubmit, handleChange, values, errors } = formik;

  return (
    <form onSubmit={handleSubmit}>
      {values.items.map((item, index) => (
        <div key={index}>
          <TextField
            label="Item Name"
            value={item.item_name}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            label="Quantity"
            type="number"
            name={`items[${index}].quantity`}
            value={item.quantity}
            onChange={handleChange}
            error={isSubmitted && Boolean(errors.items && errors.items[index] && errors.items[index].quantity)}
            helperText={isSubmitted && errors.items && errors.items[index] && errors.items[index].quantity}
          />
          <TextField
            label="Price"
            type="number"
            name={`items[${index}].price`}
            value={item.price}
            onChange={handleChange}
            error={isSubmitted && Boolean(errors.items && errors.items[index] && errors.items[index].price)}
            helperText={isSubmitted && errors.items && errors.items[index] && errors.items[index].price}
          />
        </div>
      ))}
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default FinancialForm;
