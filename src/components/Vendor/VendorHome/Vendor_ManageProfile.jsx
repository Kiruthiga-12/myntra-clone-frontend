import { Box, Typography, Button, TextField } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../Loader/Loader';
const Vendor_ManageProfile = (props) => {
    const [firstname, setFirstName] = useState('not entered');
    const [lastname, setLastName] = useState('not entered');
    const [mob, setMob] = useState('not entered');
    const [gender, setGender] = useState('not entered');
    const [dob, setDob] = useState('not entered');
    const [loc, setLoc] = useState('not entered');
    const [alt_mob, setAltMob] = useState('not entered');
    const [hint, setHint] = useState('not entered');
    const [image, setImage] = useState();
    const [email, setEmail] = useState('');

    //edit flag 
    const [editflag, setEditFlag] = useState(false);
    //async flag 
    const [flag, setFlag] = useState(false);
    //edit values
    const [newfirstname, setNewFirstName] = useState('');
    const [newlastname, setNewLastName] = useState('');
    const [newmob, setNewMob] = useState('');
    const [newmail, setNewMail] = useState('');
    const [newgender, setNewGender] = useState('');
    const [newdob, setNewDob] = useState('');
    const [newloc, setNewLoc] = useState('');
    const [newaltmob, setNewAltMob] = useState('');
    const [newhint, setNewHint] = useState('');
    //disabled
    const [disab, setDisab] = useState(true)
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        setImage(props.image)
        setEmail(props.email);
        setNewMail(props.email);
        setMob(props.mob);
        setNewMob(props.mob);
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_vendor_add_det?email=${props.email}`)
            .then((data) => {
                if (data.data.length > 0) {
                    setFlag(true)
                    setFirstName(data.data[0].firstname);
                    setLastName(data.data[0].lastname);
                    setGender(data.data[0].gender);
                    setDob(new Date(data.data[0].dob).toLocaleDateString());
                    setLoc(data.data[0].loc);
                    setAltMob(data.data[0].alt_mob);
                    setHint(data.data[0].hint_name);
                    //for edit details page
                    setNewFirstName(data.data[0].firstname);
                    setNewLastName(data.data[0].lastname);
                    setNewGender(data.data[0].gender);
                    setNewDob(new Date(data.data[0].dob).toLocaleDateString());
                    setNewLoc(data.data[0].loc);
                    setNewAltMob(data.data[0].alt_mob);
                    setNewHint(data.data[0].hint_name);
                }
                else
                    setFlag(false)
                setLoader(false);
            })
    }, [])
    return (<>
        {loader == true ? <Loader /> : <>
            <ToastContainer />
            <Box sx={{ marginTop: "30px", marginLeft: "30px", backgroundColor: 'rgb(200,200,200)', height: '220px', width: '900px', border: '1px solid black' }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <img src={image} alt='loading' width='180px' height='170px' style={{ marginTop: "30px", marginLeft: "20px" }} />
                    <Typography sx={{ flex: 5, marginLeft: '50px', marginTop: '100px' }}>{email} </Typography>
                    <Button variant='outlined' sx={{
                        flex: 2, fontWeight: "bold",
                        color: 'black', border: '1px solid black', height: '40px', width: '140px', marginTop: '30px',
                        '&:hover': { backgroundColor: 'transparent', border: '1px solid black' }
                    }} onClick={() => setEditFlag(true)}>EDIT PROFILE</Button>
                    <Box sx={{ flex: 1 }}></Box>
                </Box>
            </Box >
            {editflag === false && <>
                <Box sx={{ backgroundColor: 'rgb(200,200,200)', marginTop: "30px", marginLeft: "30px", border: '1px solid black', width: "900px" }}>
                    <Typography variant='h6' sx={{ marginTop: '30px', marginLeft: '220px', fontWeight: 'bold' }}>Profile Details</Typography>
                    <div style={{ width: '80%', marginTop: '30px', borderBottom: '1px solid black', marginLeft: '100px' }}></div>
                    <table style={{ margin: 'auto', marginTop: '50px', width: '600px' }}>
                        <tbody>
                            <tr >
                                <td style={{ fontWeight: 'normal', fontFamily: 'verdana', fontSize: '18px', width: '200px', textAlign: 'left', height: '50px', paddingLeft: '20px' }}>First Name</td>
                                <td style={{ fontWeight: 'normal', fontFamily: 'verdana', fontSize: '18px', paddingLeft: '20px' }}>{firstname}</td>
                            </tr>
                            <tr >
                                <td style={{ fontWeight: 'normal', fontFamily: 'verdana', fontSize: '18px', width: '200px', textAlign: 'left', height: '50px', paddingLeft: '20px' }}>Last Name</td>
                                <td style={{ fontWeight: 'normal', fontFamily: 'verdana', fontSize: '18px', paddingLeft: '20px' }}>{lastname}</td>
                            </tr>
                            <tr >
                                <td style={{ fontWeight: 'normal', fontFamily: 'verdana', fontSize: '18px', width: '200px', textAlign: 'left', height: '50px', paddingLeft: '20px' }}>Mobile Number</td>
                                <td style={{ fontWeight: 'normal', fontFamily: 'verdana', fontSize: '18px', paddingLeft: '20px' }}>{mob}</td>
                            </tr>
                            <tr >
                                <td style={{ fontWeight: 'normal', fontFamily: 'verdana', fontSize: '18px', width: '200px', textAlign: 'left', height: '50px', paddingLeft: '20px' }}>Email ID</td>
                                <td style={{ fontWeight: 'normal', fontFamily: 'verdana', fontSize: '18px', paddingLeft: '20px' }}>{email}</td>
                            </tr>
                            <tr >
                                <td style={{ fontWeight: 'normal', fontFamily: 'verdana', fontSize: '18px', width: '200px', textAlign: 'left', height: '50px', paddingLeft: '20px' }}>Gender</td>
                                <td style={{ fontWeight: 'normal', fontFamily: 'verdana', fontSize: '18px', paddingLeft: '20px' }}>{gender}</td>
                            </tr>
                            <tr >
                                <td style={{ fontWeight: 'normal', fontFamily: 'verdana', fontSize: '18px', width: '200px', textAlign: 'left', height: '50px', paddingLeft: '20px' }}>Date Of Birth</td>
                                <td style={{ fontWeight: 'normal', fontFamily: 'verdana', fontSize: '18px', paddingLeft: '20px' }}>{dob}</td>
                            </tr>
                            <tr >
                                <td style={{ fontWeight: 'normal', fontFamily: 'verdana', fontSize: '18px', width: '200px', textAlign: 'left', height: '50px', paddingLeft: '20px' }}>Location</td>
                                <td style={{ fontWeight: 'normal', fontFamily: 'verdana', fontSize: '18px', paddingLeft: '20px' }}>{loc}</td>
                            </tr>
                            <tr >
                                <td style={{ fontWeight: 'normal', fontFamily: 'verdana', fontSize: '18px', width: '200px', textAlign: 'left', height: '50px', paddingLeft: '20px' }}>Alternate Mobile</td>
                                <td style={{ fontWeight: 'normal', fontFamily: 'verdana', fontSize: '18px', paddingLeft: '20px' }}>{alt_mob}</td>
                            </tr>
                            <tr >
                                <td style={{ fontWeight: 'normal', fontFamily: 'verdana', fontSize: '18px', width: '200px', textAlign: 'left', height: '50px', paddingLeft: '20px' }}>Hint Name</td>
                                <td style={{ fontWeight: 'normal', fontFamily: 'verdana', fontSize: '18px', paddingLeft: '20px' }}>{hint}</td>
                            </tr>
                        </tbody>
                    </table>
                    <Button sx={{
                        marginTop: '30px', marginLeft: '200px', fontSize: '18px', width: '500px', color: 'white', backgroundColor: 'rgb(250, 50, 84)',
                        '&:hover': { backgroundColor: 'rgb(250, 50, 84)' }
                    }} onClick={() => setEditFlag(true)}>EDIT</Button>
                    <br></br>
                    <br></br>
                </Box>
            </>}
            {editflag === true && <>
                <Box sx={{ marginTop: "30px", marginLeft: "30px", width: "900px", border: '1px solid black', boxShadow: '2px 2px 2px lightgrey,-2px -2px 2px lightgrey' }}>
                    <Typography variant='h6' sx={{ marginTop: '30px', marginLeft: '150px', fontWeight: 'bold' }}>Edit Details</Typography>
                    <div style={{ width: '85%', marginTop: '30px', borderBottom: '1px solid black', backgroundColor: 'grey', marginLeft: '100px' }}></div>
                    <TextField type='text' label='Mobile Number' value={newmob} variant='outlined' sx={{ width: '85%', marginTop: '30px', marginLeft: '90px' }}
                        onChange={(e) => setNewMob(e.target.value)} />
                    <TextField type='text' label='First Name' value={newfirstname} variant='outlined' sx={{ width: '85%', marginTop: '30px', marginLeft: '90px' }}
                        onChange={(e) => setNewFirstName(e.target.value)} />
                    <TextField type='text' label='Last Name' value={newlastname} variant='outlined' sx={{ width: '85%', marginTop: '30px', marginLeft: '90px' }}
                        onChange={(e) => setNewLastName(e.target.value)} />
                    <TextField type='email' label='Email' value={newmail} variant='outlined' sx={{ width: '85%', marginTop: '30px', marginLeft: '90px' }}
                        inputProps={{ readOnly: true }} />
                    <TextField type='text' label='Gender' value={newgender} variant='outlined' sx={{ width: '85%', marginTop: '30px', marginLeft: '90px' }}
                        onChange={(e) => setNewGender(e.target.value)} />
                    <TextField type='text' label='Birthday(mm/dd/yyyy)' value={newdob} variant='outlined' sx={{ width: '85%', marginTop: '30px', marginLeft: '90px' }}
                        onChange={(e) => setNewDob(e.target.value)} />
                    <TextField type='text' label='Location' value={newloc} variant='outlined' sx={{ width: '85%', marginTop: '30px', marginLeft: '90px' }}
                        onChange={(e) => setNewLoc(e.target.value)} />
                    <Typography variant='h6' sx={{ marginTop: '30px', marginLeft: '90px', fontWeight: 'bold' }} >Alternate mobile details</Typography>
                    <TextField type='mobile' label='Mobile Number' value={newaltmob} variant='outlined' sx={{ width: '85%', marginTop: '30px', marginLeft: '90px' }}
                        onChange={(e) => setNewAltMob(e.target.value)} />
                    <TextField type='text' label='Hint name' value={newhint} variant='outlined' sx={{ width: '85%', marginTop: '30px', marginLeft: '90px' }}
                        onChange={(e) => setNewHint(e.target.value)}
                        onBlur={() => {
                            if ((newfirstname.length > 0)
                                && (newlastname.length > 0) && (newmob != '') && (newmail.length > 0) &&
                                (newgender.length > 0) && (newdob.length > 0) && (newloc.length > 0) && (newaltmob.length > 0) &&
                                (newhint.length > 0))
                                setDisab(false)
                            else
                                setDisab(true)
                        }} />
                    <Button disabled={disab} sx={{
                        fontWeight: 'bold',
                        marginTop: '30px', width: '80%', marginLeft: '100px', fontSize: '15px',
                        color: 'white', backgroundColor: 'rgb(250, 50, 84)',
                        '&:hover': { backgroundColor: 'rgb(250, 50, 84)' }
                    }} onClick={() => {
                        const vendor_edit = axios.patch(`${process.env.REACT_APP_BACKEND_URL}/vendor_editprofile?email=${email}`, {
                            'firstname': newfirstname,
                            'lastname': newlastname,
                            'mobile': newmob
                        })
                        if (flag == false) {
                            const add_det = axios.post(`${process.env.REACT_APP_BACKEND_URL}/add_vendoradd_det`, {
                                'firstname': newfirstname,
                                'lastname': newlastname,
                                'mobile': newmob,
                                'email': newmail,
                                'gender': newgender,
                                'dob': new Date(newdob),
                                'loc': newloc,
                                'alt_mob': newaltmob,
                                'hint_name': newhint,
                            })
                            axios.all([vendor_edit, add_det])
                                .then(axios.spread(function (editdet, newdet) {
                                    if (editdet.data.modifiedCount == 1 && newdet.data.email != '') {
                                        toast.success('Details added successfully!!', { autoClose: 3000 });
                                        setEditFlag(false);
                                    }
                                    else
                                        toast.error('Error Please retry!!');
                                }))
                        }
                        else if (flag == true) {
                            const edit_extra = axios.patch(`${process.env.REACT_APP_BACKEND_URL}/edit_vendoradd_det?email=${email}`,
                                {
                                    'firstname': newfirstname,
                                    'lastname': newlastname,
                                    'mobile': newmob,
                                    'email': newmail,
                                    'gender': newgender,
                                    'dob': new Date(newdob),
                                    'loc': newloc,
                                    'alt_mob': newaltmob,
                                    'hint_name': newhint,
                                }
                            );
                            axios.all([vendor_edit, edit_extra])
                                .then(axios.spread(function (vendor, editdet) {
                                    if (vendor.data.modifiedCount == 1 && editdet.data.modifiedCount == 1) {
                                        toast.success('Details updated successfully!!', { autoClose: 3000 })
                                        setEditFlag(false);
                                    }
                                    else
                                        toast.error('Error Please retry!!', { autoClose: 3000 })
                                }))
                        }
                    }}> SAVE DETAILS</Button>
                    <br></br>
                    <br></br>
                </Box >
            </>}
            <br></br>
            <br></br>
            <br></br>
        </>}
    </>)
}

export default Vendor_ManageProfile;