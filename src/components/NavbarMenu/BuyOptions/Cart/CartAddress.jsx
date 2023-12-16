import { Box, Typography, Button, ListItem, Dialog, DialogContent, DialogContentText, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { connect } from 'react-redux';
import { setCartState } from '../../../Redux_Store/Action_Creators';
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loader from '../../../Loader/Loader';
const CartAddress = (props) => {
    //no address data flag 
    const [empty_flag, setEmptyFlag] = useState(false);
    const [disab, setDisab] = useState(true);
    //Only Pincode values.
    const [pinonly, setPinOnly] = useState(false);
    const [pin, setPin] = useState();
    const [storeadrid, setStoreAdrId] = useState()

    //get latest address
    const [adronly, setAdrOnly] = useState(false);
    const [newname, setNewName] = useState();
    const [newpin, setNewPin] = useState();
    const [newadr, setNewAdr] = useState();
    const [newtown, setNewTown] = useState();
    const [newmob, setNewMob] = useState();
    const [newadrtype, setNewAdrType] = useState();
    const [newadrid, setNewAdrId] = useState();

    //count 
    const [count, setCount] = useState(0);

    //to get all adr data
    const [adr, getAdr] = useState([]);

    //item not in stock count
    const [notinstock, setNotInStock] = useState(0);
    //add address disable button
    const [dis, setDis] = useState(true);
    //edit address disable button
    const [dis1, setDis1] = useState(true);

    //to store eneterd adr details.
    const [adrname, setAdrName] = useState();
    const [adrmob, setAdrMob] = useState();
    const [adrcode, setAdrCode] = useState();
    const [adradrs, setAdrAdrs] = useState();
    const [adrtown, setAdrTown] = useState();
    const [adrtype, setAdrType] = useState();

    //to add new address in Dialogue box
    const [addrflag, setAdrsFlag] = useState(false);

    //to store amount details.
    const [total_mrp, setTotalMrp] = useState();
    const [discount_mrp, setDiscountMrp] = useState();
    const [conv_fee, setConvFee] = useState();
    const [total_amount, setTotalAmount] = useState();
    const [gift_wrap, setGiftwrap] = useState();
    const [total_count, setTotalCount] = useState();
    const [offer_amt, setOfferAmt] = useState();

    //product details
    const [pdet, setPDet] = useState([]);

    //to toggle remove and edit button flags
    const [editflag, setEditFlag] = useState(false);//for default address
    const [otherflag, setOtherFlag] = useState(false);//for other address

    //edit address flag 
    const [changeflag, setChangeFlag] = useState(false);
    //save edited address details.
    const [changename, setChangeName] = useState();
    const [changemob, setChangeMob] = useState();
    const [changepin, setChangePin] = useState();
    const [changeaddr, setChangeAddr] = useState();
    const [changetown, setChangeTown] = useState();
    const [changeadrtype, setChangeAdrType] = useState();
    const [changeadrid, setChangeAdrId] = useState();

    //edit/remove count
    const [iterate, setIterate] = useState(0);
    const [know_more, setKnow] = useState(false);
    const [loader, setLoader] = useState(true);
    useEffect(() => {
        document.title = 'ADDRESS';
        //to get single latest adr
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_new_adr?user_id=${props.user.user_id}`)
            .then(async (data) => {
                if (data.data.length == 0) {
                    setEmptyFlag(true)
                }
                else if (data.data.length > 0) {
                    if (data.data[0].name === undefined) {
                        setPinOnly(true);
                        setPin(data.data[0].pincode)
                        setStoreAdrId(data.data[0].adr_id)
                    }
                    else if (data.data[0].name != undefined) {
                        setAdrOnly(true);
                        setNewName(data.data[0].name);
                        setNewPin(data.data[0].pincode);
                        setNewAdr(data.data[0].addr);
                        setNewTown(data.data[0].town);
                        setNewMob(data.data[0].mobile_no);
                        setNewAdrType(data.data[0].adr_type);
                    }
                }
            })

        //to get count 
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_addr_count?user_id=${props.user.user_id}`)
            .then((data) => {
                setCount(data.data.data)
            })
        //to get all address
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_addr?user_id=${props.user.user_id}`)
            .then((data) => {
                (data.data.length > 0) ? getAdr(data.data.slice()) : getAdr([])

            })
        //to get place order details 
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_place_order?user_id=${props.user.user_id}`)
            .then((data) => {
                (data.data.length > 0) ? setPDet(data.data.slice()) : setPDet([])
            })
        //to get total amount
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_amount?user_id=${props.user.user_id}`)
            .then((data) => {
                if (data.data.length > 0) {
                    setTotalMrp(data.data[0].total_mrp);
                    setDiscountMrp(data.data[0].discount_mrp);
                    setConvFee(data.data[0].convenience_fee);
                    setGiftwrap(data.data[0].gift_amt);
                    setTotalAmount(data.data[0].total_amount);
                    setTotalCount(data.data[0].total_count)
                    setOfferAmt(data.data[0].offer_amt);
                }
            })
        //delete final address
        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete_del_adr?user_id=${props.user.user_id}`)
            .then((data) => { })
        setLoader(false);
    }, [])
    useEffect(() => {
        if ((pinonly == true) || (adronly == true) || (iterate != 0)) {//to get single adr
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_new_adr?user_id=${props.user.user_id}`)
                .then((data) => {
                    if (data.data.length > 0) {
                        if (data.data[0].name === undefined) {
                            setPinOnly(true)
                            setPin(data.data[0].pincode);
                            setStoreAdrId(data.data[0].adr_id)
                        }
                        else if (data.data[0].name != undefined) {
                            setAdrOnly(true);
                            setNewName(data.data[0].name);
                            setNewPin(data.data[0].pincode);
                            setNewAdr(data.data[0].addr);
                            setNewTown(data.data[0].town);
                            setNewMob(data.data[0].mobile_no);
                            setNewAdrType(data.data[0].adr_type);
                            setNewAdrId(data.data[0].adr_id);
                        }
                    }
                    else if (data.data.length == 0) {
                        setEmptyFlag(true);
                        setAdrOnly(false);
                        setPinOnly(false);
                        setAdrName('');
                        setAdrMob('');
                        setAdrCode('');
                        setAdrAdrs('');
                        setAdrTown('');
                        setAdrType('');
                    }
                })
            function f0() {   //to get count 
                axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_addr_count?user_id=${props.user.user_id}`)
                    .then((data) => {
                        setCount(data.data.data)
                    })
            }
            function f1() { //to get all address
                axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_addr?user_id=${props.user.user_id}`)
                    .then((data) => {
                        (data.data.length > 0) ? getAdr(data.data.slice()) : getAdr([])
                    })
            }
            f0();
            f1();
        }
        function f2() {
            if (adronly == true)
                setDisab(false)
            else
                setDisab(true)
        }
        f2()
    }, [pinonly, adronly, iterate])
    useEffect(() => {
        if (empty_flag == true)
            setDisab(true);
    }, [empty_flag])
    useEffect(() => {
        if (pdet.length > 0) {
            setNotInStock(0);
            pdet.map((li) => {
                if (li.count <= 0)
                    setNotInStock(notinstock => notinstock + 1);
            })
        }
    }, [pdet])
    return (
        <>
            {loader == true ? <Loader /> : <>
                <ToastContainer hideProgressBar={true} closeButton={false} />
                <Box sx={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '99px' }}>
                    {/* Left Pane */}
                    <Box sx={{ borderRight: '1px solid lightgrey', flex: '7' }}>
                        <Box sx={{ display: 'flex', marginTop: '40px' }}>
                            {/* Left Gap */}
                            <Box sx={{ flex: 3 }}></Box>
                            {/* Right Text */}
                            <Box sx={{ flex: 9, marginRight: '25px' }}>
                                {((empty_flag === true) || (pinonly === true) && (adr.length == 0)) && <>
                                    <Box sx={{ padding: "10px", border: "1px solid lightgrey", width: "70%" }}>
                                        <Typography sx={{ fontWeight: 'bold', fontSize: "15px", marginTop: "10px", marginLeft: '30px' }}>CONTACT DETAILS</Typography>
                                        <TextField placeholder='Name*' sx={{ marginLeft: '30px', marginTop: "20px", width: "90%" }} value={adrname}
                                            onChange={(e) => setAdrName(e.target.value)} />
                                        <TextField placeholder='Mobile No*' sx={{ marginLeft: '30px', marginTop: "20px", width: "90%" }} value={adrmob}
                                            onChange={(e) => setAdrMob(e.target.value)} />
                                        <Typography sx={{ fontWeight: 'bold', fontSize: "15px", marginTop: "25px", marginLeft: '30px' }}>ADDRESS</Typography>
                                        {pinonly === true && <>
                                            <TextField placeholder='Pin Code*' sx={{ marginLeft: '30px', marginTop: "20px", width: "90%" }} value={pin}
                                                onChange={(e) => setPin(e.target.value)} />
                                        </>}
                                        {pinonly === false && <>
                                            <TextField placeholder='Pin Code*' sx={{ marginLeft: '30px', marginTop: "20px", width: "90%" }} value={adrcode}
                                                onChange={(e) => setAdrCode(e.target.value)} />
                                        </>}
                                        <TextField placeholder='Address (House No,Building,Street,Area)*' sx={{ marginLeft: '30px', marginTop: "20px", width: "90%" }} value={adradrs}
                                            onChange={(e) => setAdrAdrs(e.target.value)} />
                                        <TextField placeholder='Locality/Town*' sx={{ marginLeft: '30px', marginTop: "20px", width: "90%" }} value={adrtown}
                                            onChange={(e) => setAdrTown(e.target.value)}
                                            onBlur={(e) => {
                                                fun1()
                                                function fun1() {
                                                    if (pinonly === true) {
                                                        if (adrname.length > 0 && adrmob.length > 0 && adradrs.length > 0 && (pin.length > 0)
                                                            && adrtown.length > 0 && adrtype != '') {
                                                            setDis(false);
                                                        }

                                                        else {
                                                            setDis(true);
                                                            alert('Please Enter all the details')
                                                        }
                                                    }
                                                    else if (pinonly === false) {
                                                        if (adrname.length > 0 && adrmob.length > 0 && adradrs.length > 0 && (adrcode.length > 0)
                                                            && adrtown.length > 0 && adrtype != '')
                                                            setDis(false);
                                                        else {
                                                            setDis(true);
                                                            alert('Please Enter all the details')
                                                        }
                                                    }
                                                }
                                            }} />
                                        <FormControl>
                                            <FormLabel id="cart_addr_type" sx={{ fontWeight: 'bold', fontSize: "15px", marginTop: "25px", marginLeft: '30px', color: "grey" }} >SAVE ADDRESS AS</FormLabel>
                                            <RadioGroup
                                                aria-labelledby="cart_addr_type"
                                                name="cart_addr_type"
                                                value={adrtype}
                                                onChange={(e) => setAdrType(e.target.value)}
                                            >
                                                <FormControlLabel sx={{ marginLeft: "20px", marginTop: "15px" }} value="Home" control={<Radio />} label="Home" />
                                                <FormControlLabel sx={{ marginLeft: "20px" }} value="Work" control={<Radio />} label="Work" />
                                            </RadioGroup>
                                        </FormControl>
                                        <Button sx={{
                                            marginTop: "30px", padding: "10px", fontweight: "bold", fontSize: "15px",
                                            width: "90%", marginLeft: "10px", color: "white", backgroundColor: "rgb(243, 66, 140)"
                                            , '&:hover': { color: "white", backgroundColor: "rgb(243, 66, 140)" }
                                        }} disabled={dis}
                                            onClick={() => {
                                                if (pinonly === true) {
                                                    axios.put(`${process.env.REACT_APP_BACKEND_URL}/edit_addr?user_id=${props.user.user_id}`, {
                                                        'user_id': props.user.user_id,
                                                        'name': adrname,
                                                        'mob': adrmob,
                                                        'pincode': pin,
                                                        'addr': adradrs,
                                                        'town': adrtown,
                                                        'adr_type': adrtype,
                                                        'adr_id': storeadrid
                                                    })
                                                        .then((data) => {
                                                            if (data.data.modifiedCount == 1) {
                                                                setAdrOnly(true);
                                                                setPinOnly(false);
                                                                setEmptyFlag(false);
                                                            }
                                                            else {
                                                                setAdrOnly(false);
                                                            }
                                                        })
                                                }
                                                else if (pinonly === false) {
                                                    axios.post(`${process.env.REACT_APP_BACKEND_URL}/add_addr`, {
                                                        'user_id': props.user.user_id,
                                                        'name': adrname,
                                                        'mob': adrmob,
                                                        'pincode': adrcode,
                                                        'addr': adradrs,
                                                        'town': adrtown,
                                                        'adr_type': adrtype,
                                                        'adr_id': (count + 1)
                                                    })
                                                        .then((data) => {
                                                            if (data.data.name != undefined) {
                                                                setIterate(iterate => iterate + 1);
                                                                setAdrOnly(true);
                                                                setPinOnly(false);
                                                                setEmptyFlag(false);
                                                            }
                                                            else {
                                                                setAdrOnly(false);
                                                            }
                                                        })
                                                }
                                            }}>ADD ADDRESS</Button>
                                        <br></br>
                                        <br></br>
                                    </Box>
                                </>
                                }
                                {
                                    ((adronly === true) || (adr.length > 0 && pinonly === true)) && <>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Typography variant='body1' sx={{ flex: 9, fontSize: '20px', fontWeight: 'bold' }}>Select Delivery Address</Typography>
                                            <Button disableTouchRipple variant='outlined' sx={{
                                                fontWeight: 'bold',
                                                flex: 3, border: '1px solid black', color: 'black',
                                                '&:hover': {
                                                    color: 'black', border: '1px solid black',
                                                    backgroundColor: 'transparent'
                                                }
                                            }}
                                                onClick={() => {
                                                    setAdrsFlag(true);
                                                    setAdrName('');
                                                    setAdrMob('');
                                                    setAdrCode('');
                                                    setAdrAdrs('');
                                                    setAdrTown('');
                                                    setAdrType('');
                                                }}>ADD NEW ADDRESS</Button>
                                        </Box>
                                        <Typography variant='body1' sx={{ color: 'grey', fontWeight: 'bold', marginTop: '25px' }}>DEFAULT ADDRESS</Typography>
                                        <Box sx={{ marginLeft: '5px', marginTop: "30px", border: '1px solid white', padding: "20px", boxShadow: "2px 2px  5px lightgrey,-2px -2px  5px lightgrey", borderRadius: "5px", cursor: 'pointer' }}
                                            onClick={() => setEditFlag(!editflag)}>
                                            {pinonly === true && <>
                                                <input type='radio' checked style={{ width: "15px", height: '15px', accentColor: "rgb(243, 66, 140)", display: 'inline' }} />
                                                <Typography sx={{ fontWeight: "bold", color: "black", marginTop: "-25px", marginLeft: "30px" }}>{adr[0].name} <span style={{ fontSize: '12px', marginLeft: '300px', color: "rgb(72, 185, 157)", border: '1px solid rgb(72, 185, 157)', padding: '3px 10px', borderRadius: "20px", fontWeight: 'bold' }}>{adr[0].adr_type}</span></Typography>
                                                <Typography sx={{ color: "black", marginLeft: "30px" }}>{adr[0].addr}</Typography>
                                                <Typography sx={{ color: "black", marginLeft: "30px" }}>{adr[0].town} - {adr[0].pincode}</Typography>
                                                <Typography sx={{ color: "black", marginLeft: "30px", marginTop: "20px" }}>Mobile :<span> {adr[0].mobile_no}</span></Typography>
                                                <ul>
                                                    <li><p style={{ fontWeight: "normal", fontFamily: "verdana" }}>Cash on Delivery available</p></li>
                                                </ul>
                                            </>}
                                            {adronly === true && <>
                                                <input type='radio' name='selectaddress' style={{ width: "15px", height: '15px', accentColor: "rgb(243, 66, 140)", display: 'inline' }} />
                                                <Typography sx={{ fontWeight: "bold", color: "black", marginTop: "-25px", marginLeft: "30px" }}>{newname} <span style={{ fontSize: '12px', marginLeft: '300px', color: "rgb(72, 185, 157)", border: '1px solid rgb(72, 185, 157)', padding: '3px 10px', borderRadius: "20px", fontWeight: 'bold' }}>{newadrtype}</span></Typography>
                                                <Typography sx={{ color: "black", marginLeft: "30px" }}>{newadr}</Typography>
                                                <Typography sx={{ color: "black", marginLeft: "30px" }}>{newtown} - {newpin}</Typography>
                                                <Typography sx={{ color: "black", marginLeft: "30px", marginTop: "20px" }}>Mobile :<span> {newmob}</span></Typography>
                                            </>}
                                            {editflag == true && <>
                                                <ul>
                                                    <li><p style={{ fontWeight: "normal", fontFamily: "verdana" }}>Cash on Delivery available</p></li>
                                                </ul>
                                                <Button sx={{ color: 'black', fontWeight: "bold", padding: "5px 15px", border: "2px solid black", marginTop: "10px", marginLeft: "30px", '&:hover': { backgroundColor: "white" } }} disableTouchRipple
                                                    onClick={() => {
                                                        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete_adr_adrid?user_id=${props.user.user_id}&adr_id=${newadrid}`)
                                                            .then((data) => {
                                                                if (data.data.deletedCount == 1) {
                                                                    toast.success('Details deleted successfully!!', { autoClose: 3000 });
                                                                    setIterate(iterate => iterate + 1);

                                                                }
                                                                else
                                                                    toast.error('Error Please retry!!', { autoClose: 3000 })
                                                            })
                                                    }}>REMOVE</Button>
                                                <Button sx={{ color: 'black', fontWeight: "bold", padding: "5px 15px", border: "2px solid black", marginTop: "10px", marginLeft: "30px", '&:hover': { backgroundColor: "white" } }} disableTouchRipple
                                                    onClick={() => {
                                                        setChangeFlag(true);
                                                        setChangeName(newname);
                                                        setChangeMob(newmob);
                                                        setChangePin(newpin);
                                                        setChangeAddr(newadr);
                                                        setChangeTown(newtown);
                                                        setChangeAdrType(newadrtype);
                                                        setChangeAdrId(newadrid);
                                                    }}>EDIT</Button>
                                            </>}
                                        </Box>
                                        {/* other address */}
                                        <Typography variant='body1' sx={{ color: 'grey', fontWeight: 'bold', marginTop: '25px' }}>OTHER ADDRESS</Typography>
                                        {
                                            adr.length > 0 && adr.map((li, index) => {
                                                return (<>
                                                    {((adronly === true && li.name !== newname) || (pinonly === true && index != 0)) && <>
                                                        <Box sx={{ marginLeft: '5px', marginTop: "30px", border: '1px solid white', padding: "20px", boxShadow: "2px 2px  5px lightgrey,-2px -2px  5px lightgrey", borderRadius: "5px", cursor: "pointer" }}
                                                            id={`adr_box_${index}`}
                                                            onClick={() => {
                                                                setOtherFlag(!otherflag);
                                                                if (otherflag === true) {
                                                                    document.getElementById(`adr_removebtn_${index}`).style.display = 'inline-block';
                                                                    document.getElementById(`adr_editbtn_${index}`).style.display = 'inline-block';
                                                                }
                                                                else if (otherflag === false) {
                                                                    document.getElementById(`adr_removebtn_${index}`).style.display = 'none';
                                                                    document.getElementById(`adr_editbtn_${index}`).style.display = 'none';
                                                                }
                                                            }}>
                                                            <input type='radio' name='selectaddress' style={{ width: "15px", height: '15px', accentColor: "rgb(243, 66, 140)", display: 'inline' }} />
                                                            <Typography sx={{ fontWeight: "bold", color: "black", marginTop: "-25px", marginLeft: "30px" }}>{li.name} <span style={{ fontSize: '12px', marginLeft: '300px', color: "rgb(72, 185, 157)", border: '1px solid rgb(72, 185, 157)', padding: '3px 10px', borderRadius: "20px", fontWeight: 'bold' }}>{li.adr_type}</span></Typography>
                                                            <Typography sx={{ color: "black", marginLeft: "30px" }}>{li.addr}</Typography>
                                                            <Typography sx={{ color: "black", marginLeft: "30px" }}>{li.town} - {li.pincode}</Typography>
                                                            <Typography sx={{ color: "black", marginLeft: "30px", marginTop: "20px" }}>Mobile :<span> {li.mobile_no}</span></Typography>
                                                            <ul  >
                                                                <li ><p style={{ fontWeight: "normal", fontFamily: "verdana" }}
                                                                >Pay on Delivery available</p></li>
                                                            </ul>
                                                            <Button sx={{ color: 'black', fontWeight: "bold", padding: "5px 15px", border: "2px solid black", marginTop: "10px", marginLeft: "30px", '&:hover': { backgroundColor: "white" } }} disableTouchRipple
                                                                id={`adr_removebtn_${index}`}
                                                                onClick={() => {
                                                                    axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete_adr_adrid?user_id=${props.user.user_id}&adr_id=${li.adr_id}`)
                                                                        .then((data) => {
                                                                            if (data.data.deletedCount == 1) {
                                                                                toast.success('Details deleted successfully!!', { autoClose: 3000 });
                                                                                setIterate(iterate => iterate + 1);
                                                                            }
                                                                            else
                                                                                toast.error('Error Please retry!!', { autoClose: 3000 })
                                                                        })
                                                                }}>REMOVE</Button>
                                                            <Button sx={{ color: 'black', fontWeight: "bold", padding: "5px 15px", border: "2px solid black", marginTop: "10px", marginLeft: "30px", '&:hover': { backgroundColor: "white" } }} disableTouchRipple
                                                                id={`adr_editbtn_${index}`} onClick={() => {
                                                                    setChangeFlag(true);
                                                                    setChangeName(li.name);
                                                                    setChangeMob(li.mobile_no);
                                                                    setChangePin(li.pincode);
                                                                    setChangeAddr(li.addr);
                                                                    setChangeTown(li.town);
                                                                    setChangeAdrType(li.adr_type);
                                                                    setChangeAdrId(li.adr_id);
                                                                }}>EDIT</Button>
                                                        </Box>
                                                    </>}
                                                </>)
                                            })
                                        }
                                        <Box sx={{ border: '1px dashed lightgrey', marginTop: '20px', paddingTop: '20px', paddingBottom: '20px', paddingLeft: '20px' }}>
                                            <Button disableTouchRipple sx={{
                                                textTransform: 'none', fontSize: '19px',
                                                color: 'rgb(250, 50, 84)', fontWeight: 'bold',
                                                '&:hover':
                                                {
                                                    backgroundColor: 'transparent', color: 'rgb(250, 50, 84)'
                                                }
                                            }} onClick={() => {
                                                setAdrsFlag(true);
                                                setAdrName('');
                                                setAdrMob('');
                                                setAdrCode('');
                                                setAdrAdrs('');
                                                setAdrTown('');
                                                setAdrType('');
                                            }}>+ Add New Address</Button>
                                        </Box>
                                    </>
                                }
                            </Box>
                        </Box>
                    </Box>
                    {/* Right Pane */}
                    <Box sx={{ flex: 4, marginLeft: '25px', marginTop: '30px' }}>
                        <Typography variant='body1' sx={{ color: 'black', fontWeight: 'bold' }}>DELIVERY ESTIMATES</Typography>
                        {pdet.length > 0 && pdet.map((li) => {
                            return (<>
                                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '30px', paddingBottom: '15px', width: '70%', borderBottom: "1px dashed lightgrey" }}>
                                    <img src={`data:image/png;base64,${li.image}`} alt='loading' width='60px' height='60px' />
                                    {li.count > 0 && <Typography sx={{ flex: 8, marginLeft: '20px' }}>Estimated Delivery by <span>{new Date(li.delivery).toLocaleString('hi-EN').toLocaleUpperCase()}</span></Typography>}
                                    {li.count <= 0 && <Typography sx={{ color: "red", padding: "10px", fontWeight: "bold", fontFamily: "cursive" }} >ITEM NOT IN STOCK !!</Typography>}
                                </Box>
                            </>)
                        })}
                        <Typography variant='body1' sx={{ color: 'grey', fontWeight: 'bold', marginTop: '40px' }}>PRICE DETAILS <span>({total_count} Item)</span></Typography>
                        <table style={{
                            marginTop: '20px', width: '70% ', paddingRight: '10px'
                        }}>
                            <tbody>
                                <tr style={{ height: '40px' }
                                } >
                                    <td style={{ width: '70%', fontFamily: "verdana" }}>Total MRP</td>
                                    <td style={{ width: '50%', textAlign: 'right', fontFamily: "verdana" }}>&#8377; {total_mrp}</td>
                                </tr>
                                <tr style={{ height: '40px' }} >
                                    <td style={{ width: '70%', fontFamily: "verdana" }}>Discount on MRP</td>
                                    <td style={{ width: '50%', textAlign: 'right', fontFamily: "verdana", color: 'rgb(72, 185, 157)' }}>&#8377; {discount_mrp}-</td>
                                </tr>
                                <tr style={{ height: '40px' }} >
                                    <td style={{ width: '70%', fontFamily: "verdana" }}>Convenience Fee <Button sx={{ color: 'rgb(243, 66, 140)', textTransform: 'none', marginLeft: '20px', cursor: 'pointer', fontWeight: "bold" }}
                                        onClick={() => setKnow(true)}> Know More</Button></td>
                                    <td style={{ width: '50%', fontFamily: "verdana", textAlign: 'right' }}>&#8377; {conv_fee}</td>
                                </tr>
                                {gift_wrap > 0 && <>
                                    <tr style={{ height: '40px' }} >
                                        <td style={{ width: '70%', fontFamily: "verdana" }}>Gift Wrap </td>
                                        <td style={{ width: '50%', fontFamily: "verdana", textAlign: 'right' }}>&#8377; {gift_wrap}</td>
                                    </tr>
                                </>
                                }
                                {offer_amt > 0 && <>
                                    <tr style={{ height: '40px' }} >
                                        <td style={{ width: '70%', fontFamily: "verdana" }}>First Order</td>
                                        <td style={{ width: '50%', textAlign: 'right', fontFamily: "verdana", color: 'rgb(72, 185, 157)' }}>&#8377; {offer_amt}-</td>
                                    </tr>
                                </>}
                            </tbody>
                        </table>
                        <div style={{ marginTop: '20px', width: '75%', borderBottom: '1px solid lightgrey', backgroundColor: 'grey' }}></div>
                        <table style={{
                            marginTop: '20px', width: '70% ', paddingRight: '10px'
                        }}>
                            <tbody>
                                <tr style={{ height: '40px' }
                                } >
                                    <td style={{ width: '70%' }}>Total Amount</td>
                                    <td style={{ width: '50%', textAlign: 'right', fontFamily: "verdana", fontWeight: "bold" }}>&#8377; {total_amount}</td>
                                </tr>
                            </tbody>
                        </table>
                        {notinstock > 0 && <Button sx={{
                            cursor: 'pointer',
                            width: '76%', fontSize: '19px', fontWeight: 'bold', fontFamily: 'monospace',
                            color: 'white', backgroundColor: 'rgb(250, 50, 84)', marginTop: '10px',
                            '&:hover': { color: 'white', backgroundColor: 'rgb(250, 50, 84)' }
                        }} onClick={() => alert('Kindly remove the Not in Stock Item from order in previous Step !!')}
                        >CONTINUE</Button>}
                        {notinstock == 0 && <Button sx={{
                            cursor: 'pointer',
                            width: '76%', fontSize: '19px', fontWeight: 'bold', fontFamily: 'monospace',
                            color: 'white', backgroundColor: 'rgb(250, 50, 84)', marginTop: '10px',
                            '&:hover': { color: 'white', backgroundColor: 'rgb(250, 50, 84)' }
                        }}
                            onClick={() => {
                                axios.post(`${process.env.REACT_APP_BACKEND_URL}/add_del_adr`, {
                                    'user_id': props.user.user_id,
                                    'name': newname,
                                    'mobile_no': newmob,
                                    'pincode': newpin,
                                    'addr': newadr,
                                    'town': newtown,
                                    'adr_type': newadrtype,
                                    'adr_id': newadrid
                                })
                                    .then((data) => {
                                        if (data.data.user_id != undefined)
                                            props.setCartState('Payment')
                                    })
                            }}
                            disabled={disab}>CONTINUE</Button>}
                    </Box>
                </Box>
                {
                    addrflag === true && <>
                        < Dialog open={addrflag} sx={{ margin: 'auto', width: '800px', height: '590px' }}   >
                            <DialogContent >
                                <DialogContentText sx={{ width: '550px', height: "460px" }} >
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Typography sx={{ flex: 11, fontWeight: 'bold', fontSize: "15px" }}>ADD NEW ADDRESS</Typography>
                                        <span style={{ display: "inline-block", flex: 1, fontSize: "30px", cursor: 'pointer', fontFamily: "TimesNewRoman", color: "black" }} onClick={() => setAdrsFlag(false)}>&times;</span>
                                    </Box>
                                    <hr />
                                    <Typography sx={{ fontWeight: 'bold', fontSize: "15px", marginTop: "20px", marginLeft: '30px' }}>CONTACT DETAILS</Typography>
                                    <TextField placeholder='Name*' sx={{ marginLeft: '30px', marginTop: "20px", width: "90%" }} value={adrname}
                                        onChange={(e) => setAdrName(e.target.value)} />
                                    <TextField placeholder='Mobile No*' sx={{ marginLeft: '30px', marginTop: "20px", width: "90%" }} value={adrmob}
                                        onChange={(e) => setAdrMob(e.target.value)} />
                                    <Typography sx={{ fontWeight: 'bold', fontSize: "15px", marginTop: "25px", marginLeft: '30px' }}>ADDRESS</Typography>
                                    {pinonly === true && <>
                                        <TextField placeholder='Pin Code*' sx={{ marginLeft: '30px', marginTop: "20px", width: "90%" }} value={pin}
                                            onChange={(e) => setPin(e.target.value)} />
                                    </>}
                                    {pinonly === false && <>
                                        <TextField placeholder='Pin Code*' sx={{ marginLeft: '30px', marginTop: "20px", width: "90%" }} value={adrcode}
                                            onChange={(e) => setAdrCode(e.target.value)} />
                                    </>}
                                    <TextField placeholder='Address (House No,Building,Street,Area)*' sx={{ marginLeft: '30px', marginTop: "20px", width: "90%" }} value={adradrs}
                                        onChange={(e) => setAdrAdrs(e.target.value)} />
                                    <TextField placeholder='Locality/Town*' sx={{ marginLeft: '30px', marginTop: "20px", width: "90%" }} value={adrtown}
                                        onChange={(e) => setAdrTown(e.target.value)}
                                        onBlur={(e) => {
                                            fun1()
                                            function fun1() {
                                                if (pinonly === true) {
                                                    if (adrname.length > 0 && adrmob.length > 0 && adradrs.length > 0 && (pin.length > 0)
                                                        && adrtown.length > 0 && adrtype != '') {
                                                        setDis(false);
                                                    }

                                                    else {
                                                        setDis(true);
                                                        alert('Please Enter all the details')
                                                    }
                                                }
                                                else if (pinonly === false) {
                                                    if (adrname.length > 0 && adrmob.length > 0 && adradrs.length > 0 && (adrcode.length > 0)
                                                        && adrtown.length > 0 && adrtype != '')
                                                        setDis(false);
                                                    else {
                                                        setDis(true);
                                                        alert('Please Enter all the details')
                                                    }
                                                }
                                            }
                                        }} />
                                    <FormControl>
                                        <FormLabel id="cart_addrss_type" sx={{ fontWeight: 'bold', fontSize: "15px", marginTop: "25px", marginLeft: '30px', color: "grey" }} >SAVE ADDRESS AS</FormLabel>
                                        <RadioGroup
                                            aria-labelledby="cart_addrss_type"
                                            name="cart_addrss_type"
                                            value={adrtype}
                                            onChange={(e) => setAdrType(e.target.value)}>
                                            <FormControlLabel sx={{ marginLeft: "20px", marginTop: "15px" }} value="Home" control={<Radio />} label="Home" />
                                            <FormControlLabel sx={{ marginLeft: "20px" }} value="Work" control={<Radio />} label="Work" />
                                        </RadioGroup>
                                    </FormControl>
                                    <Button sx={{
                                        marginTop: "30px", padding: "10px", fontweight: "bold", fontSize: "15px",
                                        width: "90%", marginLeft: "10px", color: "white", backgroundColor: "rgb(243, 66, 140)"
                                        , '&:hover': { color: "white", backgroundColor: "rgb(243, 66, 140)" }
                                    }} disabled={dis}
                                        onClick={() => {
                                            if (pinonly === true) {
                                                axios.put(`${process.env.REACT_APP_BACKEND_URL}/edit_addr?user_id=${props.user.user_id}`, {
                                                    'user_id': props.user.user_id,
                                                    'name': adrname,
                                                    'mob': adrmob,
                                                    'pincode': pin,
                                                    'addr': adradrs,
                                                    'town': adrtown,
                                                    'adr_type': adrtype,
                                                    'adr_id': storeadrid
                                                })
                                                    .then((data) => {
                                                        if (data.data.modifiedCount == 1) {

                                                            setAdrOnly(true);
                                                            setPinOnly(false);
                                                            setEmptyFlag(false);
                                                        }
                                                        else {
                                                            setAdrOnly(false);
                                                        }
                                                    })
                                            }
                                            else if (pinonly === false) {
                                                axios.post(`${process.env.REACT_APP_BACKEND_URL}/add_addr`, {
                                                    'user_id': props.user.user_id,
                                                    'name': adrname,
                                                    'mob': adrmob,
                                                    'pincode': adrcode,
                                                    'addr': adradrs,
                                                    'town': adrtown,
                                                    'adr_type': adrtype,
                                                    'adr_id': (count + 1)
                                                })
                                                    .then((data) => {
                                                        if (data.data.name != undefined) {
                                                            setIterate(iterate => iterate + 1);
                                                            setAdrOnly(true);
                                                            setPinOnly(false);
                                                            setEmptyFlag(false);
                                                        }
                                                        else {
                                                            setAdrOnly(false);
                                                        }
                                                    })
                                            }
                                        }}>ADD ADDRESS</Button>
                                    <br></br>
                                    <br></br>
                                </DialogContentText>
                            </DialogContent>
                        </Dialog>
                    </>
                }
                {/* edit address */}
                {
                    changeflag === true && <>
                        < Dialog open={changeflag} sx={{ margin: 'auto', width: '800px', height: '590px' }}   >
                            <DialogContent >
                                <DialogContentText sx={{ width: '550px', height: "460px" }} >
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Typography sx={{ flex: 11, fontWeight: 'bold', fontSize: "15px" }}>ADD NEW ADDRESS</Typography>
                                        <span style={{ display: "inline-block", flex: 1, fontSize: "30px", cursor: 'pointer', fontFamily: "TimesNewRoman", color: "black" }} onClick={() => setChangeFlag(false)}>&times;</span>
                                    </Box>
                                    <hr />
                                    <Typography sx={{ fontWeight: 'bold', fontSize: "15px", marginTop: "20px", marginLeft: '30px' }}>CONTACT DETAILS</Typography>
                                    <TextField placeholder='Name*' sx={{ marginLeft: '30px', marginTop: "20px", width: "90%" }} value={changename}
                                        onChange={(e) => setChangeName(e.target.value)} />
                                    <TextField placeholder='Mobile No*' sx={{ marginLeft: '30px', marginTop: "20px", width: "90%" }} value={changemob}
                                        onChange={(e) => setChangeMob(e.target.value)} />
                                    <Typography sx={{ fontWeight: 'bold', fontSize: "15px", marginTop: "25px", marginLeft: '30px' }}>ADDRESS</Typography>
                                    <TextField placeholder='Pin Code*' sx={{ marginLeft: '30px', marginTop: "20px", width: "90%" }} value={changepin}
                                        onChange={(e) => setChangePin(e.target.value)} />
                                    <TextField placeholder='Address (House No,Building,Street,Area)*' sx={{ marginLeft: '30px', marginTop: "20px", width: "90%" }} value={changeaddr}
                                        onChange={(e) => setChangeAddr(e.target.value)} />
                                    <TextField placeholder='Locality/Town*' sx={{ marginLeft: '30px', marginTop: "20px", width: "90%" }} value={changetown}
                                        onChange={(e) => setChangeTown(e.target.value)}
                                        onBlur={(e) => {
                                            function fun1() {
                                                if (changename.length > 0 && changemob.length > 0 && changeaddr.length > 0 && (changepin.length > 0)
                                                    && changetown.length > 0 && changeadrtype != '') {
                                                    setDis1(false);
                                                }
                                                else {
                                                    setDis1(true);
                                                    alert('Please Enter all the details')
                                                }
                                            }
                                            fun1()
                                        }} />
                                    <FormControl>
                                        <FormLabel id="cart_addr_type" sx={{ fontWeight: 'bold', fontSize: "15px", marginTop: "25px", marginLeft: '30px', color: "grey" }} >SAVE ADDRESS AS</FormLabel>
                                        <RadioGroup
                                            aria-labelledby="cart_addr_type"
                                            name="cart_addr_type"
                                            onChange={(e) => setChangeAdrType(e.target.value)}>
                                            <FormControlLabel sx={{ marginLeft: "20px", marginTop: "15px" }} value="Home" control={<Radio />} label="Home" />
                                            <FormControlLabel sx={{ marginLeft: "20px" }} value="Work" control={<Radio />} label="Work" />
                                        </RadioGroup>
                                    </FormControl>
                                    <Button sx={{
                                        marginTop: "30px", padding: "10px", fontweight: "bold", fontSize: "15px",
                                        width: "90%", marginLeft: "10px", color: "white", backgroundColor: "rgb(243, 66, 140)"
                                        , '&:hover': { color: "white", backgroundColor: "rgb(243, 66, 140)" }
                                    }} disabled={dis1}
                                        onClick={() => {
                                            axios.put(`${process.env.REACT_APP_BACKEND_URL}/edit_addr?user_id=${props.user.user_id}`, {
                                                'user_id': props.user.user_id,
                                                'name': changename,
                                                'mob': changemob,
                                                'pincode': changepin,
                                                'addr': changeaddr,
                                                'town': changetown,
                                                'adr_type': changeadrtype,
                                                'adr_id': changeadrid
                                            })
                                                .then((data) => {
                                                    if (data.data.modifiedCount == 1) {
                                                        setIterate(iterate => iterate + 1);
                                                    }
                                                    else
                                                        toast.error('Error Please retry!');
                                                })
                                        }}>SAVE ADDRESS</Button>
                                    <br></br>
                                    <br></br>
                                </DialogContentText>
                            </DialogContent>
                        </Dialog>
                    </>
                }
                {know_more == true && <>
                    < Dialog open={know_more} sx={{ margin: 'auto', width: '600px', height: '590px' }}   >
                        <DialogContent >
                            <DialogContentText sx={{ width: '450px', height: "460px" }} >
                                <Box sx={{ display: 'flex', alignItems: "center" }}>
                                    <Typography sx={{ flex: 11, color: 'black', fontWeight: 'bold', fontSize: '20px' }}>Convenience Fee</Typography>
                                    <span style={{ fontSize: '40px', cursor: 'pointer', fontWeight: 'normal', flex: 1, fontFamily: "TimesNewRoman" }} onClick={() => setKnow(false)}>&times;</span>
                                </Box>
                                <Box sx={{ marginTop: '10px', borderRadius: '10px', backgroundColor: 'rgb(240,240,240)' }}>
                                    <Typography sx={{ padding: '20px' }}>'Convenience Fee' comprises:</Typography>
                                    <ul style={{ marginRight: '20px' }}>
                                        <li style={{ fontWeight: 'normal', fontFamily: 'verdana', fontSize: '16px' }}>A flat platform charge, applicable to all customers including Myntra Insiders</li>
                                        <li style={{ fontWeight: 'normal', fontFamily: 'verdana', fontSize: '16px' }}>Shipping Charges for low value orders(Insiders are exempted from this) or higher than average returns </li>
                                    </ul>
                                    <Typography sx={{ paddingLeft: '20px', paddingTop: '10px' }}>Have a question? Refer<ListItem style={{ display: 'inline', color: 'rgb(243, 66, 140)', cursor: 'pointer' }} component={Link} to='/faqs'>FAQ'S </ListItem></Typography>
                                    <div style={{ marginLeft: '20px', marginTop: '20px', marginRight: '20px', height: '1px', backgroundColor: 'darkgrey' }}></div>
                                    <Typography sx={{ paddingLeft: '20px', paddingTop: '10px' }}>For further information ,refer to our <ListItem style={{ color: 'rgb(243, 66, 140)', cursor: 'pointer', display: 'inline' }} component={Link} to='/termsofuse'>Terms of use </ListItem></Typography>
                                    <br></br>
                                </Box>
                                <br></br>
                            </DialogContentText>
                        </DialogContent >
                    </Dialog >
                </>
                }
            </>}
        </>
    )
}
const mapStateToProps = (cstate) => {
    return {
        user: cstate.user
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setCartState: (data) => dispatch(setCartState(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CartAddress);