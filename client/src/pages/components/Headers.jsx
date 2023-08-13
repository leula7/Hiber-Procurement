// import { Card, 
//     CardActions, 
//     CardContent, 
//     CardMedia, 
//     Container, 
//     CssBaseline, 
//     Grid, IconButton, 
//     Link, Toolbar, 
//     Typography } from '@mui/material';
// import AppBar from '@mui/material/AppBar';
// import PublicIcon from '@mui/icons-material/Public';
// import { useSelector } from 'react-redux';
// import { Button } from 'react-bootstrap';
// import useStyles from '../../css/style';

// const Headers = ()=>{
//     const {authData} = useSelector((state) => state.authReducer);
//     let span="default";
//     if(authData.position ==="supplier"){
//     span="Supplier";
//     }else if(authData.position ==="marketofficer"){
//     span="Head Office";
//     }
//     const clear = ()=>{
//     console.log(authData.branch_name)
//     localStorage.clear('store');
//     }
//     return(
//         <>
//             <CssBaseline/>
//             <AppBar position='absolute' color='primary'>
//                 <Toolbar>
//                     <PublicIcon className={classes.Icon} />
//                     <Typography>
//                         {span}
//                     </Typography>  
//                     <Link href='/login' color='primary'>Log-OUt</Link> 
//                 </Toolbar>
//             </AppBar>
//             <main>
//                 <div>
//                     <Container maxWidth="sm">
//                         <Typography variant='h2' align='center'>
//                             Photo Album
//                         </Typography>
//                     </Container>
//                 </div>
//                 <div>
//                     <Grid container spacing={2} justify="center">
//                         <Grid item>
//                             <Card>
//                                 <CardMedia 
//                                     className={classes.cardMedia}
//                                     image="https://www.google.com/imgres?imgurl=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1575936123452-b67c3203c357%3Fixlib%3Drb-4.0.3%26ixid%3DMnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8%26w%3D1000%26q%3D80&tbnid=YmDohMp4T5AODM&vet=12ahUKEwjIz8a1haf-AhXvGVkFHVL3D3oQMygDegUIARCeAQ..i&imgrefurl=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fimage&docid=ExDvm63D_wCvSM&w=1000&h=667&itg=1&q=image&ved=2ahUKEwjIz8a1haf-AhXvGVkFHVL3D3oQMygDegUIARCeAQ"
//                                 />
//                             </Card>
//                             <CardContent>
//                                 <Typography gutterBottom variant='h5'>Hello</Typography>
//                                 <Typography>Hello Lele</Typography>
//                             </CardContent>
//                             <CardActions>
//                                 <Button  size='small' color='primary'>Button</Button>
//                             </CardActions>
//                         </Grid>
//                     </Grid>
//                 </div>
//             </main>
//         </>
//     )
// }

// export default Headers;