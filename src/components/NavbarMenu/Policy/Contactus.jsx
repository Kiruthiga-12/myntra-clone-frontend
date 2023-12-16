import { Box } from '@mui/material';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { setNavBar, setFooter } from '../../Redux_Store/Action_Creators';
const Contactus = (props) => {
    useEffect(() => {
        document.title = 'Help Center';
        props.setNavBar('navbar');
        props.setFooter('footer');
    }, [])
    return (
        <>
            <Box style={{ margin: 'auto', marginTop: '120px' }}>Contact us</Box>
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        setNavBar: (data) => dispatch(setNavBar(data)),
        setFooter: (data) => dispatch(setFooter(data))
    }
}
export default connect(null, mapDispatchToProps)(Contactus);
