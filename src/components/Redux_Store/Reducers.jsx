import IntialObject from "./Action_Object"
const reducer = (istate = IntialObject, action) => {
    switch (action.type) {
        case 'IS_USER_LOGGED': return { ...istate, is_user_logged: true, is_user_logout: false }
        case 'USER_DATA': return {
            ...istate, user: action.payload, is_user_logout: false
        }
        case 'LOGOUT': return { ...istate, is_user_logout: true, user: [], is_user_logged: false }
        case 'USER_MOBILE': {
            return { ...istate, user_mobile: action.payload }
        }
        case 'GET_VENDOR_EMAIL': return { ...istate, get_vendor_email: action.payload }
        case 'GET_VENDOR_MOBILE': return { ...istate, get_vendor_mobile: action.payload }
        case 'CHANGE_VENDOR_REG_STATUS':
            return { ...istate, current_state: action.payload }
        case 'CATEGORY': return { ...istate, category: action.payload }
        case 'SUBCATEGORY': return { ...istate, subcategory: action.payload }
        case 'PRODUCTCATEGORY': return { ...istate, productcategory: action.payload }
        case 'USERPG_CAT':
            return { ...istate, userpg_cat: action.payload }
        case 'USERPG_SUBCAT':
            return { ...istate, userpg_subcat: action.payload }
        case 'USERPG_PRODCAT':
            return { ...istate, userpg_prodcat: action.payload }
        case 'USERPG_PRODUCT_ID':
            return { ...istate, userpg_product_id: action.payload }
        case 'CART_STATE':
            return { ...istate, cart_state: action.payload }
        case 'PROFILE_POPUP':
            return { ...istate, profilemenu: action.payload }
        case 'ADMIN_LOGIN':
            return { ...istate, admin_login: action.payload }
        case 'VENDOR_LOGIN':
            return { ...istate, vendor_login: action.payload }
        case 'PAGE_NO':
            return { ...istate, page_no: action.payload }
        case 'WISHLIST_ITERATE': {
            if (action.payload == '' || action.payload == undefined)
                return { ...istate }
            else
                return { ...istate, wishlist_iterate: action.payload }
        }
        case 'GIFT_ITERATE':
            return { ...istate, gift_iterate: action.payload }
        case 'BAG_COUNT':
            return { ...istate, bag_count: action.payload }
        case 'PAYMENT_MODE':
            return { ...istate, payment_mode: action.payload }
        case 'NAVBAR':
            return { ...istate, navbar: action.payload }
        case 'FOOTER':
            return { ...istate, footer: action.payload }
        case 'ORDER_ID':
            return { ...istate, order_id: action.payload }
        case 'REFRESH_ADMIN_DASHBOARD':
            return { ...istate, refresh_admin_dashboard: action.payload }
        case 'ADMIN_LOGOUT':
            return { ...istate, admin_login: "" }
        case 'VENDOR_LOGOUT':
            return { ...istate, vendor_login: " " }
        default: return istate;
    }
}

export default reducer;
