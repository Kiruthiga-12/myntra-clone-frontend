import Filter from '../Filter/Filter';
import { useEffect } from "react";
import SubscriptionNews from "../SubscriptionNews";
import { connect } from 'react-redux';
import { setNavBar, setFooter } from "../../Redux_Store/Action_Creators";
const Beauty = (props) => {
    useEffect(() => {
        document.title = 'Buy Personal Hair Products for Men & Women Online | Myntra';
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
export default connect(null, mapDispatchToProps)(Beauty);