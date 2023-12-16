import { Box, Typography } from "@mui/material";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Heading from './Heading';
import { setUserPageCat, setUserPageProdCat, setUserPageSubCat } from '../Redux_Store/Action_Creators';
import Loader from "../Loader/Loader";
const BestBuys = (props) => {
    const [bestBuysArr, setBestBuysArr] = useState([]);
    const [loader, setLoader] = useState(true);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_bestbuys_list`)
            .then((data) => {
                (data.data.length > 0) ? setBestBuysArr(data.data.slice()) : setBestBuysArr([])
                setLoader(false);
            })
    }, [])
    return (
        <>
            <Heading title='BEST BUYS' />
            {loader == true ? <Loader /> : <>
                <Box className='bestbuys'>
                    {bestBuysArr.map((li, index) => {
                        function toBase64(arr) {
                            const arr1 = new Uint8Array(arr)
                            return btoa(
                                arr1.reduce((data, byte) => data + String.fromCharCode(byte), '')
                            );
                        }
                        const url = toBase64(li.image1[0].data);
                        return (<>
                            <Box sx={{
                                padding: '0px', color: 'black', backgroundColor: 'rgb(210, 241, 152)',
                                flex: 3, width: '70px', height: '330px', boxShadow: '5px 5px 5px grey',
                                cursor: 'pointer', marginTop: '-2px', marginLeft: '1px', textDecoration: "none"
                                , transform: 'rotate(-24deg)'
                            }} key={index}
                                onClick={() => {
                                    props.setUserPageCat(li.category);
                                    props.setUserPageSubCat(li.subcategory);
                                    props.setUserPageProdCat(li.product);
                                }} component={Link} to={`/shop/${li.category.toLowerCase()}`}>
                                <img src={`data:image/png;base64,${url}`} alt='loading' width='200px' height='260px' style={{ transform: 'rotate(20deg)', marginTop: '10px' }} />
                                <Box sx={{ backgroundColor: 'cyan', width: '250px', height: '100px', marginLeft: '-40px', marginTop: '-101px', opacity: '0.8', transform: 'rotate(20deg)' }}>
                                    <Typography variant='subtitle1' sx={{ fontSize: '20px', textAlign: 'center', fontFamily: 'cursive' }}>{li.brand_name}</Typography>
                                    <Typography variant='subtitle1' sx={{ fontSize: '19px', textAlign: 'center', fontFamily: 'TimesNewRoman' }}> {li.description}</Typography>
                                </Box>
                            </Box >
                        </>)
                    })}
                </Box >
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
export default connect(null, mapDispatchToProps)(BestBuys);