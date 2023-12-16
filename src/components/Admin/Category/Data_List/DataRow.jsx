import { Box, Typography, Button, TextField } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import DataEdit from './DataEdit';
import Loader from '../../../Loader/Loader';
import SearchIcon from '@mui/icons-material/Search';
const DataRow = (props) => {
    const [arr, setArr] = useState([]);
    const [pid, setPid] = useState('');
    const [email, setEmail] = useState('');
    const [searchval, setSearchVal] = useState('');
    //flag
    const [editflag, setEditFlag] = useState(false);
    const [loader, setLoader] = useState(false);
    useEffect(() => {
        setLoader(true);
        const catamp = (props.cat != '' && props.cat != undefined) ? props.cat.replace('&', '%26').replace(',', '%2C').replace('-', '%2D') : '';
        const subamp = (props.subcat != '' && props.subcat != undefined) ? props.subcat.replace('&', '%26').replace(',', '%2C').replace('-', '%2D') : '';
        const prodamp = (props.prodcat != '' && props.procat != undefined) ? props.prodcat.replace('&', '%26').replace(',', '%2C').replace('-', '%2D') : '';
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_product?category=${catamp}&subcategory=${subamp}&prodcategory=${prodamp}`)
            .then((data) => {
                (data.data.length > 0) ? setArr(data.data.slice()) : setArr([])
                setLoader(false);
            })
    }, [props])
    useEffect(() => {
        if (editflag == true) {
            document.getElementById('select_category').style.display = 'none';
            document.getElementById('prodid_header').style.display = 'none';
        }
    }, [editflag])
    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', width: '400px', border: '1px solid lightgrey', borderRadius: "5px", backgroundColor: 'rgb(240,240,240)', marginTop: "-140px", marginLeft: "1000px" }}>
                <SearchIcon sx={{ color: 'black', marginLeft: "10px", flex: 1, cursor: "pointer" }}
                    onClick={() => {
                        setLoader(true);
                        const catamp = (props.cat != ' ' && props.cat != undefined) ? props.cat.replace('&', '%26').replace(',', '%2C').replace('-', '%2D') : '';
                        const subcatamp = (props.subcat != '' && props.subcat != undefined) ? props.subcat.replace('&', '%26').replace(',', '%2C').replace('-', '%2D') : '';
                        const prodcatamp = (props.prodcat != '' && props.prodcat != undefined) ? props.prodcat.replace('&', '%26').replace(',', '%2C').replace('-', '%2D') : '';
                        axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_product?search=${searchval}&category=${catamp}&subcategory=${subcatamp}&prodcategory=${prodcatamp}`)
                            .then((data) => {
                                (data.data.length > 0) ? setArr(data.data.slice()) : setArr([])
                                setLoader(false)
                            })
                    }} />
                <TextField variant='outlined' type='text' placeholder='Search for Products ....' sx={{
                    flex: 11,
                    width: '450px', color: 'black', backgroundColor: 'rgb(240,240,240)', marginLeft: '10px',
                    '& fieldset': { border: 'none' }
                }} value={searchval} onChange={(e) => setSearchVal(e.target.value)} />
            </Box>
            {loader == true ? <Loader /> : <>
                <ToastContainer />
                {editflag == false && <>
                    {arr.length > 0 && <>
                        <Box sx={{ marginTop: "100px" }}></Box>
                        {arr.map((li) => {
                            return (<>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', padding: '10px', marginTop: '20px', marginLeft: '20px', backgroundColor: 'white', width: '96%' }}>
                                    <Typography sx={{ flex: 0.5, color: 'grey' }} >{li.product_id}</Typography>
                                    <img src={`data:image/png;base64,${li.image1[0]}`} alt='loading' height='130px' width='100px' style={{
                                        border: '2px solid grey', flex: 1, marginLeft: '30px', borderRadius: '10px'
                                    }} />
                                    <Typography sx={{ flex: 3, textAlign: 'center', wordBreak: 'break-word', color: 'black', marginLeft: '20px' }}>{li.description}</Typography>
                                    <Typography sx={{ flex: 3, textAlign: 'center', wordBreak: 'break-word', color: 'black', marginLeft: '10px' }} >{li.brand_name}</Typography>
                                    <Typography sx={{ flex: 1, wordBreak: 'break-word', color: 'black', paddingLeft: '0px' }}>&#8377; {li.price}</Typography>
                                    <Typography sx={{ flex: 1, wordBreak: 'break-word', color: 'black' }}><del style={{ fontFamily: 'cursive' }}>&#8377; {li.strike_price}</del></Typography>
                                    <Box sx={{ flex: 1 }}>
                                        <Button sx={{
                                            backgroundColor: 'slategrey',
                                            '&:hover': { backgroundColor: 'slategrey' }
                                        }} onClick={() => {
                                            setEmail(li.email);
                                            setPid(li.product_id)
                                            setEditFlag(true)
                                        }}><ModeEditIcon sx={{ color: 'white' }}
                                            /></Button></Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Button sx={{
                                            backgroundColor: 'slategrey', marginLeft: '10px',
                                            '&:hover': { backgroundColor: 'slategrey' }
                                        }}
                                            onClick={async () => {
                                                let confirm = await window.confirm("Are you sure you want to delete product?");
                                                if (confirm === true) {
                                                    let ans_reason = await window.prompt("Kindly mention reason for deletion", " ");
                                                    if (ans_reason.length > 3) {
                                                        setLoader(true);
                                                        const delprod = axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete_product?productid=${li.product_id}`);
                                                        const deladminprod = axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete_admin_product?productid=${li.product_id}`)
                                                        const addremovedprod = axios.post(`${process.env.REACT_APP_BACKEND_URL}/removed_product`, {
                                                            id: li.product_id,
                                                            email: li.email,
                                                            status: 'deleted',
                                                            reason: ans_reason
                                                        })
                                                        const upd_cart = axios.patch(`${process.env.REACT_APP_BACKEND_URL}/update_item_stock_cart?product_id=${li.product_id}&zero=${1}`, {
                                                            count: 0
                                                        });
                                                        const upd_wishlist = axios.patch(`${process.env.REACT_APP_BACKEND_URL}/update_item_stock_wishlist?product_id=${li.product_id}&zero=${1}`, {
                                                            count: 0
                                                        })
                                                        const upd_placeorder = axios.patch(`${process.env.REACT_APP_BACKEND_URL}/update_item_stock_placeorder?product_id=${li.product_id}&zero=${1}`, {
                                                            count: 0
                                                        })
                                                        const upd_order = axios.patch(`${process.env.REACT_APP_BACKEND_URL}/update_item_stock_order?product_id=${li.product_id}&zero=${1}`, {
                                                            count: 0
                                                        })
                                                        axios.all([delprod, deladminprod, addremovedprod, upd_cart, upd_wishlist, upd_placeorder, upd_order])
                                                            .then(axios.spread(function (proddel, adminproddel, addproddb, cart, wishlist, placeorder, order) {
                                                                toast.success('Product Deleted Successfully!', { autoClose: 3000 })
                                                                setLoader(false);
                                                            }))
                                                    }
                                                }
                                            }}><DeleteIcon sx={{ color: 'white' }} /></Button></Box>
                                </Box>
                            </>)
                        })}
                    </>}</>}
                {arr.length == 0 &&
                    <Typography variant='h5' sx={{
                        marginTop: '50px', textAlign: 'center', color: 'purple',
                        fontFamily: 'verdana'
                    }}>No Products found!!</Typography >}
                {editflag == true && <DataEdit pid={pid} email={email} adminid={props.adminid} />}
            </>}
        </>
    )
}

export default DataRow;