import { Typography, Box, TextField, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../Loader/Loader';
const Slider_Image = () => {
    const [slider, getSlider] = useState([])
    const [sliderlist, getSliderList] = useState([]) //async values
    const [count, setCount] = useState(0)
    //show list
    const [showsliderlist, setSliderList] = useState(false)
    const [loader, setLoader] = useState(true);
    const [inccnt, setIncCnt] = useState(0);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/slider_products`)
            .then((data) => {
                (data.data.length > 0) ? getSlider(data.data.slice()) : getSlider([])
                setLoader(false);
            })
    }, [])
    useEffect(() => {
        if (inccnt > 0) {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/delete_slider_list`)
                .then((data) => { })
        }
    }, [inccnt])
    useEffect(() => {
        if (showsliderlist == true) {
            async function pwd0() {
                await axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_slider`)
                    .then(async (data) => {
                        (data.data.length > 0) ? getSliderList(data.data.slice()) : getSliderList([])
                        setLoader(false);
                    })
            }
            pwd0();
        }
    }, [showsliderlist])
    return (<>
        {loader == true ? <Loader /> : <>
            <ToastContainer />
            {showsliderlist == false && <>
                <Typography variant='h4' sx={{ marginLeft: "40px", marginTop: '30px', color: 'blueviolet' }}>Home Page Slider Details</Typography>
                {slider.length == 0 &&
                    <Typography variant='h5' sx={{
                        marginTop: '50px', textAlign: 'center', color: 'purple',
                        fontFamily: 'verdana'
                    }}>No data found!!</Typography >}
                {slider.length > 0 && slider.map((li, index) => {
                    return (<>
                        <Box sx={{ backgroundColor: 'white', boxShadow: '2px 2px 2px black', marginTop: '30px', marginLeft: "40px", padding: '20px 30px', width: '800px' }}>
                            <Typography sx={{ color: 'rgb(243, 66, 140)', fontFamily: "cursive", fontSize: '20px' }}>Details {index + 1}</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box sx={{ flex: 8 }}>
                                    <TextField type='text' variant='standard' color='secondary' sx={{ marginTop: '10px' }} value={`Product Id: ${li.product_id}`} inputProps={{ readOnly: true }} />
                                    <TextField type='text' variant='standard' color='secondary' sx={{ marginTop: '10px', marginLeft: '30px' }} value={`Category: ${li.category}`} inputProps={{ readOnly: true }} />
                                    <TextField type='text' variant='standard' color='secondary' sx={{ marginTop: '10px', marginLeft: '30px' }} value={`Sub category : ${li.subcategory}`} inputProps={{ readOnly: true }} />
                                    <TextField type='text' variant='standard' color='secondary' sx={{ marginTop: '10px' }} value={`Product: ${li.product}`} inputProps={{ readOnly: true }} />
                                    <TextField type='text' variant='standard' color='secondary' sx={{ marginTop: '10px', marginLeft: '30px' }} value={`Brand: ${li.brand_name}`} inputProps={{ readOnly: true }} />
                                    <TextField type='text' variant='standard' color='secondary' sx={{ marginTop: '10px', marginLeft: '30px' }} value={`Discount : ${li.discount}`} inputProps={{ readOnly: true }} />
                                    <Button sx={{
                                        marginTop: '30px', marginLeft: '40px', textTransform: "none", color: "white",
                                        backgroundColor: 'rgb(243, 66, 140)', '&:hover': {
                                            color: "white", backgroundColor: 'rgb(243, 66, 140)'
                                        }, padding: '5px 10px', fontSize: '16px'
                                    }} id={`slider_${index + 1}`}
                                        onClick={async (e) => {
                                            await axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_slider_count`)
                                                .then((data) => {
                                                    setCount(data.data.count)
                                                })
                                            if (count < 10) {
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
                                                const file = dataURLtoFile(`data:image/png;base64,${li.image}`, 'sliderimage.png')
                                                if (file != undefined) {
                                                    let formData = new FormData();
                                                    formData.append('product_id', li.product_id);
                                                    formData.append('category', li.category);
                                                    formData.append('subcategory', li.subcategory);
                                                    formData.append('product', li.product);
                                                    formData.append('brand_name', li.brand_name);
                                                    formData.append('discount', li.discount);
                                                    formData.append('slider_image', file);
                                                    axios.post(`${process.env.REACT_APP_BACKEND_URL}/add_slider`, formData, {
                                                        headers: {
                                                            "Content-Type": 'multipart-formdata'
                                                        }
                                                    })
                                                        .then((data) => {
                                                            if (data.data.msg != undefined) {
                                                                toast.success('Product Id added to Slider List', {
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
                <span style={{ marginLeft: '40px', marginTop: "20px", display: 'inline-block', fontFamily: "cursive", fontStyle: 'italic', fontWeight: "bold" }}>Note: Slider Image is based on Product Id </span>
                <br></br>
                <Button sx={{
                    marginTop: '30px', marginLeft: '40px', marginBottom: '30px', textTransform: "none", color: "white",
                    backgroundColor: 'rgb(243, 66, 140)', '&:hover': {
                        color: "white", backgroundColor: 'rgb(243, 66, 140)'
                    }, padding: '5px 10px', fontSize: '16px'
                }}
                    onClick={(e) => {
                        setSliderList(true)
                        setLoader(true)
                    }}>Show Slider List</Button >
            </>
            }
            {
                showsliderlist == true && <>
                    <Typography variant='h4' sx={{ marginLeft: "40px", marginTop: '30px', color: 'blueviolet' }}>Slider List</Typography>
                    {sliderlist.length == 0 &&
                        <Typography variant='h5' sx={{
                            marginTop: '50px', textAlign: 'center', color: 'purple',
                            fontFamily: 'verdana'
                        }}>No Slider data found!!</Typography >}
                    {sliderlist.length > 0 && sliderlist.map((li, index) => {
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
                                        <TextField type='text' variant='standard' color='secondary' sx={{ marginTop: '10px', marginLeft: '30px' }} value={`Brand: ${li.brand_name}`} inputProps={{ readOnly: true }} />
                                        <TextField type='text' variant='standard' color='secondary' sx={{ marginTop: '10px', marginLeft: '30px' }} value={`Discount : ${li.discount}`} inputProps={{ readOnly: true }} />
                                        <Button sx={{
                                            marginTop: '30px', marginLeft: '40px', textTransform: "none", color: "white",
                                            backgroundColor: 'rgb(243, 66, 140)', '&:hover': {
                                                color: "white", backgroundColor: 'rgb(243, 66, 140)'
                                            }, padding: '5px 10px', fontSize: '16px'
                                        }} id={`delete_slider_${index + 1}`}
                                            onClick={(e) => {
                                                document.getElementById(e.target.id).style.backgroundColor = 'lightgrey'
                                                document.getElementById(e.target.id).disabled = true
                                                axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete_slider_data?product_id=${li.product_id}`)
                                                    .then((data) => {
                                                        if (data.data.deletedCount > 0) { toast.success('Data Deleted from list', { autoClose: 3000 }) }
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
                        onClick={(e) => setSliderList(false)}>Go Back</Button >
                    <Button sx={{
                        marginBottom: '30px',
                        marginTop: '30px', marginLeft: '40px', textTransform: "none", color: "white",
                        backgroundColor: 'rgb(243, 66, 140)', '&:hover': {
                            color: "white", backgroundColor: 'rgb(243, 66, 140)'
                        }, padding: '5px 10px', fontSize: '16px'
                    }} onClick={async () => {
                        let confirm = await window.confirm("Are you sure you want to delete all slider datalist from db?");
                        if (confirm === true) {
                            axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete_slider`)
                                .then((data) => {
                                    if (data.data.deletedCount > 0) {
                                        toast.success('All the data deleted successfully!!!', { autoClose: 3000 })
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
    </>)
}


export default Slider_Image;