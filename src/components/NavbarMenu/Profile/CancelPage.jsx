import axios from 'axios';
import { useEffect, useState } from 'react';
import { Typography, Box, Button } from '@mui/material';
import Loader from '../../Loader/Loader';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const CancelPage = (props) => {
    const [proddet, setProdDetails] = useState([]);
    const [loader, setLoader] = useState(true);
    const [reason, setReason] = useState('');
    const [iterate, setIterate] = useState(0);
    const [disab, setDisab] = useState(false);
    useEffect(() => {
        document.title = 'Cancel Items';
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_order?order_id=${props.cancel_orderid}`)
            .then((data) => {
                (data.data.length > 0) ? setProdDetails(data.data.slice()) : setProdDetails([]);
                setLoader(false);
            })
    }, [])
    useEffect(() => {
        if ((iterate == proddet.length) && (proddet.length > 0)) {
            toast.success('Items cancelled successfully!!', {
                autoClose: 3000
            });
            setDisab(true);
        }
    }, [iterate, proddet])
    return (<>
        {loader == true ? <Loader /> : <>
            <ToastContainer />
            <Typography sx={{ padding: "15px", fontWeight: "bold", fontSize: "20px" }}>Cancel Items</Typography>
            <Box sx={{ padding: "15px", marginTop: "20px", border: "1px solid grey", borderRadius: "5px", width: "600px" }}>
                {proddet.map((li) => {
                    return (<>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <img src={`data:image/png;base64,${li.image1}`} width='100px' height='100px' alt='loading' />
                            <Box sx={{ flex: 8, marginLeft: "20px" }}>
                                <Typography sx={{ fontWeight: "bold" }}>{li.description}</Typography>
                                <Typography sx={{ color: "maroon" }}>Rs.{li.price}</Typography>
                                <Typography>Qty {li.qty}</Typography>
                            </Box>
                        </Box>
                        <hr />
                    </>)
                })}
            </Box>
            <Typography sx={{ marginTop: "20px", textDecoration: "underline", fontWeight: "bold" }}>Reason for cancellation (optional)</Typography>
            <textarea onChange={(e) => setReason(e.target.value)} placeholder='Enter your comments ....' style={{ marginTop: "10px", padding: "15px", outline: "none" }}
                rows={3} cols={50} value={reason}></textarea>
            <br></br>
            <Button disabled={disab} sx={{ marginTop: "20px", textTransform: "none", fontSize: "16px" }} disableTouchRipple
                onClick={(e) => {
                    axios.patch(`${process.env.REACT_APP_BACKEND_URL}/update_order_status?user_id=${props.userid}&order_id=${props.cancel_orderid}`, {
                        'order_status': 'cancelled',
                        'cancelled_date': new Date(),
                        'total_amount': proddet[0].total_amount,
                        'usermail': proddet[0].user_email,
                        'orderid': proddet[0].order_id,
                        'total_items': proddet[0].total_items,
                        'username': proddet[0].user_name
                    })
                        .then((data) => { })

                    proddet.map(async (li) => {
                        await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/update_item_stock_cart?increase=${1}&product_id=${li.product_id}`, {
                            'count': Number(li.count) + 1
                        })
                            .then((data) => { })
                        await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/update_item_stock_wishlist?increase=${1}&product_id=${li.product_id}`, {
                            'count': Number(li.count) + 1
                        })
                            .then((data) => { })
                        await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/update_item_stock_order?increase=${1}&product_id=${li.product_id}`, {
                            'count': Number(li.count) + 1
                        })
                            .then((data) => { })
                        await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/update_item_stock_placeorder?increase=${1}&product_id=${li.product_id}`, {
                            'count': Number(li.count) + 1
                        })
                            .then((data) => { })
                        await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/update_item_stock_product?increase=${1}&product_id=${li.product_id}`, {
                            'count': Number(li.count) + 1
                        })
                            .then((data) => {
                                if (data.data.modifiedCount == 1)
                                    setIterate(iterate => iterate + 1)
                            })
                    })
                }}>Cancel Items</Button>

            <Typography sx={{ fontWeight: "bold", marginTop: '50px' }}>Note:</Typography>
            <Typography sx={{ margintop: "20px" }}> If your order is combined with other active orders from your account and is shipped as a single shipment (common tracking number), then cancelling one order/item would result in cancellation of all the other orders/items combined in the shipment.</Typography>
        </>}
    </>)
}
export default CancelPage;