import { Box, Typography, TextField, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { setProfileMenu } from '../../Redux_Store/Action_Creators';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
const EditDetails = (props) => {

    const [mob, setMob] = useState();
    const [name, setName] = useState();
    const [mail, setMail] = useState();
    const [dob, setDob] = useState();
    const [loc, setLoc] = useState();
    const [altmob, setAltMob] = useState();
    const [hint, setHint] = useState();
    const [gender, setGender] = useState();
    //flag to edit or to add additinal details.
    const [flag, setFlag] = useState(false);
    useEffect(() => {
        setMob(props.mob);
        setName(props.name);
        setMail(props.mail);
        setGender(props.gender);
        setAltMob(props.altmob);
        setDob(props.dob);
        setLoc(props.loc);
        setHint(props.hint);
        if (props.add_det != undefined)
            setFlag(true)
        else
            setFlag(false)
        document.title = 'Edit Profile'
    }, [])
    return (
        <>
            <ToastContainer />
            <Box sx={{ border: '1px solid lightgrey', boxShadow: '2px 2px 2px lightgrey,-2px -2px 2px lightgrey' }}>
                <Typography variant='h6' sx={{ marginTop: '30px', marginLeft: '150px', fontWeight: 'bold' }}>Edit Details</Typography>
                <div style={{ width: '85%', marginTop: '30px', borderBottom: '1px solid lightgrey', backgroundColor: 'grey', marginLeft: '100px' }}></div>
                <TextField type='text' label='Mobile Number' value={mob} variant='outlined' sx={{ width: '85%', marginTop: '30px', marginLeft: '90px' }}
                    onChange={(e) => setMob(e.target.value)} />
                <TextField type='text' label='Full Name' value={name} variant='outlined' sx={{ width: '85%', marginTop: '30px', marginLeft: '90px' }}
                    onChange={(e) => setName(e.target.value)} />
                <TextField type='email' label='Email' value={mail} variant='outlined' sx={{ width: '85%', marginTop: '30px', marginLeft: '90px' }}
                    inputProps={{ readOnly: true }} />
                <TextField type='text' label='Gender' value={gender} variant='outlined' sx={{ width: '85%', marginTop: '30px', marginLeft: '90px' }}
                    onChange={(e) => setGender(e.target.value)} />
                <TextField type='text' label='Birthday(mm/dd/yyyy)' value={dob} variant='outlined' sx={{ width: '85%', marginTop: '30px', marginLeft: '90px' }}
                    onChange={(e) => setDob(e.target.value)} />
                <TextField type='text' label='Location' value={loc} variant='outlined' sx={{ width: '85%', marginTop: '30px', marginLeft: '90px' }}
                    onChange={(e) => setLoc(e.target.value)} />
                <Typography variant='h6' sx={{ marginTop: '30px', marginLeft: '90px', fontWeight: 'bold' }} >Alternate mobile details</Typography>
                <TextField type='mobile' label='Mobile Number' value={altmob} variant='outlined' sx={{ width: '85%', marginTop: '30px', marginLeft: '90px' }}
                    onChange={(e) => setAltMob(e.target.value)} />
                <TextField type='text' label='Hint name' value={hint} variant='outlined' sx={{ width: '85%', marginTop: '30px', marginLeft: '90px' }}
                    onChange={(e) => setHint(e.target.value)} />
                <Button sx={{
                    fontWeight: 'bold',
                    marginTop: '30px', width: '85%', marginLeft: '100px', fontSize: '15px',
                    color: 'white', backgroundColor: 'rgb(250, 50, 84)',
                    '&:hover': { backgroundColor: 'rgb(250, 50, 84)' }
                }} onClick={() => {
                    if (flag == false) {
                        const edit_signup = axios.patch(`${process.env.REACT_APP_BACKEND_URL}/user_signup_edit?user_id=${props.userid}`, {
                            'mobile': mob,
                            'name': name,
                            'gender': gender,
                            'mail': mail,
                            'altmob': altmob
                        })
                        const add_extra_details = axios.post(`${process.env.REACT_APP_BACKEND_URL}/add_extra_details?user_id=${props.userid}`, {
                            'user_id': props.userid,
                            'dob': new Date(dob),
                            'loc': loc,
                            'hint': hint
                        })
                        axios.all([edit_signup, add_extra_details])
                            .then(axios.spread(function (signup, extra_det) {
                                if (signup.data.modifiedCount == 1 && extra_det.data.user_id != undefined) {
                                    toast.success('Details edited successfully!!');
                                    props.setProfileMenu('dashboard');
                                }
                                else
                                    toast.error('Error Please retry!!')
                            }))
                    }
                    else if (flag == true) {
                        const edit_signup = axios.patch(`${process.env.REACT_APP_BACKEND_URL}/user_signup_edit?user_id=${props.userid}`, {
                            'mobile': mob,
                            'name': name,
                            'gender': gender,
                            'mail': mail,
                            'altmob': altmob
                        })
                        const edit_extra_details = axios.put(`${process.env.REACT_APP_BACKEND_URL}/edit_extra_details?user_id=${props.userid}`, {
                            'user_id': props.userid,
                            'dob': new Date(dob),
                            'loc': loc,
                            'hint': hint
                        })
                        axios.all([edit_signup, edit_extra_details])
                            .then(axios.spread(function (signup, extra_det) {
                                if (signup.data.modifiedCount == 1 && extra_det.data.modifiedCount == 1) {
                                    toast.success('Details edited successfully!!');
                                    props.setProfileMenu('dashboard');
                                }
                                else
                                    toast.error('Error Please retry!!')
                            }))
                    }
                }}> SAVE DETAILS</Button>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
            </Box >
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        setProfileMenu: (data) => dispatch(setProfileMenu(data))
    }
}
export default connect(null, mapDispatchToProps)(EditDetails);