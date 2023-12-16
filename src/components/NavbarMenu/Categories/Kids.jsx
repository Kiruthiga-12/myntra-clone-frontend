import { useEffect } from "react";
import Filter from '../Filter/Filter';
import SubscriptionNews from "../SubscriptionNews";
import { connect } from 'react-redux';
import { setNavBar, setFooter } from "../../Redux_Store/Action_Creators";
const Kids = (props) => {
    useEffect(() => {
        document.title = 'Kids Clothing - Buy Kids Clothes,Dresses and Bottom Wear';
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
        setNavBar: (data) => dispatch(setFooter(data))
    }
}

export default connect(null, mapDispatchToProps)(Kids);