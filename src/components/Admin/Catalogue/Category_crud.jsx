import { Dialog, DialogContent, DialogContentText, Box, Typography, Button, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Category_crud = (props) => {
    //status
    const [disab1, setDisable1] = useState(true);
    const [disab2, setDisable2] = useState(true);
    const [disab3, setDisable3] = useState(false);
    const [createflag, setCreateFlag] = useState(true);
    const [editflag, setEditFlag] = useState(true);
    const [deleteflag, setDeleteFlag] = useState(true);
    //storing value
    const [categ, setCatValue] = useState('');
    const [editeg, setEditValue] = useState('');
    const [deleteeg, setDeleteValue] = useState('');

    useEffect(() => {
        if (props.edit === true)
            setEditValue(props.categ);
        else if (props.delete === true)
            setDeleteValue(props.categ);
    }, [props.categ])
    return (
        <>
            <ToastContainer  />
            {/* Add New Category */}
            {
                props.create === true && <>
                    < Dialog open={createflag} hideBackdrop sx={{ margin: 'auto', width: '800px', height: '250px' }}>
                        <DialogContent>
                            <DialogContentText sx={{ width: '550px', height: "140px" }}>
                                <Box sx={{ display: 'flex', alignItems: "center" }}>
                                    <Typography sx={{ fontFamily: "verdana", fontWeight: "bold", flex: 10 }}>Enter Category Name</Typography>
                                    <CloseIcon sx={{ flex: 2, cursor: 'pointer' }} onClick={() => setCreateFlag(false)} />
                                </Box>
                                <TextField color='secondary' sx={{ marginTop: '20px', width: '60%' }} variant='outlined' type='text'
                                    onChange={(e) => setCatValue(e.target.value)}
                                    onBlur={() => {
                                        if (categ.length > 2)
                                            setDisable1(false)
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
                                        axios.post(`${process.env.REACT_APP_BACKEND_URL}/add_category`, { catvalue: categ })
                                            .then((data) => {
                                                if (data.data.category != undefined) {
                                                    toast.success('New Category is added!!', { autoClose: 3000 })
                                                    setCreateFlag(false)
                                                }
                                                else {
                                                    setCreateFlag(true)
                                                    toast.error('Error Please retry!!', { autoClose: 3000 })
                                                }
                                            })
                                            .catch((error) => toast.error('Error Please retry!!', { autoClose: 3000 }))

                                    }}>SAVE</Button>
                            </DialogContentText>
                        </DialogContent >
                    </Dialog >
                </>
            }

            {/* Edit  Category */}
            {
                props.edit === true && <>
                    < Dialog open={editflag} hideBackdrop sx={{ margin: 'auto', width: '800px', height: '250px' }}>
                        <DialogContent>
                            <DialogContentText sx={{ width: '550px', height: "140px" }}>
                                <Box sx={{ display: 'flex', alignItems: "center" }}>
                                    <Typography sx={{ fontFamily: "verdana", fontWeight: "bold", flex: 10 }}>Enter Category Name</Typography>
                                    <CloseIcon sx={{ flex: 2, cursor: 'pointer' }} onClick={() => setEditFlag(false)} />
                                </Box>
                                <TextField color='secondary' sx={{ marginTop: '20px', width: '60%' }} variant='filled' type='text'
                                    value={editeg}
                                    onChange={(e) => setEditValue(e.target.value)}
                                    onBlur={() => {
                                        if (editeg.length > 2)
                                            setDisable2(false)
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
                                        const cat = axios.patch(`${process.env.REACT_APP_BACKEND_URL}/edit_category?category=${props.categ}`, {
                                            catvalue: editeg
                                        })
                                        const subcat = axios.patch(`${process.env.REACT_APP_BACKEND_URL}/edit_subcategory?category=${props.categ}`, {
                                            catvalue: editeg
                                        })
                                        const prodcat = axios.patch(`${process.env.REACT_APP_BACKEND_URL}/edit_productcategory?category=${props.categ}`, {
                                            catvalue: editeg
                                        })
                                        await axios.all([cat, subcat, prodcat])
                                            .then(axios.spread(function (catdet, subcatdet, prodcatdet) {
                                                if (catdet.data.modifiedCount == 1 && subcatdet.data.modifiedCount == 1 && prodcatdet.data.modifiedCount == 1) {
                                                    toast.success('Category edited successfully!!', { autoClose: 3000 })
                                                    setEditFlag(false);
                                                }
                                                else {
                                                    setEditFlag(true)
                                                    toast.error("Error Please retry!", { autClose: 3000 })
                                                }
                                            }))
                                    }}>EDIT</Button>
                            </DialogContentText>
                        </DialogContent >
                    </Dialog >
                </>
            }
            {/* Delete Category */}
            {
                props.delete === true && <>
                    < Dialog open={deleteflag} hideBackdrop sx={{ margin: 'auto', width: '800px', height: '250px' }}>
                        <DialogContent>
                            <DialogContentText sx={{ width: '550px', height: "140px" }}>
                                <Box sx={{ display: 'flex', alignItems: "center" }}>
                                    <Typography sx={{ fontFamily: "verdana", fontWeight: "bold", flex: 10 }}>Enter Category Name</Typography>
                                    <CloseIcon sx={{ flex: 2, cursor: 'pointer' }} onClick={() => setDeleteFlag(false)} />
                                </Box>
                                <TextField color='secondary' sx={{ marginTop: '20px', width: '60%' }} variant='filled' type='text'
                                    value={deleteeg}
                                />
                                <br></br>
                                <Button sx={{
                                    marginTop: '10px', marginLeft: '470px', padding: '5px 20px',
                                    color: 'white', backgroundColor: 'rgb(243, 66, 140)',
                                    '&:hover': { backgroundColor: 'rgb(243, 66, 140)' }
                                }}
                                    disabled={disab3}
                                    onClick={async () => {
                                        const cat = axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete_category?category=${props.categ}`)
                                        const subcat = axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete_subcategory?category=${props.categ}`)
                                        const prodcat = axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete_productcategory?category=${props.categ}`)
                                        await axios.all([cat, subcat, prodcat])
                                            .then(axios.spread(function (catdet, subcatdet, prodcatdet) {
                                                if (catdet.data.deletedCount == 1 && subcatdet.data.deletedCount == 1 && prodcatdet.data.deletedCount == 1) {
                                                    setDeleteFlag(false);
                                                    toast.success('Category deleted successfully', { autoClose: 3000 })
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
                </>
            }
        </>)
}

export default Category_crud;