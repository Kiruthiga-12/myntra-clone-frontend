import { Drawer, Typography, Box, ImageListItem } from "@mui/material";
import { useEffect, useState } from 'react'
import SubscriptionNews from "../SubscriptionNews";
import { connect } from 'react-redux';
import { setUserProductId } from "../../Redux_Store/Action_Creators";
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loader from "../../Loader/Loader";
const ViewSimilar = (props) => {
    const [openflag, setOpenFlag] = useState(true);
    const [arr, getArr] = useState([]);
    const [loader, setLoader] = useState(true);
    useEffect(() => {
        const cat = (props.category != '' || props.category != undefined) ? props.category.replace('&', '%26').replace(',', '%2C').replace('-', '%2D') : '';
        const subcat = (props.subcategory != '' || props.subcategory != undefined) ? props.subcategory.replace('&', '%26').replace(',', '%2C').replace('-', '%2D') : "";
        const prodcat = (props.productcategory != '' || props.productcategory != undefined) ? props.productcategory.replace('&', '%26').replace(',', '%2C').replace('-', '%2D') : '';

        axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_similar_product?pid=${props.pid}&category=${cat}&subcategory=${subcat}&productcategory=${prodcat}`)
            .then((data) => {
                (data.data.length > 0) ? getArr(data.data.slice()) : getArr([])
                setLoader(false);
            })
    }, [])
    return (<>
        {loader == true ? <Loader /> : <>
            <Drawer anchor='right' open={openflag} onClose={() => setOpenFlag(false)}>
                <Box sx={{ width: "520px", padding: "20px" }}>
                    <Box sx={{ display: "flex", alignItems: "center", marginTop: "15px" }}>
                        <Box sx={{ flex: 3 }}></Box>
                        <Typography sx={{ fontWeight: "bold", flex: 7, fonFamily: "verdana" }}>SIMILAR PRODUCTS</Typography>
                        <Typography sx={{ flex: 2, cursor: "pointer", fontSize: "35px", fontFamily: "verdana" }}
                            onClick={() => setOpenFlag(false)}>&times;</Typography>
                    </Box>
                    {arr.length == 0 &&
                        <Typography sx={{ textAlign: "center", color: "rgb(243, 66, 140)", fontWeight: "bold", padding: "30px" }}>No Similar products found!!</Typography>}
                    {arr.length > 0 && arr.map((li, index) => {
                        return (<>
                            <Box sx={{
                                width: '270px', height: '450px', backgroundColor: 'white', border: '1px solid grey', cursor: 'pointer',
                                marginLeft: '30px', marginTop: '30px', textDecoration: 'none', color: 'black'
                            }}
                            >
                                <ImageListItem component={Link} to='/buy'
                                    onClick={() => {
                                        props.setUserProductId(props.pid)
                                    }}><img src={`data:image/png;base64,${li.image}`} style={{ width: '270px', height: '320px' }}
                                        alt='loading' /></ImageListItem>
                                <Typography variant='body1' sx={{ paddingLeft: '10px', paddingTop: '23px', fontSize: '19px', fontWeight: 'bold' }}>{li.brand_name}</Typography>
                                <Typography variant='body1' sx={{ paddingLeft: '10px', paddingTop: '2px', fontSize: '15px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{li.description}</Typography>
                                <Box sx={{ display: "flex", alignItems: "center", paddingLeft: '10px', paddingTop: '5px' }}>
                                    <Typography variant='body1' sx={{ flex: 4, fontSize: '16px', fontWeight: 'bolder', fontFamily: 'Arial' }}>Rs.{li.price} </Typography>
                                    <Typography sx={{ fontSize: '16px', color: 'grey', flex: 4 }}>Rs.<del>{li.strike_price}</del></Typography>
                                    <Typography
                                        sx={{ flex: 4, fontSize: '16px', color: 'red' }}>({li.discount} % OFF)</Typography>
                                </Box>
                            </Box>
                        </>)
                    })}
                </Box>
            </Drawer>
            <SubscriptionNews />
        </>}
    </>)
}
const mapStateToProps = (cstate) => {
    return {
        user: cstate.user,
        category: cstate.userpg_cat,
        subcategory: cstate.userpg_subcat,
        productcategory: cstate.userpg_prodcat,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setUserProductId: (data) => dispatch(setUserProductId(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewSimilar);