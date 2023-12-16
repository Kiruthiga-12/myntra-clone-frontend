import SelectCat from './SelectCat';
import Product_Header from './Product_Header';
import Product_Data from './Product_Data';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux'
const Products = (props) => {
    const [cat, setCat] = useState();
    const [subcat, setSubCat] = useState();
    const [prodcat, setProdCat] = useState();
    useEffect(() => {
        setCat(props.category)
        setSubCat(props.subcategory)
        setProdCat(props.productcategory)
    }, [props])
    return (
        <>
            <SelectCat cat='' />
            <Product_Header />
            <Product_Data cat={cat} subcat={subcat} prodcat={prodcat} adminid={props.adminid} />
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
export default connect(mapStateToProps, null)(Products);