import { useEffect } from "react";
import Filter from "../Filter/Filter";
import SubscriptionNews from "../SubscriptionNews";
import { connect } from 'react-redux';
import { setNavBar, setFooter } from "../../Redux_Store/Action_Creators";
const Living = (props) => {
    useEffect(() => {
        document.title = 'Home & Living  - Buy Interior Decoration Products';
        props.setNavBar('navbar');
        props.setFooter('footer');
    }, [])
    return (
        <>
            <Filter />
            <SubscriptionNews />
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        </>
    )
}
const mapDispatchToProps = (dispatch) => {
    return {
        setNavBar: (data) => dispatch(setNavBar(data)),
        setFooter: (data) => dispatch(setFooter(data)),
    }
}

export default connect(null, mapDispatchToProps)(Living);