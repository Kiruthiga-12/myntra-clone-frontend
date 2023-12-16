import { Avatar, AvatarGroup, Box, Icon, TextField, Typography, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import Wishlist_Page from './Wishlist_Page';
import Cart_Page from './Cart_Page';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../Loader/Loader';
const UserList = () => {

    //to store details.
    const [user_details, getUserDetails] = useState([]);
    const [flag, setFlag] = useState('user_details');
    const [user_id, setUserId] = useState(0);
    const user_msg = 'Displays User data';
    const [loader, setLoader] = useState(true);
    const [searchval, setSearchVal] = useState('');
    const [iterate, setIterate] = useState(0);
    const [cnt, setCnt] = useState(0);
    const [order_userid, setOrderUserId] = useState(0);
    const [flagvalue, setFlagValue] = useState(false);
    const [user_email, setUserEmail] = useState('');

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/user_details`)
            .then((data) => {
                (data.data.length > 0) ? getUserDetails(data.data.slice()) : getUserDetails([])
                setLoader(false);
            })

        toast.info('Displays user data', {
            toastId: 'user_msg'
        })
    }, [])
    useEffect(() => {
        if (iterate != 0) {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/user_details`)
                .then((data) => {
                    (data.data.length > 0) ? getUserDetails(data.data.slice()) : getUserDetails([])
                    setLoader(false);
                })
        }
    }, [iterate])
    useEffect(() => {
        if (order_userid != 0) {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_order?user_id=${order_userid}`)
                .then((data) => {
                    if (data.data.length > 0) {
                        data.data.map((li) => {
                            if (li.order_status != 'delivered' && li.order_status != 'cancelled') {
                                setFlagValue(true);
                            }
                        })
                    }
                    setCnt(cnt => cnt + 1);
                })
        }
    }, [order_userid])

    useEffect(() => {
        if (flagvalue == false && cnt != 0) {
            let confirm = window.confirm(`Are you sure you want to delete user id #${user_id} details from db?`);
            if (confirm == true) {
                let ans_reason = window.prompt("Kindly mention reason for deletion", " ");
                if (ans_reason != undefined && ans_reason.length > 3) {
                    setLoader(true);
                    const add_removed_user = axios.post(`${process.env.REACT_APP_BACKEND_URL}/removed_user`, {
                        'id': user_id,
                        'status': 'deleted',
                        'email': user_email,
                        'reason': ans_reason
                    })
                    const remove_signup = axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete_user?user_id=${user_id}`);
                    const remove_add_det = axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete_add_user_det?user_id=${user_id}`);
                    const remove_user_gift = axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete_gift_wrap?user_id=${user_id}`);
                    const remove_subscrip = axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete_subscription?user_id=${user_id}`);
                    const remove_wishlist = axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete_all_wishlist?user_id=${user_id}`);
                    const remove_place_order = axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete_place_order?user_id=${user_id}`);
                    const remove_addr = axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete_all_addr?user_id=${user_id}`);
                    const remove_del_addr = axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete_all_del_adr?user_id=${user_id}`);
                    const remove_cart = axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete_all_cart?user_id=${user_id}`);
                    const remove_amount = axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete_amount?user_id=${user_id}`);

                    axios.all([add_removed_user, remove_signup, remove_add_det, remove_user_gift,
                        remove_subscrip, remove_wishlist, remove_place_order, remove_addr, remove_del_addr,
                        remove_cart, remove_amount])
                        .then(axios.spread(function (add, signup, add_det, gift, subscrip, wish, placeorder, adr, del_adr, cart, amount) {
                            setIterate(iterate => iterate + 1)
                        }))
                }
            }
        }
        else if (cnt != 0 && flagvalue == true) {
            alert('User has undelivered order , Kindly cancel and send refund amount.Once done, delete user detail from db');
        }
    }, [flagvalue, cnt])
    return (
        <>
            {loader == true ? <Loader /> : <>
                <ToastContainer className='toastcontainer' />
                {flag === 'user_details' && <>
                    <Box sx={{ marginTop: '30px', display: 'flex', alignItems: 'center', marginLeft: '40px', marginRight: '40px' }}>
                        <Box sx={{ flex: 4, marginLeft: '10px' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', width: '400px', border: '1px solid lightgrey', borderRadius: "5px", backgroundColor: 'rgb(240,240,240)' }}>
                                <SearchIcon sx={{ color: 'black', marginLeft: "10px", flex: 1, cursor: "pointer" }}
                                    onClick={() => {
                                        setLoader(true);
                                        axios.get(`${process.env.REACT_APP_BACKEND_URL}/user_details?search=${searchval}`)
                                            .then((data) => {
                                                (data.data.length > 0) ? getUserDetails(data.data.slice()) : getUserDetails([])
                                                setLoader(false);
                                            })
                                    }} />
                                <TextField variant='outlined' type='text' placeholder='Search for users.....' sx={{
                                    flex: 11,
                                    width: '450px', color: 'black', backgroundColor: 'rgb(240,240,240)', marginLeft: '10px',
                                    '& fieldset': { border: 'none' }
                                }} value={searchval}
                                    onChange={(e) => setSearchVal(e.target.value)} />
                            </Box>
                        </Box>
                        <Box sx={{ flex: 3 }}></Box>
                        <Box sx={{ flex: 5 }}>
                            <AvatarGroup max={3}>
                                {user_details.length > 0 && user_details.map((li, index) => {
                                    return (
                                        <Avatar src={`data:image/png;base64,${li.user_profile}`} sx={{ width: '50px', height: '50px' }} ></Avatar>)
                                })}
                            </AvatarGroup>
                        </Box>
                    </Box>
                    {/* User List */}
                    {user_details.length > 0 && user_details.map((li, index) => {
                        return (
                            <Box sx={{
                                backgroundColor: 'rgb(220,140,240)', width: '70%', marginLeft: '90px', margin: 'auto', marginTop: '40px', border: '1px solid grey', borderRadius: '10px'
                                , display: 'flex', alignItems: 'center'
                            }}>
                                <Box sx={{ flex: 6 }}>
                                    <Typography sx={{ marginLeft: '20px', paddingTop: '10px' }}>ID: <span>{li.user_id}</span></Typography>
                                    <Typography sx={{ marginLeft: '20px', marginTop: '10px' }}>User Name : <span>{li.user_name}</span></Typography>
                                    <Typography sx={{ marginLeft: '20px', marginTop: '10px' }}>Address : <span>Subha Illam,1/178-7 Main Rad,Alavanthipuram,Kumbakonam</span></Typography>
                                    <Typography sx={{ marginLeft: '20px', marginTop: '10px' }}>Phone : <span>{li.user_mobile}</span></Typography>
                                    <Typography sx={{ marginLeft: '20px', marginTop: '10px' }}>Email : <span>{li.user_mailid}</span></Typography>
                                    <br></br>
                                    <br></br>
                                </Box>
                                <Button sx={{ flex: 3, marginLeft: '20px' }} variant='contained'
                                    onClick={() => {
                                        setUserId(li.user_id);
                                        setFlag('wishlist')
                                    }}>Wislist</Button>
                                <Button sx={{ flex: 3, marginLeft: '20px' }} variant='contained'
                                    onClick={() => {
                                        setUserId(li.user_id);
                                        setFlag('cartlist')
                                    }}> CartList</Button>
                                <Button sx={{ flex: 3, marginLeft: '20px', marginRight: '40px' }} variant='contained'
                                    onClick={async () => {
                                        setUserId(li.user_id);
                                        await setOrderUserId(0);
                                        setOrderUserId(li.user_id);
                                        setUserEmail(li.user_mailid);
                                    }}> Delete User</Button>
                            </Box >
                        )
                    })}
                </>}
                {flag === 'wishlist' && <Wishlist_Page user_id={user_id} />}
                {flag === 'cartlist' && <Cart_Page user_id={user_id} />}
                {
                    user_details.length == 0 &&
                    <Typography variant='h5' sx={{
                        marginTop: '50px', textAlign: 'center', color: 'purple',
                        fontFamily: 'verdana'
                    }}>No Users found!!</Typography >
                }
            </>}
            <br></br>
            <br></br>
            <br></br>
        </>
    )
}

export default UserList;