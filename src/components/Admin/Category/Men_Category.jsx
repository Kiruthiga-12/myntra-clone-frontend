import DataRow from "./Data_List/DataRow";
import DataHeader from "./Data_List/DataHeader";
import SelectCat from "../Products/SelectCat";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
const Men_Category = (props) => {
    const men_msg = 'Displays Men category data';
    const [subcat, setSubCat] = useState();
    const [prodcat, setProdCat] = useState();
    useEffect(() => {
        toast.info('Displays Men category data', { toastId: 'men_msg' })
    }, [])
    useEffect(() => {
        setSubCat(props.subcategory)
        setProdCat(props.productcategory)
    }, [props])
    return (
        <>
            <ToastContainer  />
            <SelectCat cat='Men' />
            <DataHeader />
            <DataRow cat='Men' subcat={subcat} prodcat={prodcat} adminid={props.adminid} />
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
export default connect(mapStateToProps, null)(Men_Category);