import { Box, Typography } from "@mui/material";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from "react-router-dom"
import { setUserPageCat, setUserPageProdCat, setUserPageSubCat } from '../Redux_Store/Action_Creators';
import Loader from "../Loader/Loader";
const Slider = (props) => {
    const [resArr, setResArr] = useState([]);
    //loading state
    const [loader, setLoader] = useState(true);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_slider_image`)
            .then((data) => {
                (data.data.length > 0) ? setResArr(data.data.slice()) : setResArr([]);
                setLoader(false);
            })
    }, [])
    useEffect(() => {
        if ((resArr.length > 0) && (window.location.href == 'https://kiruthiga-12-myntra-clone-frontend.onrender.com/home')) {
            let slideIndex = 0;
            async function showSlides() {
                let i;
                let slides = document.getElementsByClassName("mySlides");
                let dots = document.getElementsByClassName("dot");
                for (i = 0; i < slides.length; i++) {
                    slides[i].style.display = "none";
                }
                slideIndex++;
                if (slideIndex > slides.length) {
                    slideIndex = 1
                }
                for (i = 0; i < dots.length; i++) {
                    dots[i].className = dots[i].className.replace(" active", "");
                }
                function f1() {
                    if (window.location.href == 'https://kiruthiga-12-myntra-clone-frontend.onrender.com/home') {
                        slides[slideIndex - 1].style.display = "block";
                        dots[slideIndex - 1].className += " active";
                    }
                }
                f1()
                setTimeout(showSlides, 20000);
            }
            showSlides();
        }
    })
    return (
        <>
            {loader == true ? <Loader /> : <>
                {resArr.length > 0 && resArr.map((li) => {
                    function toBase64(arr) {
                        const arr1 = new Uint8Array(arr)
                        return btoa(
                            arr1.reduce((data, byte) => data + String.fromCharCode(byte), '')
                        );
                    }
                    const url = toBase64(li.image[0].data);
                    return (<>
                        <Box className='mySlides fade' sx={{ marginTop: "120px", marginLeft: "20px", cursor: "pointer", textDecoration: "none" }}
                            component={Link} to={'/shop/' + li.category.toLowerCase()}
                            onClick={() => {
                                props.setUserPageCat(li.category);
                                props.setUserPageSubCat(li.subcategory)
                                props.setUserPageProdCat(li.product);
                            }}>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <img src={`data:image/png;base64,${url}`} style={{
                                    width: '65vw', height: '400px', flex: 9, boxShadow: "2px 2px 5px grey,-2px -2px -2px grey"
                                }} alt='loading' />
                                <div style={{ flex: 3, textAlign: "center" }}>
                                    <Typography sx={{ color: "brown", fontFamily: "fantasy", fontSize: "50px" }}>{li.brand_name}</Typography>
                                    <br />
                                    <Typography sx={{ color: 'black', marginTop: '10px', fontFamily: 'unset', fontSize: '35px' }}>{li.product}</Typography>
                                    <Typography sx={{ color: 'black', marginTop: '10px', fontFamily: 'cursive', fontSize: '20px' }} >{li.discount}% OFF</Typography>
                                </div>
                            </Box>
                        </Box>
                    </>)
                })}
                <div style={{ textAlign: "center", marginTop: '30px' }}>
                    {resArr.length > 0 &&
                        resArr.map((li, index) => {
                            return (<span className="dot" id={index}></span>)
                        })
                    }
                </div>
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
export default connect(null, mapDispatchToProps)(Slider);






