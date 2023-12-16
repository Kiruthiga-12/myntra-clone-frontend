import { Typography, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel } from "@mui/material";
const EMI = () => {
    return (<>
        <Typography sx={{ fontSize: "20px", marginLeft: "30px", marginTop: "20px", fontWeight: "bold" }}>Select EMI Option</Typography>
        <FormControl sx={{ marginTop: "20px", marginLeft: "30px" }}>
            <FormLabel id="emi-controlled-radio-buttons-group"></FormLabel>
            <RadioGroup
                aria-labelledby="emi-controlled-radio-buttons-group"
                name="emi-controlled-radio-buttons-group" >
                <FormControlLabel value="HDFC Credit card EMI" control={<Radio disabled={true} />} label="HDFC Credit card EMI" />
                <Typography sx={{ color: "red", fontSize: "15px", marginTop: "10px" }}>Available on min.order of &#8377;3000</Typography>
                <div style={{ borderBottom: "1px dashed lightgrey", marginTop: "10px", width: "300px" }}></div>
                <FormControlLabel value="HDFC Debit card EMI" control={<Radio disabled={true} />} label="HDFC Debit card EMI" />
                <Typography sx={{ color: "red", fontSize: "15px", marginTop: "10px" }}>Available on min.order of &#8377;5000</Typography>
                <div style={{ borderBottom: "1px dashed lightgrey", marginTop: "10px", width: "300px" }}></div>
                <FormControlLabel value="ICICI Credit card EMI" control={<Radio disabled={true} />} label='ICICI Credit card EMI' />
                <Typography sx={{ color: "red", fontSize: "15px", marginTop: "10px" }}>Available on min.order of &#8377;2500</Typography>
                <div style={{ borderBottom: "1px dashed lightgrey", marginTop: "10px", width: "300px" }}></div>
                <FormControlLabel value="ZestMoney" control={<Radio disabled={true} />} label='ZestMoney' />
                <Typography sx={{ color: "red", fontSize: "15px", marginTop: "10px" }}>Available on min.order of &#8377;8000</Typography>
                <div style={{ borderBottom: "1px dashed lightgrey", marginTop: "10px", width: "300px" }}></div>
            </RadioGroup>
        </FormControl>
    </>)
}

export default EMI;