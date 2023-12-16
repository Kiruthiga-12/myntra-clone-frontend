import { Box, Typography, LinearProgress } from '@mui/material';
import StarHalfOutlinedIcon from '@mui/icons-material/StarHalfOutlined';
import StarIcon from '@mui/icons-material/Star';
import SubscriptionNews from '../SubscriptionNews';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../../Loader/Loader';
const ReviewProduct = (props) => {
    const [details, setDetails] = useState([]);
    const [image, setImage] = useState();
    const [review_cnt, setReviewCnt] = useState(0);
    const [avg_rating, setAvgRating] = useState(0);
    const [loader, setLoader] = useState(true);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_review?product_id=${props.product_id}`)
            .then((data) => {
                (data.data.length > 0) ? setDetails(data.data.slice()) : setDetails([]);
                setLoader(false);
            })
        setImage(props.image);
        setReviewCnt(props.count);
        setAvgRating(props.avg);
    }, [])
    return (<>
        {loader == true ? <Loader /> : <>
            <Box sx={{ display: "flex", marginTop: "100px", padding: "20px" }}>
                {/* left side */}
                <Box sx={{ flex: 3 }}>
                    <img src={`data:image/png;base64,${image}`} width='480px' height='600px' alt='loading' />
                    <Typography sx={{ fontWeight: "bold", fontSize: "30px", marginTop: "5px" }}>{props.brand_name}</Typography>
                    <Typography sx={{ fontSize: "20px", marginTop: "5px", color: 'grey', fontFamily: "verdana" }}>{props.dsecription}</Typography>
                    <Typography sx={{ fontSize: "25px", fontWeight: "bold", marginTop: "10px" }}>Rs.{props.price} <span><del style={{ fontWeight: "normal", fontFamily: "cursive", marginLeft: "10px" }}>Rs.{props.strike_price}</del></span> <span style={{ fontFamily: "cursive", fontWeight: "bold", color: "orange", marginLeft: "10px" }}>({props.discount}% OFF)</span></Typography>
                </Box>
                {/* right side */}
                <Box sx={{ flex: 9, marginLeft: "30px" }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', marginTop: '30px', width: '200px', marginLeft: '10px' }}>
                        <Typography variant='body1' sx={{ fontWeight: 'bold' }}> RATINGS</Typography>
                        <StarHalfOutlinedIcon />
                    </Box>
                    {/* 2 divisions */}
                    <Box sx={{ display: "flex", alignItems: 'center' }}>
                        {/* left side */}
                        <Box sx={{ flex: 6 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px', marginLeft: '40px' }}>
                                <Typography variant='h2'>{avg_rating}</Typography>
                                <StarIcon sx={{ color: 'darkcyan', fontSize: '30px', marginLeft: '20px' }} />
                            </Box>
                            <Typography sx={{ marginLeft: '40px', marginTop: '10px' }}>{review_cnt} Verified Buyers</Typography>
                        </Box>
                        <Box sx={{ width: "2pt", height: "140px", backgroundColor: "rgb(200,200,200)" }}></Box>
                        {/* right side */}
                        <Box sx={{ flex: 6, marginLeft: "40px", marginRight: "50px" }}>
                            {/* rating5 */}
                            <Box sx={{ display: "flex", alignItems: 'center' }}>
                                <Typography sx={{ color: "grey", flex: 1 }}>5</Typography>
                                <StarIcon sx={{ color: "rgb(200,200,200)", fontSize: "18px" }} />
                                <LinearProgress variant='determinate' value={75} color='success' sx={{
                                    marginLeft: "20px",
                                    flex: 8, "--LinearProgress-radius": "0px",
                                    "--LinearProgress-thickness": "8px",
                                    backgroundColor: 'rgb(220,220,220)'
                                }} />
                                < Typography sx={{ marginLeft: "20px", color: "grey", flex: 2 }}>{props.rating5}</Typography>
                            </Box>
                            {/* rating4 */}
                            <Box sx={{ display: "flex", alignItems: 'center' }}>
                                <Typography sx={{ color: "grey", flex: 1 }}>4</Typography>
                                <StarIcon sx={{ color: "rgb(200,200,200)", fontSize: "18px" }} />
                                <LinearProgress variant='determinate' value={65} color='success' sx={{
                                    marginLeft: "20px",
                                    flex: 8, "--LinearProgress-radius": "0px",
                                    "--LinearProgress-thickness": "8px",
                                    backgroundColor: 'rgb(220,220,220)'
                                }} />
                                < Typography sx={{ marginLeft: "20px", color: "grey", flex: 2 }}>{props.rating4}</Typography>
                            </Box>
                            {/* rating3 */}
                            <Box sx={{ display: "flex", alignItems: 'center' }}>
                                <Typography sx={{ color: "grey", flex: 1 }}>3</Typography>
                                <StarIcon sx={{ color: "rgb(200,200,200)", fontSize: "18px" }} />
                                <LinearProgress variant='determinate' value={50} color='info' sx={{
                                    marginLeft: "20px",
                                    flex: 8, "--LinearProgress-radius": "0px",
                                    "--LinearProgress-thickness": "8px",
                                    backgroundColor: "rgb(220,220,220)"
                                }} />
                                < Typography sx={{ marginLeft: "20px", color: "grey", flex: 2 }}>{props.rating3}</Typography>
                            </Box>
                            {/* rating2 */}
                            <Box sx={{ display: "flex", alignItems: 'center' }}>
                                <Typography sx={{ color: "grey", flex: 1 }}>2</Typography>
                                <StarIcon sx={{ color: "rgb(200,200,200)", fontSize: "18px" }} />
                                <LinearProgress variant='determinate' value={30} color="warning" sx={{
                                    marginLeft: "20px",
                                    flex: 8, "--LinearProgress-radius": "0px",
                                    "--LinearProgress-thickness": "8px",
                                    backgroundColor: 'rgb(220,220,220)'
                                }} />
                                < Typography sx={{ marginLeft: "20px", color: "grey", flex: 2 }}>{props.rating2}</Typography>
                            </Box>
                            {/* rating1*/}
                            <Box sx={{ display: "flex", alignItems: 'center' }}>
                                <Typography sx={{ color: "grey", flex: 1 }}>1</Typography>
                                <StarIcon sx={{ color: "rgb(200,200,200)", fontSize: "18px" }} />
                                <LinearProgress variant='determinate' value={25} color='error' sx={{
                                    marginLeft: "20px",
                                    flex: 8, "--LinearProgress-radius": "0px",
                                    "--LinearProgress-thickness": "8px",
                                    backgroundColor: "rgb(220,220,220)"
                                }} />
                                < Typography sx={{ marginLeft: "20px", color: "grey", flex: 2 }}>{props.rating1}</Typography>
                            </Box>
                        </Box>
                    </Box>
                    {/* /////////// */}
                    <hr style={{ marginTop: "15px", color: "grey" }} />
                    <Typography variant='body1' sx={{ marginTop: "25px", marginLeft: '40px', fontWeight: 'bold', fontSize: "20px" }}> Customer Reviews({review_cnt})</Typography>
                    {/* comments */}
                    {details.length > 0 && details.map((li) => {
                        return (<>
                            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: "20px", marginLeft: '40px' }}>
                                <Box sx={{ flex: 1, backgroundColor: 'rgb(1, 90, 90);' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "center" }}>
                                        <Typography sx={{ color: "white", fontSize: '20px' }}>{li.rating}</Typography>
                                        <StarIcon sx={{ color: 'white', fontSize: '20px', marginLeft: "3px" }} />
                                    </Box>
                                </Box>
                                <Box sx={{ flex: 11, marginTop: "20px", marginLeft: "20px", marginRight: '20px' }}>
                                    <Typography >{li.comments}</Typography>
                                    <Typography sx={{ marginTop: "20px", color: "grey", fontSize: "17px", fontFamily: "cursive" }}>{li.user_name} | {new Date(li.commented_date).toLocaleString('hi-EN').toLocaleUpperCase()}</Typography>
                                    <hr style={{ marginTop: '5px', color: "grey" }} />
                                </Box>
                            </Box>
                        </>)
                    })
                    }
                </Box>
            </Box >
            <SubscriptionNews />
        </>}
    </>)
}

export default ReviewProduct;