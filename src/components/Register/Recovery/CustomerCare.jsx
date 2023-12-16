import { Box, Typography } from '@mui/material';
import { NavLink, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { setNavBar, setFooter } from '../../Redux_Store/Action_Creators'
const Customercare = (props) => {
    useEffect(() => {
        document.title = 'Myntra';
        props.setNavBar('navbar')
        props.setFooter('')
    }, [])
    return (
        <>
            <Box sx={{ backgroundColor: 'rgb(250, 223, 239)', width: '100vw', marginLeft: '-12px', height: '87vh', overflow: 'hidden', marginTop: '94px' }}>
                <Box sx={{ backgroundColor: 'white', width: '500px', height: '600px', margin: 'auto', marginTop: '50px' }}>
                    <Typography variant='h6' sx={{ paddingLeft: '40px', paddingTop: '100px', fontWeight: 'bold' }}>I don't remeber my email or mobile. </Typography>
                    <Typography variant='body1' sx={{ paddingLeft: '40px', marginTop: '20px', color: 'grey', paddingRight: '50px', fontSize: '14px' }}>If you no longer use the email or mobile associated with your Myntra account,you may contact us for help restoring access to your account.</Typography>
                    <div style={{ border: '2px dashed red', marginLeft: '40px', width: '80%', height: '18%', margin: 'auto', marginTop: '40px', backgroundColor: 'rgb(250, 223, 239)', borderRadius: '5px' }}>
                        <Typography sx={{ textAlign: 'center', marginTop: '20px' }}>Customer care number</Typography>
                        <Typography sx={{ textAlign: 'center', marginTop: '5px', fontSize: '30px' }}>080-6156-1999</Typography>
                    </div>
                    <Typography variant='body2' sx={{ marginLeft: '40px', marginTop: '30px' }}>Want to know more? <NavLink style={{ color: 'rgb(243, 66, 140)', textDecoration: 'none' }}
                        component={Link} to='/faqs'>Search FAQs</NavLink></Typography>
                </Box >
            </Box >
        </>
    )
}
const mapDispatchToProps = (dispatch) => {
    return {
        setNavBar: (data) => dispatch(setNavBar(data)),
        setFooter: (data) => dispatch(setFooter(data))
    }
}
export default connect(null, mapDispatchToProps)(Customercare);