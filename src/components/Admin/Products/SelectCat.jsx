import { Box, FormControl, Select, InputLabel, MenuItem } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getCategory, getSubCategory, getProductCategory } from '../../Redux_Store/Action_Creators';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const SelectCat = (props) => {
    //async values
    const [category, setCategory] = useState([]);
    const [subcategory, setSubCategory] = useState([]);
    const [productcategory, setProductCategory] = useState([]);
    //storing values
    const [catvalue, setCatValue] = useState('');
    const [subcatvalue, setSubCatValue] = useState('');
    const [productvalue, setProductValue] = useState('');

    useEffect(() => {
        function pwd1() {
            if (props.cat.length > 0) {
                const catamp = (props.cat != '' || props.cat != undefined) ? props.cat.replace('&', '%26').replace(',', '%2C').replace('-', '%2D') : '';
                axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_category_cat?category=${catamp}`)
                    .then((data) => setCategory(data.data.slice()))
                setCat(props.cat)
            }

            else if (props.cat.length == 0)
                axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_category`)
                    .then((data) => setCategory(data.data.slice()))

        }
        async function pwd2() {
            if (catvalue.length > 0) {
                const catamp = (catvalue != '' || catvalue != undefined) ? catvalue.replace('&', '%26').replace(',', '%2C').replace('-', '%2D') : '';
                axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_subcategory_cat?category=${catamp}`)
                    .then((data) => {
                        setSubCategory(data.data.slice());
                    })

            }
        }
        async function pwd3() {
            if (catvalue.length > 0 && subcatvalue.length > 0) {
                const catamp = (catvalue != '' || catvalue != undefined) ? catvalue.replace('&', '%26').replace(',', '%2C').replace('-', '%2D') : '';
                const subcatamp = (subcatvalue != '' || subcatvalue != undefined) ? subcatvalue.replace('&', '%26').replace(',', '%2C').replace('-', '%2D') : '';
                await axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_productcategory_cat?category=${catamp}&subcategory=${subcatamp}`)
                    .then((data) => {
                        setProductCategory(data.data.slice());
                    })

            }
        }
        pwd1();//get category list
        pwd2();//get subcategory list
        pwd3();//get productcategory list
    }, [catvalue, subcatvalue, productvalue])

    return (
        <>
            <ToastContainer />
            <Box sx={{
                display: 'flex', alignItems: "center", marginTop: '40px', marginLeft: '20px', marginRight:
                    '40px'
            }} id='select_category'>
                <FormControl sx={{ flex: 3 }}>
                    <InputLabel id='category'>Category</InputLabel>
                    <Select labelId='category' variant='standard' onChange={async (e) => {
                        setCatValue(e.target.value);
                        await props.getCategory(e.target.value);
                        props.getSubCategory('');
                        props.getProductCategory('');
                    }}
                        value={catvalue} id='category_value'>
                        {category.map((li, index) =>
                            <MenuItem key={index} value={li.category}>{li.category}</MenuItem>
                        )}
                    </Select>
                </FormControl>
                <FormControl sx={{ flex: 3, marginLeft: '20px' }}>
                    <InputLabel id='sub_category'>Sub category</InputLabel>
                    <Select labelId='sub_category' variant='standard' onChange={async (e) => {
                        setSubCatValue(e.target.value)
                        await props.getSubCategory(e.target.value);
                        props.getProductCategory('');
                    }}
                        value={subcatvalue} id='subcategory_value'>
                        {subcategory.map((li, index) =>
                            <MenuItem key={index} value={li.subcategory}>{li.subcategory}</MenuItem>
                        )}
                    </Select>
                </FormControl>
                <FormControl sx={{ flex: 3, marginLeft: '20px' }}>
                    <InputLabel id='product'>Product</InputLabel>
                    <Select labelId='product' variant='standard' onChange={async (e) => {
                        setProductValue(e.target.value);
                        await props.getProductCategory(e.target.value)
                    }}
                        value={productvalue} id='productcategory_value'>
                        {productcategory.map((li, index) =>
                            <MenuItem key={index} value={li.productcategory}>{li.productcategory}</MenuItem>
                        )}
                    </Select>
                </FormControl>
            </Box>
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCategory: (data) => dispatch(getCategory(data)),
        getSubCategory: (data) => dispatch(getSubCategory(data)),
        getProductCategory: (data) => dispatch(getProductCategory(data))
    }
}
export default connect(null, mapDispatchToProps)(SelectCat);
