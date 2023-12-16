import { Typography } from "@mui/material";
const WishlistToast = (props) => {
    return (
        <>
            {props.image != undefined && <>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={`data:image/png;base64,${props.image}`} style={{ width: '60px', height: '60px' }} alt='loading' />
                    <Typography style={{ marginLeft: '20px', flex: '2px', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '16px' }}>{props.text}</Typography>
                </div>
            </>}
            {props.image == undefined && <>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Typography style={{ marginLeft: '20px', flex: '2px', fontWeight: 'bold', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '16px' }}>{props.text}</Typography>
                </div>
            </>}
        </>
    )
}

export default WishlistToast;