import { useState, useEffect } from 'react';
import { Box, Typography, TextField, MenuItem, Select, Button } from '@mui/material';
import axios from 'axios';
import Product_Edit_Details from './Product_Edit_Details';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../Loader/Loader';
const Product_Approval = (props) => {

    //flags
    const [editflag, setEditFlag] = useState(false)
    const [disab1, setDisable1] = useState(true)
    const [disab2, setDisable2] = useState(false)
    const [disab3, setDisable3] = useState(false)
    //storing value
    const [product_id, setProductId] = useState('');
    const [comp_name, setCompName] = useState('');
    const [brand_name, setBrandName] = useState('');
    const [category, setCategory] = useState('');
    const [sub_category, setSubCategory] = useState('');
    const [product, setProduct] = useState('');
    const [strike_price, setStrikePrice] = useState('');
    const [discount, setDiscount] = useState('');
    const [price, setPrice] = useState('');
    const [color, setColor] = useState('');
    const [description, setDescription] = useState('');
    const [size, setSize] = useState('');
    const [qty, setQty] = useState('');
    const [item_stock, setItemStock] = useState(0);
    const [product_status, setProductStatus] = useState('');
    const [product_keyword, setProductKeyword] = useState('');
    const [product_date, setProductDate] = useState('');
    const [fabric, setFabric] = useState('');
    const [pattern, setPattern] = useState('');
    const [neck, setNeck] = useState('');
    const [sleeve_length, setSleeveLength] = useState('');
    const [size_fit, setSizeFit] = useState('');
    const [occasion, setOccasion] = useState('');
    const [main_trend, setMainTrend] = useState('');
    const [wash_care, setWashCare] = useState('');
    const [closure, setClosure] = useState('');
    const [complete_look, setCompleteLook] = useState('');
    const [reason, setReason] = useState('');
    const [status, setStatus] = useState('');
    const [image1, setImage1] = useState();
    const [image2, setImage2] = useState();
    const [image3, setImage3] = useState();
    const [image4, setImage4] = useState();
    const [image5, setImage5] = useState();
    const [image6, setImage6] = useState();
    const [email, setEmail] = useState();
    const [vendor_id, setVendorId] = useState(0);
    const product_apr = 'Products can be approved/rejected/edited. If Product already approved, you can deleete product';
    const [loader, setLoader] = useState(true);
    useEffect(() => {
        async function pwd1() {
            await axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_product_product_id?product_id=${props.product}`)
                .then((data) => {
                    setLoader(false);
                    if (data.data.length > 0)
                        if (data.data[0].email != undefined) {
                            setEmail(data.data[0].email);
                            setProductId(data.data[0].product_id)
                            setCompName(data.data[0].comp_name);
                            setBrandName(data.data[0].brand_name);
                            setCategory(data.data[0].category);
                            setSubCategory(data.data[0].subcategory);
                            setProduct(data.data[0].product);
                            setStrikePrice(data.data[0].strike_price);
                            setDiscount(data.data[0].discount);
                            setPrice(data.data[0].price);
                            setColor(data.data[0].color);
                            setDescription(data.data[0].description);
                            setSize(data.data[0].size);
                            setQty(data.data[0].quantity);
                            setItemStock(data.data[0].count);
                            setProductStatus(data.data[0].product_status);
                            setStatus(data.data[0].product_status);
                            setProductKeyword(data.data[0].product_keywords);
                            setProductDate(new Date(data.data[0].product_date).toLocaleString('hi-EN').toLocaleUpperCase());
                            setFabric(data.data[0].fabric)
                            setPattern(data.data[0].pattern);
                            setNeck(data.data[0].neck);
                            setSleeveLength(data.data[0].sleeve_length);
                            setSizeFit(data.data[0].size_fit);
                            setOccasion(data.data[0].occasion);
                            setMainTrend(data.data[0].main_trend);
                            setWashCare(data.data[0].wash_care);
                            setClosure(data.data[0].closure)
                            setCompleteLook(data.data[0].complete_look)
                            setImage1(`data:image/png;base64,${data.data[0].image1[0]}`);
                            setImage2(`data:image/png;base64,${data.data[0].image1[1]}`);
                            setImage3(`data:image/png;base64,${data.data[0].image1[2]}`);
                            setImage4(`data:image/png;base64,${data.data[0].image1[3]}`);
                            setImage5(`data:image/png;base64,${data.data[0].image1[4]}`);
                            setImage6(`data:image/png;base64,${data.data[0].image1[5]}`);
                        }
                })
        }

        if (props.email != ' ') {
            pwd1();
        }
        toast.info('Products can be approved/rejected/edited. If Product already approved, you can delete product',
            { toastId: 'product_apr' })
    }, [])
    useEffect(() => {
        if (email != undefined)
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/vendor_details?email=${email}`)
                .then((data) => {
                    (data.data[0].vendor_id != undefined) ? setVendorId(data.data[0].vendor_id) : setVendorId()
                })
    }, [email])
    useEffect(() => {
        if (status.length > 0 && status !== 'submitted' && status !== 'resubmitted' && reason.length > 0 && reason != ' ') {
            setDisable1(false);
            setDisable2(true);
            setDisable3(true);
        }
        else if (status.length == 0 && status === 'submitted' && status === 'resubmitted' && reason.length == 0 && reason == ' ') {
            setDisable1(true);
            setDisable2(false);
            setDisable3(true);
        }
    }, [status, reason])
    useEffect(() => {
        setProductDate(new Date())
    }, [comp_name, brand_name, category, sub_category, product, strike_price, discount, price, color, description, size, qty, product_keyword])
    return <>
        {loader == true ? <Loader /> : <>
            <ToastContainer />
            {editflag === false &&
                <>
                    <Box sx={{
                        marginTop: '100px', marginLeft: '30px', marginRight: '30px', backgroundColor: 'white',
                        padding: '15px 25px', boxShadow: '2px 2px 2px black'
                    }}>
                        <Typography sx={{ padding: '1px 20px', fontSize: '20px', fontFamily: 'cursive', color: 'white', backgroundColor: 'purple', width: '150px' }}>View Details
                        </Typography>
                        <Typography sx={{ marginTop: '30px', color: 'blue', fontFamily: "cursive", fontSize: '16px' }} >Product Id : <TextField value={product_id} variant='standard' sx={{ marginLeft: '40px' }} color='success' /></Typography>
                        <Typography sx={{ marginTop: '20px', color: 'blue', fontFamily: "cursive", fontSize: '16px' }} >Company Name : <TextField value={comp_name} variant='standard' sx={{ marginLeft: '40px' }} color='success' /></Typography>
                        <Typography sx={{ marginTop: '20px', color: 'blue', fontFamily: "cursive", fontSize: '16px' }}>Brand Name :  <TextField value={brand_name} variant='standard' sx={{ marginLeft: '40px' }} color='success' /></Typography>
                        <Typography sx={{ marginTop: '20px', color: 'blue', fontFamily: "cursive", fontSize: '16px' }}>Category :
                            <TextField value={category} variant='standard' sx={{ marginLeft: '40px' }} color='success' /></Typography>
                        <Typography sx={{ marginTop: '30px', color: 'blue', fontFamily: "cursive", fontSize: '16px' }} >Sub Category : <TextField value={sub_category} variant='standard' sx={{ marginLeft: '40px' }} color='success' /></Typography>
                        <Typography sx={{ marginTop: '20px', color: 'blue', fontFamily: "cursive", fontSize: '16px' }}>Product :  <TextField value={product} variant='standard' sx={{ marginLeft: '40px' }} color='success' /></Typography>
                        <Typography sx={{ marginTop: '20px', color: 'blue', fontFamily: "cursive", fontSize: '16px' }}>Strike Price :
                            <TextField value={strike_price} variant='standard' sx={{ marginLeft: '40px' }} color='success' /></Typography>
                        <Typography sx={{ marginTop: '30px', color: 'blue', fontFamily: "cursive", fontSize: '16px' }} >Discount : <TextField value={discount} variant='standard' sx={{ marginLeft: '40px' }} color='success' /></Typography>
                        <Typography sx={{ marginTop: '20px', color: 'blue', fontFamily: "cursive", fontSize: '16px' }}>Price :  <TextField value={price} variant='standard' sx={{ marginLeft: '40px' }} color='success' /></Typography>
                        <Typography sx={{ marginTop: '20px', color: 'blue', fontFamily: "cursive", fontSize: '16px' }}>Color :
                            <TextField value={color} variant='standard' sx={{ marginLeft: '40px' }} color='success' /></Typography>
                        <Typography sx={{ marginTop: '30px', color: 'blue', fontFamily: "cursive", fontSize: '16px' }} >Description : <TextField value={description} variant='standard' sx={{ marginLeft: '40px' }} color='success' /></Typography>
                        <Typography sx={{ marginTop: '20px', color: 'blue', fontFamily: "cursive", fontSize: '16px' }}>Size :  <TextField value={size} variant='standard' sx={{ marginLeft: '40px' }} color='success' /></Typography>
                        <Typography sx={{ marginTop: '20px', color: 'blue', fontFamily: "cursive", fontSize: '16px' }}>Image1 :  </Typography>
                        <img src={image1} width='150px' height='100px' style={{ marginTop: '10px' }} alt='loading' />
                        <Typography sx={{ marginTop: '20px', color: 'blue', fontFamily: "cursive", fontSize: '16px' }}>Image2 :  </Typography>
                        <img src={image2} width='150px' height='100px' style={{ marginTop: '10px' }} alt='loading' />
                        <Typography sx={{ marginTop: '20px', color: 'blue', fontFamily: "cursive", fontSize: '16px' }}>Image3 :  </Typography>
                        <img src={image3} width='150px' height='100px' style={{ marginTop: '10px' }} alt='loading' />
                        <Typography sx={{ marginTop: '20px', color: 'blue', fontFamily: "cursive", fontSize: '16px' }}>Image4 :  </Typography>
                        <img src={image4} width='150px' height='100px' style={{ marginTop: '10px' }} alt='loading' />
                        <Typography sx={{ marginTop: '20px', color: 'blue', fontFamily: "cursive", fontSize: '16px' }}>Image5 :  </Typography>
                        <img src={image5} width='150px' height='100px' style={{ marginTop: '10px' }} alt='loading' />
                        <Typography sx={{ marginTop: '20px', color: 'blue', fontFamily: "cursive", fontSize: '16px' }}>Image6 :  </Typography>
                        <img src={image6} width='150px' height='100px' style={{ marginTop: '10px' }} alt='loading' />
                        <Typography sx={{ marginTop: '20px', color: 'blue', fontFamily: "cursive", fontSize: '16px' }}>Quantity :
                            <TextField value={qty} variant='standard' sx={{ marginLeft: '40px' }} color='success' /></Typography>
                        <Typography sx={{ marginTop: '20px', color: 'blue', fontFamily: "cursive", fontSize: '16px' }}>Item in Stock :
                            <TextField value={item_stock} variant='standard' sx={{ marginLeft: '40px' }} color='success' /></Typography>
                        <Typography sx={{ marginTop: '30px', color: 'blue', fontFamily: "cursive", fontSize: '16px' }} >Product Status : <TextField value={product_status} variant='standard' sx={{ marginLeft: '40px' }} color='success' /></Typography>
                        <Typography sx={{ marginTop: '20px', color: 'blue', fontFamily: "cursive", fontSize: '16px' }}>Product Keywords :  <TextField value={product_keyword} variant='standard' sx={{ marginLeft: '40px' }} color='success' /></Typography>
                        <Typography sx={{ marginTop: '20px', color: 'blue', fontFamily: "cursive", fontSize: '16px' }}>Product Date : <TextField value={product_date} variant='standard' sx={{ marginLeft: '40px' }} color='success' /></Typography>
                        <Typography sx={{ marginTop: '20px', color: 'blue', fontFamily: "cursive", fontSize: '16px' }}>Fabric : <TextField value={fabric} variant='standard' sx={{ marginLeft: '40px' }} color='success' /></Typography>
                        <Typography sx={{ marginTop: '20px', color: 'blue', fontFamily: "cursive", fontSize: '16px' }}>Pattern : <TextField value={pattern} variant='standard' sx={{ marginLeft: '40px' }} color='success' /></Typography>
                        <Typography sx={{ marginTop: '20px', color: 'blue', fontFamily: "cursive", fontSize: '16px' }}>Neck : <TextField value={neck} variant='standard' sx={{ marginLeft: '40px' }} color='success' /></Typography>
                        <Typography sx={{ marginTop: '20px', color: 'blue', fontFamily: "cursive", fontSize: '16px' }}>Sleeve Length : <TextField value={sleeve_length} variant='standard' sx={{ marginLeft: '40px' }} color='success' /></Typography>
                        <Typography sx={{ marginTop: '20px', color: 'blue', fontFamily: "cursive", fontSize: '16px' }}>Size Fit : <TextField value={size_fit} variant='standard' sx={{ marginLeft: '40px', width: '300px' }} color='success' /></Typography>
                        <Typography sx={{ marginTop: '20px', color: 'blue', fontFamily: "cursive", fontSize: '16px' }}>Occasion : <TextField value={occasion} variant='standard' sx={{ marginLeft: '40px' }} color='success' /></Typography>
                        <Typography sx={{ marginTop: '20px', color: 'blue', fontFamily: "cursive", fontSize: '16px' }}>Main trend : <TextField value={main_trend} variant='standard' sx={{ marginLeft: '40px' }} color='success' /></Typography>
                        <Typography sx={{ marginTop: '20px', color: 'blue', fontFamily: "cursive", fontSize: '16px' }}>Wash Care : <TextField value={wash_care} variant='standard' sx={{ marginLeft: '40px' }} color='success' /></Typography>
                        <Typography sx={{ marginTop: '20px', color: 'blue', fontFamily: "cursive", fontSize: '16px' }}>Closure : <TextField value={closure} variant='standard' sx={{ marginLeft: '40px' }} color='success' /></Typography>
                        <Typography sx={{ marginTop: '20px', color: 'blue', fontFamily: "cursive", fontSize: '16px' }}>Complete Look : <TextField value={complete_look} variant='standard' sx={{ marginLeft: '40px', width: '1000px' }} color='success' /></Typography>
                    </Box>
                    <br></br>
                    <br></br>
                    < Box sx={{
                        marginTop: '20px', marginLeft: '30px', marginRight: '30px', backgroundColor: 'white',
                        padding: '15px 25px', boxShadow: '2px 2px 2px black'
                    }}>
                        <Typography sx={{ padding: '1px 20px', fontSize: '20px', fontFamily: 'cursive', color: 'white', backgroundColor: 'purple', width: '150px' }}>Product Status
                        </Typography>
                        <Typography sx={{ marginTop: '30px', color: 'blue', fontFamily: "cursive", fontSize: '16px' }} >Status : </Typography>
                        <Select value={status} variant='standard' sx={{ marginTop: "20px", width: '150px' }}
                            onChange={(e) => setStatus(e.target.value)}>
                            <MenuItem value='approved'>approved</MenuItem>
                            <MenuItem value='rejected'>rejected</MenuItem>
                            <MenuItem value='submitted' InputProps={{readOnly:true}}>submitted</MenuItem>
                            <MenuItem value='resubmitted' InputProps={{readOnly:true}}>resubmitted</MenuItem>
                        </Select>
                        <br></br>
                        <textarea style={{ padding: '5px 10px', marginTop: '20px', width: '500px', height: "100px", resize: 'vertical', maxHeight: "150px", outline: "none" }}
                            onChange={(e) => setReason(e.target.value)} placeholder='Please Enter your comments...'
                            id='product_comments' value={reason}></textarea>
                        <br></br>
                    </Box >
                    <br></br>
                    <br></br>
                    <Button sx={{ marginLeft: '30px', padding: '5px 20px', color: "white", backgroundColor: 'blue', '&:hover': { color: 'white', backgroundColor: 'blue' } }}
                        disabled={disab1}
                        onClick={async () => {
                            setLoader(true);
                            const adminprodapproval = axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin_product_approval`, {
                                admin_id: props.adminid,
                                vendor_id: vendor_id,
                                email: email,
                                status: status,
                                reason: reason,
                                product_id: product_id
                            })
                            const approveproduct = axios.patch(`${process.env.REACT_APP_BACKEND_URL}/add_product`, {
                                email: email,
                                product_id: product_id,
                                product_status: status,
                                product_date: new Date(product_date)
                            })
                            await axios.all([adminprodapproval, approveproduct])
                                .then(axios.spread(function (adminapr, aprprod) {
                                    if ((adminapr.data.product_id != undefined) && (aprprod.data.modifiedCount == 1)) {
                                        toast.success(`Product ${status} successfully!`, { autoClose: 3000 })
                                    }
                                    else {
                                        setDisable1(true);
                                        toast.error('Error! Please retry', { autoClose: 3000 })
                                    }
                                    setLoader(false);
                                }))

                        }}>Approve/ Reject</Button>
                    <Button sx={{ marginLeft: '30px', padding: '5px 20px', color: "white", backgroundColor: 'blue', '&:hover': { color: 'white', backgroundColor: 'blue' } }}
                        disabled={disab2} onClick={() => {
                            setEditFlag(true);
                            setDisable2(true)
                        }} >Edit Details</Button>
                    <Button sx={{ marginLeft: '30px', padding: '5px 20px', color: "white", backgroundColor: 'blue', '&:hover': { color: 'white', backgroundColor: 'blue' } }}
                        disabled={disab3}
                        onClick={async () => {
                            await setDisable2(true);
                            let confirm = await window.confirm("Are you sure you want to delete product?");
                            if (confirm === true) {
                                let ans_reason = await window.prompt("Kindly mention reason for deletion", " ");
                                if (ans_reason.length > 3) {
                                    setLoader(true);
                                    const admin_del_prod = axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete_admin_product?productid=${product_id}`)
                                    const del_prod = axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete_product?productid=${product_id}`)
                                    const add_removeddb = axios.post(`${process.env.REACT_APP_BACKEND_URL}/removed_product`, {
                                        id: product_id,
                                        email: email,
                                        status: 'deleted',
                                        reason: ans_reason
                                    })
                                    const upd_cart = axios.patch(`${process.env.REACT_APP_BACKEND_URL}/update_item_stock_cart?product_id=${product_id}&zero=${1}`, {
                                        count: 0
                                    });
                                    const upd_wishlist = axios.patch(`${process.env.REACT_APP_BACKEND_URL}/update_item_stock_wishlist?product_id=${product_id}&zero=${1}`, {
                                        count: 0
                                    })
                                    const upd_placeorder = axios.patch(`${process.env.REACT_APP_BACKEND_URL}/update_item_stock_placeorder?product_id=${product_id}&zero=${1}`, {
                                        count: 0
                                    })
                                    const upd_order = axios.patch(`${process.env.REACT_APP_BACKEND_URL}/update_item_stock_order?product_id=${product_id}&zero=${1}`, {
                                        count: 0
                                    })
                                    axios.all([admin_del_prod, del_prod, add_removeddb, upd_cart, upd_wishlist, upd_placeorder, upd_order])
                                        .then(axios.spread(function (adminproddel, proddel, addproddb, cart, wishlist, placeorder, order) {
                                            toast.success('Product Deleted Successfully!', { autoClose: 3000 })
                                            setLoader(false);
                                        }))
                                }
                            }
                        }}>Delete Details</Button>
                    <br></br>
                    <br></br>
                </>
            }
            {editflag === true && <Product_Edit_Details product={product_id} email={email} adminid={props.adminid} />}
        </>}
    </>
}

export default Product_Approval;
