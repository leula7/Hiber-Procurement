// import React,{useState} from 'react';
// import {
//     Box ,
//     Card , 
//     CardActions, 
//     CardContent,
//     Collapse,
//     Button,
//     Typography,
//     Rating,
//     useTheme,
//     useMediaQuery,
//     Skeleton,
//     CircularProgress,
//     LinearProgress} from "@mui/material";
// import Header from "components/Header"
// // import { useGetProductsQuery } from 'state/api';
// import Product from './product.component';

// const Products = () => {
//   // const {data, isLoading} = useGetProductsQuery();
//   const isNonMobile = useMediaQuery("(min-width:1000px)")
//   return (   
// //      <Box m="1.5rem 2.5rem">
// //   <Header title="TASKS" subtitle="See your list of Tasks." />
// //   // {data || !isLoading ? (
// //     <Box
// //       mt="20px"
// //       display="grid"
// //       gridTemplateColumns="repeat(4, minmax(0, 1fr))"
// //       justifyContent="space-between"
// //       rowGap="20px"
// //       columnGap="1.33%"
// //       sx={{
// //         "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
// //       }}
// //     >
// //       {/* /*{ {data.map(
// //         ({
// //           _id,
// //           name,
// //           description,
// //           price,
// //           rating,
// //           category,
// //           supply,
// //           stat,
// //         }) => (
// //           <Product
// //             key={_id}
// //             _id={_id}
// //             name={name}
// //             description={description}
// //             price={price}
// //             rating={rating}
// //             category={category}
// //             supply={supply}
// //             stat={stat}
// //           />
// //         )
// //       )}
     
// //      }*/ */}
     
// //      </Box>
// //   // ) : (
// //   //   <LinearProgress color="success" />
// //   // )}
// // </Box>
// );
// };

// export default Products;