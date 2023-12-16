import { Box, Typography, Button } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LiveTvIcon from '@mui/icons-material/LiveTv';
const StudioPopup = (props) => {
    return (
        <>
            {props.status === true &&
                <Box sx={{
                    marginLeft: '-120px', marginTop: '490px',
                    width: '30vw', height: '50vh',
                    boxShadow: '10px 10px 10px grey,-10px -10px 10px grey', position: 'fixed',
                    backgroundColor: 'white',
                    textAlign: 'center'
                }}>
                    <Typography variant='h4' sx={{ marginTop: '30px' }}>Studio</Typography>
                    <Typography variant='subtitle1' sx={{ color: 'grey', marginTop: '10px', fontSize: '18px' }}>Your daily inspiration for everything fashion</Typography>
                    < LiveTvIcon sx={{ fontSize: '100px', marginLeft: '28px', color: 'rgb(243, 66, 140)' }} />
                    <br></br>
                    <Button variant='outlined' sx={{
                        color: 'black', backgroundColor: 'transparent',
                        '&:hover': { backgroundColor: 'transparent' }, fontSize: '16px',
                        marginTop: '30px', padding: '10px', fontFamily: 'Arial', fontWeight: 'bold'
                    }}>Explore Studio <ArrowForwardIosIcon sx={{ fontSize: '20px', paddingLeft: '20px' }} /></Button>

                </Box >
            }
        </>
    )
}

export default StudioPopup;