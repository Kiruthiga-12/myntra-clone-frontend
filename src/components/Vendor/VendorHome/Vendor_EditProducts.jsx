import { Button, Box, Typography, Select, MenuItem, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../Loader/Loader';
const Vendor_EditProduct = (props) => {
    //async values:
    const [category, setCategory] = useState([]);
    const [subcategory, setSubCategory] = useState([]);
    const [productcategory, setProductCategory] = useState([]);
    const [email, setEmail] = useState('')

    //storing values
    const [pid, setProductID] = useState(0);
    const [comp_name, setCompanyName] = useState('');
    const [brandgroup, setBrandGroup] = useState([]);
    const [brand_name, setBrand_Name] = useState('');
    const [catvalue, setCatValue] = useState('');
    const [subcatvalue, setSubCatValue] = useState('');
    const [productvalue, setProductValue] = useState('');
    const [strikeprice, setStrikePrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [price, setPrice] = useState('');
    const [color, setColor] = useState('');
    const [descr, setDescr] = useState('');
    const [size, setSize] = useState('');
    const [qty, setQty] = useState(0);
    const [prodkeywords, setProductKeywords] = useState('');
    const [proddate, setProductDate] = useState('');
    const [prodstatus, setProductStatus] = useState()
    const [fabric, setFabric] = useState('');
    const [pattern, setPattern] = useState('');
    const [neck, setNeck] = useState('');
    const [sleeve_length, setSleeveLength] = useState('');
    const [size_fit, setSizeFit] = useState('');
    const [occasion, setOccasion] = useState('');
    const [main_trend, setMainTrend] = useState('');
    const [wash_care, setWashCare] = useState('');
    const [closure, setClosure] = useState('');
    const [complete_look, setCompleteLook] = useState('');
    const [item_stock, setItemStock] = useState(0);
    const [image1, setImage1] = useState();
    const [image2, setImage2] = useState();
    const [image3, setImage3] = useState();
    const [image4, setImage4] = useState();
    const [image5, setImage5] = useState();
    const [image6, setImage6] = useState();
    //disab 
    const [disab1, setDisable1] = useState(true)
    const [disab2, setDisable2] = useState(true)

    //flags to indicate images are edited or not.
    const [image1flag, setImage1Flag] = useState(false);
    const [image2flag, setImage2Flag] = useState(false);
    const [image3flag, setImage3Flag] = useState(false);
    const [image4flag, setImage4Flag] = useState(false);
    const [image5flag, setImage5Flag] = useState(false);
    const [image6flag, setImage6Flag] = useState(false);
    //arr to hold set of images -> edited or not edited images.
    const [img1, setImg1] = useState()
    const [img2, setImg2] = useState()
    const [img3, setImg3] = useState()
    const [img4, setImg4] = useState()
    const [img5, setImg5] = useState()
    const [img6, setImg6] = useState()
    const [loader, setLoader] = useState(true);
    const [inccnt, setIncCnt] = useState(0);

    useEffect(() => {
        function pwd1() {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_category`)
                .then((data) => (data.data.length > 0) ? setCategory(data.data.slice()) : setCategory([]))
        }
        function pwd2() {
            if (catvalue.length > 0) {
                const catamp = (catvalue != '' || catvalue != undefined) ? catvalue.replace('&', '%26').replace(',', '%2C').replace('-', '%2D') : '';
                axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_subcategory_cat?category=${catamp}`)
                    .then((data) => {
                        (data.data.length > 0) ? setSubCategory(data.data.slice()) : setSubCategory([])
                    })
            }
        }
        function pwd3() {
            if (catvalue.length > 0 && subcatvalue.length > 0) {
                const catamp = (catvalue != '' || catvalue != undefined) ? catvalue.replace('&', '%26').replace(',', '%2C').replace('-', '%2D') : '';
                const subamp = (subcatvalue != '' || subcatvalue != undefined) ? subcatvalue.replace('&', '%26').replace(',', '%2C').replace('-', '%2D') : '';
                axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_productcategory_cat?category=${catamp}&subcategory=${subamp}`)
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
        setProductDate(new Date());
    }, [comp_name, brand_name, catvalue, subcatvalue, productvalue, strikeprice, discount, price, color, descr, size, qty, prodkeywords, item_stock])

    useEffect(() => {
        setPrice(Number(strikeprice) - ((Number(discount) * Number(strikeprice)) / 100));
    }, [strikeprice, discount])


    useEffect(() => {
        setEmail(props.email)
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/branddetails_email?email=${props.email}`)
            .then((data) => (data.data.length > 0) ? setBrandGroup(data.data.slice()) : setBrandGroup([]))
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_product_product_id?product_id=${props.pid}`)
            .then((data) => {
                if (data.data.length > 0) {
                    setProductID(data.data[0].product_id);
                    setCompanyName(data.data[0].comp_name);
                    setBrand_Name(data.data[0].brand_name);
                    setCatValue(data.data[0].category)
                    setSubCatValue(data.data[0].subcategory);
                    setProductValue(data.data[0].product);
                    setStrikePrice(data.data[0].strike_price);
                    setDiscount(data.data[0].discount);
                    setPrice(data.data[0].price);
                    setColor(data.data[0].color);
                    setDescr(data.data[0].description);
                    setSize(data.data[0].size);
                    setQty(data.data[0].quantity);
                    setItemStock(data.data[0].count);
                    setProductKeywords(data.data[0].product_keywords);
                    setProductDate(new Date(data.data[0].product_date).toLocaleString('hi-EN').toUpperCase());
                    setProductStatus(data.data[0].product_status);
                    setFabric(data.data[0].fabric)
                    setPattern(data.data[0].pattern);
                    setNeck(data.data[0].neck);
                    setSleeveLength(data.data[0].sleeve_length);
                    setSizeFit(data.data[0].size_fit);
                    setOccasion(data.data[0].occasion);
                    setMainTrend(data.data[0].main_trend);
                    setWashCare(data.data[0].wash_care);
                    setClosure(data.data[0].closure)
                    setCompleteLook(data.data[0].complete_look)
                    setImage1(data.data[0].image1[0])
                    setImage2(data.data[0].image1[1])
                    setImage3(data.data[0].image1[2])
                    setImage4(data.data[0].image1[3])
                    setImage5(data.data[0].image1[4])
                    setImage6(data.data[0].image1[5]);
                    setLoader(false);
                }
            })
    }, [])
    useEffect(() => {
        if (prodstatus != undefined) {
            if (prodstatus == 'approved') {
                setDisable1(true)
                setDisable2(false)
            }
            else if (prodstatus == 'submitted' || prodstatus == 'resubmitted') {
                setDisable1(true)
                setDisable2(true)
            }
            else if (prodstatus == 'rejected') {
                setDisable1(false)
                setDisable2(true)
            }
        }
    }, [prodstatus])
    useEffect(() => {
        if (inccnt > 0) {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/delete_product_profile`)
                .then((data) => { })
        }
    }, [inccnt])
    return (<>
        {loader == true ? <Loader /> : <>
            <ToastContainer className='toastcontainer' />
            <Box sx={{ paddingTop: '20px', paddingLeft: '20px', marginLeft: '20px', marginTop: '100px', backgroundColor: 'white', width: '90%', marginRight: '40px' }}>
                <Typography sx={{ padding: '1px 20px', fontSize: '20px', fontFamily: 'cursive', color: 'white', backgroundColor: 'purple', width: '250px' }}>Edit Product Details
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '30px' }}>
                    <Typography sx={{ flex: 1, fontFamily: 'cursive', fontSize: '18px' }}>Product ID : </Typography>
                    <Typography sx={{ flex: 7, fontFamily: "cursive", fontWeight: "bold", fontSize: '18px' }}>{pid}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                    <Typography sx={{ flex: 1, fontFamily: 'cursive', fontSize: '18px' }}>Company Name : </Typography>
                    <Typography sx={{ flex: 7, fontFamily: "cursive", fontWeight: "bold", fontSize: '18px' }}>{comp_name}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                    <Typography sx={{ fontFamily: 'cursive', fontSize: '18px' }}>Brand Name : </Typography>
                    <Select sx={{ width: '20%', marginLeft: '50px', fontWeight: "bold" }} variant='standard' value={brand_name} onChange={(e) => setBrand_Name(e.target.value)}>
                        {brandgroup.length > 0 && brandgroup.map((li) => {
                            return (<MenuItem value={li.brand_name}>{li.brand_name}</MenuItem>)
                        }
                        )}
                    </Select>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                    <Typography sx={{ fontFamily: 'cursive', fontSize: '18px' }}>Category : </Typography>
                    <Select sx={{ width: '20%', marginLeft: '50px', fontWeight: "bold" }} variant='standard' onChange={(e) => setCatValue(e.target.value)}
                        value={catvalue} >
                        {category.map((li) =>
                            <MenuItem value={li.category}>{li.category}</MenuItem>
                        )}
                    </Select>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                    <Typography sx={{ fontFamily: 'cursive', fontSize: '18px' }}>Sub Category :  </Typography>
                    <Select sx={{ width: '20%', marginLeft: '50px', fontWeight: "bold" }} variant='standard' onChange={(e) => setSubCatValue(e.target.value)}
                        value={subcatvalue} >
                        {subcategory.map((li) =>
                            <MenuItem value={li.subcategory}>{li.subcategory}</MenuItem>
                        )}
                    </Select>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                    <Typography sx={{ fontFamily: 'cursive', fontSize: '18px' }}>Product :  </Typography>
                    <Select sx={{ width: '20%', marginLeft: '50px', fontWeight: "bold" }} variant='standard' onChange={(e) => setProductValue(e.target.value)}
                        value={productvalue} >
                        {productcategory.map((li) =>
                            <MenuItem value={li.productcategory}>{li.productcategory}</MenuItem>
                        )}
                    </Select>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                    <Typography sx={{ fontFamily: 'cursive', fontSize: '18px' }}>Strike Price :  </Typography>
                    <TextField variant='filled' type='text' value={strikeprice} sx={{ marginLeft: '30px', fontFamily: "verdana", fontWeight: "bolder" }}
                        onChange={(e) => setStrikePrice(e.target.value)} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                    <Typography sx={{ fontFamily: 'cursive', fontSize: '18px' }}>Discount :  </Typography>
                    <TextField variant='filled' type='text' value={discount} sx={{ marginLeft: '30px', fontWeight: "bold", fontFamily: "cursive", fontSize: '18px' }}
                        onChange={(e) => {
                            setDiscount(e.target.value);
                            setPrice(Number(strikeprice) - ((Number(discount) * Number(strikeprice)) / 100));
                        }} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                    <Typography sx={{ fontFamily: 'cursive', fontSize: '18px' }}> Price :  </Typography>
                    <TextField variant='filled' type='text' inputProps={{ readOnly: true }} sx={{ fontWeight: "bold", marginLeft: '30px', fontFamily: "cursive", fontSize: '18px' }}
                        value={price}
                    />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                    <Typography sx={{ fontFamily: 'cursive', fontSize: '18px' }}>Color :  </Typography>
                    <TextField variant='standard' type='text' value={color} sx={{ fontWeight: "bold", marginLeft: '30px', fontFamily: "cursive", fontSize: '18px' }}
                        onChange={(e) => setColor(e.target.value)} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                    <Typography sx={{ fontFamily: 'cursive', fontSize: '18px' }}>Title / Description  :  </Typography>
                    <TextField variant='standard' type='text' value={descr} sx={{ fontWeight: "bold", marginLeft: '30px', fontFamily: "cursive", fontSize: '18px' }}
                        onChange={(e) => setDescr(e.target.value)} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                    <Typography sx={{ fontFamily: 'cursive', fontSize: '18px' }}>Size :  </Typography>
                    <Select sx={{ width: '5%', marginLeft: '50px', fontWeight: "bold", }} variant='standard' value={size} onChange={(e) => setSize(e.target.value)}>
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
                        onChange={(e) => setQty(e.target.value)} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                    <Typography sx={{ fontFamily: 'cursive', fontSize: '18px' }}>Item in Stock  :  </Typography>
                    <TextField variant='standard' type='text' value={item_stock} sx={{ fontWeight: "bold", marginLeft: '30px', fontFamily: "cursive", fontSize: '18px' }}
                        onChange={(e) => setItemStock(e.target.value)} />
                </Box>
                <br></br>
                <Typography sx={{ fontFamily: 'cursive', fontSize: '18px' }}>Image 1  :  </Typography>
                <br></br>
                <img src={`data:image/png;base64,${image1}`} alt='loading' width='120px' height='100px' id='vendoredit1' />
                <TextField variant='standard' type='file' sx={{ marginLeft: '30px', fontFamily: "cursive", fontWeight: "bold", fontSize: '18px' }}
                    onChange={async (e) => {
                        document.getElementById('vendoredit1').style.display = 'none';
                        setImg1(e.target.files[0]);
                        setImage1Flag(true)
                    }} />
                <br></br>
                <Typography sx={{ fontFamily: 'cursive', fontSize: '18px' }}>Image 2  :  </Typography>
                <br></br>
                <img src={`data:image/png;base64,${image2}`} alt='loading' width='120px' height='100px' id='vendoredit2' />
                <TextField variant='standard' type='file' sx={{ marginLeft: '30px', fontFamily: "cursive", fontWeight: "bold", fontSize: '18px' }}
                    onChange={async (e) => {
                        document.getElementById('vendoredit2').style.display = 'none';
                        setImg2(e.target.files[0]);
                        setImage2Flag(true)
                    }} />
                <br></br>
                <Typography sx={{ fontFamily: 'cursive', fontSize: '18px' }}>Image 3  :  </Typography>
                <br></br>
                <img src={`data:image/png;base64,${image3}`} alt='loading' width='120px' height='100px' id='vendoredit3' />
                <TextField variant='standard' type='file' sx={{ marginLeft: '30px', fontFamily: "cursive", fontWeight: "bold", fontSize: '18px' }}
                    onChange={async (e) => {
                        document.getElementById('vendoredit3').style.display = 'none';
                        setImg3(e.target.files[0])
                        setImage3Flag(true)
                    }} />
                <br></br>
                <Typography sx={{ fontFamily: 'cursive', fontSize: '18px' }}>Image 4  :  </Typography>
                <br></br>
                <img src={`data:image/png;base64,${image4}`} alt='loading' width='120px' height='100px' id='vendoredit4' />
                <TextField variant='standard' type='file' sx={{ marginLeft: '30px', fontFamily: "cursive", fontWeight: "bold", fontSize: '18px' }}
                    onChange={async (e) => {
                        document.getElementById('vendoredit4').style.display = 'none';
                        setImg4(e.target.files[0])
                        setImage4Flag(true)
                    }} />
                <br></br>
                <Typography sx={{ fontFamily: 'cursive', fontSize: '18px' }}>Image 5  :  </Typography>
                <br></br>
                <img src={`data:image/png;base64,${image5}`} alt='loading' width='120px' height='100px' id='vendoredit5' />
                <TextField variant='standard' type='file' sx={{ marginLeft: '30px', fontFamily: "cursive", fontWeight: "bold", fontSize: '18px' }}
                    onChange={async (e) => {
                        document.getElementById('vendoredit5').style.display = 'none';
                        setImg5(e.target.files[0])
                        setImage5Flag(true)
                    }} />
                <br></br>
                <Typography sx={{ fontFamily: 'cursive', fontSize: '18px' }}>Image 6 :  </Typography>
                <br></br>
                <img src={`data:image/png;base64,${image6}`} alt='loading' width='120px' height='100px' id='vendoredit6' />
                <TextField variant='standard' type='file' sx={{ marginLeft: '30px', fontFamily: "cursive", fontWeight: "bold", fontSize: '18px' }}
                    onChange={async (e) => {
                        document.getElementById('vendoredit6').style.display = 'none';
                        setImg6(e.target.files[0])
                        setImage6Flag(true)
                    }} />
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                    <Typography sx={{ fontFamily: 'cursive', fontSize: '18px' }}>Product Status :  </Typography>
                    <TextField variant='standard' type='text' inputProps={{ readOnly: true }} sx={{ marginLeft: '30px', fontFamily: "cursive", fontWeight: "bold", fontSize: '18px' }}
                        value={prodstatus}
                    />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                    <Typography sx={{ fontFamily: 'cursive', fontSize: '18px' }}>Product Keywords:  </Typography>
                    <TextField variant='standard' type='text' value={prodkeywords} sx={{ fontWeight: "bold", marginLeft: '30px', fontFamily: "cursive", fontSize: '18px' }}
                        onChange={(e) => {
                            setProductKeywords(e.target.value);
                        }} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                    <Typography sx={{ fontFamily: 'cursive', fontSize: '18px' }}>Product Date:  </Typography>
                    <TextField variant='filled' type='text' inputProps={{ readOnly: true }} sx={{ fontWeight: "bold", width: '25%', marginLeft: '30px', fontFamily: "cursive", fontSize: '18px' }}
                        value={proddate}
                    />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                    <Typography sx={{ fontFamily: 'cursive', fontSize: '18px' }}>Fabric :  </Typography>
                    <Select sx={{ width: '5%', marginLeft: '50px', fontWeight: "bold" }} variant='standard' value={fabric} onChange={(e) => setFabric(e.target.value)}>
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
                    <Select sx={{ width: '5%', marginLeft: '50px', fontWeight: "bold" }} variant='standard' value={pattern} onChange={(e) => setPattern(e.target.value)}>
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
                    <Select sx={{ width: '5%', marginLeft: '50px', fontWeight: "bold" }} variant='standard' value={neck} onChange={(e) => setNeck(e.target.value)}>
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
                    <Select sx={{ width: '5%', marginLeft: '50px', fontWeight: "bold" }} variant='standard' value={sleeve_length} onChange={(e) => setSleeveLength(e.target.value)}>
                        <MenuItem value={'Long Sleeves'}>Long Sleeves</MenuItem>
                        <MenuItem value={'Short Sleeves'}>Short Sleeves</MenuItem>
                        <MenuItem value={'Sleeveless'}>Sleeveless</MenuItem>
                        <MenuItem value={'Three-Quarter'}>Three-Quarter</MenuItem>
                    </Select>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                    <Typography sx={{ fontFamily: 'cursive', fontSize: '18px' }}>Size & Fit :  </Typography>
                    <TextField variant='standard' type='text' value={size_fit} sx={{ fontWeight: "bold", marginLeft: '30px', fontFamily: "cursive", fontSize: '18px' }}
                        onChange={(e) => {
                            setSizeFit(e.target.value);
                        }} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                    <Typography sx={{ fontFamily: 'cursive', fontSize: '18px' }}>Occasion :  </Typography>
                    <Select sx={{ width: '5%', marginLeft: '50px', fontWeight: "bold" }} variant='standard' value={occasion} onChange={(e) => setOccasion(e.target.value)}>
                        <MenuItem value={'Ethnic'}>Ethnic</MenuItem>
                        <MenuItem value={'Wedding'}>Wedding</MenuItem>
                        <MenuItem value={'Summer'}>Summer</MenuItem>
                        <MenuItem value={'Monsoon'}>Monsoon</MenuItem>
                        <MenuItem value={'Party'}>Party</MenuItem>
                    </Select>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                    <Typography sx={{ fontFamily: 'cursive', fontSize: '18px' }}>Main Trend :  </Typography>
                    <Select sx={{ width: '5%', marginLeft: '50px', fontWeight: "bold" }} variant='standard' value={main_trend} onChange={(e) => setMainTrend(e.target.value)}>
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
                    <Select sx={{ width: '5%', marginLeft: '50px', fontWeight: "bold" }} variant='standard' value={wash_care} onChange={(e) => setWashCare(e.target.value)}>
                        <MenuItem value={'Dry Clean'}>Dry Clean</MenuItem>
                        <MenuItem value={'Handwash'}>Handwash</MenuItem>
                        <MenuItem value={'Machine Wash'}>Indigo</MenuItem>
                    </Select>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                    <Typography sx={{ fontFamily: 'cursive', fontSize: '18px' }}>Closure :  </Typography>
                    <Select sx={{ width: '5%', marginLeft: '50px', fontWeight: "bold" }} variant='standard' value={closure} onChange={(e) => setClosure(e.target.value)}>
                        <MenuItem value={'Button'}>Button</MenuItem>
                        <MenuItem value={'Concealed Zip'}>Concealed Zip</MenuItem>
                        <MenuItem value={'Hook and Eye'}>Hook and Eye</MenuItem>
                        <MenuItem value={'Zip'}>Zip</MenuItem>
                    </Select>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                    <Typography sx={{ fontFamily: 'cursive', fontSize: '18px' }}>Complete Look:  </Typography>
                    <TextField variant='filled' type='text' inputProps={{ readOnly: true }} sx={{ fontWeight: "bold", width: '25%', marginLeft: '30px', fontFamily: "cursive", fontSize: '18px' }}
                        value={complete_look} onChange={(e) => setCompleteLook(e.target.value)}
                    />
                </Box>
                <span id='vendoreditproducts_error_message' style={{ marginLeft: '40px', color: "red", marginTop: '30px', fontFamily: 'TimesNewRoman', display: 'inline-block' }}> </span>
                <br></br>
                <Button sx={{
                    padding: '5px 20px', marginTop: '30px', marginLeft: '50px', textTransform: "none", fontSize: '16px', color: 'white',
                    backgroundColor: 'rgb(243, 66, 140)', '&:hover': { backgroundColor: 'rgb(243, 66, 140)' }
                }}
                    onClick={
                        async () => {
                            async function fun1() {
                                if (image1flag == false) {
                                    // generate file from base64 string
                                    const dataURLtoFile = (dataurl, filename) => {
                                        const arr = dataurl.split(',')
                                        const mime = arr[0].match(/:(.*?);/)[1]
                                        const bstr = atob(arr[1])
                                        let n = bstr.length
                                        const u8arr = new Uint8Array(n)
                                        while (n) {
                                            u8arr[n - 1] = bstr.charCodeAt(n - 1)
                                            n -= 1 // to make eslint happy
                                        }
                                        return new File([u8arr], filename, { type: mime })
                                    }
                                    const file = dataURLtoFile(`data:image/png;base64,${image1}`, 'vendoredit_product.png');
                                    if (file != undefined) {
                                        setImg1(file);
                                    }
                                }
                            }
                            async function fun2() {
                                if (image2flag == false) {
                                    // generate file from base64 string
                                    const dataURLtoFile = (dataurl, filename) => {
                                        const arr = dataurl.split(',')
                                        const mime = arr[0].match(/:(.*?);/)[1]
                                        const bstr = atob(arr[1])
                                        let n = bstr.length
                                        const u8arr = new Uint8Array(n)
                                        while (n) {
                                            u8arr[n - 1] = bstr.charCodeAt(n - 1)
                                            n -= 1 // to make eslint happy
                                        }
                                        return new File([u8arr], filename, { type: mime })
                                    }
                                    const file = dataURLtoFile(`data:image/png;base64,${image2}`, 'vendoredit_product.png');
                                    if (file != undefined) {
                                        setImg2(file);
                                    }
                                }
                            }
                            async function fun3() {
                                if (image3flag == false) {
                                    // generate file from base64 string
                                    const dataURLtoFile = (dataurl, filename) => {
                                        const arr = dataurl.split(',')
                                        const mime = arr[0].match(/:(.*?);/)[1]
                                        const bstr = atob(arr[1])
                                        let n = bstr.length
                                        const u8arr = new Uint8Array(n)
                                        while (n) {
                                            u8arr[n - 1] = bstr.charCodeAt(n - 1)
                                            n -= 1 // to make eslint happy
                                        }
                                        return new File([u8arr], filename, { type: mime })
                                    }
                                    const file = dataURLtoFile(`data:image/png;base64,${image3}`, 'vendoredit_product.png');
                                    if (file != undefined) {
                                        setImg3(file);
                                    }
                                }
                            }
                            async function fun4() {
                                if (image4flag == false) {
                                    // generate file from base64 string
                                    const dataURLtoFile = (dataurl, filename) => {
                                        const arr = dataurl.split(',')
                                        const mime = arr[0].match(/:(.*?);/)[1]
                                        const bstr = atob(arr[1])
                                        let n = bstr.length
                                        const u8arr = new Uint8Array(n)
                                        while (n) {
                                            u8arr[n - 1] = bstr.charCodeAt(n - 1)
                                            n -= 1 // to make eslint happy
                                        }
                                        return new File([u8arr], filename, { type: mime })
                                    }
                                    const file = dataURLtoFile(`data:image/png;base64,${image4}`, 'vendoredit_product.png');
                                    if (file != undefined) {
                                        setImg4(file);
                                    }
                                }
                            }
                            async function fun5() {
                                if (image5flag == false) {
                                    // generate file from base64 string
                                    const dataURLtoFile = (dataurl, filename) => {
                                        const arr = dataurl.split(',')
                                        const mime = arr[0].match(/:(.*?);/)[1]
                                        const bstr = atob(arr[1])
                                        let n = bstr.length
                                        const u8arr = new Uint8Array(n)
                                        while (n) {
                                            u8arr[n - 1] = bstr.charCodeAt(n - 1)
                                            n -= 1 // to make eslint happy
                                        }
                                        return new File([u8arr], filename, { type: mime })
                                    }
                                    const file = dataURLtoFile(`data:image/png;base64,${image5}`, 'vendoredit_product.png');
                                    if (file != undefined) {
                                        setImg5(file);
                                    }
                                }
                            }
                            async function fun6() {
                                if (image6flag == false) {
                                    // generate file from base64 string
                                    const dataURLtoFile = (dataurl, filename) => {
                                        const arr = dataurl.split(',')
                                        const mime = arr[0].match(/:(.*?);/)[1]
                                        const bstr = atob(arr[1])
                                        let n = bstr.length
                                        const u8arr = new Uint8Array(n)
                                        while (n) {
                                            u8arr[n - 1] = bstr.charCodeAt(n - 1)
                                            n -= 1 // to make eslint happy
                                        }
                                        return new File([u8arr], filename, { type: mime })
                                    }
                                    const file = dataURLtoFile(`data:image/png;base64,${image6}`, 'vendoredit_product.png');
                                    if (file != undefined) {
                                        setImg6(file);
                                    }
                                }
                            }
                            async function outerfunc() {
                                await fun1();
                                await fun2();
                                await fun3();
                                await fun4();
                                await fun5();
                                await fun6();
                            }
                            function innerfunc() {
                                setLoader(true);
                                let formData = new FormData();
                                formData.append('email', email);
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
                                formData.append('qty', qty);
                                formData.append('product_status', 'resubmitted');
                                formData.append('product_date', new Date(proddate));
                                formData.append('product_keyword', prodkeywords);
                                formData.append('fabric', fabric);
                                formData.append('pattern', pattern);
                                formData.append('neck', neck);
                                formData.append('sleeve_length', sleeve_length);
                                formData.append('size_fit', size_fit);
                                formData.append('occasion', occasion);
                                formData.append('main_trend', main_trend);
                                formData.append('wash_care', wash_care);
                                formData.append('closure', closure);
                                formData.append('complete_look', complete_look);
                                formData.append('count', item_stock);
                                formData.append('image1', img1);
                                formData.append('image1', img2);
                                formData.append('image1', img3);
                                formData.append('image1', img4);
                                formData.append('image1', img5);
                                formData.append('image1', img6);
                                axios.patch(`${process.env.REACT_APP_BACKEND_URL}/vendor_edit_product`, formData, {
                                    headers: {
                                        "Content-Type": 'multipart-formdata'
                                    }
                                })
                                    .then((data) => {
                                        if (data.data.modifiedCount == 1) {
                                            toast.success('Product Edited Successfully', { autoClose: 3000 })
                                            setIncCnt(inccnt => inccnt + 1);
                                        }
                                        else {
                                            setDisable1(true);
                                            toast.error('Error Please retry!', { autoClose: 3000 })
                                        }
                                        setLoader(false);
                                    })

                            }
                            outerfunc();
                            if (img1 != undefined && img2 != undefined && img3 != undefined && img4 != undefined && img5 != undefined && img6 != undefined)
                                innerfunc();
                        }} disabled={disab1}>Save & Submit</Button>
                <Button sx={{
                    padding: '5px 20px', marginTop: '30px', marginLeft: '50px', textTransform: "none", fontSize: '16px', color: 'white',
                    backgroundColor: 'rgb(243, 66, 140)', '&:hover': { backgroundColor: 'rgb(243, 66, 140)' }
                }} disabled={disab2}
                    onClick={
                        async () => {
                            let confirm = await window.confirm("Are you sure you want to delete product?");
                            let ans_reason = await window.prompt("Kindly mention reason for deletion", " ");
                            if (confirm === true && (ans_reason.length > 3)) {
                                setLoader(true);
                                const delprod = axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete_product?productid=${pid}`)
                                const adminprod = axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete_admin_product?productid=${pid}`)
                                const removedb = axios.post(`${process.env.REACT_APP_BACKEND_URL}/vendor_removed_product`, {
                                    id: pid,
                                    email: email,
                                    status: 'deleted',
                                    reason: ans_reason
                                })
                                const upd_cart = axios.patch(`${process.env.REACT_APP_BACKEND_URL}/update_item_stock_cart?product_id=${pid}&zero=${1}`, {
                                    count: 0
                                });
                                const upd_wishlist = axios.patch(`${process.env.REACT_APP_BACKEND_URL}/update_item_stock_wishlist?product_id=${pid}&zero=${1}`, {
                                    count: 0
                                })
                                const upd_placeorder = axios.patch(`${process.env.REACT_APP_BACKEND_URL}/update_item_stock_placeorder?product_id=${pid}&zero=${1}`, {
                                    count: 0
                                })
                                const upd_order = axios.patch(`${process.env.REACT_APP_BACKEND_URL}/update_item_stock_order?product_id=${pid}&zero=${1}`, {
                                    count: 0
                                })
                                axios.all([delprod, adminprod, removedb, upd_cart, upd_wishlist, upd_placeorder, upd_order])
                                    .then(axios.spread(function (proddel, adminproddel, addproddb, cart, wishlist, placeorder, order) {
                                        toast.success('Product Deleted Successfully!', { autoClose: 3000 })
                                        setLoader(false);
                                    }))
                            }
                        }}>Delete Product</Button>
                <br></br>
                <br></br>
                <br></br>
            </Box>

            <br></br>
            <br></br>
            <br></br>
        </>}
    </>)
}


export default Vendor_EditProduct;