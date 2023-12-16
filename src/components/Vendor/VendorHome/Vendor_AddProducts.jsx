import { Button, Box, Typography, Select, MenuItem, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Loader from '../../Loader/Loader';
const Vendor_AddProducts = (props) => {
    const [createflag, setCreateFlag] = useState(false);
    //async values:
    const [category, setCategory] = useState([]);
    const [subcategory, setSubCategory] = useState([]);
    const [productcategory, setProductCategory] = useState([]);
    //storing values
    const [pid, setProductID] = useState(0);
    const [comp_name, setCompanyName] = useState('');
    const [brandname, setBrandName] = useState([]);
    const [brand_name, setBrand_Name] = useState('');
    const [catvalue, setCatValue] = useState('');
    const [subcatvalue, setSubCatValue] = useState('');
    const [productvalue, setProductValue] = useState('');
    const [strikeprice, setStrikePrice] = useState('');
    const [discount, setDiscount] = useState('');
    const [price, setPrice] = useState('');
    const [color, setColor] = useState('');
    const [descr, setDescr] = useState('');
    const [size, setSize] = useState('');
    const [image1, setImage1] = useState([]);
    const [qty, setQty] = useState('');
    const [prodkeywords, setProductKeywords] = useState('');
    const [proddate, setProductDate] = useState();
    const [fabric, setFabric] = useState('');
    const [pattern, setPattern] = useState('');
    const [neck, setNeck] = useState('');
    const [sleeve_length, setSleeveLength] = useState('');
    const [size_fit, setSizeFit] = useState('');
    const [occasion, setOccasion] = useState('');
    const [main_trend, setMainTrend] = useState('');
    const [wash_care, setWashCare] = useState('');
    const [closure, setClosure] = useState('');
    const [completelook, setCompleteLook] = useState('');
    const [item_stock, setItemStock] = useState(0);
    const [email, setEmail] = useState('');

    //flag
    const [disab, setDisabled] = useState(true);
    const [brandflag, setBrandFlag] = useState(false);
    const [catflag, setCatFlag] = useState(false);
    const [subcatflag, setSubCatFlag] = useState(false);
    const [productflag, setProductFlag] = useState(false);
    const [strikeflag, setStrikeFlag] = useState(false);
    const [discountflag, setDiscountFlag] = useState(false);
    const [priceflag, setPriceFlag] = useState(false);
    const [colorflag, setColorFlag] = useState(false);
    const [descrflag, setDescrFlag] = useState(false);
    const [sizeflag, setSizeFlag] = useState(false);
    const [fabricflag, setFabricFlag] = useState(false);
    const [patternflag, setPatternFlag] = useState(false);
    const [neckflag, setNeckFlag] = useState(false);
    const [sleevelengthflag, setSleeveLengthFlag] = useState(false);
    const [sizefitflag, setSizeFitFlag] = useState(false);
    const [maintrendflag, setMainTrendFlag] = useState(false);
    const [washcareflag, setWashCareFlag] = useState(false);
    const [closureflag, setClosureFlag] = useState(false);
    const [completelookflag, setCompleteLookFlag] = useState(false);
    const [occasionflag, setOccasionFlag] = useState(false);
    const [image1flag, setImage1Flag] = useState(false);
    const [qtyflag, setQtyFlag] = useState(false);
    const [prodkeywordsflag, setProductKeywordsFlag] = useState(false);
    const [proddateflag, setProductDateFlag] = useState(false);
    const [itemstockflag, setItemStockFlag] = useState(false);
    const [loader, setLoader] = useState(true);

    // setting product id from removed products
    // and as well as from product that is active

    const [activecnt, setActiveCnt] = useState(0);
    const [removedcnt, setRemovedCnt] = useState(0);

    const [inccnt, setIncCnt] = useState(0);

    const error = 'Error Please retry!'
    useEffect(() => {
        if (brandflag === true && catflag === true && subcatflag === true && productflag === true &&
            strikeflag === true && discountflag === true && priceflag === true && colorflag === true &&
            descrflag === true && sizeflag === true && image1flag === true &&
            qtyflag === true && prodkeywordsflag === true && proddateflag === true &&
            fabricflag === true && patternflag === true && neckflag === true
            && sleevelengthflag === true && sizefitflag === true && maintrendflag === true
            && washcareflag === true && closureflag === true && completelookflag === true
            && occasionflag === true && itemstockflag === true)
            setDisabled(false);
        else
            setDisabled(true);
    }, [brandflag, catflag, subcatflag, productflag, strikeflag, discountflag, priceflag, colorflag,
        descrflag, sizeflag, image1flag, qtyflag, prodkeywordsflag, proddateflag, fabricflag, patternflag,
        neckflag, sleevelengthflag, sizefitflag, maintrendflag, washcareflag, closureflag, completelookflag,
        occasionflag, itemstockflag])
    useEffect(() => {
        async function pwd1() {
            await axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_category`)
                .then((data) => {
                    (data.data.length > 0) ? setCategory(data.data.slice()) : setCategory([])
                })
        }
        async function pwd2() {
            if (catvalue.length > 0) {
                const catamp = (catvalue != '' || catvalue != undefined) ? catvalue.replace('&', '%26').replace(',', '%2C').replace('-', '%2D') : '';
                await axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_subcategory_cat?category=${catamp}`)
                    .then((data) => {
                        (data.data.length > 0) ? setSubCategory(data.data.slice()) : setSubCategory([])
                    })
            }

        }
        async function pwd3() {
            if (catvalue.length > 0 && subcatvalue.length > 0) {
                const catamp = (catvalue != '' || catvalue != undefined) ? catvalue.replace('&', '%26').replace(',', '%2C').replace('-', '%2D') : '';
                const subamp = (subcatvalue != '' || subcatvalue != undefined) ? subcatvalue.replace('&', '%26').replace(',', '%2C').replace('-', '%2D') : '';
                await axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_productcategory_cat?category=${catamp}&subcategory=${subamp}`)
                    .then((data) => {
                        (data.data.length > 0) ? setProductCategory(data.data.slice()) : setProductCategory([])
                    })
            }
        }
        pwd1();
        pwd2();
        pwd3();
    }, [catvalue, subcatvalue, productvalue])

    useEffect(() => {
        setPrice(Number(strikeprice) - ((Number(discount) * Number(strikeprice)) / 100));
    }, [strikeprice, discount])

    useEffect(() => {
        setEmail(props.email);
        const brand = axios.get(`${process.env.REACT_APP_BACKEND_URL}/branddetails_email?email=${props.email}`)
        const gst = axios.get(`${process.env.REACT_APP_BACKEND_URL}/gst_getdetails_email?email=${props.email}`)
        const product = axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_product_cnt`)
        const removedb = axios.get(`${process.env.REACT_APP_BACKEND_URL}/removed_product_cnt`)
        axios.all([brand, gst, product, removedb])
            .then(axios.spread(function (branddet, gstdet, productdet, removedbdet) {
                productdet.data.data == 0 ? setProductID(1) : setActiveCnt(productdet.data.data);
                removedbdet.data.data != 0 ? setRemovedCnt(removedbdet.data.data) : setRemovedCnt(0)
                branddet.data.length > 0 ? setBrandName(branddet.data.slice()) : setBrandName([])
                function fun4() {
                    if (gstdet.data.length > 0)
                        if (gstdet.data[0].reg_comp_name != undefined) {
                            setCompanyName(gstdet.data[0].reg_comp_name)
                        }
                }
                fun4()
            }))
    }, [])
    useEffect(() => {
        function pwd() {
            if (activecnt > removedcnt) {
                setProductID(activecnt + 1);
            }
            else if (removedcnt > activecnt) {
                setProductID(removedcnt + 1)
            }
        }
        if (activecnt != undefined && removedcnt != undefined)
            pwd();
    }, [activecnt, removedcnt])
    useEffect(() => {
        if (pid != 0)
            setLoader(false);
    }, [pid])
    useEffect(() => {
        if (inccnt > 0) {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/delete_product_profile`)
                .then((data) => { })
        }
    }, [inccnt])
    return (<>
        {loader == true ? <Loader /> : <>
            <ToastContainer />
            <Button disableTouchRipple sx={{
                color: 'rgb(243, 66, 140)', border: '1px solid rgb(243, 66, 140)',
                marginTop: '20px', marginLeft: '20px', textTransform: 'none', fontSize: '15px',
                backgroundColor: 'transparent', '&:hover': { backgroundColor: 'rgb(243, 66, 140)', color: 'white' },
                '&:focus': { backgroundColor: 'rgb(243, 66, 140)', color: 'white' }
            }} onClick={() => {
                setCreateFlag(!createflag);
            }}>Create New Product</Button>
            {createflag === true && <>
                <Box sx={{ paddingTop: '20px', paddingLeft: '20px', marginLeft: '20px', marginTop: '20px', backgroundColor: 'white', width: '90%', marginRight: '40px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ flex: 1, fontFamily: 'cursive', fontSize: '18px' }}>Product ID : </Typography>
                        <Typography sx={{ flex: 7, fontFamily: "cursive", fontWeight: "bold", fontSize: '18px' }}>{pid}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                        <Typography sx={{ flex: 1, fontFamily: 'cursive', fontSize: '18px' }}>Company Name : </Typography>
                        <Typography sx={{ flex: 7, fontFamily: "cursive", fontWeight: "bold", fontSize: '18px' }}>{comp_name}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                        <Typography sx={{ fontFamily: 'cursive', fontSize: '18px' }}>Brand Name : </Typography>
                        <Select sx={{ width: '20%', marginLeft: '50px', fontWeight: "bold" }} variant='standard' value={brand_name}
                            onChange={(e) => setBrand_Name(e.target.value)}
                            onBlur={(e) => {
                                if (brand_name.length == 0) {
                                    document.getElementById('vendoraddproducts_error_message').style.display = 'inline-block';
                                    document.getElementById('vendoraddproducts_error_message').innerText = 'Please Enter proper Brand Name';
                                    setBrandFlag(false);
                                }
                                else {
                                    document.getElementById('vendoraddproducts_error_message').style.display = 'none';
                                    setBrandFlag(true);
                                }
                            }}>
                            {brandname.length > 0 && brandname.map((li) => {
                                return (
                                    <MenuItem value={li.brand_name}>{li.brand_name}</MenuItem>
                                )
                            })}
                        </Select>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                        <Typography sx={{ fontFamily: 'cursive', fontSize: '18px' }}>Category : </Typography>
                        <Select sx={{ width: '20%', marginLeft: '50px', fontWeight: "bold" }} variant='standard' onChange={(e) => setCatValue(e.target.value)}
                            value={catvalue}
                            onBlur={(e) => {
                                if (catvalue.length == 0) {
                                    document.getElementById('vendoraddproducts_error_message').style.display = 'inline-block';
                                    document.getElementById('vendoraddproducts_error_message').innerText = 'Please Select the Category Name';
                                    setCatFlag(false);
                                }
                                else {
                                    document.getElementById('vendoraddproducts_error_message').style.display = 'none';
                                    setCatFlag(true);
                                }
                            }}>
                            {category.map((li) =>
                                <MenuItem value={li.category}>{li.category}</MenuItem>
                            )}
                        </Select>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                        <Typography sx={{ fontFamily: 'cursive', fontSize: '18px' }}>Sub Category :  </Typography>
                        <Select sx={{ width: '20%', marginLeft: '50px', fontWeight: "bold" }} variant='standard' onChange={(e) => setSubCatValue(e.target.value)}
                            value={subcatvalue}
                            onBlur={(e) => {
                                if (subcatvalue.length == 0) {
                                    document.getElementById('vendoraddproducts_error_message').style.display = 'inline-block';
                                    document.getElementById('vendoraddproducts_error_message').innerText = 'Please Select the Sub Category Name';
                                    setSubCatFlag(false);
                                }
                                else {
                                    document.getElementById('vendoraddproducts_error_message').style.display = 'none';
                                    setSubCatFlag(true);
                                }
                            }}>
                            {subcategory.map((li) =>
                                <MenuItem value={li.subcategory}>{li.subcategory}</MenuItem>
                            )}
                        </Select>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                        <Typography sx={{ fontFamily: 'cursive', fontSize: '18px' }}>Product :  </Typography>
                        <Select sx={{ width: '20%', marginLeft: '50px', fontWeight: "bold" }} variant='standard' onChange={(e) => setProductValue(e.target.value)}
                            value={productvalue}
                            onBlur={(e) => {
                                if (productvalue.length == 0) {
                                    document.getElementById('vendoraddproducts_error_message').style.display = 'inline-block';
                                    document.getElementById('vendoraddproducts_error_message').innerText = 'Please Select the Product Name';
                                    setProductFlag(false);
                                }
                                else {
                                    document.getElementById('vendoraddproducts_error_message').style.display = 'none';
                                    setProductFlag(true);
                                }
                            }}>
                            {productcategory.map((li) =>
                                <MenuItem value={li.productcategory}>{li.productcategory}</MenuItem>
                            )}
                        </Select>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                        <Typography sx={{ fontFamily: 'cursive', fontSize: '18px' }}>Strike Price :  </Typography>
                        <TextField variant='filled' type='text' value={strikeprice} sx={{ marginLeft: '30px', fontFamily: "verdana", fontWeight: "bolder" }}
                            onChange={(e) => setStrikePrice(e.target.value)}
                            onBlur={(e) => {
                                if (strikeprice.length == 0) {
                                    document.getElementById('vendoraddproducts_error_message').style.display = 'inline-block';
                                    document.getElementById('vendoraddproducts_error_message').innerText = 'Please Enter the Strike Price';
                                    setStrikeFlag(false);
                                }
                                else {
                                    document.getElementById('vendoraddproducts_error_message').style.display = 'none';
                                    setStrikeFlag(true);
                                }
                            }}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                        <Typography sx={{ fontFamily: 'cursive', fontSize: '18px' }}>Discount :  </Typography>
                        <TextField variant='filled' type='text' value={discount} sx={{ marginLeft: '30px', fontWeight: "bold", fontFamily: "cursive", fontSize: '18px' }}
                            onChange={(e) => {
                                setDiscount(e.target.value);
                                setPrice(Number(strikeprice) - ((Number(discount) * Number(strikeprice)) / 100));
                            }}
                            onBlur={(e) => {
                                if (discount.length == 0) {
                                    document.getElementById('vendoraddproducts_error_message').style.display = 'inline-block';
                                    document.getElementById('vendoraddproducts_error_message').innerText = 'Discount Can\'t be blank!';
                                    setDiscountFlag(false);
                                }
                                else {
                                    document.getElementById('vendoraddproducts_error_message').style.display = 'none';
                                    setDiscountFlag(true);
                                }
                            }} />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                        <Typography sx={{ fontFamily: 'cursive', fontSize: '18px' }}> Price :  </Typography>
                        <TextField variant='filled' type='text' inputProps={{ readOnly: true }} sx={{ fontWeight: "bold", marginLeft: '30px', fontFamily: "cursive", fontSize: '18px' }}
                            value={price}
                            onBlur={(e) => {
                                if (price.length == 0) {
                                    document.getElementById('vendoraddproducts_error_message').style.display = 'inline-block';
                                    document.getElementById('vendoraddproducts_error_message').innerText = 'Price Can\'t be blank!';
                                    setPriceFlag(false);
                                }
                                else {
                                    document.getElementById('vendoraddproducts_error_message').style.display = 'none';
                                    setPriceFlag(true);
                                }
                            }}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                        <Typography sx={{ fontFamily: 'cursive', fontSize: '18px' }}>Color :  </Typography>
                        <TextField variant='standard' type='text' value={color} sx={{ fontWeight: "bold", marginLeft: '30px', fontFamily: "cursive", fontSize: '18px' }}
                            onChange={(e) => setColor(e.target.value)}
                            onBlur={(e) => {
                                if (color.length == 0) {
                                    document.getElementById('vendoraddproducts_error_message').style.display = 'inline-block';
                                    document.getElementById('vendoraddproducts_error_message').innerText = 'Color Can\'t be blank!';
                                    setColorFlag(false);
                                }
                                else {
                                    document.getElementById('vendoraddproducts_error_message').style.display = 'none';
                                    setColorFlag(true);
                                }
                            }} />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                        <Typography sx={{ fontFamily: 'cursive', fontSize: '18px' }}>Title / Description  :  </Typography>
                        <TextField variant='standard' type='text' value={descr} sx={{ fontWeight: "bold", marginLeft: '30px', fontFamily: "cursive", fontSize: '18px' }}
                            onChange={(e) => setDescr(e.target.value)}
                            onBlur={(e) => {
                                if (descr.length == 0) {
                                    document.getElementById('vendoraddproducts_error_message').style.display = 'inline-block';
                                    document.getElementById('vendoraddproducts_error_message').innerText = 'Description Can\'t be blank!';
                                    setDescrFlag(false);
                                }
                                else {
                                    document.getElementById('vendoraddproducts_error_message').style.display = 'none';
                                    setDescrFlag(true);
                                }
                            }} />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                        <Typography sx={{ fontFamily: 'cursive', fontSize: '18px' }}>Size :  </Typography>
                        <Select sx={{ width: '5%', marginLeft: '50px', fontWeight: "bold", }} variant='standard' value={size} onChange={(e) => setSize(e.target.value)}
                            onBlur={(e) => {
                                if (size.length == 0) {
                                    document.getElementById('vendoraddproducts_error_message').style.display = 'inline-block';
                                    document.getElementById('vendoraddproducts_error_message').innerText = 'Size Can\'t be blank!';
                                    setSizeFlag(false);
                                }
                                else {
                                    document.getElementById('vendoraddproducts_error_message').style.display = 'none';
                                    setSizeFlag(true);
                                }
                            }}>
                            <MenuItem value={'XS'}>XS </MenuItem>
                            <MenuItem value={'S'}>S </MenuItem>
                            <MenuItem value={'M'}>M </MenuItem>
                            <MenuItem value={'L'}>L </MenuItem>
                            <MenuItem value={'XL'}>XL </MenuItem>
                            <MenuItem value={'XXL'}>XXL </MenuItem>
                        </Select>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                        <Typography sx={{ fontFamily: 'cursive', fontSize: '18px' }}>Quantity  :  </Typography>
                        <TextField variant='standard' type='text' value={qty} sx={{ fontWeight: "bold", marginLeft: '30px', fontFamily: "cursive", fontSize: '18px' }}
                            onChange={(e) => setQty(e.target.value)}
                            onBlur={(e) => {
                                if (qty.length == 0) {
                                    document.getElementById('vendoraddproducts_error_message').style.display = 'inline-block';
                                    document.getElementById('vendoraddproducts_error_message').innerText = 'Quantity Can\'t be blank!';
                                    setQtyFlag(false);
                                }
                                else {
                                    document.getElementById('vendoraddproducts_error_message').style.display = 'none';
                                    setQtyFlag(true);
                                }
                            }} />
                    </Box>
                    {/* count */}
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                        <Typography sx={{ fontFamily: 'cursive', fontSize: '18px' }}>Items in Stock :  </Typography>
                        <TextField variant='standard' type='text' value={item_stock} sx={{ fontWeight: "bold", marginLeft: '30px', fontFamily: "cursive", fontSize: '18px' }}
                            onChange={(e) => setItemStock(e.target.value)}
                            onBlur={(e) => {
                                if (Number(item_stock) == 0) {
                                    document.getElementById('vendoraddproducts_error_message').style.display = 'inline-block';
                                    document.getElementById('vendoraddproducts_error_message').innerText = 'Items in Stock Can\'t be blank!';
                                    setItemStockFlag(false);
                                }
                                else {
                                    document.getElementById('vendoraddproducts_error_message').style.display = 'none';
                                    setItemStockFlag(true);
                                }
                            }} />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                        <Typography sx={{ fontFamily: 'cursive', fontSize: '18px' }}>Product Image  :  </Typography>
                        <TextField type='file' inputProps={{ multiple: true }} style={{ marginLeft: '30px', fontFamily: "cursive", fontWeight: "bold", fontSize: '18px' }}
                            onChange={async (e) => {
                                await setImage1(e.target.files)
                            }}
                            onBlur={(e) => {
                                if (image1.length == 0) {
                                    document.getElementById('vendoraddproducts_error_message').style.display = 'inline-block';
                                    document.getElementById('vendoraddproducts_error_message').innerText = 'Product Image Can\'t be blank!';
                                    setImage1Flag(false);
                                }
                                else if (image1.length > 0) {
                                    document.getElementById('vendoraddproducts_error_message').style.display = 'none';
                                    setImage1Flag(true);
                                }
                            }} helperText='Please upload atleast 6 Images' />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                        <Typography sx={{ fontFamily: 'cursive', fontSize: '18px' }}>Product Status :  </Typography>
                        <TextField variant='standard' type='text' inputProps={{ readOnly: true }} sx={{ marginLeft: '30px', fontFamily: "cursive", fontWeight: "bold", fontSize: '18px' }}
                            value='pending submission'
                        />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                        <Typography sx={{ fontFamily: 'cursive', fontSize: '18px' }}>Product Keywords:  </Typography>
                        <TextField variant='standard' type='text' value={prodkeywords} sx={{ fontWeight: "bold", marginLeft: '30px', fontFamily: "cursive", fontSize: '18px' }}
                            onChange={(e) => {
                                setProductKeywords(e.target.value);
                                setProductDate(new Date());
                            }}
                            onBlur={(e) => {
                                if (prodkeywords.length == 0) {
                                    document.getElementById('vendoraddproducts_error_message').style.display = 'inline-block';
                                    document.getElementById('vendoraddproducts_error_message').innerText = 'Product Keywords Can\'t be blank!';
                                    setProductKeywordsFlag(false);
                                }
                                else {
                                    document.getElementById('vendoraddproducts_error_message').style.display = 'none';
                                    setProductKeywordsFlag(true);
                                }
                            }} />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                        <Typography sx={{ fontFamily: 'cursive', fontSize: '18px' }}>Product Date:  </Typography>
                        <TextField variant='filled' type='text' inputProps={{ readOnly: true }} sx={{ fontWeight: "bold", width: '25%', marginLeft: '30px', fontFamily: "cursive", fontSize: '18px' }}
                            value={proddate}
                            onBlur={(e) => {
                                if (proddate.length == 0) {
                                    document.getElementById('vendoraddproducts_error_message').style.display = 'inline-block';
                                    document.getElementById('vendoraddproducts_error_message').innerText = 'Product date Can\'t be blank!';
                                    setProductDateFlag(false);
                                }
                                else {
                                    document.getElementById('vendoraddproducts_error_message').style.display = 'none';
                                    setProductDateFlag(true);
                                }
                            }}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                        <Typography sx={{ fontFamily: 'cursive', fontSize: '18px' }}>Fabric :  </Typography>
                        <Select sx={{ width: '12%', marginLeft: '50px', fontWeight: "bold", }} variant='standard' value={fabric} onChange={(e) => setFabric(e.target.value)}
                            onBlur={(e) => {
                                if (fabric.length == 0) {
                                    document.getElementById('vendoraddproducts_error_message').style.display = 'inline-block';
                                    document.getElementById('vendoraddproducts_error_message').innerText = 'Fabric Can\'t be blank!';
                                    setFabricFlag(false);
                                }
                                else {
                                    document.getElementById('vendoraddproducts_error_message').style.display = 'none';
                                    setFabricFlag(true);
                                }
                            }}>
                            <MenuItem value={'Acrylic'}>Acrylic </MenuItem>
                            <MenuItem value={'Chiffon'}>Chiffon </MenuItem>
                            <MenuItem value={'Cotton'}>Cotton </MenuItem>
                            <MenuItem value={'Crepe'}>Crepe </MenuItem>
                            <MenuItem value={'Linen'}>Linen </MenuItem>
                            <MenuItem value={'Liva'}>Liva</MenuItem>
                            <MenuItem value={'Modal'}>Modal </MenuItem>
                            <MenuItem value={'Poly Silk'}>Poly Silk </MenuItem>
                            <MenuItem value={'Polyester'}>Polyester</MenuItem>
                            <MenuItem value={'Silk'}>Silk</MenuItem>
                            <MenuItem value={'Viscos Rayon'}>Viscos Rayon</MenuItem>
                            <MenuItem value={'Wool'}>Wool</MenuItem>
                        </Select>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                        <Typography sx={{ fontFamily: 'cursive', fontSize: '18px' }}>Pattern :  </Typography>
                        <Select sx={{ width: '10%', marginLeft: '50px', fontWeight: "bold", }} variant='standard' value={pattern} onChange={(e) => setPattern(e.target.value)}
                            onBlur={(e) => {
                                if (pattern.length == 0) {
                                    document.getElementById('vendoraddproducts_error_message').style.display = 'inline-block';
                                    document.getElementById('vendoraddproducts_error_message').innerText = 'Pattern Can\'t be blank!';
                                    setPatternFlag(false);
                                }
                                else {
                                    document.getElementById('vendoraddproducts_error_message').style.display = 'none';
                                    setPatternFlag(true);
                                }
                            }}>
                            <MenuItem value={'Checked'}>Checked </MenuItem>
                            <MenuItem value={'Embriodered'}>Embriodered </MenuItem>
                            <MenuItem value={'Printed'}>Printed </MenuItem>
                            <MenuItem value={'Self Design'}>Self Design </MenuItem>
                            <MenuItem value={'Solid'}>Solid</MenuItem>
                            <MenuItem value={'Striped'}>Striped</MenuItem>
                        </Select>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                        <Typography sx={{ fontFamily: 'cursive', fontSize: '18px' }}>Neck :  </Typography>
                        <Select sx={{ width: '10%', marginLeft: '50px', fontWeight: "bold", }} variant='standard' value={neck} onChange={(e) => setNeck(e.target.value)}
                            onBlur={(e) => {
                                if (neck.length == 0) {
                                    document.getElementById('vendoraddproducts_error_message').style.display = 'inline-block';
                                    document.getElementById('vendoraddproducts_error_message').innerText = 'Neck Type Can\'t be blank!';
                                    setNeckFlag(false);
                                }
                                else {
                                    document.getElementById('vendoraddproducts_error_message').style.display = 'none';
                                    setNeckFlag(true);
                                }
                            }}>
                            <MenuItem value={'Boat Neck'}>Boat Neck</MenuItem>
                            <MenuItem value={'Cowl Neck'}>Cowl Neck</MenuItem>
                            <MenuItem value={'Halter Neck'}>Halter Neck</MenuItem>
                            <MenuItem value={'Mandarian Collar'}>Mandarian Collar</MenuItem>
                            <MenuItem value={'One Shoulder'}>One Shoulder</MenuItem>
                            <MenuItem value={'Round Neck'}>Round Neck</MenuItem>
                            <MenuItem value={'Scoop Neck'}>Scoop Neck</MenuItem>
                            <MenuItem value={'Shirt Collar'}>Shirt Collar</MenuItem>
                            <MenuItem value={'Square Neck'}>Square Neck</MenuItem>
                            <MenuItem value={'Sweetheart'}>Sweetheart</MenuItem>
                            <MenuItem value={'V-Neck'}>V-Neck</MenuItem>
                        </Select>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                        <Typography sx={{ fontFamily: 'cursive', fontSize: '18px' }}>Sleeve Length :  </Typography>
                        <Select sx={{ width: '10%', marginLeft: '50px', fontWeight: "bold", }} variant='standard' value={sleeve_length} onChange={(e) => setSleeveLength(e.target.value)}
                            onBlur={(e) => {
                                if (sleeve_length.length == 0) {
                                    document.getElementById('vendoraddproducts_error_message').style.display = 'inline-block';
                                    document.getElementById('vendoraddproducts_error_message').innerText = 'Sleeve Length Can\'t be blank!';
                                    setSleeveLengthFlag(false);
                                }
                                else {
                                    document.getElementById('vendoraddproducts_error_message').style.display = 'none';
                                    setSleeveLengthFlag(true);
                                }
                            }}>
                            <MenuItem value={'Long Sleeves'}>Long Sleeves</MenuItem>
                            <MenuItem value={'Short Sleeves'}>Short Sleeves</MenuItem>
                            <MenuItem value={'Sleeveless'}>Sleeveless</MenuItem>
                            <MenuItem value={'Three-Quarter'}>Three-Quarter</MenuItem>
                        </Select>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                        <Typography sx={{ fontFamily: 'cursive', fontSize: '18px' }}>Size & Fit:  </Typography>
                        <TextField variant='standard' type='text' value={size_fit} sx={{ fontWeight: "bold", marginLeft: '30px', fontFamily: "cursive", fontSize: '18px' }}
                            onChange={(e) => {
                                setSizeFit(e.target.value);
                            }}

                            onBlur={(e) => {
                                if (size_fit.length == 0) {
                                    document.getElementById('vendoraddproducts_error_message').style.display = 'inline-block';
                                    document.getElementById('vendoraddproducts_error_message').innerText = 'Size and Fit Can\'t be blank!';
                                    setSizeFitFlag(false);
                                }
                                else {
                                    document.getElementById('vendoraddproducts_error_message').style.display = 'none';
                                    setSizeFitFlag(true);
                                }
                            }} />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                        <Typography sx={{ fontFamily: 'cursive', fontSize: '18px' }}>Occasion :  </Typography>
                        <Select sx={{ width: '5%', marginLeft: '50px', fontWeight: "bold", }} variant='standard' value={occasion} onChange={(e) => setOccasion(e.target.value)}
                            onBlur={(e) => {
                                if (occasion.length == 0) {
                                    document.getElementById('vendoraddproducts_error_message').style.display = 'inline-block';
                                    document.getElementById('vendoraddproducts_error_message').innerText = 'Occasion Can\'t be blank!';
                                    setOccasionFlag(false);
                                }
                                else {
                                    document.getElementById('vendoraddproducts_error_message').style.display = 'none';
                                    setOccasionFlag(true);
                                }
                            }}>
                            <MenuItem value={'Ethnic'}>Ethnic</MenuItem>
                            <MenuItem value={'Wedding'}>Wedding</MenuItem>
                            <MenuItem value={'Summer'}>Summer</MenuItem>
                            <MenuItem value={'Monsoon'}>Monsoon</MenuItem>
                            <MenuItem value={'Party'}>Party</MenuItem>
                        </Select>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                        <Typography sx={{ fontFamily: 'cursive', fontSize: '18px' }}>Main Trend :  </Typography>
                        <Select sx={{ width: '5%', marginLeft: '50px', fontWeight: "bold", }} variant='standard' value={main_trend} onChange={(e) => setMainTrend(e.target.value)}
                            onBlur={(e) => {
                                if (main_trend.length == 0) {
                                    document.getElementById('vendoraddproducts_error_message').style.display = 'inline-block';
                                    document.getElementById('vendoraddproducts_error_message').innerText = 'Main trend Can\'t be blank!';
                                    setMainTrendFlag(false);
                                }
                                else {
                                    document.getElementById('vendoraddproducts_error_message').style.display = 'none';
                                    setMainTrendFlag(true);
                                }
                            }}>
                            <MenuItem value={'Ethnic Print'}>Ethnic Print</MenuItem>
                            <MenuItem value={'Floral Print'}>Floral Print</MenuItem>
                            <MenuItem value={'Indigo'}>Indigo</MenuItem>
                            <MenuItem value={'Colourblocked'}>Colourblocked</MenuItem>
                            <MenuItem value={'Monochrome'}>Monochrome</MenuItem>
                            <MenuItem value={'New Basics'}>New Basics</MenuItem>
                            <MenuItem value={'Tropical'}>Tropical</MenuItem>
                        </Select>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                        <Typography sx={{ fontFamily: 'cursive', fontSize: '18px' }}>Wash Care :  </Typography>
                        <Select sx={{ width: '5%', marginLeft: '50px', fontWeight: "bold", }} variant='standard' value={wash_care} onChange={(e) => setWashCare(e.target.value)}
                            onBlur={(e) => {
                                if (wash_care.length == 0) {
                                    document.getElementById('vendoraddproducts_error_message').style.display = 'inline-block';
                                    document.getElementById('vendoraddproducts_error_message').innerText = 'Wash Care Can\'t be blank!';
                                    setWashCareFlag(false);
                                }
                                else {
                                    document.getElementById('vendoraddproducts_error_message').style.display = 'none';
                                    setWashCareFlag(true);
                                }
                            }}>
                            <MenuItem value={'Dry Clean'}>Dry Clean</MenuItem>
                            <MenuItem value={'Handwash'}>Handwash</MenuItem>
                            <MenuItem value={'Machine Wash'}>Indigo</MenuItem>
                        </Select>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                        <Typography sx={{ fontFamily: 'cursive', fontSize: '18px' }}>Closure :  </Typography>
                        <Select sx={{ width: '5%', marginLeft: '50px', fontWeight: "bold", }} variant='standard' value={closure} onChange={(e) => setClosure(e.target.value)}
                            onBlur={(e) => {
                                if (closure.length == 0) {
                                    document.getElementById('vendoraddproducts_error_message').style.display = 'inline-block';
                                    document.getElementById('vendoraddproducts_error_message').innerText = 'Closure Can\'t be blank!';
                                    setClosureFlag(false);
                                }
                                else {
                                    document.getElementById('vendoraddproducts_error_message').style.display = 'none';
                                    setClosureFlag(true);
                                }
                            }}>
                            <MenuItem value={'Button'}>Button</MenuItem>
                            <MenuItem value={'Concealed Zip'}>Concealed Zip</MenuItem>
                            <MenuItem value={'Hook and Eye'}>Hook and Eye</MenuItem>
                            <MenuItem value={'Zip'}>Zip</MenuItem>
                        </Select>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                        <Typography sx={{ fontFamily: 'cursive', fontSize: '18px' }}>Complete the Look:  </Typography>
                        <TextField variant='standard' type='text' value={completelook} sx={{ fontWeight: "bold", marginLeft: '30px', fontFamily: "cursive", fontSize: '18px' }}
                            onChange={(e) => {
                                setCompleteLook(e.target.value);
                            }}

                            onBlur={(e) => {
                                if (completelook.length == 0) {
                                    document.getElementById('vendoraddproducts_error_message').style.display = 'inline-block';
                                    document.getElementById('vendoraddproducts_error_message').innerText = 'Complete the Look Can\'t be blank!';
                                    setCompleteLookFlag(false);
                                }
                                else {
                                    document.getElementById('vendoraddproducts_error_message').style.display = 'none';
                                    setCompleteLookFlag(true);
                                }
                            }} />
                    </Box>
                    <span id='vendoraddproducts_error_message' style={{ marginLeft: '40px', color: "red", marginTop: '40px', fontFamily: 'TimesNewRoman', display: 'inline-block' }}> </span>
                    <br></br>
                    <Button sx={{
                        padding: '5px 20px', marginTop: '40px', marginLeft: '50px', textTransform: "none", fontSize: '16px', color: 'white',
                        backgroundColor: 'rgb(243, 66, 140)', '&:hover': { backgroundColor: 'rgb(243, 66, 140)' }
                    }}
                        onClick={async () => {
                            setLoader(true);
                            let formData = await new FormData();
                            formData.append('email', props.email);
                            formData.append('product_id', pid);
                            formData.append('comp_name', comp_name);
                            formData.append('brand_name', brand_name);
                            formData.append('category', catvalue);
                            formData.append('sub_category', subcatvalue);
                            formData.append('product', productvalue);
                            formData.append('strike_price', strikeprice);
                            formData.append('discount', discount);
                            formData.append('price', price);
                            formData.append('color', color);
                            formData.append('description', descr);
                            formData.append('size', size);
                            for (var i = 0; i < image1.length; i++) {
                                formData.append('image1', image1[i]);
                            }
                            formData.append('qty', qty);
                            formData.append('product_status', 'submitted');
                            formData.append('product_keyword', prodkeywords);
                            formData.append('product_date', proddate);
                            formData.append('fabric', fabric);
                            formData.append('pattern', pattern);
                            formData.append('neck', neck);
                            formData.append('sleeve_length', sleeve_length);
                            formData.append('size_fit', size_fit);
                            formData.append('occasion', occasion);
                            formData.append('main_trend', main_trend);
                            formData.append('wash_care', wash_care);
                            formData.append('closure', closure);
                            formData.append('complete_look', completelook);
                            formData.append('count', item_stock);
                            formData.append('rating', 0);
                            formData.append('rating_count_user', 0);
                            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/add_product`, formData, {
                                headers: {
                                    "Content-Type": 'multipart-formdata'
                                }
                            })
                                .then((data) => {
                                    if (data.data.email != undefined) {
                                        toast.success('Product added successfully!!', { autoClose: 3000 })
                                        setDisabled(true);
                                        setCreateFlag(false);
                                        setIncCnt(inccnt => inccnt + 1);
                                    }
                                    else {
                                        setDisabled(false);
                                        toast.error('Error Please retry', { autoClose: 3000 })
                                    }
                                    setLoader(false)
                                })
                        }} disabled={disab}>Submit</Button>
                    <br></br>
                    <br></br>
                    <br></br>
                </Box>
                <br></br>
                <br></br>
                <br></br>
            </>}
        </>}
    </>)
}

export default Vendor_AddProducts;
