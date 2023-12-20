import { Button, Box } from "@mui/material";
import { useEffect, useState } from 'react';
import { ReactReduxContext, connect } from 'react-redux';
import { getPageNo } from "../../Redux_Store/Action_Creators";
const PageBtn = (props) => {
    const [cnt, setCnt] = useState(0);
    const [arr, setArr] = useState([]);
    let emp = []
    useEffect(() => {
        function f0() {
            for (let i = 0; i < cnt; i++)
                emp.push(i + 1);
        }
        function f1() {
            if (emp.length > 0)
                setArr(emp.slice());
            else
                setArr([])
        }
        if (cnt > 0) {
            f0();
            f1();
        }
    }, [cnt])
    useEffect(() => {
        setCnt(Math.ceil(props.total / 2));
    }, [])
    useEffect(() => {
        if (arr.length > 0 && props.page_no != 0) {
            for (let val = 1; val <= arr.length; val++) {
                if (val == props.page_no) {
                    document.getElementById(`page_${props.page_no}`).style.color = 'black';
                    document.getElementById(`page_${props.page_no}`).style.backgroundColor = 'rgb(250, 50, 84)';
                }
                else if (val != props.page_no) {
                    document.getElementById(`page_${val}`).style.color = 'black';
                    document.getElementById(`page_${val}`).style.backgroundColor = 'white';
                }
            }
        }
    }, [props])
    return (<>
        <Box sx={{ marginTop: "450px", textAlign: "center" }}>
            {
                (arr.length > 0) && arr.map((val, index) => {
                    return (<Button key={index} id={`page_${val}`} sx={{
                        cursor: "pointer", marginLeft: '20px',
                        color: "black", border: '1px solid rgb(250, 50, 84)', fontFamily: "cursive", fontSize: "20px",
                        '&:hover': { color: "white", backgroundColor: "rgb(250, 50, 84)" }
                    }} onClick={(e) => {
                        props.getPageNo(val)
                    }}>{val}</Button>)
                })}
        </Box>
    </>)
}
const mapStateToProps = (cstate) => {
    return {
        page_no: cstate.page_no
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getPageNo: (data) => dispatch(getPageNo(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PageBtn);