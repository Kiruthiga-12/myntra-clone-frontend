import { Dialog, DialogContent, DialogContentText, Box, Typography, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Subcategory_crud = (props) => {
    //status
    const [disab1, setDisable1] = useState(true);
    const [disab2, setDisable2] = useState(true);
    const [disab3, setDisable3] = useState(false);
    const [createflag, setCreateFlag] = useState(true);
    const [editflag, setEditFlag] = useState(true);
    const [deleteflag, setDeleteFlag] = useState(true);
    //storing value
    const [categ, setCatValue] = useState('');
    const [catval, setCatVal] = useState('');
    const [subeg, setSubValue] = useState('');
    const [subcat, setSubCatValue] = useState('');
    const [editeg, setEditValue] = useState('');
    const [deleteeg, setDeleteValue] = useState('');//subcat
    const [deletecat, setDeleteCat] = useState('');

    //storing values
    const [category, setCategory] = useState([]);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_category`)
            .then((data) => {
                (data.data.length > 0) ? setCategory(data.data) : setCategory([])
            })

    }, [])
    useEffect(() => {
        if (props.edit === true) {
            //cat
            setSubValue(props.cat);
            setCatVal(props.cat);
            //subcat
            setEditValue(props.categ);
            setSubCatValue(props.categ);

        }
        else if (props.delete === true) {
            //cat
            setDeleteCat(props.cat);
            //subcat
            setDeleteValue(props.categ)

        }
    }, [props])
    return (
        <>
            <ToastContainer />
            {/* Add New Sub Category */}
            {props.create === true && <>
                < Dialog open={createflag} hideBackdrop sx={{ margin: 'auto', width: '800px', height: '650px' }}>
                    <DialogContent>
                        <DialogContentText sx={{ width: '550px', height: "290px" }}>
                            <Box sx={{ display: 'flex', alignItems: "center", marginTop: '20px' }}>
                                <Typography sx={{ fontFamily: "verdana", fontWeight: "bold", marginTop: '30px', flex: 10 }}>Select Category</Typography>
                                <CloseIcon sx={{ marginLeft: '170px', flex: 2, cursor: 'pointer' }} onClick={() => setCreateFlag(false)} />
                            </Box>
                            <Select label='category' variant='outlined'
                                sx={{ marginTop: '20px', width: '50%' }} onChange={(e) => setCatValue(e.target.value)}
                                value={categ}>
                                {category.map((li, index) =>
                                    <MenuItem key={index} value={li.category}>{li.category}</MenuItem>
                                )}
                            </Select>
                            <br></br>
                            <br></br>
                            <Typography sx={{ fontFamily: "verdana", fontWeight: "bold" }}>Enter Sub Category Name</Typography>
                            <TextField color='secondary' sx={{ marginTop: '20px', width: '60%' }} variant='outlined' type='text'
                                onChange={(e) => setSubCatValue(e.target.value)}
                                onBlur={() => {
                                    if (subcat.length > 2 && categ.length > 2)
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
                                    axios.post(`${process.env.REACT_APP_BACKEND_URL}/add_subcategory`, { catvalue: categ, subcatvalue: subcat })
                                        .then((data) => {
                                            if (data.data.subcategory != undefined) {
                                                setCreateFlag(false);
                                                toast.success('New Subcategory added successfully!', { autoClose: 3000 })
                                            }
                                            else {
                                                setCreateFlag(true);
                                                toast.error('Error! Please retry', { autoClose: 3000 })
                                            }
                                        })

                                }}>SAVE</Button>
                        </DialogContentText>
                    </DialogContent >
                </Dialog >
            </>}
            {/* Edit Sub  Category */}
            {
                props.edit === true && <>
                    < Dialog open={editflag} hideBackdrop sx={{ margin: 'auto', width: '800px', height: '450px' }}>
                        <DialogContent>
                            <DialogContentText sx={{ width: '550px', height: "300px" }}>
                                <Box sx={{ display: 'flex', alignItems: "center" }}>
                                    <Typography sx={{ fontFamily: "verdana", fontWeight: "bold", flex: 10 }}>Enter Category Name</Typography>
                                    <CloseIcon sx={{ flex: 2, cursor: 'pointer' }} onClick={() => setEditFlag(false)} />
                                </Box>
                                <Select label='category' variant='outlined'
                                    sx={{ marginTop: '20px', width: '50%' }} onChange={(e) => setCatVal(e.target.value)}
                                    value={catval}>
                                    {category.map((li, index) =>
                                        <MenuItem key={index} value={li.category}>{li.category}</MenuItem>
                                    )}
                                </Select>
                                <br></br>
                                <br></br>
                                <Typography sx={{ fontFamily: "verdana", fontWeight: "bold" }}>Enter Sub Category Name</Typography>
                                <TextField color='secondary' sx={{ marginTop: '20px', width: '60%' }} variant='filled' type='text'
                                    value={editeg}
                                    onChange={(e) => setEditValue(e.target.value)}
                                    onBlur={() => {
                                        if (editeg.length > 2)
                                            setDisable2(false)
                                        else {
                                            setDisable2(true)
                                        }
                                    }} />
                                <br></br>
                                <Button sx={{
                                    marginTop: '10px', marginLeft: '470px', padding: '5px 20px',
                                    color: 'white', backgroundColor: 'rgb(243, 66, 140)',
                                    '&:hover': { backgroundColor: 'rgb(243, 66, 140)' }
                                }}
                                    disabled={disab2}
                                    onClick={async () => {
                                        const val1 = (subeg != '' || subeg != undefined) ? subeg.replace('&', '%26').replace(',', '%2C').replace('-', '%2D') : '';
                                        const val2 = (subcat != '' || subcat != undefined) ? subcat.replace('&', '%26').replace(',', '%2C').replace('-', '%2D') : '';
                                        const subamp = axios.patch(`${process.env.REACT_APP_BACKEND_URL}/edit_subcategory_subcat?category=${val1}&subcategory=${val2}`, {
                                            catvalue: catval,
                                            subcatvalue: editeg
                                        })
                                        const prodamp = axios.patch(`${process.env.REACT_APP_BACKEND_URL}/edit_productcategory_subcat?category=${val1}&subcategory=${val2}`, {
                                            catvalue: catval,
                                            subcatvalue: editeg
                                        })
                                        await axios.all([subamp, prodamp])
                                            .then(axios.spread(function (subcatdet, prodcatdet) {
                                                if (subcatdet.data.modifiedCount == 1) {
                                                    setEditFlag(false);
                                                    toast.success('Subcategory edited successfully', { autoClose: 3000 })
                                                }
                                                else {
                                                    setEditFlag(true);
                                                    toast.error('Error! Please retry', { autoClose: 3000 })
                                                }
                                            }))
                                    }}>EDIT</Button>
                            </DialogContentText>
                        </DialogContent >
                    </Dialog >
                </>
            }
            {/* Delete Subcategory */}
            {props.delete === true && <>
                < Dialog open={deleteflag} hideBackdrop sx={{ margin: 'auto', width: '800px', height: '450px' }}>
                    <DialogContent>
                        <DialogContentText sx={{ width: '550px', height: "300px" }}>
                            <Box sx={{ display: 'flex', alignItems: "center" }}>
                                <Typography sx={{ fontFamily: "verdana", fontWeight: "bold", flex: 10 }}>Enter Category Name</Typography>
                                <CloseIcon sx={{ flex: 2, cursor: 'pointer' }} onClick={() => setDeleteFlag(false)} />
                            </Box>
                            <Select label='category' variant='outlined'
                                sx={{ marginTop: '20px', width: '50%' }}
                                value={deletecat}>
                                {category.map((li, index) =>
                                    <MenuItem key={index} value={li.category}>{li.category}</MenuItem>
                                )}
                            </Select>
                            <br></br>
                            <br></br>
                            <Typography sx={{ fontFamily: "verdana", fontWeight: "bold" }}>Enter Sub Category Name</Typography>
                            <TextField color='secondary' sx={{ marginTop: '20px', width: '60%' }} variant='filled' type='text'
                                value={deleteeg} />
                            <br></br>
                            <Button sx={{
                                marginTop: '10px', marginLeft: '400px', padding: '5px 20px',
                                color: 'white', backgroundColor: 'rgb(243, 66, 140)',
                                '&:hover': { backgroundColor: 'rgb(243, 66, 140)' }
                            }}
                                disabled={disab3}
                                onClick={async () => {
                                    const val2 = props.categ;
                                    const val1 = (val2 != '' || val2 != undefined) ? val2.replace('&', '%26').replace(',', '%2C').replace('-', '%2D') : '';
                                    const subcat = axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete_subcategory_subcat?subcategory=${val1}`)
                                    const prodcat = axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete_productcategory_subcat?subcategory=${val1}`)
                                    await axios.all([subcat, prodcat])
                                        .then(axios.spread(function (subcatdet, prodcatdet) {
                                            if (subcatdet.data.deletedCount == 1) {
                                                setDeleteFlag(false);
                                                toast.success('Subcategory deleted successfully', { autoClose: 3000 })
                                            }
                                            else {
                                                setDeleteFlag(true);
                                                toast.error('Error! Please retry', { autoClose: 3000 })
                                            }
                                        }))

                                }}>DELETE</Button>
                        </DialogContentText>
                    </DialogContent >
                </Dialog >
            </>}
        </>)
}

export default Subcategory_crud;