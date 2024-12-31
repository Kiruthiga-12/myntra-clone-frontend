import { useEffect, useState } from "react";
import Register_Navbar from "../Register_Navbar";
import { Box, ListItemButton, Typography, TextField } from "@mui/material";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Gstin_Check from "./Gstin_Check";
import Basic_Details from "./Basic_Details";
import Bank_Details from "./Bank_Details";
import Declarations from "./Declarations";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import EventNoteIcon from '@mui/icons-material/EventNote';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import { connect } from 'react-redux';
import AddWarehouse from "./WarehouseInfo/AddWarehouse";
import axios from 'axios';
import Loader from "../../../Loader/Loader";
import { setNavBar, setFooter, changeVendorStatus } from "../../../Redux_Store/Action_Creators";
import AddBrand from "./BrandInfo/AddBrand";
const BasicInformation = (props) => {
    const [step2enable, setEnable2] = useState(true);
    const [step4enable, setEnable4] = useState(true);
    const [step5enable, setEnable5] = useState(true);
    const [step6enable, setEnable6] = useState(true);
    const [step7enable, setEnable7] = useState(true);
    const [currentState, setState] = useState('');

    const [vendor_id, setVendorId] = useState(0);
    const [image, setImage] = useState();
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mob, setMob] = useState();
    const [msg, setMsg] = useState();


    //percentage
    const [percentage, setPercentage] = useState();
    const onboard = 'welcome to onboarding form page!';

    //loader
    const [loader, setLoader] = useState(true);
    useEffect(() => {
        document.title = 'Sell with Myntra';
        document.body.style.backgroundColor = 'rgb(230,230,230)';
        props.setNavBar('');
        props.setFooter('');
        toast.success('welcome to onboarding form page!', {
            autoClose: 3000,
            position: toast.POSITION.BOTTOM_RIGHT,
            toastId: 'onboard'
        })
        if (props.vendor_login != undefined && props.vendor_login != '') {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/vendor_status_email?email=${props.vendor_login}`)
                .then((data) => {
                    if (data.data.vendor_id != 0) {
                        if (data.data.status == 'submitted' || data.data.status == 'resubmitted') {
                            document.getElementById('hidewholeflag').style.display = 'none';
                            alert('Form will be available once admin approved / rejected')
                        }
                        setVendorId(data.data.vendor_id)
                    }
                })
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/vendor_details?email=${props.vendor_login}`)
                .then(async (data) => {
                    if (data.data[0].vendor_id != 0) {
                        setVendorId(data.data[0].vendor_id);
                        setImage(`data:image/png;base64,${data.data[0].vendor_profile}`);
                        setFirstName(data.data[0].vendor_firstname)
                        setLastName(data.data[0].vendor_lastname)
                        setEmail(data.data[0].company_mailid);
                        setMob(data.data[0].vendor_mobile)
                    }
                    setLoader(false);
                })
        }
        else {
            setMsg('Invalid Resource');
            setLoader(false);
        }
    }, [])
    useEffect(() => {
        if (props.vendor_login != undefined && props.vendor_login != '')
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/percentage_email?email=${props.vendor_login}`)
                .then(async (data) => {
                    if (data.data.length > 0)
                        if (data.data[0].perc != undefined) {
                            setPercentage(data.data[0].perc);
                        }
                })
    }, [props])
    useEffect(() => {
        if (percentage != undefined && percentage != '') {
            if (percentage == 0) {
                setState('Gstin Check');
            }
            else if (percentage == 17) {
                setEnable2(false);
                setState('Basic Information');
            }
            else if (percentage == 34) {
                setEnable2(false);
                setEnable4(false);
                setState('Warehouse Details');
            }
            else if (percentage == 51) {
                setEnable2(false);
                setEnable4(false);
                setEnable5(false);
                setState('Bank Details');
            }
            else if (percentage == 68) {
                setEnable2(false);
                setEnable4(false);
                setEnable5(false);
                setEnable6(false);
                setState('Brand Details');
            }
            else if (percentage == 75) {
                setEnable2(false);
                setEnable4(false);
                setEnable5(false);
                setEnable6(false);
                setEnable7(false);
                setState('Declarations');
            }
            else if (percentage == 100) {
                setEnable2(false);
                setEnable4(false);
                setEnable5(false);
                setEnable6(false);
                setEnable7(false);
                setState('Declarations');
            }
        }
    }, [percentage])
    return (
        <>
            {loader == true ? <Loader /> : <>
                {msg == undefined && <>
                    <ToastContainer />
                    <Register_Navbar display='inline-block' vendorid={vendor_id} image={image} firstname={firstname} lastname={lastname}
                        email={email} />
                    <Box sx={{ display: 'flex', margin: 'auto', marginTop: '90px', width: '95%' }}
                        id='hidewholeflag'>
                        <Box sx={{ flex: 2, backgroundColor: 'white' }}>
                            <TextField label={percentage + '% completed'} type='range' sx={{ marginLeft: '40px', marginTop: '30px' }} variant='standard'
                                value={percentage} />
                            <ListItemButton href="#Gst_Checkin" disableTouchRipple sx={{
                                display: 'flex', alignItems: 'center',
                                width: '80%', margin: 'auto', marginTop: '20px', border: '1px solid indigo',
                                borderRadius: '5px', color: 'indigo',
                                '&:hover': { color: 'indigo', border: '1px solid indigo' }
                            }}
                                onClick={() => {
                                    axios.put(`${process.env.REACT_APP_BACKEND_URL}/percentage_update`, {
                                        vendor_id: vendor_id,
                                        email: email,
                                        stepno: '0'
                                    })
                                        .then((data) => {
                                            if (data.data) {
                                                setState('Gstin Check');
                                                props.changeStatus(Math.round(Math.random() * 200))
                                            }
                                        })
                                }}
                            >
                                <CurrencyExchangeIcon />
                                <Typography sx={{ marginLeft: '10px' }}>Gstin Check</Typography>
                            </ListItemButton>
                            <ListItemButton href="#Basic_Information" sx={{
                                display: 'flex', alignUtems: 'center',
                                width: '80%', margin: 'auto', marginTop: '20px', border: '1px solid indigo',
                                borderRadius: '5px', color: 'indigo',
                                '&:hover': { color: 'indigo', border: '1px solid indigo' }
                            }} disableTouchRipple disabled={step2enable}
                                onClick={() =>
                                    axios.put(`${process.env.REACT_APP_BACKEND_URL}/percentage_update`, {
                                        vendor_id: vendor_id,
                                        email: email,
                                        stepno: '1'
                                    })
                                        .then((data) => {
                                            if (data.data) {
                                                setState('Basic Information')
                                                props.changeStatus(Math.round(Math.random() * 200))
                                            }
                                        })
                                } >
                                <EventNoteIcon />
                                <Typography sx={{ marginLeft: '10px' }}>Basic Information</Typography>
                            </ListItemButton>
                            <ListItemButton href="#Warehouse_Details" sx={{
                                display: 'flex', alignItems: 'center',
                                width: '80%', margin: 'auto', marginTop: '20px', border: '1px solid indigo',
                                borderRadius: '5px', color: 'indigo',
                                '&:hover': { color: 'indigo', border: '1px solid indigo' }
                            }} disableTouchRipple disabled={step4enable}
                                onClick={() => {
                                    axios.put(`${process.env.REACT_APP_BACKEND_URL}/percentage_update`, {
                                        vendor_id: vendor_id,
                                        email: email,
                                        stepno: '2'
                                    })
                                        .then((data) => {
                                            if (data.data) {
                                                setState('Warehouse Details')
                                                props.changeStatus(Math.round(Math.random() * 800))
                                            }
                                        })

                                }}
                            >
                                <WarehouseIcon />
                                <Typography sx={{ marginLeft: '10px' }}>Warehouse Details</Typography>
                            </ListItemButton>
                            <ListItemButton href="#Bank_Details" sx={{
                                display: 'flex', alignItems: 'center',
                                width: '80%', margin: 'auto', marginTop: '20px', border: '1px solid indigo',
                                borderRadius: '5px', color: 'indigo',
                                '&:hover': { color: 'indigo', border: '1px solid indigo' }
                            }} disableTouchRipple disabled={step5enable}
                                onClick={() => {
                                    axios.put(`${process.env.REACT_APP_BACKEND_URL}/percentage_update`, {
                                        vendor_id: vendor_id,
                                        email: email,
                                        stepno: '3'
                                    })
                                        .then((data) => {
                                            if (data.data) {
                                                setState('Bank Details')
                                                props.changeStatus(Math.round(Math.random() * 1200))
                                            }
                                        })
                                }}
                            >
                                <TextSnippetIcon />
                                <Typography sx={{ marginLeft: '10px' }}>Bank Details</Typography>
                            </ListItemButton>
                            <ListItemButton href="#Brand_Details" sx={{
                                display: "flex", alignitems: "center",
                                width: '80%', margin: 'auto', marginTop: '20px', border: '1px solid indigo',
                                borderRadius: '5px', color: 'indigo',
                                '&:hover': { color: 'indigo', border: '1px solid indigo' }
                            }} disableTouchRipple disabled={step6enable}
                                onClick={() => {
                                    axios.put(`${process.env.REACT_APP_BACKEND_URL}/percentage_update`, {
                                        vendor_id: vendor_id,
                                        email: email,
                                        stepno: '4'
                                    })
                                        .then((data) => {
                                            if (data.data) {
                                                setState('Brand Details')
                                                props.changeStatus(Math.round(Math.random() * 1600))
                                            }
                                        })
                                }}
                            >
                                < AccountTreeIcon />
                                <Typography sx={{ marginLeft: '10px' }}>Brand Details</Typography>
                            </ListItemButton>
                            <ListItemButton href="#Declaration" sx={{
                                display: 'flex', alignItems: 'center',
                                width: '80%', margin: 'auto', marginTop: '20px', border: '1px solid indigo',
                                borderRadius: '5px', color: 'indigo',
                                '&:hover': { color: 'indigo', border: '1px solid indigo' }
                            }} disableTouchRipple disabled={step7enable}
                                onClick={() => {
                                    axios.put(`${process.env.REACT_APP_BACKEND_URL}/percentage_update`, {
                                        vendor_id: vendor_id,
                                        email: email,
                                        stepno: '5'
                                    })
                                        .then((data) => {
                                            if (data.data) {
                                                setState('Declarations')
                                                props.changeStatus(Math.round(Math.random() * 1800))
                                            }
                                        })
                                }}
                            >
                                <NoteAltIcon />
                                <Typography sx={{ marginLeft: '10px' }}>Declaration</Typography>
                            </ListItemButton>
                            <br></br>
                            <br></br>
                        </Box>
                        <Box sx={{ flex: 9, backgroundColor: 'white', marginLeft: '20px' }}>
                            {currentState === 'Gstin Check' &&
                                <Gstin_Check email={email} vendorid={vendor_id} />}
                            {currentState === 'Basic Information' &&
                                <Basic_Details email={email} vendorid={vendor_id}
                                    firstname={firstname} lastname={lastname} mob={mob} />}
                            {currentState === 'Warehouse Details' &&
                                <AddWarehouse email={email} vendorid={vendor_id} />
                            }
                            {currentState === 'Bank Details' &&
                                <Bank_Details email={email} vendorid={vendor_id} />}
                            {currentState === 'Brand Details' &&
                                <AddBrand email={email} vendorid={vendor_id} />}
                            {currentState === 'Declarations' &&
                                <Declarations email={email} vendorid={vendor_id} />}
                        </Box>
                    </Box >
                </>}
                {msg != undefined && <>
                    <Typography sx={{ marginTop: "100px", color: "rgb(250, 102, 102)", textAlign: "center", fontWeight: "bold", fontSize: '26px' }}>{msg} !!</Typography>
                    <Typography sx={{ marginTop: "10px", color: "blue", textAlign: "center", fontWeight: "bold", fontSize: '19px', fontFamily: "verdana" }}>Kindly Complete previous Steps !</Typography>
                </>}
            </>}
        </>
    )
}
const mapStateToProps = (cstate) => {
    return {
        current_state: cstate.current_state,
        vendor_login: cstate.vendor_login
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setNavBar: (data) => dispatch(setNavBar(data)),
        setFooter: (data) => dispatch(setFooter(data)),
        changeStatus: (data) => dispatch(changeVendorStatus(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BasicInformation);
