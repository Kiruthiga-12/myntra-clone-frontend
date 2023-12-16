import { MenuItem, Select, Typography, Box, TextField, Button, FormControlLabel, FormLabel, FormControl, InputAdornment, RadioGroup, Radio, InputLabel, ListItem, Pagination } from "@mui/material";
import ProductItems from "../BuyOptions/ProductItems";
import { connect } from 'react-redux';
import { useState, useEffect } from "react";
import { setUserPageCat, setUserPageProdCat, setUserPageSubCat } from '../../Redux_Store/Action_Creators';
import PageBtn from './PageBtn';
import axios from 'axios';
import Loader from "../../Loader/Loader";
import SearchIcon from '@mui/icons-material/Search';
const Filter = (props) => {
    const [path, setPath] = useState('')
    const [product, setProduct] = useState('');
    const [count, setCount] = useState(0); // header info
    const [size, setSize] = useState('')//filters
    const [catgroup, setCatGroup] = useState([])//async value
    const [cat, setCat] = useState('');//filter category
    const [brandgroup, setBrandGroup] = useState([]);//async value
    const [pricegroup, setPriceGroup] = useState([])//async value
    const [colorgroup, setColorGroup] = useState([])//async value
    const [discountgroup, setDiscountGroup] = useState([]);////async value
    const [dis, setDisc] = useState('');//set discount value
    const [sortby, setSortBy] = useState('Recommended');
    const [brand, setBrand] = useState([]);
    const [color, setColor] = useState([]);
    const [price, setPrice] = useState([]);
    const [prod_data, setproductData] = useState([]);//set product details
    //filter options.
    const [catfilter, setCatFilter] = useState([]);
    const [brandfilter, setBrandFilter] = useState([]);
    const [pricefilter, setPriceFilter] = useState([]);
    const [colorfilter, setColorFilter] = useState([]);
    const [discountfilter, setDiscountFilter] = useState([]);
    const [sizefilter, setSizeFilter] = useState([]);
    //clear button
    const [clearflag, setClearFlag] = useState();
    const [total_cnt, setTotalCnt] = useState(0);
    const [loader, setLoader] = useState(true);
    //search value
    const [searchval, setSearchVal] = useState('');
    const [searchflag, setSearchFlag] = useState(false);

    useEffect(() => {
        async function func0() {
            await axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_category`)
                .then(async (data) => {
                    (data.data.length > 0) ? setCatGroup(data.data.slice()) : setCatGroup([])
                })
        }
        async function func1() {
            const cat = (props.category != '' || props.category != undefined) ? props.category.replace('&', '%26').replace(',', '%2C').replace('-', '%2D') : " ";
            const subcat = (props.subcategory != '' || props.subcategory != undefined) ? props.subcategory.replace('&', '%26').replace(',', '%2C').replace('-', '%2D') : '';
            const prodcat = (props.productcategory != '' || props.productcategory != undefined) ? props.productcategory.replace('&', '%26').replace(',', '%2C').replace('-', '%2D') : '';

            if ((props.category != undefined || props.category != '') || (props.subcategory != undefined || props.subcategory != '') || (props.productcategory != undefined || props.productcategory != '')) {
                const itemscnt = axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_product_filters_cnt?category=${cat}&subcategory=${subcat}&prodcategory=${prodcat}`);
                const brand = axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_distinct_brand?category=${cat}&subcategory=${subcat}&productcategory=${prodcat}`)
                const price = axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_distinct_price?category=${cat}&subcategory=${subcat}&productcategory=${prodcat}`)
                const color = axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_distinct_color?category=${cat}&subcategory=${subcat}&productcategory=${prodcat}`)
                const discount = axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_distinct_discount?category=${cat}&subcategory=${subcat}&productcategory=${prodcat}`)
                await axios.all([itemscnt, brand, price, color, discount])
                    .then(axios.spread(function (itemscntdet, branddet, pricedet, colordet, discountdet) {
                        itemscntdet.data.data > 0 ? setCount(itemscntdet.data.data) : setCount(0)
                        branddet.data.data.length > 0 ? setBrandGroup(branddet.data.data.slice()) : setBrandGroup([])
                        pricedet.data.data.length > 0 ? setPriceGroup(pricedet.data.data.slice()) : setPriceGroup([])
                        colordet.data.data.length > 0 ? setColorGroup(colordet.data.data.slice()) : setColorGroup([])
                        discountdet.data.data.length > 0 ? setDiscountGroup(discountdet.data.data.slice()) : setDiscountGroup([])
                    }))
            }
        }
        function func2() {
            if ((props.category != '' || props.category != undefined) && (props.subcategory == '' || props.subcategory == undefined) && (props.productcategory == '' || props.productcategory == undefined)) {
                setProduct(props.category);
                setPath(`Home / ${props.category}`)
            }
            else if ((props.category != '' || props.category != undefined) && (props.subcategory != '' || props.subcategory != undefined) && (props.productcategory == '' || props.productcategory == undefined)) {
                setProduct(props.subcategory);
                setPath(`Home / ${props.category} / ${props.subcategory}`)
            }
            else if ((props.category != '' || props.category != undefined) && (props.subcategory != '' || props.subcategory == undefined) && (props.productcategory != '' || props.productcategory != undefined)) {
                setProduct(props.productcategory);
                setPath(`Home / ${props.category} / ${props.subcategory} / ${props.productcategory}`)
            }
        }
        func0()
        func1()
        func2()
        setCat(props.category)
    }, [])
    useEffect(() => {
        const cat = (props.category != '' || props.category != undefined) ? props.category.replace('&', '%26').replace(',', '%2C').replace('-', '%2D') : '';
        const subcat = (props.subcategory != '' || props.subcategory != undefined) ? props.subcategory.replace('&', '%26').replace(',', '%2C').replace('-', '%2D') : '';
        const prodcat = (props.productcategory != '' || props.productcategory != undefined) ? props.productcategory.replace('&', '%26').replace(',', '%2C').replace('-', '%2D') : '';
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_approved_product?category=${cat}&subcategory=${subcat}&prodcategory=${prodcat}&${(brand.map((li, index) => `brand[${index}]=${li}`).join('&'))}&${(price.map((li, index) => `price[${index}]=${li}`).join('&'))}&${(color.map((li, index) => `color[${index}]=${li}`).join('&'))}&discount=${dis}&size=${size}&sortby=${sortby}&pageno=${props.page_no}&search=${searchval}`)
            .then((data) => {
                if (data.data.length > 0) {
                    setproductData(data.data.slice());
                    setTotalCnt(data.data.length);
                }
                else {
                    setproductData([])
                    setTotalCnt(0);
                }
                setLoader(false);
            })
        function func2() {
            if ((props.category != '') && (props.subcategory == '') && (props.productcategory == '')) {
                setProduct(props.category);
                setPath(`Home / ${props.category}`)
            }
            else if ((props.category != '') && (props.subcategory != '') && (props.productcategory == '')) {
                setProduct(props.subcategory);
                setPath(`Home / ${props.category} / ${props.subcategory}`)
            }
            else if ((props.category != '') && (props.subcategory != '') && (props.productcategory != '')) {
                setProduct(props.productcategory);
                setPath(`Home / ${props.category} / ${props.subcategory} / ${props.productcategory}`)
            }
        }
        func2();
        setCatFilter([props.category]);
    }, [cat, brand, price, color, dis, size, sortby, props, searchflag])
    useEffect(() => {
        if (clearflag == true) {
            setBrandFilter(brandfilter.filter((li, index) => {
                document.getElementById(`brand_${li}`).checked = false;
                return li == ''
            }))
            setBrand(brand.filter((li) => li == ''))
            setPriceFilter(pricefilter.filter((li, index) => {
                document.getElementById(`price_${li}`).checked = false;
                return li == ''
            }))
            setPrice(price.filter((li) => li == ''))
            setColorFilter(colorfilter.filter((li) => {
                document.getElementById(`color_${li}`).checked = false;
                return li == ''
            }))
            setColor(color.filter((li) => li == ''))
            setDiscountFilter([])
            setDisc('')
            setSizeFilter(sizefilter.filter((li) => li == ''))
            setSize('')
            const cat = (props.category != '' || props.category != undefined) ? props.category.replace('&', '%26').replace(',', '%2C').replace('-', '%2D') : '';
            const subcat = (props.subcategory != '' || props.subcategory != undefined) ? props.subcategory.replace('&', '%26').replace(',', '%2C').replace('-', '%2D') : '';
            const prodcat = (props.productcategory != '' || props.productcategory != undefined) ? props.productcategory.replace('&', '%26').replace(',', '%2C').replace('-', '%2D') : '';
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_approved_product?category=${cat}&subcategory=${subcat}&prodcategory=${prodcat}&${(brand.map((li, index) => `brand[${index}]=${li}`).join('&'))}&${(price.map((li, index) => `price[${index}]=${li}`).join('&'))}&${(color.map((li, index) => `color[${index}]=${li}`).join('&'))}&discount=${dis}&size=${size}&sortby=${sortby}&pageno=${props.page_no}&search=${searchval}`)
                .then((data) => {
                    if (data.data.length > 0) {
                        setproductData(data.data.slice());
                        setTotalCnt(data.data.length);
                    }
                    else {
                        setproductData([])
                        setTotalCnt(0);
                    }
                    setLoader(false);
                })
        }
    }, [clearflag])
    return (
        <>
            <Box sx={{ marginTop: '120px', marginLeft: '20px' }}>
                <Typography variant='body1' sx={{ marginTop: '3px', fontWeight: 'bold' }}>{path}</Typography>
                <Typography variant='body1' sx={{ marginTop: '10px', fontFamily: 'Arial', fontWeight: 'bolder' }}>{product} - <span style={{ fontWeight: '400', fontFamily: 'monospace', color: 'grey', fontSize: '20px' }}>{count} items</span> </Typography>
            </Box>
            <Box sx={{ marginLeft: '20px', marginTop: '5px', display: 'flex', alignItems: 'center' }}>
                <Typography variant='body1' sx={{ fontFamily: 'Arial', fontWeight: 'bolder', flex: 3 }} >FILTERS</Typography>
                <Button sx={{
                    flex: 3, color: 'rgb(243, 66, 140)', fontFamily: 'arial', fontWeight: 'bold',
                    '&:hover': { backgroundColor: 'transparent' }
                }}
                    onClick={() => {
                        setClearFlag(true)
                        setLoader(true);
                    }}>CLEAR ALL</Button>
                {/* filteroptions */}
                {/* Bundles */}
                <Select sx={{ flex: 4, marginLeft: '20px', borderRadius: '30px', height: '40px', backgroundColor: 'rgb(240,240,240)', '&:hover': { border: 'none' }, color: 'black', border: 'none', outline: 'none' }}
                    value='Single Style'>
                    <MenuItem value=' '> </MenuItem>
                    <MenuItem value='Single Style'>Single Style</MenuItem>
                </Select>
                {/* Country Selected */}
                <Select sx={{ flex: 4, marginLeft: '20px', borderRadius: '30px', height: '40px', backgroundColor: 'rgb(240,240,240)', '&:hover': { border: 'none' }, color: 'black', border: 'none', outline: 'none' }}
                    value='India'>
                    <MenuItem value=' '> </MenuItem>
                    <MenuItem value='India'>India</MenuItem>
                </Select>
                {/* Size */}
                <Select value={size} sx={{ flex: 3, marginLeft: '30px' }}
                    onChange={(e) => {
                        setSize(e.target.value)
                        setSizeFilter([e.target.value])
                        setLoader(true)
                    }} >
                    <MenuItem value='XS'>XS</MenuItem>
                    <MenuItem value='S'>S</MenuItem>
                    <MenuItem value='M'>M</MenuItem>
                    <MenuItem value='L'>L</MenuItem>
                    <MenuItem value='XL'>XL</MenuItem>
                    <MenuItem value='XXL'>XXL</MenuItem>
                </Select >
                <Box sx={{ flex: 2 }}> </Box>
                <Box sx={{ flex: 6 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', width: '400px', border: '1px solid lightgrey', borderRadius: "5px", backgroundColor: 'rgb(240,240,240)' }}>
                        <SearchIcon sx={{ color: 'black', marginLeft: "10px", flex: 1, cursor: "pointer" }}
                            onClick={() => {
                                if (searchval.length > 0) {
                                    setLoader(true);
                                    setSearchFlag(true)
                                }
                                else {
                                    setLoader(false);
                                    setSearchFlag(false)
                                }
                            }} />
                        <TextField variant='outlined' type='text' placeholder='Search for Products ....' sx={{
                            flex: 11,
                            width: '450px', color: 'black', backgroundColor: 'rgb(240,240,240)', marginLeft: '10px',
                            '& fieldset': { border: 'none' }
                        }} value={searchval} onChange={(e) => setSearchVal(e.target.value)} />
                    </Box>
                </Box>
                <Box sx={{ flex: 2 }}></Box>
                {/* Sort By */}
                <Select value={sortby} sx={{ flex: 6, marginLeft: '30px', fontWeight: 'bold', fontFamily: 'Arial' }}
                    onChange={(e) => {
                        setSortBy(e.target.value)
                        setLoader(true)
                    }}
                    startAdornment={<InputAdornment position='start'>Sort by:</InputAdornment>}>
                    <MenuItem value='Recommended'>Recommended</MenuItem>
                    <MenuItem value='New'>What's New</MenuItem>
                    <MenuItem value='Better Discount'>Better Discount</MenuItem>
                    <MenuItem value='High To Low'>Price: High To Low</MenuItem>
                    <MenuItem value='Low To High'>Price : Low To High</MenuItem>
                    <MenuItem value='Customer Rating'>Customer Rating</MenuItem>
                </Select >
                <Box sx={{ flex: 2 }}></Box>
            </Box >
            {/* Displays list of filters */}
            <Box sx={{ marginLeft: '350px', marginTop: '5px', marginRight: '350px', paddingBottom: "10px", display: "flex", alignItems: 'center', flexWrap: 'wrap' }} id='display_filters'>
                {/* display category filter */}
                {
                    catfilter.length > 0 && catfilter.map((li) => {
                        if ((li != '') && (li != undefined)) {
                            return (<Box sx={{ marginTop: '10px', marginLeft: '15px', maxWidth: "200px", width: '80px', padding: '1px 10px', border: '1px solid grey', color: 'black', borderRadius: "20px", display: "flex", alignItems: 'center', cursor: "pointer" }}>
                                <Typography>{li}</Typography >
                            </Box>)
                        }
                    })
                }
                {/* display brand filter */}
                {
                    brandfilter.length > 0 && brandfilter.map((li, index) => {
                        return (<Box sx={{ marginTop: '10px', marginLeft: '15px', maxWidth: "200px", width: '80px', padding: '1px 10px', border: '1px solid grey', color: 'black', borderRadius: "20px", display: "flex", alignItems: 'center', cursor: "pointer" }}>
                            <Typography>{li}</Typography >
                            <span style={{ marginLeft: "10px", color: 'darkgrey', fontSize: '25px', fontFamily: 'TimesNewRoman', fontWeight: 'bold' }}
                                onClick={() => {
                                    document.getElementById(`brand_${li}`).checked = false;
                                    setBrandFilter(brandfilter.filter((data) => data != li))
                                    setBrand(brand.filter((data) => data != li))
                                    setClearFlag(false);
                                    setLoader(true);
                                }}>&times;</span>
                        </Box>)
                    })
                }
                {/* display price filter */}
                {
                    pricefilter.length > 0 && pricefilter.map((li, index) => {
                        return (<Box sx={{ marginTop: '10px', marginLeft: '15px', maxWidth: "200px", width: '80px', padding: '1px 10px', border: '1px solid grey', color: 'black', borderRadius: "20px", display: "flex", alignItems: 'center', cursor: "pointer" }}>
                            <Typography>Rs.{li}</Typography >
                            <span style={{ marginLeft: "10px", color: 'darkgrey', fontSize: '25px', fontFamily: 'TimesNewRoman', fontWeight: 'bold' }}
                                onClick={() => {
                                    document.getElementById(`price_${li}`).checked = false;
                                    setPriceFilter(pricefilter.filter((data) => data != li))
                                    setPrice(price.filter((data) => data != li))
                                    setClearFlag(false);
                                    setLoader(true);
                                }}>&times;</span>
                        </Box>)
                    })
                }
                {/* display color filter */}
                {
                    colorfilter.length > 0 && colorfilter.map((li) => {
                        if ((li != '') && (li != undefined)) {
                            return (<Box sx={{ marginTop: '10px', marginLeft: '15px', maxWidth: "200px", width: '80px', padding: '1px 10px', border: '1px solid grey', color: 'black', borderRadius: "20px", display: "flex", alignItems: 'center', cursor: "pointer" }}>
                                <Typography>{li}</Typography >
                                <span style={{ marginLeft: "10px", color: 'darkgrey', fontSize: '25px', fontFamily: 'TimesNewRoman', fontWeight: 'bold' }}
                                    onClick={() => {
                                        document.getElementById(`color_${li}`).checked = false;
                                        setColorFilter(colorfilter.filter((data) => data != li))
                                        setColor(color.filter((data) => data != li))
                                        setClearFlag(false);
                                        setLoader(true);
                                    }}>&times;</span>
                            </Box>)
                        }
                    })
                }
                {/* display discount filter */}
                {
                    discountfilter.length > 0 && discountfilter.map((li) => {
                        if ((li != '') && (li != undefined)) {
                            return (<Box sx={{ marginTop: '10px', marginLeft: '15px', maxWidth: "300px", width: '150px', padding: '1px 10px', border: '1px solid grey', color: 'black', borderRadius: "20px", display: "flex", alignItems: 'center', cursor: "pointer" }}>
                                <Typography>{li}% and above</Typography >
                                <span style={{ marginLeft: "10px", color: 'darkgrey', fontSize: '25px', fontFamily: 'TimesNewRoman', fontWeight: 'bold' }}
                                    onClick={() => {
                                        setDiscountFilter('')
                                        setClearFlag(false);
                                        setDisc('');
                                        setLoader(true);
                                    }}>&times;</span>
                            </Box>)
                        }
                    })
                }
                {/* display size filter */}
                {
                    sizefilter.length > 0 && sizefilter.map((li) => {
                        if ((li != '') && (li != undefined)) {
                            return (<Box sx={{ marginTop: '10px', marginLeft: '15px', maxWidth: "200px", width: '80px', padding: '1px 10px', border: '1px solid grey', color: 'black', borderRadius: "20px", display: "flex", alignItems: 'center', cursor: "pointer" }}>
                                <Typography>{li}</Typography >
                                <span style={{ marginLeft: "10px", color: 'darkgrey', fontSize: '25px', fontFamily: 'TimesNewRoman', fontWeight: 'bold' }}
                                    onClick={() => {
                                        const uncheck = sizefilter;
                                        const index = uncheck.indexOf(li);
                                        uncheck.splice(index, 1)
                                        setSizeFilter([uncheck])
                                        setSize('')
                                        setClearFlag(false);
                                        setLoader(true);
                                    }}>&times;</span>
                            </Box>)
                        }
                    })
                }
            </Box >
            {/*  pane options */}
            < Box sx={{ display: 'flex', marginTop: '5px' }
            }>
                {/* Left pane */}
                < Box sx={{ flex: 2, borderTop: '1px solid rgb(210,210,210)', borderRight: '1px solid rgb(210,210,210)', paddingLeft: '30px', paddingTop: '10px', marginLeft: '-10px' }}>
                    {/* Categories */}
                    < Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant='body1' sx={{ flex: 5, fontFamily: 'monospace', fontWeight: 'bolder', fontSize: '18px' }}>CATEGORIES</Typography>
                    </Box >
                    <FormControl>
                        <FormLabel id="demo-controlled-radio-buttons-group" ></FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={cat}
                            onChange={async (e) => {
                                setCat(e.target.value);
                                props.setUserPageCat(e.target.value)
                                props.setUserPageSubCat('')
                                props.setUserPageProdCat('');
                                setCatFilter([e.target.value])
                                setClearFlag(false)
                            }}  >
                            {catgroup.map((li, index) => {
                                return (
                                    <>
                                        <FormControlLabel key={index} label={li.category} value={li.category} control={<Radio />} ></FormControlLabel >
                                    </>
                                )
                            })}
                        </RadioGroup>
                    </FormControl>
                    {/* Brand */}
                    <Box sx={{ display: 'flex', alignItems: 'center', borderTop: '1px solid rgb(210,210,210)', marginLeft: '-27px', paddingLeft: '30px', marginTop: '20px' }}>
                        <Typography variant='body1' sx={{ flex: 5, fontFamily: 'monospace', fontWeight: 'bolder', fontSize: '18px', marginTop: '20px' }}>BRAND</Typography>

                    </Box>
                    {
                        brandgroup.map((li, index) => {
                            return (
                                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
                                    < input type='checkbox' value={li._id} style={{ width: '20px', height: '20px', boxShadow: '2px 2px 2px gray,-2px -2px 2px gray' }}
                                        id={`brand_${li._id}`}
                                        onChange={(e) => {
                                            setLoader(true);
                                            if (e.target.checked == true) {
                                                if ((brand.length == 1 && brand[0] != '')) {
                                                    setBrand([...brand, e.target.value])
                                                    setBrandFilter([...brandfilter, e.target.value])
                                                }
                                                else if ((brand.length == 1 && brand[0] == '') || (brand.length == 0)) {
                                                    setBrand([e.target.value])
                                                    setBrandFilter([e.target.value])
                                                }
                                                setClearFlag(false);

                                            }
                                            else if (e.target.checked == false) {
                                                setBrandFilter(brandfilter.filter((li) => li != e.target.value))
                                                setBrand(brand.filter((li) => li != e.target.value))
                                                setClearFlag(false);
                                            }
                                        }}
                                    /><label style={{ fontWeight: 'normal', marginLeft: '10px', fontFamily: 'TimesNewRoman', fontSize: '20px' }} htmlFor={`brand${index}`}>{li._id}</label>
                                    < span style={{ color: 'grey', fontSize: '14px', fontWeight: 'normal', fontFamily: 'TimesNewRoman', marginLeft: '10px' }}>({li.count})</span>
                                </Box>
                            )
                        })
                    }
                    {/* Price */}
                    <Box sx={{ display: 'flex', alignItems: 'center', borderTop: '1px solid rgb(210,210,210)', marginLeft: '-27px', paddingLeft: '30px', marginTop: '20px' }}>
                        <Typography variant='body1' sx={{ flex: 5, fontFamily: 'monospace', fontWeight: 'bolder', fontSize: '18px', marginTop: '20px' }}>PRICE</Typography>

                    </Box>
                    {
                        pricegroup.map((li, index) => {
                            return (
                                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
                                    < input type='checkbox' value={li._id} style={{ width: '20px', height: '20px', boxShadow: '2px 2px 2px gray,-2px -2px 2px gray' }}
                                        id={`price_${li._id}`}
                                        onChange={(e) => {
                                            setLoader(true)
                                            if (e.target.checked == true) {
                                                if ((price.length == 1 && price[0] != '')) {
                                                    setPrice([...price, e.target.value])
                                                    setPriceFilter([...pricefilter, e.target.value])
                                                }
                                                else if ((price.length == 1 && price[0] == '') || (price.length == 0)) {
                                                    setPrice([e.target.value])
                                                    setPriceFilter([e.target.value])
                                                }
                                                setClearFlag(false);

                                            }
                                            else if (e.target.checked == false) {
                                                setPriceFilter(pricefilter.filter((li) => li != e.target.value))
                                                setPrice(price.filter((li) => li != e.target.value))
                                                setClearFlag(false);
                                            }
                                        }}
                                    /><label style={{ fontWeight: 'normal', marginLeft: '10px', fontFamily: 'TimesNewRoman', fontSize: '20px' }} htmlFor={`price${index}`}>{li._id}</label>
                                    < span style={{ color: 'grey', fontSize: '14px', fontWeight: 'normal', fontFamily: 'TimesNewRoman', marginLeft: '10px' }}>({li.count})</span>
                                </Box>
                            )
                        })
                    }
                    {/* Color */}
                    <Box sx={{ display: 'flex', alignItems: 'center', borderTop: '1px solid rgb(210,210,210)', marginLeft: '-27px', paddingLeft: '30px', marginTop: '20px' }}>
                        <Typography variant='body1' sx={{ flex: 5, fontFamily: 'monospace', fontWeight: 'bolder', fontSize: '18px', marginTop: '20px' }}>COLOR</Typography>
                    </Box>
                    {
                        colorgroup.map((li, index) => {
                            return (
                                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
                                    < input type='checkbox' value={li._id} style={{ width: '20px', height: '20px', boxShadow: '2px 2px 2px gray,-2px -2px 2px gray' }}
                                        id={`color_${li._id}`}
                                        onChange={(e) => {
                                            setLoader(true)
                                            if (e.target.checked == true) {
                                                if ((color.length == 1 && color[0] != '')) {
                                                    setColor([...color, e.target.value])
                                                    setColorFilter([...colorfilter, e.target.value])
                                                }
                                                else if ((color.length == 1 && color[0] == '') || (color.length == 0)) {
                                                    setColor([e.target.value])
                                                    setColorFilter([e.target.value])
                                                }
                                                setClearFlag(false);

                                            }
                                            else if (e.target.checked == false) {
                                                setColorFilter(colorfilter.filter((li) => li != e.target.value))
                                                setColor(color.filter((li) => li != e.target.value))
                                                setClearFlag(false);
                                            }
                                        }}
                                    /><label style={{ fontWeight: 'normal', marginLeft: '10px', fontFamily: 'TimesNewRoman', fontSize: '20px' }} htmlFor={`price${index}`}>{li._id}</label>
                                    < span style={{ color: 'grey', fontSize: '14px', fontWeight: 'normal', fontFamily: 'TimesNewRoman', marginLeft: '10px' }}>({li.count})</span>
                                </Box>
                            )
                        })
                    }
                    {/* Discount */}
                    <Box sx={{ display: 'flex', alignItems: 'center', borderTop: '1px solid rgb(210,210,210)', marginLeft: '-27px', paddingLeft: '30px', marginTop: '20px' }}>
                        <Typography variant='body1' sx={{ flex: 5, fontFamily: 'monospace', fontWeight: 'bolder', fontSize: '18px', marginTop: '20px', marginBottom: '15px' }}>DISCOUNT RANGE</Typography>
                    </Box>
                    <FormControl>
                        <FormLabel id="demo-controlled-radio-buttons-group-discount" ></FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group-discount"
                            name="controlled-radio-buttons-group-discount"
                            value={dis}
                            onChange={async (e) => {
                                setDisc(e.target.value)
                                setDiscountFilter([e.target.value])
                                setClearFlag(false)
                            }}  >
                            {discountgroup.map((li, index) => {
                                return (
                                    <>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <FormControlLabel label={`${li._id} % and above`} value={li._id} control={<Radio />} sx={{ display: 'block', marginTop: '-10px' }}></FormControlLabel >
                                            <span style={{ color: 'grey', fontSize: '14px', fontWeight: 'normal', fontFamily: 'TimesNewRoman', marginTop: '-10px', marginLeft: '-10px' }}>({li.count})</span>
                                        </Box>
                                    </>
                                )
                            })}
                        </RadioGroup>
                    </FormControl>
                </Box >
                {/* main pane */}
                {loader == true ? <Loader /> : <>
                    < Box sx={{ flex: 10, borderTop: '1px solid rgb(210,210,210)', paddingTop: '10px', paddingLeft: '10px' }}>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            {
                                prod_data.length > 0 && prod_data.map((li, index) =>
                                    <ProductItems key={index} brand={li.brand_name} descr={li.description} price={li.price} strike_price={li.strike_price}
                                        discount={li.discount} size={li.size} image={li.image1[0]} product_id={li.product_id}
                                        comp_name={li.comp_name} qty={li.quantity} vendor_email={li.vendor_email}
                                        rating={li.rating} users_cnt={li.rating_count_user} count={li.count} />
                                )
                            }
                            {
                                prod_data.length == 0 &&
                                <Typography variant='h5' sx={{
                                    margin: 'auto', marginTop: '50px', color: 'purple',
                                    fontFamily: 'verdana'
                                }}>No Products found!!</Typography >
                            }
                        </Box>
                        {/* //Page button */}
                        {total_cnt > 0 && <PageBtn total={total_cnt} />}
                    </Box >
                </>}
            </Box >
        </>
    )
}
const mapStateToProps = (cstate) => {
    return {
        category: cstate.userpg_cat,
        subcategory: cstate.userpg_subcat,
        productcategory: cstate.userpg_prodcat,
        page_no: cstate.page_no
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setUserPageCat: (data) => dispatch(setUserPageCat(data)),
        setUserPageSubCat: (data) => dispatch(setUserPageSubCat(data)),
        setUserPageProdCat: (data) => dispatch(setUserPageProdCat(data)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Filter);