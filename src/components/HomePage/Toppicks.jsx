import { Box, Typography } from "@mui/material";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Heading from './Heading';
import { setUserPageCat, setUserPageProdCat, setUserPageSubCat } from '../Redux_Store/Action_Creators';
import Loader from "../Loader/Loader";
const Toppicks = (props) => {
    const [toppicksArr, setTopPicksArr] = useState([]);
    const [loader, setLoader] = useState(true);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_toppick`)
            .then((data) => {
                (data.data.length > 0) ? setTopPicksArr(data.data.slice()) : setTopPicksArr([])
                setLoader(false)
            })
    }, [])

    return (
        <>
            <Heading title='TOP PICKS' />
            {loader == true ? <Loader /> : <>
                <Box className='toppicks' sx={{ backgroundColor: "magenta" }}>
                    {toppicksArr.map((li, index) => {
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
                                flex: 3, width: '100px', boxShadow: '5px 5px 5px grey',
                                cursor: 'pointer'
                            }} key={index} component={Link} to={`/shop/${li.category.toLowerCase()}`}
                                onClick={() => {
                                    props.setUserPageCat(li.category);
                                    props.setUserPageSubCat(li.subcategory);
                                    props.setUserPageProdCat(li.product);
                                }}>
                                <img src={`data:image/png;base64,${url}`} alt='loading' width='220px' height='230px' />
                                <Box sx={{ backgroundColor: 'yellowgreen', width: '220px', paddingLeft: '2px' }}>
                                    <Typography sx={{ fontFamily: 'cursive', paddingLeft: '20px', color: 'black' }}>{li.description}</Typography>
                                    <Typography sx={{ fontSize: '18px', fontFamily: 'TimesNewRoman', paddingLeft: '20px', fontWeight: 'bold' }}>Under &#8377;{li.price}</Typography>
                                </Box>
                            </Box>
                        </>)
                    }
                    )}
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
export default connect(null, mapDispatchToProps)(Toppicks);