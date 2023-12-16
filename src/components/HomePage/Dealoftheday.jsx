import { Box, Typography } from "@mui/material";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Heading from './Heading';
import { setUserPageCat, setUserPageProdCat, setUserPageSubCat } from '../Redux_Store/Action_Creators';
import Loader from "../Loader/Loader";
const Dealoftheday = (props) => {
    const [dealArr, setDealArr] = useState([]);
    const [loader, setLoader] = useState(true);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_deal`)
            .then((data) => {
                (data.data.length > 0) ? setDealArr(data.data.slice()) : setDealArr([])
                setLoader(false)
            })
    }, [])
    return (
        <>
            <Heading title='DEAL OF THE DAY' />
            {loader == true ? <Loader /> : <>
                <Box className='dealoftheday'>
                    {dealArr.map((li, index) => {
                        function toBase64(arr) {
                            const arr1 = new Uint8Array(arr)
                            return btoa(
                                arr1.reduce((data, byte) => data + String.fromCharCode(byte), '')
                            );
                        }
                        const url = toBase64(li.image1[0].data);
                        return (<>
                            <Box sx={{
                                textDecoration: 'none',
                                padding: '0px', marginLeft: '10px', color: 'white', fontWeight: 'bold',
                                flex: 3, height: '298px', borderBottom: '6px solid blueviolet',
                                borderRight: '6px solid blueviolet', boxShadow: '5px 5px 5px grey',
                                cursor: 'pointer', backgroundImage: `url(data:image/png;base64,${url})`, backgroundSize: 'cover',
                                backgroundOrigin: 'border-box', backgroundClip: 'border-box',
                                backgroundRepeat: 'no-repeat'
                            }} component={Link} to={`/shop/${li.category.toLowerCase()}`}
                                onClick={() => {
                                    props.setUserPageCat(li.category);
                                    props.setUserPageSubCat(li.subcategory);
                                    props.setUserPageProdCat(li.product);
                                }}>
                                <Typography variant='subtitle1' sx={{ marginTop: '180px', fontSize: '20px', textAlign: 'center', fontFamily: 'cursive' }}>{li.brand_name}</Typography>
                                <Typography variant='subtitle1' sx={{ fontSize: '20px', textAlign: 'center', fontFamily: 'cursive' }}>&#8377; {li.price}</Typography>
                                <Typography variant='subtitle1' sx={{ fontSize: '19px', textAlign: 'center', fontFamily: 'TimesNewRoman' }}> {li.description}</Typography>
                            </Box>
                        </>)
                    })}
                </Box>
            </>}
        </>
    )
}
const mapDispatchToProps = (dispatch) => {
    return {
        setUserPageCat: (data) => dispatch(setUserPageCat(data)),
        setUserPageSubCat: (data) => dispatch(setUserPageSubCat(data)),
        setUserPageProdCat: (data) => dispatch(setUserPageProdCat(data)),
    }
}
export default connect(null, mapDispatchToProps)(Dealoftheday);