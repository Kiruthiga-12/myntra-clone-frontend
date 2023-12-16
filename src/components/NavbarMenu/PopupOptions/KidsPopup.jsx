import { Box, Typography, ListItemButton } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setUserPageCat, setUserPageProdCat, setUserPageSubCat } from '../../Redux_Store/Action_Creators';
import Loader from '../../Loader/Loader';
const KidsPopup = (props) => {
    const [subcat, setSubCat] = useState([])
    const [prodcat, setProductCat] = useState([])
    const [loader, setLoader] = useState(true)
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_subcategory_cat?category=Kids`)
            .then((data) => {
                if (data.data.length > 0) {
                    setSubCat(data.data.slice())
                    data.data.map((li) => {
                        axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_productcategory_category?category=Kids&subcategory=${li.subcategory}`)
                            .then((data) => {
                                if (data.data.length > 0)
                                    setProductCat(data.data.slice())
                                else
                                    setProductCat([])
                            })
                    })
                }
                else
                    setSubCat([])
                setLoader(false);
            })
    }, [])
    return (
        <>
            {loader == true ? <Loader /> : <>
                {props.status === true &&
                    <Box sx={{
                        display: 'flex', justifyContent: 'space-evenly', marginLeft: '-250px', marginTop: '730px', width: '87%', height: '79vh',
                        boxShadow: '10px 10px 10px grey,-10px -10px 10px grey', position: 'fixed'
                    }} >
                        <Box className='layout1'>
                            {subcat.length > 0 && subcat.map((li) => {
                                return (
                                    <>
                                        <ListItemButton sx={{
                                            marginTop: '15px',
                                            marginLeft: '-15px', color: 'rgb(199, 12, 74)', fontFamily: 'Arial', fontWeight: 'bold'
                                        }} disableTouchRipple
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                props.setUserPageCat('Kids');
                                                props.setUserPageSubCat(li.subcategory);
                                                props.setUserPageProdCat('');
                                            }}
                                            component={Link} to={'/shop/' + li.category.toLowerCase()}>{li.subcategory}</ListItemButton>
                                        {prodcat.length > 0 && prodcat.map((li1, index) => {
                                            if (li1.subcategory == li.subcategory) {
                                                return (<ListItemButton sx={{
                                                    marginLeft: '-15px', color: 'grey', fontFamily: '',
                                                    '&:hover': { backgroundColor: 'transparent', fontWeight: 'bold', fontFamily: 'Arial', color: 'black' }
                                                }} disableTouchRipple
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        props.setUserPageCat('Kids');
                                                        props.setUserPageSubCat(li.subcategory);
                                                        props.setUserPageProdCat(li1.productcategory);
                                                    }}
                                                    component={Link} to={'/shop/' + li.category.toLowerCase()}>{li1.productcategory}</ListItemButton>)
                                            }
                                        })}
                                    </>
                                )
                            })}

                        </Box>
                    </Box>
                }
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
export default connect(null, mapDispatchToProps)(KidsPopup);


