import { Box, Typography } from '@mui/material';

const Product_Header = () => {
    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', padding: '10px', marginTop: '120px', marginLeft: '20px', backgroundColor: 'purple', width: '96%' }} id='product_header'>
                <Typography sx={{ flex: 0.5, color: 'white' }}>P ID</Typography>
                <Typography sx={{ flex: 0.5, color: 'white', textAlign: 'center' }}>IMAGE</Typography>
                <Typography sx={{ flex: 2.5, color: 'white', textAlign: 'center' }}>TITLE</Typography>
                <Typography sx={{ flex: 2, color: 'white', textAlign: 'center' }}>BRAND</Typography>
                <Typography sx={{ flex: 1, color: 'white', textAlign: "center" }}>PRICE</Typography>
                <Typography sx={{ flex: 1, color: 'white', textAlign: "center" }}>STRIKE <br></br>PRICE</Typography>
                <Typography sx={{ flex: 0.5, color: 'white', textAlign: "center" }}>RATINGS</Typography>
                <Typography sx={{ flex: 1, color: 'white', textAlign: 'center' }}>SIZE <br></br>AVL.</Typography>
                <Typography sx={{ flex: 1, color: 'white', textAlign: 'center' }}>COLORS<br></br> AVL.</Typography>
                <Typography sx={{ flex: 1, color: 'white', textAlign: 'center' }}>BAL <br></br>COUNT</Typography>
                <Typography sx={{ flex: 0.5, color: 'white' }}>EDIT</Typography>
            </Box>
        </>
    )
}

export default Product_Header;