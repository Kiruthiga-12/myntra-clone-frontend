import { Box, Typography } from "@mui/material";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Heading from './Heading';
import { setUserPageCat, setUserPageProdCat, setUserPageSubCat } from '../Redux_Store/Action_Creators';
import Loader from "../Loader/Loader";
const Categoriestobuy = (props) => {
    const [categoriesArr, setCategoriesArr] = useState([]);
    const [loader, setLoader] = useState(true);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_cattobag`)
            .then((data) => {
                (data.data.length > 0) ? setCategoriesArr(data.data.slice()) : setCategoriesArr([])
                setLoader(false);
            })
    }, [])
    return (
        <>
            <Heading title='CATEGORIES TO BAG' />
            {loader == true ? <Loader /> : <>
                <Box className='categoriestobuy'>
                    {categoriesArr.map((li, index) => {
                        function toBase64(arr) {
                            const arr1 = new Uint8Array(arr)
                            return btoa(
                                arr1.reduce((data, byte) => data + String.fromCharCode(byte), '')
                            );
                        }
                        const url = toBase64(li.image1[0].data);
                        return (<>
                            <Box sx={{
                                padding: '0px', color: 'black',
                                flex: 3, width: '280px', height: '250px', boxShadow: '5px 5px 5px grey',
                                cursor: 'pointer', borderRadius: '50%', border: '3px solid grey', marginTop: '-50px'
                                , textDecoration: "none"
                            }} key={index} component={Link} to={`/shop/${li.category.toLowerCase()}`}
                                onClick={() => {
                                    props.setUserPageCat(li.category);
                                    props.setUserPageSubCat(li.subcategory);
                                    props.setUserPageProdCat(li.product);
                                }}>
                                <img  alt='loading' src={`data:image/png;base64,${url}`} width='260px' height='230px' style={{ border: '3px solid blue', borderRadius: '50%' }} />
                                <Box sx={{ backgroundColor: 'cyan', width: '250px', height: '100px', margin: 'auto', marginTop: '-10px', opacity: '0.8' }}>
                                    <Typography variant='subtitle1' sx={{ fontSize: '20px', textAlign: 'center', fontFamily: 'cursive' }}>{li.brand_name}</Typography>
                                    <Typography variant='subtitle1' sx={{ fontSize: '19px', textAlign: 'center', fontFamily: 'TimesNewRoman' }}> {li.description}</Typography>
                                </Box>
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
export default connect(null, mapDispatchToProps)(Categoriestobuy);