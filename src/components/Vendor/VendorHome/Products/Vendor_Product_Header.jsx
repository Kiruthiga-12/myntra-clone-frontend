import { Box, Typography } from '@mui/material';

const Vendor_Product_Header = () => {
    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', padding: '10px', marginTop: '120px', marginLeft: '20px', backgroundColor: 'rgb(245, 63, 108)', width: '96%' }}
                id='vendor_product_header'>
                <Typography sx={{ flex: 0.5, color: 'black', fontWeight: 'bolder' }}>Product Id.</Typography>
                <Typography sx={{ flex: 1, color: 'black', textAlign: 'center', fontWeight: 'bolder' }}>Image</Typography>
                <Typography sx={{ flex: 2.5, color: 'black', textAlign: 'center', fontWeight: 'bolder' }}>Title</Typography>
                <Typography sx={{ flex: 1, color: 'black', textAlign: "center", fontWeight: 'bolder' }}>Product <br></br> Status</Typography>
                <Typography sx={{ flex: 1, color: 'black', textAlign: "center", fontWeight: 'bolder' }}>Price</Typography>
                <Typography sx={{ flex: 1, color: 'black', textAlign: "center", fontWeight: 'bolder' }}>Strike<br></br> Price</Typography>
                <Typography sx={{ flex: 1, color: 'black', textAlign: "center", fontWeight: 'bolder' }}>Sold<br></br> Products</Typography>
                <Typography sx={{ flex: 1, color: 'black', textAlign: 'center', fontWeight: 'bolder' }}>Product<br></br> Keyword</Typography>
                <Typography sx={{ flex: 1, color: 'black', textAlign: 'center', fontWeight: 'bolder' }}>Product <br></br>Date</Typography>
                <Typography sx={{ flex: 1.5, color: 'black', textAlign: 'center', fontWeight: 'bolder' }}>Product <br></br>Stock</Typography>
                <Typography sx={{ flex: 0.5, color: 'black', textAlign: 'center', fontWeight: 'bolder' }}>Edit /<br></br>Delete</Typography>
            </Box>
        </>
    )
}

export default Vendor_Product_Header;