import { Typography, Box, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../../Loader/Loader';
const Wishlist_Page = (props) => {
    const [arr, getArr] = useState([]);
    const [userid, setUserId] = useState()
    const [username, setUserName] = useState()
    const [usermail, setUserMail] = useState()
    const [loader, setLoader] = useState(true);
    useEffect(() => {
        const wishlist = axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_wishlist?user_id=${props.user_id}`)
        const user = axios.get(`${process.env.REACT_APP_BACKEND_URL}/user_details?user_id=${props.user_id}`)
        axios.all([wishlist, user])
            .then(axios.spread(function (wishdet, userdet) {
                wishdet.data.length > 0 ? getArr(wishdet.data.slice()) : getArr([])
                if (userdet.data.length>0) {
                    setUserId(userdet.data[0].user_id)
                    setUserName(userdet.data[0].user_name)
                    setUserMail(userdet.data[0].user_mailid)
                }
                setLoader(false);
            }))
    }, [])
    return (<>
        {loader == true ? <Loader /> : <>
            <Typography variant='h4' sx={{ marginLeft: "40px", marginTop: '30px', color: 'rgb(20,80,240)' }}>Wishlist Details</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ flex: 4, marginTop: '20px', marginLeft: "40px", fontSize: "16px", fontWeight: 'bold' }}>User Id: {userid}</Typography>
                <Typography sx={{ flex: 4, marginTop: '20px', marginLeft: "40px", fontSize: "16px", fontWeight: 'bold' }}>Name: {username}</Typography>
                <Typography sx={{ flex: 4, marginTop: '20px', marginLeft: "40px", fontSize: "16px", fontWeight: 'bold' }}>Email: {usermail}</Typography>
            </Box>
            {
                arr.length > 0 && arr.map((li) => {
                    function toBase64(arr) {
                        const arr1 = new Uint8Array(arr)
                        return btoa(
                            arr1.reduce((data, byte) => data + String.fromCharCode(byte), '')
                        );
                    }
                    const url = toBase64(li.image1[0].data);
                    return (
                        <>
                            <Box sx={{ backgroundColor: 'white', boxShadow: '2px 2px 2px black', marginTop: '30px', marginLeft: "40px", marginBottom: '30px', padding: '20px 30px', width: '800px', display: 'flex', alignItems: "center" }}>
                                <img src={`data:image/png;base64,${url}`} style={{ width: '200px', height: '300px' }} />
                                <br></br>
                                <Box sx={{ flex: 8, marginLeft: "100px" }}>
                                    <TextField type='text' value={li.brand_name} variant='filled' color='secondary' sx={{ marginTop: '20px' }} label='Brand' />
                                    <TextField type='text' value={li.description} variant='filled' color='secondary' sx={{ marginLeft: "30px", marginTop: '20px' }} label='Description' />
                                    <br></br>
                                    <TextField type='text' value={li.price} variant='filled' color='secondary' sx={{ marginTop: '20px' }} label='Price' />
                                    <TextField type='text' value={li.strike_price} variant='filled' color='secondary' sx={{ marginLeft: "30px", marginTop: '20px' }} label='Strike price' />
                                    <br></br>
                                    <TextField type='text' value={li.discount} variant='filled' color='secondary' sx={{ marginTop: '20px' }} label='Discount' />
                                    <br></br>
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
                }}>No Wishlist Data found!!</Typography >
            }
        </>}
    </>)
}


export default Wishlist_Page;