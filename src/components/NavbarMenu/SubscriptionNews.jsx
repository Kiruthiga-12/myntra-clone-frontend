import { useEffect, useState } from "react";
import { Avatar } from '@mui/material';
import { Dialog, DialogContent, DialogContentText, Box, Typography, Button } from '@mui/material';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import axios from 'axios';
const SubscriptionNews = (props) => {
    const [notflag, setNotFlag] = useState(false);
    const [subflag, setSubFlag] = useState('false')
    const [substatus, setSubStatus] = useState('false');
    const [arr, setArr] = useState([]);
    const [change, setChange] = useState('');
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_subscription?user_id=${props.user.user_id}`)
            .then((data) => {
                if (data.data.length > 0) {
                    setArr(data.data.slice())
                    setSubFlag('true');
                    setSubStatus(data.data[0].subscription);
                }
                else {
                    setArr([]);
                    setSubFlag('false');
                    setSubStatus('false')
                }
            })
    }, [])
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_subscription?user_id=${props.user.user_id}`)
            .then((data) => {
                if (data.data.length > 0) {
                    setArr(data.data.slice())
                    setSubFlag('true');
                    setSubStatus(data.data[0].subscription);
                }
                else {
                    setArr([]);
                    setSubFlag('false');
                    setSubStatus('false')
                }
            })
    }, [change])
    return (<>
        <ToastContainer />
        <Avatar sx={{ backgroundColor: 'rgb(38, 159, 240)', padding: '20px', position: 'fixed', left: '1540px', top: '650px' }}><NotificationsNoneOutlinedIcon sx={{
            fontSize: '40px', cursor: 'pointer',
            '@keyframes notify': {
                '25%': {
                    transform: 'rotate(0deg)',
                },

                '50%': {
                    transform: 'rotate(-50deg)',
                },
                '75%': {
                    transform: 'rotate(50deg)'
                },
                '100%': {
                    transform: 'rotate(0deg)'
                }

            },
            animationDelay: '2s', animationTimingFunction: 'linear', animationDuration: '1s', animationIterationCount: 'infinite', animationName: 'notify'
        }} onClick={() => setNotFlag(!notflag)} /></Avatar>
        {notflag === true && <>
            <Dialog open={notflag} hideBackdrop sx={{ marginTop: "30px", marginLeft: '1100px', width: '470px', height: '620px' }}>
                <DialogContent sx={{ padding: '1px' }}>
                    <DialogContentText sx={{ width: '400px', height: "510px" }}>
                        <Box sx={{ paddingLeft: "70px", paddingTop: "5px", paddingBottom: "10px", display: 'flex', alignItems: 'center', backgroundColor: "blue", color: "white" }}>
                            <Typography sx={{ fontWeight: "bold", fontSize: '20px', fontFamily: "sans-serif" }}>Latest Offers</Typography>
                            <span style={{ display: "inline-block", marginLeft: "150px", fontFamily: "verdana", fontSize: '30px', cursor: "pointer" }}
                                onClick={() => setNotFlag(false)}>&times;</span>
                        </Box>
                        {/* block1 */}
                        <Box sx={{ marginTop: "20px", marginLeft: "10px", display: "flex" }}>
                            <img src='../../Images/Image1.jpg' width='130px' height='100px' style={{ borderRadius: "5px" }} alt='loading' />
                            <Box sx={{ flex: 10 }}>
                                <Typography sx={{ marginLeft: "20px", color: "black" }}>HUGE Savings every hour!</Typography>
                                <Typography sx={{ marginTop: "50px", marginLeft: "20px", color: "grey" }}>2 hrs ago</Typography>
                            </Box>
                        </Box>
                        <div style={{ marginTop: "10px", backgroundColor: 'lightgrey', height: "1pt", width: "400px" }}></div>
                        {/* block2 */}
                        <Box sx={{ marginTop: "20px", marginLeft: "10px", display: "flex" }}>
                            <img src='../../Images/Image1.jpg' width='130px' height='100px' style={{ borderRadius: "5px" }} alt='loading' />
                            <Box sx={{ flex: 10 }}>
                                <Typography sx={{ marginLeft: "20px", color: "black" }}>HUGE Savings every hour!</Typography>
                                <Typography sx={{ marginTop: "50px", marginLeft: "20px", color: "grey" }}>4 hrs ago</Typography>
                            </Box>
                        </Box>
                        <div style={{ marginTop: "10px", backgroundColor: 'lightgrey', height: "1pt", width: "400px" }}></div>
                        {/* block3 */}
                        <Box sx={{ marginTop: "20px", marginLeft: "10px", display: "flex" }}>
                            <img src='../../Images/Image1.jpg' width='130px' height='100px' style={{ borderRadius: "5px" }} alt='loading' />
                            <Box sx={{ flex: 10 }}>
                                <Typography sx={{ marginLeft: "20px", color: "black" }}>HUGE Savings every hour!</Typography>
                                <Typography sx={{ marginTop: "50px", marginLeft: "20px", color: "grey" }}>19 hrs ago</Typography>
                            </Box>
                        </Box>
                        <div style={{ marginTop: "10px", backgroundColor: 'lightgrey', height: "1pt", width: "400px" }}></div>
                        {(subflag == 'false') && (substatus == 'false') && (arr.length == 0) && <>
                            <Button sx={{
                                padding: "5px", marginTop: "20px", width: "100%", color: 'white', fontWeight: "bold", backgroundColor: 'blue',
                                '&:hover': { color: 'white', backgroundColor: 'blue' }
                            }} onClick={() => {
                                axios.post(`${process.env.REACT_APP_BACKEND_URL}/add_subscription`, {
                                    'user_id': props.user.user_id,
                                    'subscription': true
                                })
                                    .then((data) => {
                                        if (data.data.user_id != undefined) {
                                            toast.success('Subscription Added successfully!!', {
                                                autoClose: 3000,
                                                position: 'bottom-right'
                                            });
                                            setChange('block1');
                                        }
                                        else
                                            toast.error('Error Please retry!', { autoClose: 3000, position: 'bottom-right' })
                                    })
                            }}>SUBSCRIPTION NOTIFICATIONS</Button>
                        </>}
                        {(subflag == 'true') && (substatus == 'true') && (arr.length > 0) && <>
                            <Button sx={{
                                padding: "5px", marginTop: "20px", width: "100%", color: 'white', fontWeight: "bold", backgroundColor: 'blue',
                                '&:hover': { color: 'white', backgroundColor: 'blue' }
                            }}
                                onClick={() => {
                                    axios.put(`${process.env.REACT_APP_BACKEND_URL}/edit_subscription?user_id=${props.user.user_id}`, { user_id: props.user.user_id, subscription: false })
                                        .then((data) => {
                                            if (data.data.modifiedCount == 1) {
                                                toast.success('Unsubscriped  successfully!!', {
                                                    autoClose: 3000, position: 'bottom-right'
                                                })
                                                setChange('block2');
                                            }
                                            else
                                                toast.error('Error, Please retry', {
                                                    autoClose: 3000, position: 'bottom-right'
                                                })
                                        })
                                }}>UNSUBSCRIBE NOTIFICATION</Button>
                        </>}
                        {(subflag == 'true') && (substatus == 'false') && (arr.length > 0) && <>
                            <Button sx={{
                                padding: "5px", marginTop: "20px", width: "100%", color: 'white', fontWeight: "bold", backgroundColor: 'blue',
                                '&:hover': { color: 'white', backgroundColor: 'blue' }
                            }}
                                onClick={() => {
                                    axios.put(`${process.env.REACT_APP_BACKEND_URL}/edit_subscription?user_id=${props.user.user_id}`, { user_id: props.user.user_id, subscription: true })
                                        .then((data) => {
                                            if (data.data.modifiedCount == 1) {
                                                toast.success('Subscribed  successfully!!', {
                                                    autoClose: 3000, position: 'bottom-right'
                                                });
                                                setChange('block3');
                                            }
                                            else
                                                toast.error('Error, Please retry', {
                                                    autoClose: 3000, position: 'bottom-right'
                                                })
                                        })
                                }}>SUBSCRIPTION NOTIFICATIONS</Button>
                        </>}
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>}
    </>)
}
const mapStateToProps = (cstate) => {
    return {
        user: cstate.user
    }
}
export default connect(mapStateToProps, null)(SubscriptionNews);