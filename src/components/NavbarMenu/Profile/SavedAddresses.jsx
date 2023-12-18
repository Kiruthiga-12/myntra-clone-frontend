import { Typography, Box, Button, Dialog, DialogContent, DialogContentText, TextField, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel } from "@mui/material"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../../Loader/Loader";
const SavedAddresses = (props) => {
    //getting first address
    const [adrname, setAdrName] = useState();
    const [adraddr, setAdrAddr] = useState();
    const [adrtown, setAdrTown] = useState();
    const [adrpin, setAdrPin] = useState();
    const [adrmob, setAdrMob] = useState();
    const [adrid, setAdrId] = useState();
    const [adrtype, setAdrType] = useState();

    //getting all address
    const [adr, getAdr] = useState([]);

    //edit flag 
    const [editflag, setEditFlag] = useState(false);
    const [changename, setChangeName] = useState();
    const [changemob, setChangeMob] = useState();
    const [changepin, setChangePin] = useState();
    const [changeaddr, setChangeAddr] = useState();
    const [changetown, setChangeTown] = useState();
    const [changeadrtype, setChangeAdrType] = useState();
    const [changeadrid, setChangeAdrId] = useState();
    const [dis1, setDis1] = useState(true);

    //to toggle show/hide remove and delete elements.
    const [changeflag, setChangeFlag] = useState(false);

    //add new address
    const [newflag, setNewFlag] = useState(false);
    const [newname, setNewName] = useState();
    const [newmob, setNewMob] = useState();
    const [newpin, setNewPin] = useState();
    const [newaddr, setNewAddr] = useState();
    const [newtown, setNewTown] = useState();
    const [newadrtype, setNewAdrType] = useState();
    const [dis, setDis] = useState(true)

    //get count 
    const [count, setCount] = useState(0);
    const [loader, setLoader] = useState(true);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_addr?user_id=${document.getElementById('userlogin_userid').innerText}`)
            .then((data) => {
                if (data.data.length > 0) {
                    setAdrName(data.data[0].name);
                    setAdrAddr(data.data[0].addr);
                    setAdrTown(data.data[0].town);
                    setAdrPin(data.data[0].pincode);
                    setAdrMob(data.data[0].mobile_no);
                    setAdrId(data.data[0].adr_id);
                    setAdrType(data.data[0].adr_type);
                    getAdr(data.data.slice())
                }
            })
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_addr_count?user_id=${document.getElementById('userlogin_userid').innerText}`)
            .then((data) => {
                if (data.data.data > 0)
                    setCount(data.data.data)
                else
                    setCount()
                setLoader(false);
            })
        document.title = 'Address';
    }, [])
    return (
        <>
            {loader == true ? <Loader /> : <>
                <ToastContainer />
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant='h6' sx={{ flex: 9, fontWeight: 'bold' }}>Saved Addresses</Typography>
                    <Button variant='outlined' sx={{ flex: 3, border: '1px solid grey', '&:hover': { backgroundColor: 'transparent', border: '1px solid black' }, color: 'slateblue', fontWeight: 'bold', fontSize: '15px', fontFamily: 'verdana' }}
                        onClick={() => setNewFlag(true)}> + ADD NEW ADDRESS</Button>
                </Box>
                {/* Default Address */}
                <Typography variant='body1' sx={{ marginTop: '40px', fontWeight: 'bolder', fontSize: '15px' }}>DEFAULT ADDRESS</Typography>
                {adrname != undefined && <>

                    <Box sx={{ marginTop: '20px', boxShadow: '2px 2px 2px lightgrey,-2px -2px 2px lightgrey', paddingLeft: '10px' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography sx={{ flex: 11, fontWeight: 'bold', color: 'grey', paddingTop: '20px' }}>{adrname}</Typography>
                            <div style={{ marginRight: '20px', width: '50px', backgroundColor: 'lightgrey', padding: '6px 10px', textAlign: 'center', borderRadius: '20px', fontSize: "12px", textTransform: "uppercase" }}>{adrtype}</div>
                        </Box>
                        <Typography sx={{ marginTop: '10px' }}>{adraddr}</Typography>
                        <Typography >{adrtown} - {adrpin}</Typography>
                        <Typography sx={{ marginTop: '10px' }}>Mobile: {adrmob}</Typography>
                        <div style={{ marginTop: '30px', borderBottom: '1px solid lightgrey', backgroundColor: 'grey' }}></div>
                        <Button disableTouchRipple sx={{ height: '50px', fontSize: '16px', fontWeight: 'bold', width: '49%', '&:hover': { backgroundColor: 'transparent' } }}
                            onClick={() => {
                                setEditFlag(true);
                                setChangeName(adrname);
                                setChangeMob(adrmob);
                                setChangePin(adrpin);
                                setChangeAddr(adraddr);
                                setChangeTown(adrtown);
                                setChangeAdrType(adrtype);
                                setChangeAdrId(adrid);
                            }}>EDIT</Button>
                        <span style={{ color: 'lightgrey', fontSize: '20px' }}>|</span>
                        <Button disableTouchRipple sx={{ height: '50px', fontSize: '16px', fontWeight: 'bold', width: '49%', '&:hover': { backgroundColor: 'transparent' } }}
                            onClick={() => {
                                axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete_adr_adrid?user_id=${document.getElementById('userlogin_userid').innerText}&adr_id=${adrid}`)
                                    .then((data) => {
                                        if (data.data.deletedCount == 1) {
                                            toast.success('Address deleted Successfully!', { autoClose: 3000 })
                                        }
                                        else {
                                            toast.error('Error Please retry!!');
                                        }
                                    })
                            }}>REMOVE</Button>
                    </Box>
                </>}
                {adrname == undefined && <>
                    <Typography sx={{ fontWeight: "bold", padding: "30px", textAlign: "center", color: "rgb(243, 66, 140)", fontSize: "20px" }}>No Default Address Found</Typography>
                </>}
                {/* Other Addresses */}
                <Typography variant='body1' sx={{ marginTop: '40px', fontWeight: 'bolder', fontSize: '15px' }}>OTHER ADDRESSES</Typography>
                {adr.length > 0 && adr.map((li, index) => {
                    if (li.name != adrname)
                        return (<>
                            <Box sx={{ marginTop: '20px', boxShadow: '2px 2px 2px lightgrey,-2px -2px 2px lightgrey', paddingLeft: '10px' }}
                                onClick={() => {
                                    setChangeFlag(!changeflag);
                                    if (changeflag === true) {
                                        document.getElementById(`saveadrline_${index}`).style.display = 'block';
                                        document.getElementById(`saveadredit_${index}`).style.display = 'inline-block';
                                        document.getElementById(`saveadrsep_${index}`).style.display = 'inline-block';
                                        document.getElementById(`saveadrremove_${index}`).style.display = 'inline-block';
                                    }
                                    else if (changeflag === false) {
                                        document.getElementById(`saveadrline_${index}`).style.display = 'none';
                                        document.getElementById(`saveadredit_${index}`).style.display = 'none';
                                        document.getElementById(`saveadrsep_${index}`).style.display = 'none';
                                        document.getElementById(`saveadrremove_${index}`).style.display = 'none';
                                    }
                                }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography sx={{ flex: 11, fontWeight: 'bold', color: 'grey', paddingTop: '20px' }}>{li.name}</Typography>
                                    <div style={{ marginRight: '20px', width: '50px', backgroundColor: 'lightgrey', padding: '6px 10px', textAlign: 'center', borderRadius: '20px', fontSize: "12px", textTransform: 'uppercase' }}>{li.adr_type}</div>
                                </Box>
                                <Typography sx={{ marginTop: '10px' }}>{li.addr}</Typography>
                                <Typography >{li.town} - {li.pincode}</Typography>
                                <Typography sx={{ marginTop: '10px' }}>Mobile: {li.mobile_no}</Typography>
                                {/* edit and remove flag  */}
                                <div style={{ marginTop: '30px', borderBottom: '1px solid lightgrey', backgroundColor: 'grey', marginRight: "10px" }}
                                    id={`saveadrline_${index}`}></div>
                                <Button disableTouchRipple sx={{ height: '50px', fontSize: '16px', fontWeight: 'bold', width: '49%', '&:hover': { backgroundColor: 'transparent' } }}
                                    id={`saveadredit_${index}`}
                                    onClick={() => {
                                        setEditFlag(true);
                                        setChangeName(li.name);
                                        setChangeMob(li.mobile_no);
                                        setChangePin(li.pincode);
                                        setChangeAddr(li.addr);
                                        setChangeTown(li.town);
                                        setChangeAdrType(li.adr_type);
                                        setChangeAdrId(li.adr_id);
                                    }}>EDIT</Button>
                                <span style={{ color: 'lightgrey', fontSize: '20px' }}
                                    id={`saveadrsep_${index}`}>|</span>
                                <Button disableTouchRipple sx={{ height: '50px', fontSize: '16px', fontWeight: 'bold', width: '49%', '&:hover': { backgroundColor: 'transparent' } }}
                                    id={`saveadrremove_${index}`}
                                    onClick={() => {
                                        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete_adr_adrid?user_id=${document.getElementById('userlogin_userid').innerText}&adr_id=${li.adr_id}`)
                                            .then((data) => {
                                                if (data.data.deletedCount == 1) {
                                                    toast.success('Address Deleted Successfully!!', { autoClose: 3000 })
                                                }
                                                else {
                                                    toast.error('Error Please retry!!')
                                                }
                                            })
                                    }}>REMOVE</Button>
                            </Box>
                        </>)
                })}
                {adr.length == 0 && <>
                    <Typography sx={{ fontWeight: "bold", padding: "30px", textAlign: "center", color: "rgb(243, 66, 140)", fontSize: "20px" }}>No Other Addresses found!!</Typography>
                </>}
                {
                    editflag === true && <>
                        < Dialog open={editflag} sx={{ margin: 'auto', width: '800px', height: '590px' }}   >
                            <DialogContent >
                                <DialogContentText sx={{ width: '550px', height: "460px" }} >
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Typography sx={{ flex: 11, fontWeight: 'bold', fontSize: "15px" }}>EDIT ADDRESS</Typography>
                                        <span style={{ display: "inline-block", flex: 1, fontSize: "30px", cursor: 'pointer', fontFamily: "TimesNewRoman", color: "black" }} onClick={() => setEditFlag(false)}>&times;</span>
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
                                        <FormLabel id="cart_ad" sx={{ fontWeight: 'bold', fontSize: "15px", marginTop: "25px", marginLeft: '30px', color: "grey" }} >SAVE ADDRESS AS</FormLabel>
                                        <RadioGroup
                                            aria-labelledby="cart_ad"
                                            name="cart_ad"
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
                                            axios.put(`${process.env.REACT_APP_BACKEND_URL}/edit_addr?user_id=${document.getElementById('userlogin_userid').innerText}`, {
                                                'user_id': document.getElementById('userlogin_userid').innerText,
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
                                                        toast.success('Address Edited Successfully!!');
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
                {
                    newflag === true && <>
                        < Dialog open={newflag} sx={{ margin: 'auto', width: '800px', height: '590px' }}   >
                            <DialogContent >
                                <DialogContentText sx={{ width: '550px', height: "460px" }} >
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Typography sx={{ flex: 11, fontWeight: 'bold', fontSize: "15px" }}>ADD NEW ADDRESS</Typography>
                                        <span style={{ display: "inline-block", flex: 1, fontSize: "30px", cursor: 'pointer', fontFamily: "TimesNewRoman", color: "black" }} onClick={() => setNewFlag(false)}>&times;</span>
                                    </Box>
                                    <hr />
                                    <Typography sx={{ fontWeight: 'bold', fontSize: "15px", marginTop: "20px", marginLeft: '30px' }}>CONTACT DETAILS</Typography>
                                    <TextField placeholder='Name*' sx={{ marginLeft: '30px', marginTop: "20px", width: "90%" }} value={newname}
                                        onChange={(e) => setNewName(e.target.value)} />
                                    <TextField placeholder='Mobile No*' sx={{ marginLeft: '30px', marginTop: "20px", width: "90%" }} value={newmob}
                                        onChange={(e) => setNewMob(e.target.value)} />
                                    <Typography sx={{ fontWeight: 'bold', fontSize: "15px", marginTop: "25px", marginLeft: '30px' }}>ADDRESS</Typography>
                                    <TextField placeholder='Pin Code*' sx={{ marginLeft: '30px', marginTop: "20px", width: "90%" }} value={newpin}
                                        onChange={(e) => setNewPin(e.target.value)} />
                                    <TextField placeholder='Address (House No,Building,Street,Area)*' sx={{ marginLeft: '30px', marginTop: "20px", width: "90%" }} value={newaddr}
                                        onChange={(e) => setNewAddr(e.target.value)} />
                                    <TextField placeholder='Locality/Town*' sx={{ marginLeft: '30px', marginTop: "20px", width: "90%" }} value={newtown}
                                        onChange={(e) => setNewTown(e.target.value)}
                                        onBlur={(e) => {
                                            fun1()
                                            function fun1() {
                                                if (newname.length > 0 && newmob.length > 0 && newaddr.length > 0 && (newpin.length > 0)
                                                    && newtown.length > 0 && newadrtype != '') {
                                                    setDis(false);
                                                }
                                            }
                                        }} />
                                    <FormControl>
                                        <FormLabel id="cart_type" sx={{ fontWeight: 'bold', fontSize: "15px", marginTop: "25px", marginLeft: '30px', color: "grey" }} >SAVE ADDRESS AS</FormLabel>
                                        <RadioGroup
                                            aria-labelledby="cart_type"
                                            name="cart_type"
                                            value={newadrtype}
                                            onChange={(e) => setNewAdrType(e.target.value)}>
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
                                            axios.post(`${process.env.REACT_APP_BACKEND_URL}/add_addr`, {
                                                'user_id': document.getElementById('userlogin_userid').innerText,
                                                'name': newname,
                                                'mob': newmob,
                                                'pincode': newpin,
                                                'addr': newaddr,
                                                'town': newtown,
                                                'adr_type': newadrtype,
                                                'adr_id': (count + 1)
                                            })
                                                .then((data) => {
                                                    if (data.data.name != undefined) {
                                                        toast.success('Address added successfully!!', { autoClose: 3000 })
                                                    }
                                                    else {
                                                        toast.error('Error please retry!!')
                                                    }
                                                })
                                        }}>ADD ADDRESS</Button>
                                    <br></br>
                                    <br></br>
                                </DialogContentText>
                            </DialogContent>
                        </Dialog>
                    </>
                }
            </>}
        </>
    )
}

export default SavedAddresses;