import { Typography, Box, TextField, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../Loader/Loader';
const Vendor_Landing = () => {
    //add flag
    const [addflag, setAddFlag] = useState(false);
    const [showflag, setShowFlag] = useState(false);
    const [loader, setLoader] = useState(true);
    const [disab, setDisab] = useState(true)
    //values
    const [head, setHead] = useState('');
    const [subhead, setSubHead] = useState('');
    const [title, setTitle] = useState('');
    const [image, setImage] = useState();
    const [imgid, setImageId] = useState(0);

    //async values arr
    const [arr, getArr] = useState([]);
    const [inccnt, setIncCnt] = useState(0);

    useEffect(() => {
        const land = axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_vendorland_cnt`);
        const det = axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_all_vendorland`);
        axios.all([land, det])
            .then(axios.spread(function (val1, val2) {
                (val1.data.data > 0) ? setImageId(Number(val1.data.data)) : setImageId(0);
                (val2.data.length > 0) ? getArr(val2.data.slice()) : getArr([])
                setLoader(false);
            }))
    }, [])
    useEffect(() => {
        if (inccnt > 0) {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/delete_vendorland_list`)
                .then((data) => { })
        }
    }, [inccnt])
    useEffect(() => {
        if (showflag == true) {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_all_vendorland`)
                .then((data) => {
                    (data.data.length > 0) ? getArr(data.data.slice()) : getArr([]);
                    setLoader(false);
                })
        }
    }, [showflag])
    return (<>
        {loader == true ? <Loader /> : <>
            <ToastContainer />
            <Typography sx={{ marginTop: '30px', marginLeft: '30px', fontWeight: "bold", color: "rgb(243, 66, 140)", fontSize: '20px' }}>Image  & Description Upload for Vendor Landing Page  </Typography>
            {showflag == false && <>
                {
                    (imgid >= 4) && <>
                        <Button sx={{
                            marginTop: '40px', marginLeft: '40px', marginBottom: '30px', textTransform: "none", color: "white",
                            backgroundColor: 'rgb(243, 66, 140)', '&:hover': {
                                color: "white", backgroundColor: 'rgb(243, 66, 140)'
                            }, padding: '5px 10px', fontSize: '16px', cursor: 'not-allowed'
                        }} onClick={() => setAddFlag(!addflag)} disabled={true}>Add details</Button>
                    </>
                }
                {(imgid < 4) && <>
                    <Button sx={{
                        marginTop: '40px', marginLeft: '40px', marginBottom: '30px', textTransform: "none", color: "white",
                        backgroundColor: 'rgb(243, 66, 140)', '&:hover': {
                            color: "white", backgroundColor: 'rgb(243, 66, 140)'
                        }, padding: '5px 10px', fontSize: '16px'
                    }} onClick={() => setAddFlag(!addflag)}>Add details</Button>
                </>}
                <br></br>
                {addflag === true && <>
                    <Box sx={{ marginTop: '10px', marginLeft: '40px', backgroundColor: "white", boxShadow: '2px 2px 2px grey,-2px-2px 2px grey', padding: '10px', marginRight: "200px" }}>
                        <TextField label='Enter Heading...' type='text' sx={{ marginTop: '30px', width: '200px', marginLeft: "30px" }}
                            value={head} onChange={(e) => setHead(e.target.value)} />
                        <TextField label='Enter Sub Heading...' type='text' sx={{ marginTop: '30px', marginLeft: "30px", width: '300px' }}
                            value={subhead} onChange={(e) => setSubHead(e.target.value)} />
                        <TextField label='Enter Title...' type='text' sx={{ marginTop: '30px', marginLeft: "30px", width: "200px" }}
                            value={title} onChange={(e) => setTitle(e.target.value)} />
                        <TextField type='file' sx={{ marginTop: '30px', marginLeft: "30px" }}
                            onChange={(e) => {
                                setImage(e.target.files[0])
                            }}
                            onBlur={() => {
                                if (head.length != 0 && subhead.length != 0 && title.length != 0)
                                    setDisab(false)
                                else
                                    setDisab(true)
                            }} />
                        <Button sx={{
                            marginTop: '20px', marginLeft: '30px', marginBottom: '30px', textTransform: "none",
                            padding: '5px 20px', fontSize: '16px'
                        }} disabled={disab}
                            onClick={() => {
                                let formData = new FormData();
                                formData.append('imgid', imgid + 1);
                                formData.append('heading', head);
                                formData.append('subheading', subhead);
                                formData.append('title', title);
                                formData.append('landimg', image);
                                axios.post(`${process.env.REACT_APP_BACKEND_URL}/add_vendor_slider`, formData, {
                                    headers: {
                                        "Content-Type": 'multipart-formdata'
                                    }
                                })
                                    .then((data) => {
                                        if (data.data.imgid != 0) {
                                            toast.success('Details added successfully !', { autoClose: 3000 });
                                            setIncCnt(inccnt => inccnt + 1);
                                        }
                                        else
                                            toast.error('Error Please retry!');
                                    })
                            }}>Submit</Button>
                    </Box>
                </>}
                <Button sx={{
                    marginTop: '20px', marginLeft: '40px', marginBottom: '30px', textTransform: "none", color: "white",
                    backgroundColor: 'rgb(243, 66, 140)', '&:hover': {
                        color: "white", backgroundColor: 'rgb(243, 66, 140)'
                    }, padding: '5px 10px', fontSize: '16px'
                }} onClick={() => {
                    setShowFlag(true);
                    setLoader(true);
                }}>Show List</Button>
            </>}
            {
                showflag === true && <>
                    {arr.length > 0 && arr.map((li, index) => {
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
                                        <TextField type='text' variant='standard' color='secondary' sx={{ marginTop: '10px' }} value={`Image Id: ${li.imgid}`} inputProps={{ readOnly: true }} />
                                        <TextField type='text' variant='standard' color='secondary' sx={{ marginTop: '10px', marginLeft: '30px' }} value={`Heading: ${li.heading}`} inputProps={{ readOnly: true }} />
                                        <TextField type='text' variant='standard' color='secondary' sx={{ marginTop: '10px', marginLeft: '30px' }} value={`Sub Heading : ${li.subheading}`} inputProps={{ readOnly: true }} />
                                        <TextField type='text' variant='standard' color='secondary' sx={{ marginTop: '10px' }} value={`Title: ${li.title}`} inputProps={{ readOnly: true }} />
                                        <Button sx={{
                                            marginTop: '30px', marginLeft: '40px', textTransform: "none", color: "white",
                                            backgroundColor: 'rgb(243, 66, 140)', '&:hover': {
                                                color: "white", backgroundColor: 'rgb(243, 66, 140)'
                                            }, padding: '5px 10px', fontSize: '16px'
                                        }} id={`delete_land ${index + 1}`}
                                            onClick={(e) => {
                                                document.getElementById(e.target.id).style.backgroundColor = 'lightgrey'
                                                document.getElementById(e.target.id).disabled = true
                                                axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete_vendorland_imgid?imgid=${li.imgid}`)
                                                    .then((data) => {
                                                        if (data.data.deletedCount > 0) {
                                                            toast.success('Data Deleted from list', { autoClose: 3000 })
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
                    {arr.length == 0 &&
                        <Typography variant='h5' sx={{
                            marginTop: '50px', textAlign: 'center', color: 'purple',
                            fontFamily: 'verdana'
                        }}>No data found!!</Typography >}
                    <Button sx={{
                        marginBottom: '30px', marginTop: '30px', marginLeft: '40px', textTransform: "none", color: "white",
                        backgroundColor: 'rgb(243, 66, 140)', '&:hover': {
                            color: "white", backgroundColor: 'rgb(243, 66, 140)'
                        }, padding: '5px 10px', fontSize: '16px'
                    }}
                        onClick={(e) => setShowFlag(false)}>Go Back</Button >
                    <Button sx={{
                        marginBottom: '30px',
                        marginTop: '30px', marginLeft: '40px', textTransform: "none", color: "white",
                        backgroundColor: 'rgb(243, 66, 140)', '&:hover': {
                            color: "white", backgroundColor: 'rgb(243, 66, 140)'
                        }, padding: '5px 10px', fontSize: '16px'
                    }} onClick={async () => {
                        let confirm = await window.confirm("Are you sure you want to delete all vendor image list  from db?");
                        if (confirm === true) {
                            axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete_all_vendorland`)
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
export default Vendor_Landing;