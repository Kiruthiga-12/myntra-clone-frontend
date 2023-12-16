import { Box, Typography, Button } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import Dashboard from './Dashboard';
import PersonalDetails from './PersonalDetails';
import EditDetails from './EditDetails';
import SavedAddresses from './SavedAddresses';
import { connect } from 'react-redux';
import { setNavBar, setProfileMenu, setFooter } from '../../Redux_Store/Action_Creators';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Orders from './Orders';
import Coupons from './Coupons';
import Credit from './Credit';
import Cash from './Cash';
import Cards from './Cards';
import UPI from './UPI';
import Wallets from './Wallets';
import Insider from './Insider';
import Loader from '../../Loader/Loader';
import GiftCards from './GiftCards';
const Profile = (props) => {
    const [profileimg, setProfileImg] = useState();
    const [profilename, setProfileName] = useState('not added');
    const [mob, setMob] = useState('not added');
    const [profilemail, setProfileMail] = useState('not added');
    const [gender, setGender] = useState('not added');
    const [altmob, setAltMob] = useState('not added');
    //additional details
    const [dob, setDob] = useState('not added');
    const [loc, setLoc] = useState('not added');
    const [hint, setHint] = useState('not added');
    const [userid, setUserId] = useState();
    const [loader, setLoader] = useState(true);
    const [add_userdet, setAddUserDet] = useState();
    const [msg, setMsg] = useState('');
    useEffect(() => {
        if (props.profilemenu != '')
            props.setProfileMenu('dashboard');
        props.setNavBar('navbar');
        props.setFooter('footer');
        setUserId(props.user.user_id);
        setProfileImg(props.user.user_profile);
        setProfileMail(props.user.user_mailid);
        setProfileName(props.user.user_fullname);
        setMob(props.user.user_mobile);
        setGender(props.user.user_gender);
        setAltMob(props.user.user_alternate_mobile);
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/user_add_det?user_id=${props.user.user_id}`, {
            headers: {
                'user_key': localStorage.getItem('user_key')
            }
        })
            .then((data) => {
                if (data.data.length > 0) {
                    setAddUserDet(data.data[0].user_id)
                    setDob(new Date(data.data[0].dob).toLocaleDateString());
                    setLoc(data.data[0].loc);
                    setHint(data.data[0].hintname)
                }
                else {
                    setDob('');
                    setLoc('');
                    setHint('');
                    setMsg(data.data.error);
                }
                setLoader(false);
            })
    }, [])
    useEffect(() => {
        setLoader(true);
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/user_add_det?user_id=${props.user.user_id}`, {
            headers: {
                'user_key': localStorage.getItem('user_key')
            }
        })
            .then((data) => {
                if (data.data.length > 0) {
                    setAddUserDet(data.data[0].user_id)
                    setDob(new Date(data.data[0].dob).toLocaleDateString());
                    setLoc(data.data[0].loc);
                    setHint(data.data[0].hintname)
                }
                else {
                    setDob('');
                    setLoc('');
                    setHint('');
                    setMsg(data.data.error);
                }
                setLoader(false);
            })
    }, [props])
    return (
        <>
            {loader == true ? <Loader /> : <>
                {add_userdet != 0 && msg == undefined && <>
                    <Box sx={{ marginLeft: '210px', marginTop: '190px', width: '75%' }}>
                        <Typography variant='h6' sx={{ fontWeight: 'bolder' }}>Account</Typography>
                        <span style={{ fontSize: '14px', fontFamily: 'verdana', fontWeight: 'normal' }}>{profilename}</span>
                        <div style={{ marginTop: '10px', borderBottom: '1px solid lightgrey', backgroundColor: 'grey' }}></div>
                        <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                            {/* Left Pane */}
                            <Box sx={{ flex: 2, borderRight: '1px solid lightgrey' }}>
                                {/* Overview */}
                                <Button disableTouchRipple sx={{
                                    color: "black",
                                    textTransform: 'none', marginTop: '30px', fontSize: '17px',
                                    backgroundColor: 'transparent', '&:hover': { backgroundColor: 'transparent' }
                                }}
                                    component={Link} to='/my' onClick={(e) => {
                                        props.setProfileMenu('dashboard');
                                    }}
                                    onFocus={(e) => {
                                        e.currentTarget.style.color = 'rgb(72, 185, 157)';
                                        e.currentTarget.style.backgroundColor = 'black';
                                        e.currentTarget.style.fontWeight = 'bold';
                                    }}
                                    onBlur={(e) => {
                                        e.currentTarget.style.color = 'black';
                                        e.currentTarget.style.fontWeight = 'normal';
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                    }}>Overview</Button>
                                {/* Orders */}
                                <div style={{ marginTop: '10px', borderBottom: '1px solid lightgrey', backgroundColor: 'grey', width: '85%' }}></div>
                                <Typography variant='body1' sx={{ fontSize: '14px', color: 'grey', marginTop: '20px', marginLeft: '10px' }}>ORDERS</Typography>
                                <Button disableTouchRipple sx={{
                                    textTransform: 'none', marginTop: '30px', fontSize: '17px', marginTop: '4px',
                                    backgroundColor: 'transparent', '&:hover': { backgroundColor: 'transparent' }, color: 'black'
                                }}
                                    component={Link} to='/my' onClick={(e) => {
                                        props.setProfileMenu('orders');
                                    }}
                                    onFocus={(e) => {
                                        e.currentTarget.style.color = 'rgb(72, 185, 157)';
                                        e.currentTarget.style.backgroundColor = 'black';
                                        e.currentTarget.style.fontWeight = 'bold';
                                    }}
                                    onBlur={(e) => {
                                        e.currentTarget.style.color = 'black';
                                        e.currentTarget.style.fontWeight = 'normal';
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                    }} >Orders & Returns</Button>
                                {/* Credits */}
                                <div style={{ marginTop: '10px', borderBottom: '1px solid lightgrey', backgroundColor: 'grey', width: '85%' }}></div>
                                <Typography variant='body1' sx={{ fontSize: '14px', color: 'grey', marginTop: '20px', marginLeft: '10px' }}>CREDITS</Typography>
                                <Button disableTouchRipple sx={{
                                    textTransform: 'none', fontSize: '17px', marginTop: '4px',
                                    backgroundColor: 'transparent', '&:hover': { backgroundColor: 'transparent' }, color: 'black'
                                }}
                                    component={Link} to='/my'
                                    onClick={() => props.setProfileMenu('coupon')}
                                    onFocus={(e) => {
                                        e.currentTarget.style.color = 'rgb(72, 185, 157)';
                                        e.currentTarget.style.backgroundColor = 'black';
                                        e.currentTarget.style.fontWeight = 'bold';
                                    }}
                                    onBlur={(e) => {
                                        e.currentTarget.style.color = 'black';
                                        e.currentTarget.style.fontWeight = 'normal';
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                    }}>Coupons</Button>
                                <Button disableTouchRipple sx={{
                                    display: 'block',
                                    textTransform: 'none', fontSize: '17px',
                                    backgroundColor: 'transparent', '&:hover': { backgroundColor: 'transparent' }, color: 'black'
                                }}
                                    component={Link} to='/my'
                                    onClick={() => props.setProfileMenu('credit')}
                                    onFocus={(e) => {
                                        e.currentTarget.style.color = 'rgb(72, 185, 157)';
                                        e.currentTarget.style.backgroundColor = 'black';
                                        e.currentTarget.style.fontWeight = 'bold';
                                    }}
                                    onBlur={(e) => {
                                        e.currentTarget.style.color = 'black';
                                        e.currentTarget.style.fontWeight = 'normal';
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                    }}>Myntra Credit</Button>
                                <Button disableTouchRipple sx={{
                                    display: 'block',
                                    textTransform: 'none', fontSize: '17px',
                                    backgroundColor: 'transparent', '&:hover': { backgroundColor: 'transparent' }, color: 'black'
                                }}
                                    component={Link} to='/my' onClick={() => props.setProfileMenu('cash')}
                                    onFocus={(e) => {
                                        e.currentTarget.style.color = 'rgb(72, 185, 157)';
                                        e.currentTarget.style.backgroundColor = 'black';
                                        e.currentTarget.style.fontWeight = 'bold';
                                    }}
                                    onBlur={(e) => {
                                        e.currentTarget.style.color = 'black';
                                        e.currentTarget.style.fontWeight = 'normal';
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                    }}>MynCash</Button>
                                {/* Account */}
                                <div style={{ marginTop: '10px', borderBottom: '1px solid lightgrey', backgroundColor: 'grey', width: '85%' }}></div>
                                <Typography variant='body1' sx={{ fontSize: '14px', color: 'grey', marginTop: '20px', marginLeft: '10px' }}>ACCOUNT</Typography>
                                <Button disableTouchRipple sx={{
                                    textTransform: 'none', fontSize: '17px', marginTop: '4px',
                                    backgroundColor: 'transparent', '&:hover': { backgroundColor: 'transparent' }, color: 'black'
                                }}
                                    component={Link} to='/my' onClick={() => props.setProfileMenu('personaldetails')}
                                    onFocus={(e) => {
                                        e.currentTarget.style.color = 'rgb(72, 185, 157)';
                                        e.currentTarget.style.backgroundColor = 'black';
                                        e.currentTarget.style.fontWeight = 'bold';
                                    }}
                                    onBlur={(e) => {
                                        e.currentTarget.style.color = 'black';
                                        e.currentTarget.style.fontWeight = 'normal';
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                    }}>Profile</Button>
                                <Button disableTouchRipple sx={{
                                    display: 'block',
                                    textTransform: 'none', fontSize: '17px',
                                    backgroundColor: 'transparent', '&:hover': { backgroundColor: 'transparent' }, color: 'black'
                                }}
                                    component={Link} to='/my'
                                    onClick={() => props.setProfileMenu('card')}
                                    onFocus={(e) => {
                                        e.currentTarget.style.color = 'rgb(72, 185, 157)';
                                        e.currentTarget.style.backgroundColor = 'black';
                                        e.currentTarget.style.fontWeight = 'bold';
                                    }}
                                    onBlur={(e) => {
                                        e.currentTarget.style.color = 'black';
                                        e.currentTarget.style.fontWeight = 'normal';
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                    }}>Saved Cards</Button>
                                <Button disableTouchRipple sx={{
                                    display: 'block',
                                    textTransform: 'none', fontSize: '17px',
                                    backgroundColor: 'transparent', '&:hover': { backgroundColor: 'transparent' }, color: 'black'
                                }}
                                    component={Link} to='/my'
                                    onClick={() => props.setProfileMenu('upi')}
                                    onFocus={(e) => {
                                        e.currentTarget.style.color = 'rgb(72, 185, 157)';
                                        e.currentTarget.style.backgroundColor = 'black';
                                        e.currentTarget.style.fontWeight = 'bold';
                                    }}
                                    onBlur={(e) => {
                                        e.currentTarget.style.color = 'black';
                                        e.currentTarget.style.fontWeight = 'normal';
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                    }}>Saved UPI</Button>
                                <Button disableTouchRipple sx={{
                                    display: 'block',
                                    textTransform: 'none', fontSize: '17px',
                                    backgroundColor: 'transparent', '&:hover': { backgroundColor: 'transparent' }, color: 'black'
                                }}
                                    component={Link} to='/my'
                                    onClick={() => props.setProfileMenu('wallets')}
                                    onFocus={(e) => {
                                        e.currentTarget.style.color = 'rgb(72, 185, 157)';
                                        e.currentTarget.style.backgroundColor = 'black';
                                        e.currentTarget.style.fontWeight = 'bold';
                                    }}
                                    onBlur={(e) => {
                                        e.currentTarget.style.color = 'black';
                                        e.currentTarget.style.fontWeight = 'normal';
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                    }}>Saved Wallets / BNPL</Button>
                                <Button disableTouchRipple sx={{
                                    display: 'block',
                                    textTransform: 'none', fontSize: '17px',
                                    backgroundColor: 'transparent', '&:hover': { backgroundColor: 'transparent' }, color: 'black'
                                }}
                                    component={Link} to='/my' onClick={() => props.setProfileMenu('saveaddress')}
                                    onFocus={(e) => {
                                        e.currentTarget.style.color = 'rgb(72, 185, 157)';
                                        e.currentTarget.style.backgroundColor = 'black';
                                        e.currentTarget.style.fontWeight = 'bold';
                                    }}
                                    onBlur={(e) => {
                                        e.currentTarget.style.color = 'black';
                                        e.currentTarget.style.fontWeight = 'normal';
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                    }}> Addresses</Button>
                                <Button disableTouchRipple sx={{
                                    display: 'block',
                                    textTransform: 'none', fontSize: '17px',
                                    backgroundColor: 'transparent', '&:hover': { backgroundColor: 'transparent' }, color: 'black'
                                }}
                                    component={Link} to='/my'
                                    onClick={() => props.setProfileMenu('insider')}
                                    onFocus={(e) => {
                                        e.currentTarget.style.color = 'rgb(72, 185, 157)';
                                        e.currentTarget.style.backgroundColor = 'black';
                                        e.currentTarget.style.fontWeight = 'bold';
                                    }}
                                    onBlur={(e) => {
                                        e.currentTarget.style.color = 'black';
                                        e.currentTarget.style.fontWeight = 'normal';
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                    }}>Myntra Insider</Button>
                                <Button disableTouchRipple sx={{
                                    display: 'block',
                                    textTransform: 'none', fontSize: '17px',
                                    backgroundColor: 'transparent', '&:hover': { backgroundColor: 'transparent' }, color: 'black'
                                }}
                                    component={Link} to='/my'
                                    onClick={() => props.setProfileMenu('gift_cards')}
                                    onFocus={(e) => {
                                        e.currentTarget.style.color = 'rgb(72, 185, 157)';
                                        e.currentTarget.style.backgroundColor = 'black';
                                        e.currentTarget.style.fontWeight = 'bold';
                                    }}
                                    onBlur={(e) => {
                                        e.currentTarget.style.color = 'black';
                                        e.currentTarget.style.fontWeight = 'normal';
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                    }}>Gift Cards</Button>
                                {/* Legal */}
                                <div style={{ marginTop: '10px', borderBottom: '1px solid lightgrey', backgroundColor: 'grey', width: '85%' }}></div>
                                <Typography variant='body1' sx={{ fontSize: '14px', color: 'grey', marginTop: '20px', marginLeft: '10px' }}>LEGAL</Typography>
                                <Button disableTouchRipple sx={{
                                    textTransform: 'none', fontSize: '17px', marginTop: '4px',
                                    backgroundColor: 'transparent', '&:hover': { backgroundColor: 'transparent' }, color: 'black'
                                }}
                                    component={Link} to='/termsofuse'>Terms of Use</Button>
                                <Button disableTouchRipple sx={{
                                    textTransform: 'none', fontSize: '17px', marginTop: '4px',
                                    backgroundColor: 'transparent', '&:hover': { backgroundColor: 'transparent' }, color: 'black'
                                }} component={Link} to='/privacypolicy'>Privacy Policy</Button>
                            </Box>
                            {/* Right Pane */}
                            <Box sx={{
                                flex: 10, paddingLeft: '20px', paddingTop: '20px'
                            }}>
                                {props.profilemenu == 'dashboard' && <Dashboard img={profileimg} mail={profilemail} />}
                                {props.profilemenu == 'personaldetails' && <PersonalDetails
                                    name={profilename} mob={mob} mail={profilemail} gender={gender} altmob={altmob}
                                    dob={dob} loc={loc} hint={hint} />}
                                {props.profilemenu == 'editdetails' && <EditDetails name={profilename} mob={mob} mail={profilemail} gender={gender} altmob={altmob}
                                    dob={dob} loc={loc} hint={hint} userid={userid} add_det={add_userdet} />}
                                {props.profilemenu == 'saveaddress' && <SavedAddresses />}
                                {props.profilemenu == 'orders' && <Orders userid={props.user.user_id} usermobile={props.user.user_mobile} username={props.user.user_fullname} />}
                                {props.profilemenu == 'coupon' && <Coupons />}
                                {props.profilemenu == 'credit' && <Credit />}
                                {props.profilemenu == 'cash' && <Cash />}
                                {props.profilemenu == 'card' && <Cards />}
                                {props.profilemenu == 'upi' && <UPI />}
                                {props.profilemenu == 'wallets' && <Wallets />}
                                {props.profilemenu == 'insider' && <Insider />}
                                {props.profilemenu == 'gift_cards' && <GiftCards />}

                            </Box>
                        </Box>
                    </Box >
                    <Outlet />
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                </>}
            </>}
            {msg != undefined && <>
                <Typography sx={{ marginTop: "150px", color: "rgb(250, 102, 102)", textAlign: "center", fontWeight: "bold", fontSize: '26px' }}>{msg} !!</Typography>
                <Typography sx={{ marginTop: "10px", color: "blue", textAlign: "center", fontWeight: "bold", fontSize: '16px' }}>Kindly Login !</Typography>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
            </>}
        </>
    )
}

const mapStateToProps = (cstate) => {
    return {
        profilemenu: cstate.profilemenu,
        user: cstate.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setProfileMenu: (data) => dispatch(setProfileMenu(data)),
        setNavBar: (data) => dispatch(setNavBar(data)),
        setFooter: (data) => dispatch(setFooter(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);