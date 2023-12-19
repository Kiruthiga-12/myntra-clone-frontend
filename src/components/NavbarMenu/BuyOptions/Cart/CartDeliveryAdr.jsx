import { Box, Dialog, DialogContent, DialogContentText, Typography, TextField, Button, InputAdornment, FormControl, RadioGroup, Radio, FormLabel, FormControlLabel } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
const CartDeliveryAdr = () => {

    //count 
    const [count, setCount] = useState(0);

    //to get all adr data
    const [adr, getAdr] = useState([]);

    //Initial Value
    const [initial, setInitial] = useState(false);

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

    //open Dialog
    const [opendial, setOpenDial] = useState(false);

    //set PinCode Only.
    const [code, setCode] = useState()


    //disabling check button
    const [dis1, setDis1] = useState(true);

    //if user clcked add new address button.
    const [addadrflag, setAddAdrFlag] = useState(false);
    //to store eneterd adr details.
    const [adrname, setAdrName] = useState();
    const [adrmob, setAdrMob] = useState();
    const [adrcode, setAdrCode] = useState();
    const [adradrs, setAdrAdrs] = useState();
    const [adrtown, setAdrTown] = useState();
    const [adrtype, setAdrType] = useState();
    //add address disable button

    const [dis, setDis] = useState(true);

    //user selects default address.
    const [defaultflag, setDefaultFlag] = useState(false);
    useEffect(() => {
        //to get single adr
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_new_adr?user_id=${document.getElementById('userlogin_userid').innerText}`)
            .then((data) => {
                if (data.data.length == 0) {
                    setInitial(true)
                }
                else if (data.data.length > 0) {
                    if (data.data[0].name == undefined) {
                        setPinOnly(true)
                        setPin(data.data[0].pincode)
                        setStoreAdrId(data.data[0].adr_id)

                    }
                    else if (data.data[0].name != undefined) {
                        setAdrOnly(true);
                        setNewName(data.data[0].name);
                        setNewPin(data.data[0].pincode);
                        setNewAdr(data.data[0].addr);
                        setNewTown(data.data[0].town);
                    }
                }
            })
        //to get count 
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_addr_count?user_id=${document.getElementById('userlogin_userid').innerText}`)
            .then((data) => {
                setCount(data.data.data)
            })
        //to get all address
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_addr?user_id=${document.getElementById('userlogin_userid').innerText}`)
            .then((data) => {
                if (data.data.length > 0)
                    getAdr(data.data.slice())
                else
                    getAdr([])
            })
    }, [])
    //after pincode only added , get refreshed data
    useEffect(() => {
        if ((pinonly === true) || (adronly === true) && (defaultflag === false)) {//to get single adr
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_new_adr?user_id=${document.getElementById('userlogin_userid').innerText}`)
                .then((data) => {
                    if (data.data.length > 0) {
                        if (data.data[0].name == undefined) {
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
                        }
                    }
                })
            //to get count 
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_addr_count?user_id=${document.getElementById('userlogin_userid').innerText}`)
                .then((data) => {
                    setCount(data.data.data)
                })
            //to get all address
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_addr?user_id=${document.getElementById('userlogin_userid').innerText}`)
                .then((data) => {
                    if (data.data.length > 0)
                        getAdr(data.data.slice())
                    else
                        getAdr([])
                })
        }
    }, [pinonly, adronly])
    return (<>
        {/* Initially  */}
        {initial === true && <>
            <Box sx={{ flex: 9, marginTop: '20px', marginLeft: '20px', marginBottom: '20px' }}>
                <Typography sx={{ fontWeight: 'bold' }}>Check delivery time & services</Typography>
            </Box>
            <Button variant='outlined' sx={{
                fontSize: '14px',
                flex: 3, marginRight: '10px', fontWeight: 'bold',
                color: 'rgb(250, 50, 84)',
                backgroundColor: 'transparent',
                border: '1px solid rgb(250, 50, 84)',
                '&:hover': {
                    backgroundColor: 'transparent',
                    color: 'rgb(250, 50, 84)',
                    border: '1px solid rgb(250, 50, 84)'
                }
            }} onClick={() =>
                setOpenDial(true)
            }>ENTER PINCODE</Button>
        </>}
        {pinonly === true && <>
            <Box sx={{ flex: 9, marginTop: '20px', marginLeft: '20px', marginBottom: '20px' }}>
                <Typography >Deliver to : <span>{pin}</span></Typography>
            </Box>
            <Button variant='outlined' sx={{
                fontSize: '14px',
                flex: 3, marginRight: '10px', fontWeight: 'bold',
                color: 'rgb(250, 50, 84)',
                backgroundColor: 'transparent',
                border: '1px solid rgb(250, 50, 84)',
                '&:hover': {
                    backgroundColor: 'transparent',
                    color: 'rgb(250, 50, 84)',
                    border: '1px solid rgb(250, 50, 84)'
                }
            }} onClick={() => {
                setOpenDial(true)
            }
            }>CHANGE ADDRESS</Button>
        </>}
        {((adronly === true) || (defaultflag === true)) && <>
            <Box sx={{ flex: 6, marginTop: '20px', marginLeft: '20px', marginBottom: '20px' }}>
                <Typography>Deliver to: <span>{newname}, {newpin}</span></Typography>
                <Typography variant='body1' sx={{ fontSize: '13px' }}>{newadr} {newtown}</Typography>
            </Box>
            <Button variant='outlined' sx={{
                fontSize: '13px',
                flex: 2, marginRight: '10px', fontWeight: 'bold',
                color: 'rgb(250, 50, 84)',
                backgroundColor: 'transparent',
                border: '1px solid rgb(250, 50, 84)',
                '&:hover': {
                    backgroundColor: 'transparent',
                    color: 'rgb(250, 50, 84)',
                    border: '1px solid rgb(250, 50, 84)'
                }
            }} onClick={() => { setOpenDial(true) }}>CHANGE ADDRESS</Button>
        </>}
        {/* opens dialogue box to enter Pincode or full Address */}
        {
            opendial === true && <>
                < Dialog open={opendial} sx={{ margin: 'auto', width: '800px', height: '600px' }}   >
                    <DialogContent >
                        <DialogContentText sx={{ width: '510px', height: "500px" }} >
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography sx={{ flex: 11, fontWeight: 'bold', fontSize: "20px" }}>Enter Delivery Details</Typography>
                                <span style={{ display: "inline-block", flex: 1, fontSize: "40px", cursor: 'pointer', fontFamily: "TimesNewRoman", color: "black" }} onClick={() => setOpenDial(false)}>&times;</span>
                            </Box>
                            {
                                pinonly === true && <>
                                    <TextField placeholder='Enter Pincode' sx={{ marginLeft: '30px', marginTop: "30px", width: "90%" }} value={pin}
                                        InputProps={{
                                            endAdornment: <InputAdornment position='end'>
                                                <Button disableTouchRipple sx={{
                                                    fontWeight: 'bold', color: "rgb(243, 66, 140)", cursor: 'disabled', backgroundColor: "white",
                                                    '&:hover': { backgroundColor: 'white' }
                                                }}
                                                    disabled={dis1} onClick={() => {
                                                        axios.put(`${process.env.REACT_APP_BACKEND_URL}/edit_addr_pincode?user_id=${document.getElementById('userlogin_userid').innerText}`, {
                                                            'user_id': document.getElementById('userlogin_userid').innerText,
                                                            'pincode': pin,
                                                            'adr_id': storeadrid
                                                        })
                                                            .then((data) => {
                                                                if (data.data.modifiedCount == 1) {
                                                                    setPinOnly(true);
                                                                    setInitial(false);
                                                                    setAdrOnly(false);
                                                                    setDefaultFlag(false);
                                                                }
                                                                else if (data.data.pincode == undefined)
                                                                    setPinOnly(false);
                                                            })
                                                    }}>CHECK</Button></InputAdornment>
                                        }}
                                        onChange={(e) => {
                                            setPin(e.target.value);
                                            if (e.target.value.length == 6)
                                                setDis1(false)
                                            else if (e.target.value.length != 6)
                                                setDis1(true)
                                        }} />
                                </>
                            }
                            {pinonly === false && <>
                                <TextField placeholder='Enter Pincode' sx={{ marginLeft: '30px', marginTop: "30px", width: "90%" }} value={code}
                                    InputProps={{
                                        endAdornment: <InputAdornment position='end'>
                                            <Button disableTouchRipple sx={{
                                                fontWeight: 'bold', color: "rgb(243, 66, 140)", cursor: 'disabled', backgroundColor: "white",
                                                '&:hover': { backgroundColor: 'white' }
                                            }}
                                                disabled={dis1} onClick={() => {
                                                    axios.post(`${process.env.REACT_APP_BACKEND_URL}/add_addr_pincode`, {
                                                        'user_id': document.getElementById('userlogin_userid').innerText,
                                                        'pincode': code,
                                                        'adr_id': (count + 1)
                                                    })
                                                        .then((data) => {
                                                            if (data.data.pincode != undefined) {
                                                                setPinOnly(true);
                                                                setInitial(false);
                                                                setAdrOnly(false);
                                                                setDefaultFlag(false);
                                                            }
                                                            else if (data.data.pincode == undefined)
                                                                setPinOnly(false);
                                                        })
                                                }}>CHECK</Button></InputAdornment>
                                    }}
                                    onChange={(e) => {
                                        setCode(e.target.value);
                                        if (e.target.value.length == 6)
                                            setDis1(false)
                                        else if (e.target.value.length != 6)
                                            setDis1(true)
                                    }} />
                            </>}
                            <Typography sx={{ fontSize: '18px', textAlign: "center", fontWeight: "bold", marginTop: '10px', fontFamily: 'sans-serif' }}>OR</Typography>
                            {(adronly === true || pinonly === true || defaultflag === true) && adr.length > 0 && adr.map((li) => {
                                return (<>
                                    <Box sx={{ marginLeft: '30px', width: "90%", marginTop: "30px", borderTop: '1px dotted black', paddingTop: "15px" }}>
                                        <input type='radio' name='address_default' style={{ width: "15px", height: '15px', accentColor: "rgb(243, 66, 140)", display: 'inline' }}
                                            onChange={(e) => {
                                                setDefaultFlag(true)
                                                setPinOnly(false)
                                                setAdrOnly(false);
                                                setNewName(li.name);
                                                setNewPin(li.pincode);
                                                setNewAdr(li.addr);
                                                setNewTown(li.town);
                                            }} />
                                        <Typography sx={{ fontWeight: "bold", color: "black", marginTop: "-25px", marginLeft: "30px" }}>{li.name}<span style={{ fontSize: '12px', marginLeft: '300px', color: "rgb(72, 185, 157)", border: '1px solid rgb(72, 185, 157)', padding: '3px 10px', borderRadius: "20px", fontWeight: 'bold' }}>{li.adr_type.toUpperCase()}</span></Typography>
                                        <Typography sx={{ color: "black", marginLeft: "30px" }}>{li.addr}</Typography>
                                        <Typography sx={{ color: "black", marginLeft: "30px" }}>{li.town}</Typography>
                                        <Typography sx={{ color: "black", marginLeft: "30px" }}>{li.pincode}</Typography>
                                    </Box>
                                </>)
                            })}
                            <Button disableTouchRipple sx={{
                                marginTop: '20px', marginLeft: '30px', color: 'black', width: "90%", border: '1px solid black', padding: '10px', fontSize: "15px", fontWeight: "bold",
                                '&:hover': { backgroundColor: "white" }
                            }}
                                onClick={() => setAddAdrFlag(true)}>ADD NEW ADDRESS</Button>
                            <br></br>
                            <br></br>
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            </>
        }
        {/* to add new address */}
        {addadrflag === true && <>
            < Dialog open={addadrflag} sx={{ margin: 'auto', width: '800px', height: '590px' }}   >
                <DialogContent >
                    <DialogContentText sx={{ width: '550px', height: "460px" }} >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography sx={{ flex: 11, fontWeight: 'bold', fontSize: "15px" }}>ADD NEW ADDRESS</Typography>
                            <span style={{ display: "inline-block", flex: 1, fontSize: "30px", cursor: 'pointer', fontFamily: "TimesNewRoman", color: "black" }} onClick={() => setAddAdrFlag(false)}>&times;</span>
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
                            <FormLabel id="cart_address_type" sx={{ fontWeight: 'bold', fontSize: "15px", marginTop: "25px", marginLeft: '30px', color: "grey" }} >SAVE ADDRESS AS</FormLabel>
                            <RadioGroup
                                aria-labelledby="cart_address_type"
                                name="cart_address_type"
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
                                    axios.put(`${process.env.REACT_APP_BACKEND_URL}/edit_addr?user_id=${document.getElementById('userlogin_userid').innerText}`, {
                                        'user_id': document.getElementById('userlogin_userid').innerText,
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
                                                setAdrOnly(true)
                                                setPinOnly(false);
                                                setInitial(false);
                                                setDefaultFlag(false);
                                            }
                                            else
                                                setAdrOnly(false)
                                        })
                                }
                                else if (pinonly === false) {
                                    axios.post(`${process.env.REACT_APP_BACKEND_URL}/add_addr`, {
                                        'user_id': document.getElementById('userlogin_userid').innerText,
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
                                                setAdrOnly(true);
                                                setPinOnly(false);
                                                setInitial(false);
                                                setDefaultFlag(false);
                                            }
                                            else {
                                                setAdrOnly(false)
                                            }
                                        })
                                }
                            }}>ADD ADDRESS</Button>
                        <br></br>
                        <br></br>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>}
    </>)
}
export default CartDeliveryAdr;