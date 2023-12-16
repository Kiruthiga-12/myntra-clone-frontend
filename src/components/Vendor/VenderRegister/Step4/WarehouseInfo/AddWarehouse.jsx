import { Button, Tab, Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { TabContext, TabList, TabPanel } from '@mui/lab';
import Warehouse_Button from "./Warehouse_Button";
import Warehouse_Info from "./Warehouse_Info";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AddWarehouse = (props) => {

    //state
    const [disab, setDisable] = useState(false);
    const [counter, setCounter] = useState(0);
    const [arr, setArr] = useState([]); //for button
    const [arr1, setArr1] = useState([]); 
    //array
    let emp = [];
    const [count, setCount] = useState();
    //flags
    //storing tab value.
    const [tab, setTab] = useState(1);
    //flag to reload axiosreq.
    useEffect(() => {
        if (counter == 6 || arr1.length >= 5)
            setDisable(true);

    }, [counter])
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/warehouse_email?email=${props.email}`)
            .then(async (data) => {
                if (data.data.length > 0) {
                    if (data.data[0].email != undefined) {
                        setArr1(data.data.slice());
                        setCounter(0);
                        let i = data.data.length + 1;
                        setCounter(i);
                        setCount(data.data.length);
                    }
                }
                else {
                    setCounter(1);
                    setArr([1])
                    setCount(0)
                }
            })
    }, [])
    useEffect(() => {
        function f0() {
            setArr([])
            for (let i = 0; i < count; i++)
                emp.push(i + 1);
        }
        function f1() {
            if (emp.length > 0)
                setArr(emp.slice());
            else
                setArr([1])
        }
        if (count > 0) {
            f0();
            f1();
        }
        else if (count == 0) {
            setDisable(true);
        }
    }, [count])
    return (
        <>
            <ToastContainer className='toastcontainer' />
            <Box sx={{ display: 'flex', alignItems: 'flex-start', marginTop: '20px', marginLeft: '20px' }}>
                <Box sx={{ flex: 5 }}>
                    <TabContext value={tab}>
                        <TabList >
                            <Box sx={{ display: 'flex', width: '1000px', flexWrap: 'wrap' }}>
                                {(arr.length > 0) &&
                                    arr.map((li, index) => {
                                        return <Tab key={index} disableTouchRipple label={<Warehouse_Button count={li} />}
                                            onClick={(e) => {
                                                setTab(li);
                                            }}></Tab>
                                    }
                                    )
                                }
                            </Box>
                        </TabList>
                        <Box sx={{ display: 'flex', width: '1000px', flexWrap: 'wrap' }}>
                            <TabPanel value={tab} ><Warehouse_Info count={tab} email={props.email} vendorid={props.vendorid} /></TabPanel>
                        </Box>
                    </TabContext>
                </Box>
                <Button sx={{
                    flex: 1,
                    display: 'inline-block', marginRight: '20px',
                    marginTop: '20px', color: 'blue', textTransform: 'none', border: '1px solid blue', fontSize: '14px'
                }} variant='outlined' disabled={disab}
                    onClick={() => {
                        let i = counter + 1;
                        setCounter(i);
                        setArr([...arr, counter]);
                    }}>+Add Warehouse Details</Button>
            </Box>
        </>
    )
}

export default AddWarehouse;