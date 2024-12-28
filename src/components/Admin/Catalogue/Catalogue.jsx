import { Box, ListItemButton, Typography, Button, TextField } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Category_crud from './Category_crud';
import Subcategory_crud from './Subcategory_crud';
import Product_crud from './Product_crud';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Catalogue = () => {

    //storing value
    const [catgroup, setCatGroup] = useState([]);
    const [subcatgroup, setSubCatGroup] = useState([]);
    const [productcatgroup, setProductCatGroup] = useState([]);

    //Category crud values.
    const [createcat, setCreateCat] = useState(false);
    const [editcat, setEditCat] = useState(false);
    const [deletecat, setDeleteCat] = useState(false);
    const [editcatvalue, setEditValue] = useState('');
    const [deletecatvalue, setDeleteValue] = useState('');

    //SubCategory crud values.
    const [createsubcat, setCreateSubCat] = useState(false);
    const [editsubcat, setEditSubCat] = useState(false);
    const [deletesubcat, setDeleteSubCat] = useState(false);
    const [editsubcatvalue, setEditSubCatValue] = useState('');
    const [deletesubcatvalue, setDeleteSubCatValue] = useState('');
    //Product crud values
    const [createproductcat, setCreateProductCat] = useState(false);
    const [editproductcat, setEditProductCat] = useState(false);
    const [deleteproductcat, setDeleteProductCat] = useState(false);
    const [editproductcatvalue, setEditProductValue] = useState('');
    const [deleteproductcatvalue, setDeleteProductValue] = useState('');

    //get value on Click
    const [div1, setDiv1] = useState('');//Category
    const [div2, setDiv2] = useState('');//SubCategory
    const welcome_page = 'Catalogue, Subcatalogue and Product catalague can be added,edited or deleted!!! '

    useEffect(() => {
        function pwd1() {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_category`)
                .then((data) => {
                    if (data.data.length > 0)
                        setCatGroup(data.data.slice())
                    else
                        setCatGroup([])
                })
        }
        function pwd2() {
            if (div1.length == 0) {
                axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_subcategory_limit?limit=${5}`).
                    then((data) => {
                        if (data.data.length > 0)
                            setSubCatGroup(data.data.slice())
                        else
                            setSubCatGroup([]);
                    })

            }
            else if (div1.length > 0) {
                const catamp = (div1 != ' ' || div1 != undefined) ? div1.replace('&', '%26').replace(',', '%2C').replace('-', '%2D') : '';
                axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_subcategory_cat?category=${catamp}`).
                    then((data) => {
                        if (data.data.length > 0)
                            setSubCatGroup(data.data.slice());
                        else
                            setSubCatGroup([])
                    })
            }
        }
        function pwd3() {
            if (div2.length == 0) {
                axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_productcategory_limit?limit=${5}`).
                    then((data) => {
                        if (data.data.length > 0)
                            setProductCatGroup(data.data.slice());
                        else
                            setProductCatGroup([])
                    })

            }
            else if (div2.length > 0) {
                const catamp = (div1 != ' ' || div1 != undefined) ? div1.replace('&', '%26').replace(',', '%2C').replace('-', '%2D') : ''
                const subamp = (div2 != ' ' || div2 != undefined) ? div2.replace('&', '%26').replace(',', '%2C').replace('-', '%2D') : '';
                axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_productcategory_cat?category=${catamp}&subcategory=${subamp}`).
                    then((data) => {
                        if (data.data.length > 0)
                            setProductCatGroup(data.data.slice());
                        else
                            setProductCatGroup([])
                    })

            }
        }
        async function execFunc() {
            await pwd1();
            await pwd2();
            await pwd3();
        }
        execFunc();
    }, [createcat, createsubcat, createproductcat, div1, div2])
    useEffect(() => {
        toast.success(" In this Page , Catalogue, Subcatalogue and Product catalague can be added,edited or deleted!!! ",
            {
                position: toast.POSITION.BOTTOM_RIGHT,
                toastId: 'welcome_page'
            })
    }, [])
    return (
        <>
            <ToastContainer />
            <Box sx={{ margin: 'auto', marginTop: '30px', width: '96%', display: 'flex' }}>
                {/* Category */}
                <Box sx={{ flex: 2, backgroundColor: 'transparent' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid black', padding: '10px 0px', backgroundColor: 'springgreen' }}>
                        <Typography sx={{ paddingLeft: '20px', flex: 10, fontWeight: 'bolder', fontFamily: 'arial', fontSize: '20px' }}>Categories</Typography>
                        <AddIcon sx={{ flex: 2, cursor: 'pointer' }} onClick={async () => {
                            await setCreateCat(false);
                            await setCreateCat(true);
                        }} />
                    </Box>
                    <Box sx={{ marginTop: '5px', border: '1px solid grey' }}>
                        {catgroup.map((li, index) => {
                            return (
                                <ListItemButton sx={{ display: 'flex', alignItems: "center", '&:focus': { backgroundColor: "yellowgreen" } }} disableTouchRipple key={index}
                                    onClick={() => { setDiv1(li.category) }}>
                                    <Typography sx={{ flex: 8 }}>{li.category}</Typography>
                                    <ModeEditIcon sx={{ flex: 2, color: 'maroon', cursor: 'pointer', color: 'black' }}
                                        onClick={async (e) => {
                                            await setEditCat(false)
                                            await setEditCat(true)
                                            setEditValue(e.target.previousSibling.innerText)
                                        }} />
                                    <DeleteIcon sx={{ flex: 2, cursor: 'pointer', color: "black" }}
                                        onClick={async (e) => {
                                            await setDeleteCat(false)
                                            await setDeleteCat(true)
                                            let modeicon = e.target.previousElementSibling
                                            let deleteicon = modeicon.previousElementSibling.innerText
                                            setDeleteValue(deleteicon)
                                        }} />
                                </ListItemButton>
                            )
                        })}
                    </Box>
                </Box>
                {/* Sub Category */}
                <Box sx={{ flex: 3, marginLeft: '30px', backgroundColor: 'transparent' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid black', padding: '10px 0px', backgroundColor: 'springgreen' }}>
                        <Typography sx={{ paddingLeft: '20px', flex: 9, fontWeight: 'bolder', fontFamily: 'arial', fontSize: '20px' }}>Sub categories</Typography>
                        <AddIcon sx={{ flex: 3, cursor: 'pointer' }} onClick={async () => {
                            await setCreateSubCat(false)
                            await setCreateSubCat(true)
                        }} />
                    </Box>
                    <Box sx={{ marginTop: '5px', border: '1px solid grey' }}>
                        {subcatgroup.map((li, index) => {
                            return (
                                <ListItemButton sx={{ display: 'flex', alignItems: "center", '&:focus': { backgroundColor: "yellowgreen" } }} disableTouchRipple key={index}
                                    onClick={() => {
                                        setDiv2(li.subcategory)
                                    }}>
                                    <Typography sx={{ flex: 8 }}>{li.subcategory}</Typography>
                                    <ModeEditIcon sx={{ flex: 2, color: 'maroon', cursor: 'pointer', color: 'black' }}
                                        onClick={async (e) => {
                                            await setEditSubCat(false)
                                            await setEditSubCat(true)
                                            setEditSubCatValue(e.target.previousSibling.innerText)
                                            setDiv1(li.category);
                                        }} />
                                    <DeleteIcon sx={{ flex: 2, cursor: 'pointer', color: "black" }}
                                        onClick={async (e) => {
                                            await setDeleteSubCat(false)
                                            await setDeleteSubCat(true)
                                            let modeicon = e.target.previousElementSibling
                                            let deleteicon = modeicon.previousElementSibling.innerText
                                            setDeleteSubCatValue(deleteicon)
                                            setDiv1(li.category);
                                        }} />
                                </ListItemButton>
                            )
                        })}
                    </Box>
                </Box>
                {/* Product */}
                <Box sx={{ flex: 3, marginLeft: '30px', backgroundColor: 'transparent' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid black', padding: '10px 0px', backgroundColor: 'springgreen' }}>
                        <Typography sx={{ paddingLeft: '20px', flex: 9, fontWeight: 'bolder', fontFamily: 'arial', fontSize: '20px' }}>Product</Typography>
                        <AddIcon sx={{ flex: 3, cursor: 'pointer' }} onClick={async () => {
                            await setCreateProductCat(false);
                            await setCreateProductCat(true);
                        }} />
                    </Box>
                    <Box sx={{ marginTop: '5px', border: '1px solid grey' }}>
                        {productcatgroup.map((li, index) => {
                            return (
                                <ListItemButton sx={{ display: 'flex', alignItems: "center", '&:focus': { backgroundColor: "yellowgreen" } }} disableTouchRipple key={index}>
                                    <Typography sx={{ flex: 8 }}>{li.productcategory}</Typography>
                                    <ModeEditIcon sx={{ flex: 2, color: 'maroon', cursor: 'pointer', color: 'black' }}
                                        onClick={async (e) => {
                                            await setEditProductCat(false)
                                            await setEditProductCat(true)
                                            setEditProductValue(e.target.previousSibling.innerText)
                                            setDiv1(li.category);
                                            setDiv2(li.subcategory);
                                        }} />
                                    <DeleteIcon sx={{ flex: 2, cursor: 'pointer', color: "black" }}
                                        onClick={async (e) => {
                                            await setDeleteProductCat(false)
                                            await setDeleteProductCat(true)
                                            let modeicon = e.target.previousElementSibling
                                            let deleteicon = modeicon.previousElementSibling.innerText
                                            setDeleteProductValue(deleteicon)
                                            setDiv1(li.category);
                                            setDiv2(li.subcategory);
                                        }} />
                                </ListItemButton>
                            )
                        })}
                    </Box>
                </Box>
            </Box >
            {/* Category */}
            {createcat === true && <Category_crud create={true} />}
            {editcat === true && <Category_crud edit={true} categ={editcatvalue} />}
            {deletecat === true && <Category_crud delete={true} categ={deletecatvalue} />}
            {/* Sub Category */}
            {createsubcat === true && <Subcategory_crud create={true} />}
            {editsubcat === true && <Subcategory_crud edit={true} categ={editsubcatvalue} cat={div1} />}
            {deletesubcat === true && <Subcategory_crud delete={true} categ={deletesubcatvalue} cat={div1} />}
            {/* Product */}
            {createproductcat === true && <Product_crud create={true} />}
            {editproductcat === true && <Product_crud edit={true} categ={editproductcatvalue} subcat={div2} cat={div1} />}
            {deleteproductcat === true && <Product_crud delete={true} categ={deleteproductcatvalue} subcat={div2} cat={div1} />}
        </>
    )
}
export default Catalogue;
