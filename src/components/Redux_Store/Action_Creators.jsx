//User Login
import {
    IS_USER_LOGGED, USER_DATA, LOGOUT, GET_VENDOR_EMAIL, GET_VENDOR_MOBILE, CHANGE_VENDOR_REG_STATUS, USER_MOBILE,
    CATEGORY, SUBCATEGORY, PRODUCTCATEGORY, USERPG_CAT, USERPG_SUBCAT, USERPG_PRODCAT, USERPG_PRODUCT_ID, CART_STATE,
    PROFILE_POPUP, VENDOR_LOGIN, ADMIN_LOGIN, PAGE_NO, WISHLIST_ITERATE, GIFT_ITERATE, BAG_COUNT
    , PAYMENT_MODE, NAVBAR, FOOTER, ORDER_ID, REFRESH_ADMIN_DASHBOARD, ADMIN_LOGOUT, VENDOR_LOGOUT
} from "./Action_Values";
//after user login check if user logged in or not and populate Pop up options Name or login/signup options.
function userLogged() {
    return {
        type: IS_USER_LOGGED
    }
}
//send 1st Login page mobil einformation to signup page
function getUserMobile(data) {
    return {
        type: USER_MOBILE,
        payload: data
    }
}

function getUserData(data) {
    return {
        type: USER_DATA,
        payload: data
    }
}

function userLogout() {
    return {
        type: LOGOUT
    }
}


function getVendorMobile(data) {
    return {
        type: GET_VENDOR_MOBILE,
        payload: data
    }
}

function getVendorEmail(data) {
    return {
        type: GET_VENDOR_EMAIL,
        payload: data
    }
}

function changeVendorStatus(data) {
    return {
        type: CHANGE_VENDOR_REG_STATUS,
        payload: data
    }
}
function getCategory(data) {
    return {
        type: CATEGORY,
        payload: data
    }
}
function getSubCategory(data) {
    return {
        type: SUBCATEGORY,
        payload: data
    }
}
function getProductCategory(data) {
    return {
        type: PRODUCTCATEGORY,
        payload: data
    }
}
function setUserPageCat(data) {
    return {
        type: USERPG_CAT,
        payload: data
    }
}
function setUserPageSubCat(data) {
    return {
        type: USERPG_SUBCAT,
        payload: data
    }
}
function setUserPageProdCat(data) {
    return {
        type: USERPG_PRODCAT,
        payload: data
    }
}
//user page product id for Buy page

function setUserProductId(data) {
    return {
        type: USERPG_PRODUCT_ID,
        payload: data
    }
}
//set Cart State
function setCartState(data) {
    return {
        type: CART_STATE,
        payload: data
    }
}
//to get Profile Popup menu selected Option.
function setProfileMenu(data) {
    return {
        type: PROFILE_POPUP,
        payload: data
    }
}
//admin login
function getAdminLogin(data) {
    return {
        type: ADMIN_LOGIN,
        payload: data
    }
}
//vendor_login 
function getVendorLogin(data) {
    return {
        type: VENDOR_LOGIN,
        payload: data
    }
}
//to get page no
function getPageNo(data) {
    return {
        type: PAGE_NO,
        payload: data
    }
}
//inc wishlist for each actions
function getWishlistInc(data) {
    return {
        type: WISHLIST_ITERATE,
        payload: data
    }
}
//ic gift for each actions
function getGiftInc(data) {
    return {
        type: GIFT_ITERATE,
        payload: data
    }
}
//get Bag Count.
function getBagCount(data) {
    return {
        type: BAG_COUNT,
        payload: data
    }
}
//get Payment Mode
function getPaymentMode(data) {
    return {
        type: PAYMENT_MODE,
        payload: data
    }
}
//set Navbar 
function setNavBar(data) {
    return {
        type: NAVBAR,
        payload: data
    }
}
//set Footer
function setFooter(data) {
    return {
        type: FOOTER,
        payload: data
    }
}

//set Order Id
function setOrderId(data) {
    return {
        type: ORDER_ID,
        payload: data
    }
}
//inc values to refresh admin dashoboard
function refreshAdminDashboard(data) {
    return {
        type: REFRESH_ADMIN_DASHBOARD,
        payload: data
    }
}

//admin logout
function adminLogout() {
    return {
        type: ADMIN_LOGOUT
    }
}
//vendor logout
function vendorLogout() {
    return {
        type: VENDOR_LOGOUT
    }
}

export {
    getUserMobile, userLogged, getUserData, userLogout, getVendorMobile, getVendorEmail, changeVendorStatus
    , getCategory, getSubCategory, getProductCategory, setUserPageCat, setUserPageSubCat, setUserPageProdCat,
    setUserProductId, setCartState, setProfileMenu, getAdminLogin, getVendorLogin, getPageNo,
    getWishlistInc, getGiftInc, getBagCount, getPaymentMode, setNavBar, setFooter, setOrderId,
    refreshAdminDashboard, adminLogout, vendorLogout
};