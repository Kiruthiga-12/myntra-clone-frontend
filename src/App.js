import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/HomePage/Home';
import Login from './components/Register/Login/Login';
import Recovery from './components/Register/Recovery/Recovery';
import ResetPassword from './components/Register/Recovery/ResetPassword';
import NotReset from './components/Register/Recovery/NotReset';
import CustomerCare from './components/Register/Recovery/CustomerCare';
import LoginPassword from './components/Register/Login/LoginPassword';
import Wishlist from './components/NavbarMenu/BuyOptions/Wishlist';
import Cart from './components/NavbarMenu/BuyOptions/Cart/Cart';
import Men from './components/NavbarMenu/Categories/Men';
import Women from './components/NavbarMenu/Categories/Women';
import Kids from './components/NavbarMenu/Categories/Kids';
import Living from './components/NavbarMenu/Categories/Living';
import Beauty from './components/NavbarMenu/Categories/Beauty';
import Studio from './components/NavbarMenu/Categories/Studio';
import Buy from './components/NavbarMenu/BuyOptions/Buy';
import Profile from './components/NavbarMenu/Profile/Profile';
import PrivacyPolicy from './components/NavbarMenu/Policy/PrivacyPolicy';
import TermsOfUse from './components/NavbarMenu/Policy/TermsOfUse';
import Contactus from './components/NavbarMenu/Policy/Contactus';
import Pagenotfound from './components/Pagenotfound';
import Faqs from './components/NavbarMenu/Policy/Faqs';
import LandingPage from './components/Vendor/VenderLanding/LandingPage';
import VenderLogin from './components/Vendor/VenderLogin/VenderLogin';
import VenderLoginAndPassword from './components/Vendor/VenderLogin/VenderLoginAndPassword';
import RegisterStep1 from './components/Vendor/VenderRegister/Step1/RegisterStep1';
import RegisterStep2 from './components/Vendor/VenderRegister/Step2/RegisterStep2';
import RegisterStep2Pwd from './components/Vendor/VenderRegister/Step2/RegisterStep2Pwd';
import RegisterStep3 from './components/Vendor/VenderRegister/Step3/RegisterStep3';
import BasicInformation from './components/Vendor/VenderRegister/Step4/BasicInformation';
import Admin_Login from './components/Admin/Admin_Login';
import Admin_Home from './components/Admin/Admin_Home';
import Admin_Signup from './components/Admin/Admin.Signup';
import Signup from './components/Register/SignUp/Signup';
import Vendor_Home from './components/Vendor/VendorHome/Vendor_Home';
import Vendor_password_reset from './components/Vendor/VenderLogin/vendor_password_reset';
import Admin_password_reset from './components/Admin/Admin_password_reset';
import NewPassword from './components/Register/Recovery/NewPassword';
import SuccessPage from './components/NavbarMenu/BuyOptions/Cart/Payment/SuccessPage';
import ErrorPage from './components/NavbarMenu/BuyOptions/Cart/Payment/ErrorPage';
import { connect } from 'react-redux';
import Footer from './components/Footer';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from './components/Loader/Loader';
import { userLogout, adminLogout, vendorLogout, getBagCount } from './components/Redux_Store/Action_Creators';
function App(props) {
  const [catgroup, setCatGroup] = useState([]);
  const [prodgroup, setProductGroup] = useState([]);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    const cat = axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_category`);
    const prod = axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_productcategory`);
    axios.all([cat, prod])
      .then(axios.spread(function (catdet, proddet) {
        catdet.data.length > 0 ? setCatGroup(catdet.data.slice()) : setCatGroup([])
        proddet.data.length > 0 ? setProductGroup(proddet.data.slice()) : setProductGroup([])
        setLoader(false);
      }))
  }, [])
  useEffect(() => {
    //key event
    // document.onkeydown = (e) => {
    //   if (e.key == 'F5')
    //     e.preventDefault()
    //   else if ((e.ctrlKey && e.key == 'r') || (e.ctrlKey && e.key == 'R'))
    //     e.preventDefault()
    // }
    //right click event
    // document.oncontextmenu = (e) => {
    //   e.preventDefault();
    // }
    // //reload button in browser
    window.onbeforeunload = function () {
      localStorage.removeItem('admin_key');
      localStorage.removeItem('vendor_key');
      localStorage.removeItem('user_key');
      props.userLogout();
      props.adminLogout();
      props.vendorLogout();
      props.getBagCount();
      return "Are you sure you want to refresh the page?";
    }
  })
  return (
    <>
      {loader == true ? <Loader /> : <>
        {props.navbar != '' ? <Navbar catgroup={catgroup} /> : ''}
        <Routes>
          {/* user page routes */}
          <Route path='/' element={<Login />}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/recovery' element={<Recovery />}></Route>
          <Route path='/resetpassword' element={<ResetPassword />}></Route>
          <Route path='/notreset' element={<NotReset />}></Route>
          <Route path='/customercare' element={<CustomerCare />}></Route>
          <Route path='/loginpassword' element={<LoginPassword />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/wishlist' element={<Wishlist />}></Route>
          <Route path='/contactus' element={<Contactus />}></Route>
          <Route path='/shop/men' element={<Men />}></Route>
          <Route path='/shop/women' element={<Women />}></Route>
          <Route path='/shop/kids' element={<Kids />}></Route>
          <Route path='/shop/living' element={<Living />}></Route>
          <Route path='/shop/beauty' element={<Beauty />}></Route>
          <Route path='/shop/studio' element={<Studio />}></Route>
          <Route path='/buy' element={<Buy />}></Route>
          <Route path='/my' element={<Profile />}></Route>
          <Route path='/privacypolicy' element={<PrivacyPolicy />}></Route>
          <Route path='/termsofuse' element={<TermsOfUse />}></Route>
          <Route path='/faqs' element={<Faqs />}></Route>
          <Route path='/checkout/cart' element={<Cart />}></Route>
          <Route path='/user_reset_pwd' element={<NewPassword />}></Route>
          <Route path='/success' element={<SuccessPage />}></Route>
          <Route path='/error' element={<ErrorPage />}></Route>
          {/* vendor page routes */}
          <Route path='/partnerhome' element={<LandingPage />}></Route>
          <Route path='/partnerhome/login' element={<VenderLogin />}></Route>
          <Route path='/partnerhome/loginandpwd' element={<VenderLoginAndPassword />}></Route>
          <Route path='/partnerhome/reset_pwd' element={<Vendor_password_reset />}></Route>
          <Route path='/partnerhome/register_step1' element={<RegisterStep1 />}></Route>
          <Route path='/partnerhome/register_step2' element={<RegisterStep2 />}></Route>
          <Route path='/partnerhome/register_step2_pwd' element={<RegisterStep2Pwd />}></Route>
          <Route path='/partnerhome/register_step3' element={<RegisterStep3 />}></Route>
          <Route path='/basicinformation' element={<BasicInformation />}></Route>
          <Route path='/vendor/home' element={<Vendor_Home />}></Route>
          {/* admin page routes */}
          <Route path='/admin/login' element={<Admin_Login />}></Route>
          <Route path='/admin/signup' element={<Admin_Signup />}></Route>
          <Route path='/admin_reset_pwd' element={<Admin_password_reset />}></Route>
          <Route path='/admin/home' element={<Admin_Home />}></Route>
          {/* not found page */}
          <Route path='*' element={<Pagenotfound />}></Route>
        </Routes >
        {props.footer != '' ? <Footer catgroup={catgroup} prodgroup={prodgroup} /> : ''}
      </>}
    </>
  );
}
const mapStateToProps = (cstate) => {
  return {
    navbar: cstate.navbar,
    footer: cstate.footer
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    userLogout: () => dispatch(userLogout()),
    adminLogout: () => dispatch(adminLogout()),
    vendorLogout: () => dispatch(vendorLogout()),
    getBagCount: () => dispatch(getBagCount())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
