import { Button } from "@mui/material";
const Brand_Button = (props) => {

    return (
        <>
            <Button id={`Brand Detail ${props.count}`} sx={{
                marginTop: '5px', color: 'blue', textTransform: 'none', border: '1px solid blue', fontSize: '14px',
                '&:focus': { backgroundColor: 'blue', color: 'white' }
            }} variant='outlined' >Brand Detail {props.count}</Button>
        </>
    )
}
export default Brand_Button;