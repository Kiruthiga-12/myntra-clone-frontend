import { Typography, Box, TextField, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../Loader/Loader';
const Top_Picks = () => {
    const [top_pick, getTopPick] = useState([])
    const [toppicklist, getTopPickList] = useState([]) //async values
    const [count, setCount] = useState(0)
    //show list
    const [showtoppicklist, setTopPickList] = useState(false);
    const [loader, setLoader] = useState(true);
    const [iterate, setIterate] = useState(0);
    const [inccnt, setIncCnt] = useState(0);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/toppick`)
            .then((data) => {
                (data.data.length > 0) ? getTopPick(data.data.slice()) : getTopPick([])
                setLoader(false);
            })
    }, [])
    useEffect(() => {
        if (inccnt > 0) {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/delete_toppick_list`)
                .then((data) => { })
        }
    }, [inccnt])
    useEffect(() => {
        if (showtoppicklist == true || iterate != 0) {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_toppick`)
                .then(async (data) => {
                    (data.data.length > 0) ? getTopPickList(data.data.slice()) : getTopPickList([])
                    setLoader(false);
                })
        }
    }, [showtoppicklist, iterate])
    return <>
        {loader == true ? <Loader /> : <>
            <ToastContainer />
            {showtoppicklist == false && <>
                <Typography variant='h4' sx={{ marginLeft: "40px", marginTop: '30px', color: 'blueviolet' }}>Top Picks</Typography>
                {top_pick.length == 0 &&
                    <Typography variant='h5' sx={{
                        marginTop: '50px', textAlign: 'center', color: 'purple',
                        fontFamily: 'verdana'
                    }}>No data found!!</Typography >}
                {top_pick.length > 0 && top_pick.map((li, index) => {
                    return (<>
                        <Box sx={{ backgroundColor: 'white', boxShadow: '2px 2px 2px black', marginTop: '30px', marginLeft: "40px", padding: '20px 30px', width: '800px' }}>
                            <Typography sx={{ color: 'rgb(243, 66, 140)', fontFamily: "cursive", fontSize: '20px' }}>Details {index + 1}</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box sx={{ flex: 8 }}>
                                    <TextField type='text' variant='standard' color='secondary' sx={{ marginTop: '10px' }} value={`Product Id: ${li.product_id}`} inputProps={{ readOnly: true }} />
                                    <TextField type='text' variant='standard' color='secondary' sx={{ marginTop: '10px', marginLeft: '30px' }} value={`Category: ${li.category}`} inputProps={{ readOnly: true }} />
                                    <TextField type='text' variant='standard' color='secondary' sx={{ marginTop: '10px', marginLeft: '30px' }} value={`Sub category : ${li.subcategory}`} inputProps={{ readOnly: true }} />
                                    <TextField type='text' variant='standard' color='secondary' sx={{ marginTop: '10px' }} value={`Product: ${li.product}`} inputProps={{ readOnly: true }} />
                                    <TextField type='text' variant='standard' color='secondary' sx={{ marginTop: '10px', marginLeft: '30px' }} value={`Price : ${li.price}`} inputProps={{ readOnly: true }} />
                                    <TextField type='text' variant='standard' color='secondary' sx={{ marginTop: '10px', marginLeft: '30px' }} value={`Brand: ${li.brand_name}`} inputProps={{ readOnly: true }} />
                                    <TextField type='text' variant='standard' color='secondary' sx={{ marginTop: '10px' }} value={`Description: ${li.description}`} inputProps={{ readOnly: true }} />
                                    <TextField type='text' variant='standard' color='secondary' sx={{ marginTop: '10px', marginLeft: '30px' }} value={`Rating : ${li.rating}`} inputProps={{ readOnly: true }} />
                                    <Button sx={{
                                        marginTop: '30px', marginLeft: '40px', textTransform: "none", color: "white",
                                        backgroundColor: 'rgb(243, 66, 140)', '&:hover': {
                                            color: "white", backgroundColor: 'rgb(243, 66, 140)'
                                        }, padding: '5px 10px', fontSize: '16px'
                                    }} id={`upload_pick ${index + 1}`}
                                        onClick={async (e) => {
                                            await axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_toppick_count`)
                                                .then((data) => {
                                                    setCount(data.data.count)
                                                })
                                            if (count < 8) {
                                                const dataURLtoFile = (dataurl, filename) => {
                                                    const arr = dataurl.split(',')
                                                    const mime = arr[0].match(/:(.*?);/)[1]
                                                    const bstr = atob(arr[1])
                                                    let n = bstr.length
                                                    const u8arr = new Uint8Array(n)
                                                    while (n) {
                                                        u8arr[n - 1] = bstr.charCodeAt(n - 1)
                                                        n -= 1 // to make eslint happy
                                                    }
                                                    return new File([u8arr], filename, { type: mime })
                                                }
                                                // generate file from base64 string
                                                const file = dataURLtoFile(`data:image/png;base64,${li.image}`, 'toppicks.png')
                                                if (file != undefined) {
                                                    let formData = new FormData();
                                                    formData.append('product_id', li.product_id);
                                                    formData.append('category', li.category);
                                                    formData.append('subcategory', li.subcategory);
                                                    formData.append('product', li.product);
                                                    formData.append('price', li.price);
                                                    formData.append('brand_name', li.brand_name);
                                                    formData.append('description', li.description);
                                                    formData.append('rating', li.rating);
                                                    formData.append('picks_image', file);
                                                    axios.post(`${process.env.REACT_APP_BACKEND_URL}/add_toppicks`, formData, {
                                                        headers: {
                                                            "Content-Type": 'multipart-formdata'
                                                        }
                                                    })
                                                        .then((data) => {
                                                            if (data.data.msg != undefined) {
                                                                toast.success('Product Id added to Top Picks List', {
                                                                    autoClose: 3000
                                                                })
                                                                document.getElementById(e.target.id).style.backgroundColor = 'lightgrey'
                                                                document.getElementById(e.target.id).disabled = true;
                                                                setIncCnt(inccnt => inccnt + 1);
                                                            }
                                                            else {
                                                                toast.error('This Product Id is Already Uploaded!', {
                                                                    autoClose: 3000
                                                                })
                                                            }
                                                        })
                                                }
                                            }
                                        }}>Upload</Button >
                                </Box>
                                <img src={`data:image/png;base64,${li.image}`} width='100px' height='150px' alt='loading' />
                            </Box>
                        </Box >
                    </>)
                })}
                <span style={{ marginLeft: '40px', marginTop: "20px", display: 'inline-block', fontFamily: "cursive", fontStyle: 'italic', fontWeight: "bold" }}>Note: Top Picks is based on rating</span>
                <br></br>
                <Button sx={{
                    marginTop: '30px', marginLeft: '40px', marginBottom: '30px', textTransform: "none", color: "white",
                    backgroundColor: 'rgb(243, 66, 140)', '&:hover': {
                        color: "white", backgroundColor: 'rgb(243, 66, 140)'
                    }, padding: '5px 10px', fontSize: '16px'
                }}
                    onClick={(e) => {
                        setTopPickList(true)
                        setLoader(true);
                    }}>Show Top Pick List</Button >
            </>
            }
            {
                showtoppicklist == true && <>
                    <Typography variant='h4' sx={{ marginLeft: "40px", marginTop: '30px', color: 'blueviolet' }}>Top Pick List</Typography>
                    {toppicklist.length == 0 &&
                        <Typography variant='h5' sx={{
                            marginTop: '50px', textAlign: 'center', color: 'purple',
                            fontFamily: 'verdana'
                        }}>No data found!!</Typography >}
                    {toppicklist.length > 0 && toppicklist.map((li, index) => {
                        function toBase64(arr) {
                            const arr1 = new Uint8Array(arr)
                            return btoa(
                                arr1.reduce((data, byte) => data + String.fromCharCode(byte), '')
                            );
                        }
                        const url = toBase64(li.image1[0].data);
                        return (<>
                            <Box sx={{ backgroundColor: 'white', boxShadow: '2px 2px 2px black', marginTop: '30px', marginLeft: "40px", padding: '20px 30px', width: '800px' }}>
                                <Typography sx={{ color: 'rgb(243, 66, 140)', fontFamily: "cursive", fontSize: '20px' }}>Details {index + 1}</Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Box sx={{ flex: 8 }}>
                                        <TextField type='text' variant='standard' color='secondary' sx={{ marginTop: '10px' }} value={`Product Id: ${li.product_id}`} inputProps={{ readOnly: true }} />
                                        <TextField type='text' variant='standard' color='secondary' sx={{ marginTop: '10px', marginLeft: '30px' }} value={`Category: ${li.category}`} inputProps={{ readOnly: true }} />
                                        <TextField type='text' variant='standard' color='secondary' sx={{ marginTop: '10px', marginLeft: '30px' }} value={`Sub category : ${li.subcategory}`} inputProps={{ readOnly: true }} />
                                        <TextField type='text' variant='standard' color='secondary' sx={{ marginTop: '10px' }} value={`Product: ${li.product}`} inputProps={{ readOnly: true }} />
                                        <TextField type='text' variant='standard' color='secondary' sx={{ marginTop: '10px', marginLeft: '30px' }} value={`Price : ${li.price}`} inputProps={{ readOnly: true }} />
                                        <TextField type='text' variant='standard' color='secondary' sx={{ marginTop: '10px', marginLeft: '30px' }} value={`Brand: ${li.brand_name}`} inputProps={{ readOnly: true }} />
                                        <TextField type='text' variant='standard' color='secondary' sx={{ marginTop: '10px' }} value={`Description: ${li.description}`} inputProps={{ readOnly: true }} />
                                        <TextField type='text' variant='standard' color='secondary' sx={{ marginTop: '10px', marginLeft: '30px' }} value={`Rating : ${li.rating}`} inputProps={{ readOnly: true }} />
                                        <Button sx={{
                                            marginTop: '30px', marginLeft: '40px', textTransform: "none", color: "white",
                                            backgroundColor: 'rgb(243, 66, 140)', '&:hover': {
                                                color: "white", backgroundColor: 'rgb(243, 66, 140)'
                                            }, padding: '5px 10px', fontSize: '16px'
                                        }} id={`delete_pick ${index + 1}`}
                                            onClick={(e) => {

                                                document.getElementById(e.target.id).style.backgroundColor = 'lightgrey'
                                                document.getElementById(e.target.id).disabled = true
                                                axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete_toppick_data?product_id=${li.product_id}`)
                                                    .then((data) => {
                                                        if (data.data.deletedCount > 0) {
                                                            toast.success('Data Deleted from list', { autoClose: 3000 });
                                                            setTimeout(() => {
                                                                setIterate(iterate => iterate + 1);
                                                                setLoader(true);
                                                            }, 4000)
                                                        }
                                                        else if (data.data.deletedCount == 0) {
                                                            toast.error('Error ,Please try again', { autoClose: 3000 })
                                                        }
                                                    })
                                            }}>Delete from db</Button >
                                    </Box>
                                    <img src={`data:image/png;base64,${url}`} width='100px' height='150px' alt='loading' />
                                </Box>
                            </Box>
                        </>)
                    })}
                    <Button sx={{
                        marginBottom: '30px', marginTop: '30px', marginLeft: '40px', textTransform: "none", color: "white",
                        backgroundColor: 'rgb(243, 66, 140)', '&:hover': {
                            color: "white", backgroundColor: 'rgb(243, 66, 140)'
                        }, padding: '5px 10px', fontSize: '16px'
                    }}
                        onClick={(e) => setTopPickList(false)}>Go Back</Button >
                    <Button sx={{
                        marginBottom: '30px',
                        marginTop: '30px', marginLeft: '40px', textTransform: "none", color: "white",
                        backgroundColor: 'rgb(243, 66, 140)', '&:hover': {
                            color: "white", backgroundColor: 'rgb(243, 66, 140)'
                        }, padding: '5px 10px', fontSize: '16px'
                    }} onClick={async () => {
                        let confirm = await window.confirm("Are you sure you want to delete all top pick datalist from db?");
                        if (confirm === true) {
                            axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete_toppick`)
                                .then((data) => {
                                    if (data.data.deletedCount > 0) {
                                        toast.success('All the data deleted successfully!!!', { autoClose: 3000 })
                                        setTimeout(() => {
                                            setIterate(iterate => iterate + 1);
                                            setLoader(true);
                                        }, 4000)
                                    }
                                    else if (data.data.deletedCount == 0) {
                                        toast.error('Error , Please try again ', { autoClose: 3000 })
                                    }
                                })
                        }
                    }}>Clear all from db</Button >
                </>
            }
        </>}
    </>
}


export default Top_Picks;