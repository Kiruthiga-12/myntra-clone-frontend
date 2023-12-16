import DataRow from "./Data_List/DataRow";
import DataHeader from "./Data_List/DataHeader";
import { Box, FormControl, InputLabel, MenuItem } from '@mui/material';
import SelectCat from "../Products/SelectCat";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
const Kids_Category = (props) => {
    const kids_msg = 'Displays Kids category data';
    const [subcat, setSubCat] = useState();
    const [prodcat, setProdCat] = useState();
    useEffect(() => {
        toast.info('Displays Kids category data', { toastId: 'kids_msg' })
    }, [])
    useEffect(() => {
        setSubCat(props.subcategory)
        setProdCat(props.productcategory)
    }, [props])
    return (
        <>
            <ToastContainer  />
            <SelectCat cat='Kids' />
            <DataHeader />
            <DataRow cat="Kids" subcat={props.subcategory} prodcat={props.productcategory} adminid={props.adminid}/>
        </>
    )
}
const mapStateToProps = (cstate) => {
    return {
        category: cstate.category,
        subcategory: cstate.subcategory,
        productcategory: cstate.productcategory
    }
}
export default connect(mapStateToProps, null)(Kids_Category);