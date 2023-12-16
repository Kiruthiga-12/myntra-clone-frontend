import { Typography, Box, TextField, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Loader from '../../Loader/Loader';
import View_Details from './View_Details';
const Orders_Payments = (props) => {
    const [orderdetails, setOrderDetails] = useState([]);
    const [loader, setLoader] = useState(true);
    const [searchval, setSearchVal] = useState('');
    const [orderid, setOrderId] = useState(0);
    const [view_flag, setViewFlag] = useState(false);
    const [refunddet, setRefundDet] = useState([]);
    useEffect(() => {
        const ord = axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_unique_order?all=${1}`);
        const refund = axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_user_refund`);
        axios.all([ord, refund])
            .then(axios.spread(function (order, ret) {
                setLoader(false);
                (order.data.length > 0) ? setOrderDetails(order.data.slice()) : setOrderDetails([]);
                (ret.data.length > 0) ? setRefundDet(ret.data.slice()) : setRefundDet([]);
            }))
    }, [])
    return (
        <>
            {loader == true ? <Loader /> : <>
                {view_flag == false && <>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', width: '400px', border: '1px solid lightgrey', borderRadius: "5px", backgroundColor: 'rgb(240,240,240)', marginTop: "40px", marginLeft: "1000px" }}>
                        <SearchIcon sx={{ color: 'black', marginLeft: "10px", flex: 1, cursor: "pointer" }}
                            onClick={() => {
                                setLoader(true);
                                if (searchval != '')
                                    axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_unique_order?all=${1}&search=${searchval}`)
                                        .then((data) => {
                                            (data.data.length > 0) ? setOrderDetails(data.data.slice()) : setOrderDetails([])
                                            setLoader(false)
                                        })
                                else
                                    axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_unique_order?all=${1}`)
                                        .then((data) => {
                                            (data.data.length > 0) ? setOrderDetails(data.data.slice()) : setOrderDetails([])
                                            setLoader(false);
                                        })

                            }}
                        />
                        <TextField variant='outlined' type='text' placeholder='Search for Order ....' sx={{
                            flex: 11,
                            width: '450px', color: 'black', backgroundColor: 'rgb(240,240,240)', marginLeft: '10px',
                            '& fieldset': { border: 'none' }
                        }} value={searchval} onChange={(e) => setSearchVal(e.target.value)} />
                    </Box>
                    <Box sx={{ padding: '10px 0px', marginTop: '40px', marginLeft: '6px', backgroundColor: 'rgb(245, 63, 108)', width: '99%' }}>
                        <table style={{ width: '100%' }}>
                            <thead>
                                <tr>
                                    <th style={{ padding: "10px", width: '10%', textAlign: 'center' }}>Order ID</th>
                                    <th style={{ padding: "10px", width: '20%', textAlign: 'center' }}>Order Status</th>
                                    <th style={{ padding: "10px", width: '25%', textAlign: 'center' }}>Order Placed On.</th>
                                    <th style={{ padding: "10px", width: '25%', textAlign: 'center' }}>Payment Status</th>
                                    <th style={{ padding: "10px", width: '10%', textAlign: 'center' }}>Order Price</th>
                                    <th style={{ padding: "10px", width: '10%', textAlign: 'center' }}>View </th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderdetails.length > 0 && orderdetails.map((li) => {
                                    function f1() {
                                        let txt = '';
                                        if (li.order_status != 'cancelled')
                                            txt = 'Payment Done';
                                        return txt;
                                    }
                                    let payment = f1();
                                    let date = new Date(li.order_date).toLocaleString('hi-EN');
                                    return (<>
                                        <tr style={{ backgroundColor: 'rgb(190,190,100)', color: 'black' }} >
                                            <td style={{ padding: "10px", width: '10%', textAlign: 'center' }}>{li.order_id}</td>
                                            <td style={{ padding: "10px", width: '20%', textAlign: 'center' }}>{li.order_status}</td>
                                            <td style={{ padding: "10px", width: '25%', textAlign: 'center' }}>{date}</td>
                                            {li.order_status != 'cancelled' && <td style={{ padding: "10px", width: '25%', textAlign: 'center' }}>{payment}</td>}
                                            {li.order_status == 'cancelled' && <>
                                                {refunddet.length > 0 && refunddet.map((li1) => {
                                                    return (<>
                                                        {li.order_id == li1.order_id && <td style={{ padding: "10px", width: '25%', textAlign: 'center' }}>refund done</td>}
                                                        {li.order_id != li1.order_id && <td style={{ padding: "10px", width: '25%', textAlign: 'center' }}>refund to be done</td>}
                                                    </>)

                                                })}
                                                {refunddet.length == 0 && <td style={{ padding: "10px", width: '25%', textAlign: 'center' }}>refund to be done</td>}
                                            </>}
                                            <td style={{ padding: "10px", width: '10%', textAlign: 'center' }}>Rs.{li.total_amount}</td>
                                            <td style={{ padding: "10px", width: '10%', textAlign: 'center' }}>
                                                <Button sx={{
                                                    backgroundColor: 'transparent',
                                                    '&:hover': { backgroundColor: 'transparent' }
                                                }} onClick={() => {
                                                    setOrderId(li.order_id);
                                                    setViewFlag(true)
                                                }}><ModeEditIcon sx={{ color: 'black' }} /></Button></td>
                                        </tr>
                                    </>)
                                })}
                            </tbody>
                        </table>
                    </Box >
                    {orderdetails.length == 0 &&
                        <Typography variant='h5' sx={{
                            marginTop: '50px', textAlign: 'center', color: 'purple',
                            fontFamily: 'verdana'
                        }}>No Orders found!!</Typography >}
                    <br></br>
                    <br></br>
                    <br></br>
                </>}
                {view_flag == true && <View_Details orderid={orderid} email={props.admin_login} adminid={props.adminid} />}
            </>}
        </>
    )
}
export default Orders_Payments;