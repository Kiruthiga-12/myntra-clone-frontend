import { Typography, Box, TextField } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import { useState, useEffect } from 'react';
import DoneIcon from '@mui/icons-material/Done';
import axios from 'axios';
import Loader from '../../Loader/Loader';
const Cart_Page = (props) => {
    const [arr, getArr] = useState([]);
    const [userid, setUserId] = useState()
    const [username, setUserName] = useState()
    const [usermail, setUserMail] = useState();
    const [loader, setLoader] = useState(true);
    useEffect(() => {
        const cartlist = axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_cart?user_id=${props.user_id}`)
        const user = axios.get(`${process.env.REACT_APP_BACKEND_URL}/user_details?user_id=${props.user_id}`)
        axios.all([cartlist, user])
            .then(axios.spread(function (cartdet, userdet) {
                cartdet.data.length > 0 ? getArr(cartdet.data.slice()) : getArr([])
                if (userdet.data.length>0) {
                    setUserId(userdet.data[0].user_id)
                    setUserName(userdet.data[0].user_name)
                    setUserMail(userdet.data[0].user_mailid)
                }
                setLoader(false);
            }))
    }, [])
    return <>
        {loader == true ? <Loader /> : <>
            <Typography variant='h4' sx={{ marginLeft: "40px", marginTop: '30px', color: 'rgb(20,80,240)' }}>Cart Details</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ flex: 4, marginTop: '20px', marginLeft: "40px", fontSize: "16px", fontWeight: 'bold' }}>User Id: {userid}</Typography>
                <Typography sx={{ flex: 4, marginTop: '20px', marginLeft: "40px", fontSize: "16px", fontWeight: 'bold' }}>Name: {username}</Typography>
                <Typography sx={{ flex: 4, marginTop: '20px', marginLeft: "40px", fontSize: "16px", fontWeight: 'bold' }}>Email: {usermail}</Typography>
            </Box>
            {
                arr.length > 0 && arr.map((li, index) => {
                    return (
                        <>
                            <Box sx={{ backgroundColor: 'white', boxShadow: '2px 2px 2px black', marginTop: '30px', marginLeft: "40px", padding: '20px 30px', width: '800px', display: 'flex', alignItems: "center" }}>
                                <img src={`data:image/png;base64,${li.image}`} alt='loading'  style={{ width: '200px', height: '300px' }} />
                                <br></br>
                                <Box sx={{ flex: 8, marginLeft: "100px" }}>
                                    <TextField type='text' variant='standard' color='secondary' sx={{ marginTop: '10px' }} label='Brand' value={li.brand_name} />
                                    <TextField type='text' variant='standard' color='secondary' sx={{ marginTop: '10px', marginLeft: "40px" }} label='Description' value={li.description} />
                                    <br></br>
                                    <TextField type='text' variant='standard' color='secondary' sx={{ marginTop: '20px' }} label='Sold By' value={li.comp_name} />
                                    <TextField type='text' variant='standard' color='secondary' sx={{ marginTop: '20px', marginLeft: "40px" }} label='Size' value={li.size} />
                                    <br></br>
                                    <TextField type='text' variant='standard' color='secondary' sx={{ marginTop: '20px' }} label='Quantity' value={li.qty} />
                                    <TextField type='text' variant='standard' color='secondary' sx={{ marginTop: '20px', marginLeft: "40px" }} label='Price' value={li.price} />
                                    <br></br>
                                    <TextField type='text' variant='standard' color='secondary' sx={{ marginTop: '20px' }} label='Strike price' value={li.strike_price} />
                                    <TextField type='text' variant='standard' color='secondary' sx={{ marginTop: '20px', marginLeft: "40px" }} label='Discount' value={li.discount} />
                                    <br></br>
                                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '40px', fontSize: '16px', fontWeight: 'bold' }}>
                                        <ReplayIcon />
                                        <Typography sx={{ marginLeft: "10px" }}><span>14 days </span>return available.</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px', fontSize: '16px', fontWeight: 'bold' }}>
                                        <DoneIcon sx={{ color: 'green', fontWeight: "bold" }} />
                                        <Typography sx={{ marginTop: "5px" }}>Delivery by <span style={{ fontFamily: 'verdana', fontWeight: "bold" }}>{((new Date().getDate() + 1 + index))}-{new Date().getMonth() + 1}-{new Date().getFullYear()}</span> </Typography>
                                    </Box>
                                </Box>
                            </Box >
                        </>
                    )
                })
            }
            {
                arr.length == 0 &&
                <Typography variant='h5' sx={{
                    marginTop: '50px', textAlign: 'center', color: 'purple',
                    fontFamily: 'verdana'
                }}>No Items in Cart List!!</Typography >
            }
        </>}
    </>
}


export default Cart_Page;