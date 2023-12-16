import Filter from '../Filter/Filter';
import { useEffect } from "react";
import SubscriptionNews from "../SubscriptionNews";
import { connect } from 'react-redux';
import { setFooter, setNavBar } from "../../Redux_Store/Action_Creators";
const Men = (props) => {
    useEffect(() => {
        document.title = 'Men Shopping Online - Shop for Mens Clothing & Accessories';
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
        setFooter: (data) => dispatch(setFooter(data))
    }
}

export default connect(null, mapDispatchToProps)(Men);