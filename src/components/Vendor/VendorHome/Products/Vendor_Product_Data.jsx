import { Box, Typography, Button, TextField } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Vendor_EditProduct from '../Vendor_EditProducts';
import SearchIcon from '@mui/icons-material/Search';
import Loader from '../../../Loader/Loader';
const Vendor_Product_Data = (props) => {

    const [arr, setArr] = useState([]);
    const [email, setEmail] = useState();

    //flag
    const [editflag, setEditFlag] = useState(false);
    const [pid, setPid] = useState();
    const [searchval, setSearchVal] = useState('');
    const [loader, setLoader] = useState(true)
    useEffect(() => {
        const catamp = (props.cat != '' && props.cat != undefined) ? props.cat.replace('&', '%26').replace(',', '%2C').replace('-', '%2D') : '';
        const subamp = (props.subcat != '' && props.subcat != undefined) ? props.subcat.replace('&', '%26').replace(',', '%2C').replace('-', '%2D') : '';
        const prodamp = (props.prodcat != '' && props.prodcat != undefined) ? props.prodcat.replace('&', '%26').replace(',', '%2C').replace('-', '%2D') : '';
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_product?email=${props.email}&category=${catamp}&subcategory=${subamp}&prodcategory=${prodamp}`)
            .then((data) => {
                (data.data.length > 0) ? setArr(data.data.slice()) : setArr([])
                setLoader(false);
            })
        setEmail(props.email);
    }, [props])
    return (
        <>
            {loader == true ? <Loader /> : <>
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
                {
                    arr.length > 0 && editflag === false && <>
                        <Box sx={{ marginTop: "100px" }}></Box>
                        {arr.map((li, index) => {
                            return (<>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', padding: '10px', marginTop: '20px', marginLeft: '20px', backgroundColor: 'white', width: '96%' }}>
                                    <Typography sx={{ flex: 0.5, color: 'grey' }}>{li.product_id}</Typography>
                                    <img src={`data:image/png;base64,${li.image1[0]}`} height='130px' style={{
                                        border: '2px solid grey', flex: 1, borderRadius: '10px'
                                    }} alt='loading' />
                                    <Typography sx={{ flex: 2.5, wordBreak: 'break-word', color: 'black', textAlign: 'center' }}>{li.description}   </Typography>
                                    <Typography sx={{ flex: 1, wordBreak: 'break-word', color: 'black', textAlign: "center", color: 'white', backgroundColor: 'green', padding: '4px 2px' }} >{li.product_status}</Typography>
                                    <Typography sx={{ flex: 1, wordBreak: 'break-word', color: 'black', textAlign: "center" }}>&#8377; {li.price}</Typography>
                                    <Typography sx={{ flex: 1, wordBreak: 'break-word', color: 'black', textAlign: "center" }}><del style={{ fontFamily: 'cursive' }}>&#8377; {li.strike_price}</del></Typography>
                                    <Typography sx={{ flex: 1, color: 'black', textAlign: "center" }} >4</Typography>
                                    <Typography sx={{ flex: 1, color: 'black', wordBreak: 'break-word', textAlign: "center" }} >{li.product_keyword}</Typography>
                                    <Typography sx={{ flex: 1, color: 'black', wordBreak: 'break-word', textAlign: "center" }} >{new Date(li.product_date).toLocaleString('hi-EN').toLocaleUpperCase()}</Typography>
                                    <Typography sx={{ flex: 1.5, color: 'black', textAlign: "center" }} >
                                        <span style={{ color: 'green' }}>  InStock({li.count})</span>
                                        <br></br>
                                    </Typography>
                                    <Box sx={{ flex: 0.5 }}>
                                        <Button sx={{
                                            backgroundColor: 'slategrey',
                                            '&:hover': { backgroundColor: 'slategrey' }
                                        }} onClick={() => {
                                            setPid(li.product_id)
                                            setEditFlag(true);
                                            document.getElementById('vendor_product_header').style.display = 'none';
                                            document.getElementById('select_category').style.display = 'none';
                                        }}><ModeEditIcon sx={{ color: 'white' }} /></Button></Box>
                                </Box>
                            </>)
                        })}
                    </>
                }
                {editflag === true && <Vendor_EditProduct pid={pid} email={email} />}
                {arr.length == 0 &&
                    <Typography variant='h5' sx={{
                        marginTop: '150px', textAlign: 'center', color: 'rgb(245, 63, 108)',
                        fontFamily: 'verdana'
                    }}>No Products found!!</Typography >}
            </>}
        </>
    )
}

export default Vendor_Product_Data;