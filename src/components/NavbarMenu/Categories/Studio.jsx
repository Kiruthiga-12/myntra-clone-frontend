import { useEffect } from "react";
import SubscriptionNews from "../SubscriptionNews";
import { connect } from 'react-redux';
import { setNavBar, setFooter } from "../../Redux_Store/Action_Creators";
const Studio = (props) => {
    useEffect(() => {
        document.title = 'Fashion Trends form India\'s top fashion Influencers';
        props.setNavBar('navbar');
        props.setFooter('footer');
    }, [])

    return (
        <>
            <div style={{ marginTop: '150px' }}>Hello Studio</div>
            <SubscriptionNews />
            <br></br>
            <br></br>
            <br></br>
        </>
    )
}
const mapDispatchToProps = (dispatch) => {
    return {
        setNavBar: (data) => dispatch(setNavBar(data)),
        setFooter: (data) => dispatch(setFooter(data))
    }
}

export default connect(null, mapDispatchToProps)(Studio);