import { Box, Typography } from "@mui/material";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from "../../Loader/Loader";
const Vendor_Dashboard = (props) => {
    const [status, setStatus] = useState('');
    const [name, setName] = useState('');
    const [total_products, setProducts] = useState('');
    const [image, setImage] = useState();
    const [email, setEmail] = useState('');
    const [loader, setLoader] = useState(true);
    const [active_order, setActiveOrder] = useState();
    const [pending_order, setPendingOrder] = useState();
    const [delivered_order, setDeliveredOrder] = useState();
    const [cancelled_order, setCancelledOrder] = useState();
    const [sales_amt, setSalesAmount] = useState(0);
    useEffect(() => {
        setEmail(props.email);
    }, [])
    useEffect(() => {
        setName(props.firstname + " " + props.lastname)
        setImage(props.image)
        setStatus(props.status)
        const total = axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_product_email_cnt?email=${email}`);
        const active = axios.get(`${process.env.REACT_APP_BACKEND_URL}/order_status_cnt?order_status=confirmed&vendor_email=${props.email}`);
        const delivered = axios.get(`${process.env.REACT_APP_BACKEND_URL}/order_status_cnt?order_status=delivered&vendor_email=${props.email}`)
        const cancelled = axios.get(`${process.env.REACT_APP_BACKEND_URL}/order_status_cnt?order_status=cancelled&vendor_email=${props.email}`);
        const pending = axios.get(`${process.env.REACT_APP_BACKEND_URL}/order_status_cnt?pending=pending&vendor_email=${props.email}`);
        const sales = axios.get(`${process.env.REACT_APP_BACKEND_URL}/vendor_sales_amount?vendor_email=${props.email}`)

        axios.all([total, active, delivered, cancelled, pending, sales])
            .then(axios.spread(function (tot, act, del, can, pen, sal) {
                (tot.data.data > 0) ? setProducts(tot.data.data) : setProducts(0);
                (act.data.data.length > 0) ? setActiveOrder(act.data.data.length) : setActiveOrder(0);
                (del.data.data.length > 0) ? setDeliveredOrder(del.data.data.length) : setDeliveredOrder(0);
                (can.data.data.length > 0) ? setCancelledOrder(can.data.data.length) : setCancelledOrder(0);
                (pen.data.data.length > 0) ? setPendingOrder(pen.data.data.length) : setPendingOrder(0);
                (sal.data.length > 0) ? setSalesAmount(sal.data[0].count) : setSalesAmount(0);
                setLoader(false);
            }))
    }, [email])
    return (<>
        {loader == true ? <Loader /> : <>
            <Box sx={{ marginTop: '10px', marginLeft: '20px', maxWidth: '97%', backgroundColor: 'rgb(185, 245, 130)', display: 'flex', alignItems: 'center', height: '170px' }}>
                <img src={image} width='150px' height='150px' alt='loading' style={{ marginLeft: '40px', borderRadius: '50%' }} />
                <Typography sx={{ marginLeft: '40px', flex: 7, fontFamily: 'TimesNewRoman', fontWeight: 'bold', fontSize: '22px' }}>{name}</Typography>
                <Typography sx={{ flex: 3, marginLeft: '20px', fontWeight: 'bolder' }}>Register Status: <span style={{ color: 'white', backgroundColor: 'green', padding: '5px 10px' }}>{status}</span></Typography>
            </Box>
            <Box sx={{ marginTop: '20px', marginLeft: '20px', maxWidth: '97%', backgroundColor: 'rgb(123,234,190)', display: 'flex', flexWrap: 'wrap', height: '320px', paddingTop: '20px' }}>
                <Box sx={{
                    width: '250px', border: '1px solid grey', borderRadius: '10px', backgroundColor: "rgb(248, 248, 125)", height: '100px', textAlign: "center", margin: '10px', boxShadow: '2px 2px 10px black',
                    animationName: 'ani1', animationDuration: "2s", animationTimingFunction: 'linear', animationIterationCount: 'infinite',
                    '@keyframes ani1': {
                        '0%': {
                            transform: 'rotate(-10deg)'
                        },
                        '50%': {
                            transform: 'rotate(10deg)'
                        },
                        '100%': {
                            transform: 'rotate(0deg)'
                        }
                    }
                }}>
                    <Typography sx={{ fontSize: '25px', fontFamily: 'TimesNewRoman' }}>Total Sales Amount</Typography>
                    <Typography sx={{ fontSize: '20px', marginTop: '10px', fontFamily: 'cursive' }}>&#8377; {sales_amt}</Typography>
                </Box>
                <Box sx={{
                    width: '250px', border: '1px solid grey', borderRadius: '10px', backgroundColor: "rgb(179, 179, 243)", height: '100px', textAlign: "center", margin: '10px', boxShadow: '2px 2px 10px black'

                }}>
                    <Typography sx={{ fontSize: '25px', fontFamily: 'TimesNewRoman' }}>Total Products</Typography>
                    <Typography sx={{ fontSize: '20px', marginTop: '10px', fontFamily: 'cursive' }}>{total_products}</Typography>
                </Box>
                <Box sx={{
                    width: '250px', border: '1px solid grey', borderRadius: '10px', backgroundColor: "rgb(247, 89, 247)", height: '100px', textAlign: "center", margin: '10px', boxShadow: '2px 2px 10px black'
                }}>
                    <Typography sx={{ fontSize: '25px', fontFamily: 'TimesNewRoman' }}>Total  Active Orders</Typography>
                    <Typography sx={{ fontSize: '20px', marginTop: '10px', fontFamily: 'cursive' }}>{active_order}</Typography>
                </Box>
                <Box sx={{
                    width: '250px', border: '1px solid grey', borderRadius: '10px', backgroundColor: "rgb(169, 247, 169)", height: '100px', textAlign: "center", margin: '10px', boxShadow: '2px 2px 10px black',
                    animationName: 'ani1', animationDuration: "2s", animationTimingFunction: 'linear', animationIterationCount: 'infinite',
                    '@keyframes ani1': {
                        '0%': {
                            transform: 'rotate(-10deg)'
                        },
                        '50%': {
                            transform: 'rotate(10deg)'
                        },
                        '100%': {
                            transform: 'rotate(0deg)'
                        }
                    }
                }}>
                    <Typography sx={{ fontSize: '25px', fontFamily: 'TimesNewRoman' }}>Total Delivered Orders</Typography>
                    <Typography sx={{ fontSize: '20px', marginTop: '10px', fontFamily: 'cursive' }}> {delivered_order}</Typography>
                </Box>
                <Box sx={{ width: '250px', border: '1px solid grey', borderRadius: '10px', backgroundColor: "rgb(250, 154, 99)", height: '100px', textAlign: "center", margin: '10px', boxShadow: '2px 2px 10px black' }}>
                    <Typography sx={{ fontSize: '25px', fontFamily: 'TimesNewRoman' }}>Total Pending Orders</Typography>
                    <Typography sx={{ fontSize: '20px', marginTop: '10px', fontFamily: 'cursive' }}>{pending_order}</Typography>
                </Box>
                <Box sx={{
                    width: '250px', border: '1px solid grey', borderRadius: '10px', backgroundColor: "royalblue", height: '100px', textAlign: "center", margin: '10px', boxShadow: '2px 2px 10px black'
                }}>
                    <Typography sx={{ fontSize: '25px', fontFamily: 'TimesNewRoman' }}>Total Cancelled Orders</Typography>
                    <Typography sx={{ fontSize: '20px', marginTop: '10px', fontFamily: 'cursive' }}>{cancelled_order}</Typography>
                </Box>
            </Box>
            <br></br>
            <br></br>
            <br></br>
        </>}
    </>)
}

export default Vendor_Dashboard;