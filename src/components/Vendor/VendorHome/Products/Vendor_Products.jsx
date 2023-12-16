import SelectCat from "../../../Admin/Products/SelectCat";
import Vendor_Product_Data from "./Vendor_Product_Data";
import Vendor_Product_Header from "./Vendor_Product_Header";
import { useState, useEffect } from 'react';
import { connect } from 'react-redux'
const Vendor_Products = (props) => {
    const [cat, setCat] = useState();
    const [subcat, setSubCat] = useState();
    const [prodcat, setProdCat] = useState();
    useEffect(() => {
        setCat(props.category)
        setSubCat(props.subcategory)
        setProdCat(props.productcategory)
    }, [props])
    return (<>
        <SelectCat cat='' />
        <Vendor_Product_Header />
        <Vendor_Product_Data cat={cat} subcat={subcat} prodcat={prodcat} email={props.email} />
    </>)
}
const mapStateToProps = (cstate) => {
    return {
        category: cstate.category,
        subcategory: cstate.subcategory,
        productcategory: cstate.productcategory
    }
}
export default connect(mapStateToProps, null)(Vendor_Products);