import axios from 'axios';
import { Typography, Box, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import Loader from '../../Loader/Loader';
const Vendor_Wishlist = (props) => {
    const [wish, setWish] = useState([]);
    const [prod, setProd] = useState([]);
    const [wishuser, setWishUser] = useState([])
    const [loader, setLoader] = useState(true)
    useEffect(() => {
        const wish = axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_wishlist_all`)
        const prod = axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_product?email=${props.email}`)
        const wishlist_user = axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_wishlist_user`)
        axios.all([wish, prod, wishlist_user])
            .then(axios.spread(async function (wishdet, proddet, wishuserdet) {
                wishdet.data.length > 0 ? setWish(wishdet.data.slice()) : setWish([])
                proddet.data.length > 0 ? setProd(proddet.data.slice()) : setProd([])
                wishuserdet.data.length > 0 ? setWishUser(wishuserdet.data.slice()) : setWishUser([])
                setLoader(false);
            }))
    }, [])
    return (<>
        {loader == true ? <Loader /> : <>
            <Typography variant='h4' sx={{ marginLeft: "40px", marginTop: '30px', color: 'rgb(20,80,240)' }}>Wishlist Details</Typography>
            {
                wish.length > 0 && wish.map((li) => {
                    return (
                        <>
                            {
                                prod.length > 0 && prod.map((li1) => {
                                    if (li.product_id == li1.product_id) {
                                        return (<>
                                            {
                                                wishuser.length > 0 && wishuser.map((li2) => {
                                                    if (li1.product_id == li2.product_id) {
                                                        return (<>
                                                            <Box sx={{ backgroundColor: 'white', boxShadow: '2px 2px 2px black', marginTop: '30px', marginLeft: "40px", marginBottom: '30px', padding: '20px 30px', width: '1000px', display: 'flex', alignItems: "center" }}>
                                                                <img src={`data:image/png;base64,${li1.image1[0]}`} style={{ width: '200px', height: '300px' }} alt='no img' />
                                                                <Box sx={{ flex: 8, marginLeft: "80px" }}>
                                                                    <TextField type='text' value={li2.product_id} variant='filled' color='secondary' sx={{ marginTop: '20px' }} label='Product Id' />
                                                                    <TextField type='text' value={li1.category} variant='filled' color='secondary' sx={{ marginLeft: "30px", marginTop: '20px' }} label='Category' />
                                                                    <TextField type='text' value={li1.subcategory} variant='filled' color='secondary' sx={{ marginTop: '20px', marginLeft: "30px" }} label='Sub Category' />
                                                                    <br></br>
                                                                    <TextField type='text' value={li1.product} variant='filled' color='secondary' sx={{ marginTop: '20px' }} label='Product' />
                                                                    <TextField type='text' value={li1.brand_name} variant='filled' color='secondary' sx={{ marginTop: '20px', marginLeft: "30px" }} label='Brand' />
                                                                    <TextField type='text' value={li1.description} variant='filled' color='secondary' sx={{ marginLeft: "30px", marginTop: '20px' }} label='Description' />
                                                                    <br></br>
                                                                    <TextField type='text' value={li1.price} variant='filled' color='secondary' sx={{ marginTop: '20px' }} label='Price' />
                                                                    <TextField type='text' value={li1.strike_price} variant='filled' color='secondary' sx={{ marginLeft: "30px", marginTop: '20px' }} label='Strike price' />
                                                                    <TextField type='text' value={li1.discount} variant='filled' color='secondary' sx={{ marginTop: '20px', marginLeft: "30px" }} label='Discount' />
                                                                    <br></br>
                                                                    <TextField type='text' value={li2.count} variant='filled' color='secondary' sx={{ marginTop: '20px' }} label='No .of Users Wishlisted...' />
                                                                </Box>
                                                            </Box >

                                                        </>)
                                                    }
                                                })}
                                        </>)
                                    }
                                })
                            }
                        </>
                    )
                })
            }
            {wish.length == 0 &&
                <Typography variant='h5' sx={{
                    marginTop: '50px', textAlign: 'center', color: 'purple',
                    fontFamily: 'verdana'
                }}>No Wishlist data found!!</Typography >}
        </>}
    </>)
}

export default Vendor_Wishlist;