import { Dialog, DialogContent, DialogContentText, Box, Typography, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Product_crud = (props) => {
    //status
    const [disab1, setDisable1] = useState(true);
    const [disab2, setDisable2] = useState(true);
    const [disab3, setDisable3] = useState(false);
    const [createflag, setCreateFlag] = useState(true);
    const [editflag, setEditFlag] = useState(true);
    const [deleteflag, setDeleteFlag] = useState(true);
    //storing value
    //create
    const [subcateg, setSubCatValue] = useState('');
    const [categ, setCatValue] = useState('');
    const [producteg, setProductValue] = useState('');
    //edit
    const [cat, setCat] = useState('');
    const [catnewval, setCatNewVal] = useState('');
    const [subcat, setSubcat] = useState('');
    const [subcatnewval, setSubCatNewVal] = useState('');
    const [productcat, setProductCat] = useState('');
    const [productcatnewval, setProductCatNewVal] = useState('');

    //delete
    const [delcat, setDeleteCatVal] = useState('');
    const [delsubcat, setDeleteSubCatVal] = useState('');
    const [delproductcat, setDeleteProductCatVal] = useState('');
    //async values
    //create
    const [category, setCategory] = useState([]);
    const [subcategory, setSubCategory] = useState([]);

    //toast id :
    const tid = 'New Product added successfully!!';
    //edit
    //delete
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_category`)
            .then((data) => {
                if (data.data.length > 0)
                    setCategory(data.data)
                else
                    setCategory([])
            })

        if (categ.length > 0) {
            const catamp = (categ != '' || categ != undefined) ? categ.replace('&', '%26').replace(',', '%2C').replace('-', '%2D') : '';
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_subcategory_cat?category=${catamp}`)
                .then((data) => {
                    if (data.data.length > 0)
                        setSubCategory(data.data.slice())
                    else
                        setSubCategory([])
                })

        }
        else if (catnewval.length > 0) {
            const catamp = (catnewval != ' ' || catnewval != undefined) ? catnewval.replace('&', '%26').replace(',', '%2C').replace('-', '%2D') : '';
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_subcategory_cat?category=${catamp}`)
                .then((data) => {
                    if (data.data.length > 0)
                        setSubCategory(data.data.slice())
                    else
                        setSubCategory([]);
                })

        }
        else if (delcat.length > 0) {
            const catamp = (delcat != '' || delcat != undefined) ? delcat.replace('&', '%26').replace(',', '%2C').replace('-', '%2D') : '';
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_subcategory_cat?category=${catamp}`)
                .then((data) => {
                    if (data.data.length > 0)
                        setSubCategory(data.data.slice())
                    else
                        setSubCategory([]);
                })

        }
    }, [category, subcategory, catnewval, delcat])
    useEffect(() => {
        if (props.edit === true) {
            const cate = axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_category`)
            const catamp = (props.categ != '' || props.categ != undefined) ? props.categ.replace('&', '%26').replace(',', '%2C').replace('-', '%2D') : '';
            const prodcate = axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_productcategory_product?product=${catamp}`)
            axios.all([cate, prodcate])
                .then(axios.spread(function (catedet, prodcatedet) {
                    (catedet.data.length > 0) ? setCategory(catedet.data) : setCategory()
                    if (prodcatedet.data.length > 0)
                        if (prodcatedet.data[0].category != undefined) {
                            //cat
                            setCat(prodcatedet.data[0].category);
                            setCatNewVal(prodcatedet.data[0].category);
                            //subcat
                            setSubcat(prodcatedet.data[0].subcategory);
                            setSubCatNewVal(prodcatedet.data[0].subcategory);
                            //product
                            setProductCat(prodcatedet.data[0].productcategory);
                            setProductCatNewVal(prodcatedet.data[0].productcategory);
                        }
                }))

        }
        else if (props.delete === true) {
            const cate = axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_category`);
            const catamp = (props.categ != ' ' || props.categ != undefined) ? props.categ.replace('&', '%26').replace(',', '%2C').replace('-', '%2D') : ' ';
            const prodcate = axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_productcategory_product?product=${catamp}`)
            axios.all([cate, prodcate])
                .then(axios.spread(function (catedet, prodcatedet) {
                    (catedet.data.length > 0) ? setCategory(catedet.data) : setCategory()
                    if (prodcatedet.data.length > 0)
                        if (prodcatedet.data[0].category != undefined) {
                            //cat
                            setDeleteCatVal(prodcatedet.data[0].category);
                            //subcat
                            setDeleteSubCatVal(prodcatedet.data[0].subcategory);
                            //product
                            setDeleteProductCatVal(prodcatedet.data[0].productcategory);
                        }
                }))

        }
    }, [props.categ])
    return (
        <>
            <ToastContainer />
            {/* Add New Product Category */}
            {props.create === true && <>
                < Dialog open={createflag} hideBackdrop sx={{ margin: 'auto', width: '800px', height: '850px' }}>
                    <DialogContent>
                        <DialogContentText sx={{ width: '550px', height: "490px" }}>
                            <Box sx={{ display: 'flex', alignItems: "center", marginTop: '20px' }}>
                                <Typography sx={{ fontFamily: "verdana", fontWeight: "bold", marginTop: '30px', flex: 10 }}>Select Category</Typography>
                                <CloseIcon sx={{ marginLeft: '170px', flex: 2, cursor: 'pointer' }} onClick={() => setCreateFlag(false)} />
                            </Box>
                            <Select label='category' variant='outlined'
                                sx={{ marginTop: '20px', width: '50%' }} onChange={(e) => setCatValue(e.target.value)} value={categ}>
                                {category.map((li, index) =>
                                    <MenuItem key={index} value={li.category}>{li.category}</MenuItem>
                                )}
                            </Select>
                            <Typography sx={{ fontFamily: "verdana", fontWeight: "bold", marginTop: '20px', flex: 10 }}>Select Sub Category</Typography>
                            <Select label='subcategory' variant='outlined'
                                sx={{ marginTop: '20px', width: '50%' }} onChange={(e) => setSubCatValue(e.target.value)} value={subcateg}>
                                {subcategory.map((li, index) =>
                                    <MenuItem key={index} value={li.subcategory}>{li.subcategory}</MenuItem>
                                )}
                            </Select>
                            <Typography sx={{ fontFamily: "verdana", fontWeight: "bold", marginTop: '30px' }}>Enter Product Name</Typography>
                            <TextField color='secondary' sx={{ marginTop: '20px', width: '60%' }} variant='outlined' type='text'
                                value={producteg}
                                onChange={(e) => setProductValue(e.target.value)}
                                onBlur={() => {
                                    if (subcateg.length > 2 && categ.length > 2 && producteg.length > 2)
                                        setDisable1(false);
                                    else {
                                        setDisable1(true)
                                    }
                                }
                                } />
                            <br></br>
                            <Button sx={{
                                marginTop: '10px', marginLeft: '470px', padding: '5px 20px',
                                color: 'white', backgroundColor: 'rgb(243, 66, 140)',
                                '&:hover': { backgroundColor: 'rgb(243, 66, 140)' }
                            }}
                                disabled={disab1}
                                onClick={async () => {
                                    axios.post(`${process.env.REACT_APP_BACKEND_URL}/add_productcategory`, { catvalue: categ, subcatvalue: subcateg, productcatvalue: producteg })
                                        .then((data) => {
                                            if (data.data.productcategory != undefined) {
                                                setCreateFlag(false);
                                                toast.success('New Product Category added successfully!', {
                                                    autoClose: 3000,
                                                    toastId: 'tid'
                                                })
                                            }
                                            else {
                                                setCreateFlag(true);
                                                toast.error('Error Please retry!', { autoClose: 3000 })
                                            }
                                        })

                                }}>SAVE</Button>
                        </DialogContentText>
                    </DialogContent >
                </Dialog >
            </>}
            {/* Edit Product Category */}
            {
                props.edit === true && <>
                    < Dialog open={editflag} hideBackdrop sx={{ margin: 'auto', width: '800px', height: '850px' }}>
                        <DialogContent>
                            <DialogContentText sx={{ width: '550px', height: "490px" }}>
                                <Box sx={{ display: 'flex', alignItems: "center", marginTop: '20px' }}>
                                    <Typography sx={{ fontFamily: "verdana", fontWeight: "bold", marginTop: '30px', flex: 10 }}>Select Category</Typography>
                                    <CloseIcon sx={{ marginLeft: '170px', flex: 2, cursor: 'pointer' }} onClick={() => setEditFlag(false)} />
                                </Box>
                                <Select label='category' variant='outlined'
                                    sx={{ marginTop: '20px', width: '50%' }}
                                    onChange={(e) => setCatNewVal(e.target.value)} value={catnewval}>
                                    {category.map((li, index) =>
                                        <MenuItem key={index} value={li.category}>{li.category}</MenuItem>
                                    )}
                                </Select>
                                <Typography sx={{ fontFamily: "verdana", fontWeight: "bold", marginTop: '20px', flex: 10 }}>Select Sub Category</Typography>
                                <Select label='subcategory' variant='outlined'
                                    sx={{ marginTop: '20px', width: '50%' }}
                                    onChange={(e) => setSubCatNewVal(e.target.value)}
                                    value={subcatnewval}>
                                    {subcategory.map((li, index) =>
                                        <MenuItem key={index} value={li.subcategory}>{li.subcategory}</MenuItem>
                                    )}
                                </Select>
                                <Typography sx={{ fontFamily: "verdana", fontWeight: "bold", marginTop: '30px' }}>Enter Product Name</Typography>
                                <TextField color='secondary' sx={{ marginTop: '20px', width: '60%' }} variant='outlined' type='text'
                                    value={productcatnewval}
                                    onChange={(e) => setProductCatNewVal(e.target.value)}
                                    onBlur={() => {
                                        if (subcatnewval.length > 2 && catnewval.length > 2 && productcatnewval.length > 2)
                                            setDisable2(false);
                                        else {
                                            setDisable2(true)
                                        }
                                    }
                                    } />
                                <br></br>
                                <Button sx={{
                                    marginTop: '10px', marginLeft: '470px', padding: '5px 20px',
                                    color: 'white', backgroundColor: 'rgb(243, 66, 140)',
                                    '&:hover': { backgroundColor: 'rgb(243, 66, 140)' }
                                }}
                                    disabled={disab2}
                                    onClick={async () => {
                                        axios.patch(`${process.env.REACT_APP_BACKEND_URL}/edit_productcategory_product?category=${cat}&subcategory=${subcat}&product=${productcat}`, {
                                            catvalue: catnewval,
                                            subcatvalue: subcatnewval,
                                            productcatvalue: productcatnewval
                                        })
                                            .then((data) => {
                                                if (data.data.modifiedCount == 1) {
                                                    setEditFlag(false);
                                                    toast.success('Product category edited successfully!', {
                                                        autoClose: 3000,
                                                        toastId: "tid"
                                                    })
                                                }
                                                else if (data.data.modifiedCount == 0) {
                                                    setEditFlag(true);
                                                    toast.error('Error  Please retry!', { autoClose: 3000 })
                                                }
                                            })

                                    }}>EDIT</Button>
                            </DialogContentText>
                        </DialogContent >
                    </Dialog >
                </>
            }
            {/* Delete Product  Category */}
            {
                props.delete === true && <>
                    < Dialog open={deleteflag} hideBackdrop sx={{ margin: 'auto', width: '800px', height: '850px' }}>
                        <DialogContent>
                            <DialogContentText sx={{ width: '550px', height: "490px" }}>
                                <Box sx={{ display: 'flex', alignItems: "center", marginTop: '20px' }}>
                                    <Typography sx={{ fontFamily: "verdana", fontWeight: "bold", marginTop: '30px', flex: 10 }}>Select Category</Typography>
                                    <CloseIcon sx={{ marginLeft: '170px', flex: 2, cursor: 'pointer' }} onClick={() => setDeleteFlag(false)} />
                                </Box>
                                <Select label='category' variant='outlined'
                                    sx={{ marginTop: '20px', width: '50%' }}
                                    value={delcat}>
                                    {category.map((li, index) =>
                                        <MenuItem key={index} value={li.category}>{li.category}</MenuItem>
                                    )}
                                </Select>
                                <Typography sx={{ fontFamily: "verdana", fontWeight: "bold", marginTop: '20px', flex: 10 }}>Select Sub Category</Typography>
                                <Select label='subcategory' variant='outlined'
                                    sx={{ marginTop: '20px', width: '50%' }}
                                    value={delsubcat}>
                                    {subcategory.map((li, index) =>
                                        <MenuItem key={index} value={li.subcategory}>{li.subcategory}</MenuItem>
                                    )}
                                </Select>
                                <Typography sx={{ fontFamily: "verdana", fontWeight: "bold", marginTop: '30px' }}>Enter Product Name</Typography>
                                <TextField color='secondary' sx={{ marginTop: '20px', width: '60%' }} variant='outlined' type='text'
                                    value={delproductcat} />
                                <br></br>
                                <Button sx={{
                                    marginTop: '10px', marginLeft: '400px', padding: '5px 20px',
                                    color: 'white', backgroundColor: 'rgb(243, 66, 140)',
                                    '&:hover': { backgroundColor: 'rgb(243, 66, 140)' }
                                }}
                                    disabled={disab3}
                                    onClick={async () => {
                                        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete_productcategory_productcat?category=${delcat}&subcategory=${delsubcat}&product=${delproductcat}`)
                                            .then((data) => {
                                                if (data.data.deletedCount == 1) {
                                                    setDeleteFlag(false);
                                                    toast.success('Product Category deleted Successfully!!', {
                                                        autoClose: 3000,
                                                        toastId: "tid"
                                                    })
                                                }
                                                if (data.data.deletedCount == 0) {
                                                    setDeleteFlag(true);
                                                    toast.error('Error, Please retry!', { autoClose: 3000 })
                                                }
                                            })

                                    }}>DELETE</Button>
                            </DialogContentText>
                        </DialogContent >
                    </Dialog >
                </>
            }
        </>)
}

export default Product_crud;