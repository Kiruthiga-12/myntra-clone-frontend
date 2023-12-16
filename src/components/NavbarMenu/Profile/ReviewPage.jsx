import { Typography, Box, Button, Rating } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../Loader/Loader';
const ReviewPage = (props) => {
    const [comments, setComments] = useState('');
    const [rating, setRating] = useState(null);
    const [loader, setLoader] = useState(true);
    const [product_id, setProductId] = useState();
    const [image, setImage] = useState();
    const [userid, setUserId] = useState();
    const [username, setUserName] = useState();
    const [date, setDate] = useState();
    //disable buttons
    const [disab1, setDisab1] = useState(false);
    const [disab2, setDisab2] = useState(false);
    const [status, setStatus] = useState(false);
    const [avg_rating, setAvgRating] = useState(0);
    const [users_cnt, setUsersCount] = useState(0);
    useEffect(() => {
        document.title = 'Product Review';
        setProductId(props.product_id);
        setImage(props.image);
        setUserId(props.userid);
        setUserName(props.username);
        setDate(new Date().toLocaleString('hi-EN').toLocaleUpperCase());
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_review?user_id=${props.userid}&product_id=${props.product_id}`)
            .then((data) => {
                if (data.data.length > 0) {
                    setDisab1(true);
                    setDisab2(true);
                    setProductId(data.data[0].product_id);
                    setDate(data.data[0].commented_date.toLocaleString('hi-EN').toLocaleUpperCase())
                    setRating(data.data[0].rating);
                    setComments(data.data[0].comments);
                }
                else {
                    setDate(new Date())
                }
                setLoader(false);
            })
    }, [])
    useEffect(() => {
        setLoader(true)
        if (status == true) {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_review?user_id=${props.userid}&product_id=${props.product_id}`)
                .then((data) => {
                    if (data.data.length > 0) {
                        setDisab1(true);
                        setDisab2(true);
                        setProductId(data.data[0].product_id);
                        setDate(data.data[0].commented_date.toLocaleString('hi-EN').toLocaleUpperCase())
                        setRating(data.data[0].rating);
                        setComments(data.data[0].comments);
                        setLoader(false);
                    }
                })
            //get avergae counting
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_average_rating?product_id=${product_id}`)
                .then((data) => (data.data.data.length > 0) ? setAvgRating(data.data.data[0].avg_rating) : setAvgRating(0))
            //get no.of users
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_review_count?product_id=${product_id}`)
                .then((data) => (data.data.data != undefined) ? setUsersCount(data.data.data) : setUsersCount(0))
        }
    }, [status])
    useEffect(() => {
        if (avg_rating > 0 && users_cnt > 0) {
            //update in product table
            axios.patch(`${process.env.REACT_APP_BACKEND_URL}/update_rating_product?product_id=${product_id}`, {
                'rating': avg_rating,
                'rating_count_user': users_cnt
            })
                .then((data) => { })
        }
    }, [avg_rating, users_cnt])
    return (<>
        {loader == true ? <Loader /> : <>
            <Typography sx={{ marginTop: "30px", fontWeight: "bold" }}>Write a Review</Typography>
            <Box sx={{
                border: "1px solid lightgrey", boxShadow: "2px 2px 3px grey", padding: "15px",
                marginTop: "20px", width: "80%"
            }}>
                <Typography sx={{ fontFamily: "cursive", fontWeight: "bold" }}>Product Id : <span style={{ fontWeight: "normal", fontFamily: 'monospace', fontSize: '18px' }}>{product_id}</span></Typography>
                <Typography sx={{ marginTop: "10px", fontFamily: "cursive", fontWeight: "bold" }}>Date: <span style={{ fontWeight: "normal", fontFamily: 'monospace', fontSize: '18px' }}>{new Date(date).toLocaleString('hi-EN').toLocaleUpperCase()}</span></Typography>
                <Typography sx={{ marginTop: "20px", fontFamily: "cursive", fontWeight: "bold" }}>Rating:</Typography>
                <Rating name="simple-controlled" sx={{ fontSize: "30px" }}
                    value={rating}
                    onChange={(event, newValue) => {
                        setRating(newValue);
                    }} />
                <Typography sx={{ marginTop: "20px", fontFamily: "cursive", fontWeight: "bold" }}>Write a Review:</Typography>
                <textarea placeholder='Please Enter your comments.....' value={comments} style={{
                    marginTop: "5px", resize: 'vertical', width: "500px", height: '150px'
                    , fontWeight: "normal", padding: "10px", fontFamily: "cursive", outline: "none"
                }} onChange={(e) => setComments(e.target.value)}>
                </textarea>
                <br></br>
                <img src={`data:image/png;base64,${image}`} width='500px' height='500px' style={{ marginTop: "30px" }} alt='loading' />
                <br></br>
                <br></br>
                <Button disabled={disab1} sx={{ textTransform: 'none', fontSize: "16px" }} disableTouchRipple
                    onClick={() => {
                        setLoader(true)
                        axios.post(`${process.env.REACT_APP_BACKEND_URL}/add_review`, {
                            'user_id': userid,
                            'user_name': username,
                            'product_id': product_id,
                            'rating': rating,
                            'comments': comments,
                            'commented_date': new Date()
                        })
                            .then((data) => {
                                if (data.data.user_id != undefined) {
                                    toast.success('Review added successfully!!', {
                                        autoClose: 3000
                                    });
                                    setTimeout(() => {
                                        setStatus(true);
                                    }, 4000)
                                }
                                else if (data.data.user_id == undefined) {
                                    toast.error('Error Please retry!!', {
                                        autoClose: 3000
                                    })
                                }
                                setLoader(false);
                            })
                    }}>Submit Review</Button>
                <Button disabled={disab2} sx={{ textTransform: "none", marginLeft: "20px", fontSize: "16px" }} disableTouchRipple
                    onClick={() => {
                        setRating(null);
                        setComments('');
                    }}>Cancel</Button>
            </Box >
        </>}
    </>)
}

export default ReviewPage;