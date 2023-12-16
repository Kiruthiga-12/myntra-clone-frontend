import { Button } from "@mui/material";
const Warehouse_Button = (props) => {
    return (
        <>
            <Button id={`Warehouse Detail ${props.count}`} sx={{
                marginTop: '5px', color: 'blue', textTransform: 'none', border: '1px solid blue', fontSize: '14px',
                '&:focus': { backgroundColor: 'blue', color: 'white' }
            }} variant='outlined' >Warehouse  {props.count}</Button>
        </>
    )
}
export default Warehouse_Button;