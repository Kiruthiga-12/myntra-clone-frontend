import { connect } from 'react-redux';
import Slider from './Slider';
import Discount from './Discount';
import Dealoftheday from './Dealoftheday';
import Toppicks from './Toppicks';
import Catergoriestobuy from './Categoriestobuy';
import Bestbuys from './Bestbuys';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { setFooter, setNavBar } from '../Redux_Store/Action_Creators';
const user_home = 'Logged in Successfully';

const Home = (props) => {
    useEffect(() => {
        document.title = 'Online Shopping for Women,Men ,Kids Fashion & Lifestyle - Myntra';
        if (props.user.user_id > 0)
            toast.success('Logged in Successfully', {
                autoClose: 3000, position: toast.POSITION.BOTTOM_RIGHT,
                toastId: 'user_home'
            })
        props.setNavBar('navbar');
        props.setFooter('footer');
    }, [])
    return (
        <>
            <ToastContainer />
            <Slider />
            <Discount />
            <Dealoftheday />
            <Catergoriestobuy />
            <Toppicks />
            <Bestbuys />
            <br></br>
        </>
    )

}

const mapStateToProps = (cstate) => {
    return {
        user: cstate.user
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setNavBar: (data) => dispatch(setNavBar(data)),
        setFooter: (data) => dispatch(setFooter(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);