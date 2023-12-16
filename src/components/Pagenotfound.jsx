import { useEffect } from 'react';
import { connect } from 'react-redux';
import { setNavBar, setFooter } from './Redux_Store/Action_Creators';
const Pagenotfound = (props) => {
    useEffect(() => {
        props.setNavBar('')
        props.setFooter('')
    }, [])
    return (
        <>
            <div style={{ marginTop: '120px', fontSize: '30px', textAlign: 'center' }}>404! Page Not Found</div>
        </>
    )
}
const mapDispatchToProps = (dispatch) => {
    return {
        setNavBar: (data) => dispatch(setNavBar(data)),
        setFooter: (data) => dispatch(setFooter(data))
    }
}
export default connect(null, mapDispatchToProps)(Pagenotfound);