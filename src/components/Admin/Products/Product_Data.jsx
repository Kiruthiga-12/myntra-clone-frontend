import { Box, Typography, Button, TextField } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useState, useEffect } from 'react';
import Product_Approval from './Product_Approval';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchIcon from '@mui/icons-material/Search';
import Loader from '../../Loader/Loader';
const Product_Data = (props) => {
    const [editflag, setEditFlag] = useState(false);
    const [productid, setProductId] = useState('');
    const [arr, setArr] = useState([]);
    const [searchval, setSearchVal] = useState('');
    const product_msg = 'Displays Product List';
    const [loader, setLoader] = useState(false);
    useEffect(() => {
        toast.info('Displays Product List', { toastId: 'product_msg' })
    }, [])

    useEffect(() => {
        setLoader(true);
        const catamp = (props.cat != '' && props.cat != undefined) ? props.cat.replace('&', '%26').replace(',', '%2C').replace('-', '%2D') : '';
        const subamp = (props.subcat != '' && props.subcat != undefined) ? props.subcat.replace('&', '%26').replace(',', '%2C').replace('-', '%2D') : '';
        const prodamp = (props.prodcat != '' && props.prodcat != undefined) ? props.prodcat.replace('&', '%26').replace(',', '%2C').replace('-', '%2D') : '';
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_product?category=${catamp}&subcategory=${subamp}&prodcategory=${prodamp}`)
            .then((data) => {
                (data.data.length > 0) ? setArr(data.data.slice()) : setArr([])
                setLoader(false);
            })
    }, [props])
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
                <ToastContainer className='toastcontainer' />
                {editflag === false && arr.length > 0 && <>
                    <Box sx={{ marginTop: "100px" }}></Box>
                    {arr.map((li, index) => {
                        return (<>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', padding: '10px', marginTop: '20px', marginLeft: '20px', backgroundColor: 'white', width: '96%' }}>
                                <Typography sx={{ flex: 0.5, color: 'grey' }}>{li.product_id}</Typography>
                                <img src={`data:image/png;base64,${li.image1[0]}`} height='130px' alt='loading' style={{
                                    border: '2px solid grey', flex: 0.5, borderRadius: '10px'
                                }} />
                                <Typography sx={{ flex: 2.5, wordBreak: 'break-word', color: 'black', textAlign: 'center' }}>{li.description}  </Typography>
                                <Typography sx={{ flex: 2, wordBreak: 'break-word', color: 'black' }} >{li.brand_name} </Typography>
                                <Typography sx={{ flex: 1, wordBreak: 'break-word', color: 'black' }}>&#8377; {li.price}</Typography>
                                <Typography sx={{ flex: 1, wordBreak: 'break-word', color: 'black' }}><del style={{ fontFamily: 'cursive' }}>&#8377; {li.strike_price}</del></Typography>
                                <Typography sx={{ flex: 0.5, color: 'black', textAlign: "center" }} >4.2</Typography>
                                <Typography sx={{ flex: 1, color: 'black', wordBreak: 'break-word', textAlign: "center" }} >{li.size}</Typography>
                                <Typography sx={{ flex: 1, color: 'black', wordBreak: 'break-word', textAlign: "center" }} >{li.color}</Typography>
                                <Typography sx={{ flex: 1, color: 'black', textAlign: "center" }} >{li.count}</Typography>
                                <Box sx={{ flex: 0.5 }}>
                                    <Button sx={{
                                        backgroundColor: 'slategrey',
                                        '&:hover': { backgroundColor: 'slategrey' }
                                    }} onClick={async () => {
                                        setEditFlag(true);
                                        document.getElementById('product_header').style.display = await 'none';
                                        document.getElementById('select_category').style.display = await 'none';
                                        let pid = li.product_id;
                                        setProductId(pid);
                                    }}><ModeEditIcon sx={{ color: 'white' }} /></Button></Box>
                            </Box >
                        </>)
                    })}

                </>}
                {
                    editflag === true && productid != '' &&
                    < Product_Approval product={productid} adminid={props.adminid} />
                }
                {arr.length == 0 &&
                    <Typography variant='h5' sx={{
                        marginTop: '150px', textAlign: 'center', color: 'purple',
                        fontFamily: 'verdana'
                    }}>No Products found!!</Typography >}
            </>}
        </>
    )
}

export default Product_Data;