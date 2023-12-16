import axios from 'axios';
import { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Loader from '../../Loader/Loader';
const Commission_History = (props) => {
    const [data, getData] = useState([]);
    const [loader, setLoader] = useState(true);
    const [searchval, setSearchVal] = useState('');
    const [showflag, setShowFlag] = useState(false);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_vendor_payment?order_id=${props.orderid}`)
            .then((data) => {
                (data.data.length) > 0 ? getData(data.data.slice()) : getData([]);
                setLoader(false);
            })
    }, [])
    useEffect(() => {
        if (showflag == true) {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_vendor_payment`)
                .then((data) => {
                    (data.data.length) > 0 ? getData(data.data.slice()) : getData([]);
                    setLoader(false);
                })
        }
        else if (showflag == false) {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_vendor_payment?order_id=${props.orderid}`)
                .then((data) => {
                    (data.data.length) > 0 ? getData(data.data.slice()) : getData([]);
                    setLoader(false);
                })
        }
    }, [showflag])
    return (<>
        {loader == true ? <Loader /> : <>
            <Box sx={{ padding: '5px' }}>
                <Box sx={{ display: "flex", alignItems: 'center', marginTop: "20px" }}>
                    <Typography sx={{ marginLeft: "20px", fontWeight: "bold", marginTop: '20px', flex: 6 }}>Commission History</Typography>
                    <Button sx={{ marginLeft: '20px', fontWeight: "bold", fontSize: "16px", flex: 3, textTransform: "none", '&:hover': { backgroundColor: "transparent" } }}
                        disableTouchRipple onClick={() => setShowFlag(!showflag)}>Show All Data</Button>
                    <Box sx={{ flex: 6, marginRight: "50px" }}>
                        <Box sx={{ width: "400px", display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', border: '1px solid lightgrey', borderRadius: "5px", backgroundColor: 'rgb(240,240,240)' }}>
                            <SearchIcon sx={{ color: 'black', marginLeft: "10px", flex: 1, cursor: "pointer" }}
                                onClick={() => {
                                    setLoader(true);
                                    if (searchval != '')
                                        axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_vendor_payment?search=${searchval}`)
                                            .then((data) => {
                                                (data.data.length > 0) ? getData(data.data.slice()) : getData([])
                                                setLoader(false)
                                            })
                                    else
                                        axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_vendor_payment`)
                                            .then((data) => {
                                                (data.data.length > 0) ? getData(data.data.slice()) : getData([])
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
                    </Box>
                </Box>
                <Box sx={{ padding: '10px 0px', marginTop: '40px', marginLeft: '6px', backgroundColor: 'rgb(245, 63, 108)', width: '100%' }}>
                    <table>
                        <thead>
                            <tr>
                                <th style={{ padding: "10px", width: '5%', textAlign: 'center' }}>Order <br></br>ID</th>
                                <th style={{ padding: "10px", width: '10%', textAlign: 'center' }}>Order <br></br>Status</th>
                                <th style={{ padding: "10px", width: '5%', textAlign: 'center' }}>Product <br></br>ID</th>
                                <th style={{ padding: "10px", width: '10%', textAlign: 'center' }}>Product <br></br>Price</th>
                                <th style={{ padding: "10px", width: '10%', textAlign: 'center' }}>Comission <br></br>% </th>
                                <th style={{ padding: "10px", width: '10%', textAlign: 'center' }}>Comission <br></br>Amount </th>
                                <th style={{ padding: "10px", width: '10%', textAlign: 'center' }}>Paid<br></br>Amount</th>
                                <th style={{ padding: "10px", width: '10%', textAlign: 'center' }}>Trans<br></br>ID</th>
                                <th style={{ padding: "10px", width: '20%', textAlign: 'center' }}>Admin <br></br>Email</th>
                                <th style={{ padding: "10px", width: '10%', textAlign: 'center' }}>Paid <br></br>Date</th>
                                <th style={{ padding: "10px", width: '10%', textAlign: 'center' }}>Vendor<br></br>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 && data.map((li) => {
                                return (<>
                                    <tr style={{ backgroundColor: 'rgb(190,190,100)', color: 'black' }} >
                                        <td style={{ padding: "10px", width: '5%', textAlign: 'center' }}>{li.order_id}</td>
                                        <td style={{ padding: "10px", width: '10%', textAlign: 'center' }}>{li.order_status}</td>
                                        <td style={{ padding: "10px", width: '5%', textAlign: 'center' }}>{li.product_id}</td>
                                        <td style={{ padding: "10px", width: '10%', textAlign: 'center' }}>Rs.{li.product_price}</td>
                                        <td style={{ padding: "10px", width: '10%', textAlign: 'center' }}>{li.comission}% </td>
                                        <td style={{ padding: "10px", width: '10%', textAlign: 'center' }}>Rs.{li.comission_amount}</td>
                                        <td style={{ padding: "10px", width: '10%', textAlign: 'center' }}>Rs.{li.pay_amount}</td>
                                        <td style={{ padding: "10px", width: '10%', textAlign: 'center' }}>{li.transaction_id}</td>
                                        <td style={{ padding: "10px", width: '20%', textAlign: 'center' }}>{li.admin_email}</td>
                                        <td style={{ padding: "10px", width: '10%', textAlign: 'center' }}>{new Date(li.paid_date).toLocaleString()}</td>
                                        <td style={{ padding: "10px", width: '10%', textAlign: 'center' }}>{li.vendor_email}</td>
                                    </tr>
                                </>)
                            })}
                        </tbody>
                    </table>
                </Box>
                {data.length == 0 &&
                    <Typography variant='h5' sx={{
                        marginTop: '70px', textAlign: 'center', color: 'rgb(245, 63, 108)',
                        fontFamily: 'verdana'
                    }}>No History found!!</Typography >}
            </Box>
        </>}
    </>)
}

export default Commission_History;