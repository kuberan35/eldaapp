// import ProductRegistration from "../pages/ProductRegistration"

// import { upload } from "../../../backend/controller/applicationController"

const backendDomin = process.env.REACT_APP_BACKEND_URL|| "https://eldaapp.vercel.app"

const SummaryApi = {
    signUP : {
        url : `${backendDomin}/api/signup`,
        method : "post"
    },
    signIn : {
        url : `${backendDomin}/api/signin`,
        method : "post"
    },
    current_user : {
        url : `${backendDomin}/api/user-details`,
        method : "get"
    },
    logout_user : {
        url : `${backendDomin}/api/userLogout`,
        method : 'get'
    },
    allUser : {
        url : `${backendDomin}/api/all-user`,
        method : 'get'
    },
    updateUser : {
        url : `${backendDomin}/api/update-user`,
        method : "post"
    },
    uploadProduct : {
        url : `${backendDomin}/api/upload-product`,
        method : 'post'
    },
    allProduct : {
        url : `${backendDomin}/api/get-product`,
        method : 'get'
    },
    updateProduct : {
        url : `${backendDomin}/api/update-product`,
        method  : 'post'
    },
    categoryProduct : {
        url : `${backendDomin}/api/get-categoryProduct`,
        method : 'get'
    },
    categoryWiseProduct : {
        url : `${backendDomin}/api/category-product`,
        method : 'post'
    },
    productDetails : {
        url : `${backendDomin}/api/product-details`,
        method : 'post'
    },
    addToCartProduct : {
        url : `${backendDomin}/api/addtocart`,
        method : 'post'
    },
    addToCartProductCount : {
        url : `${backendDomin}/api/countAddToCartProduct`,
        method : 'get'
    },
    addToCartProductView : {
        url : `${backendDomin}/api/view-card-product`,
        method : 'get'
    },
    updateCartProduct : {
        url : `${backendDomin}/api/update-cart-product`,
        method : 'post'
    },
    deleteCartProduct : {
        url : `${backendDomin}/api/delete-cart-product`,
        method : 'post'
    },
    searchProduct : {
        url : `${backendDomin}/api/search`,
        method : 'get'
    },
    filterProduct : {
        url : `${backendDomin}/api/filter-product`,
        method : 'post'
    },
    contactUs : {
        url : `${backendDomin}/api/submit`,
        method : 'post'
    },
    payment : {
        url : `${backendDomin}/api/checkout`,
        method : 'post'
    },
    authourisedServiceCentre : {
        url : `${backendDomin}/api/submit-application`,
        method : 'post'
    },
    getAllApplications : {
        url : `${backendDomin}/api/applications`,
        method : 'get'
    },
    ProductRegistration : {
        url:  `${backendDomin}/api/register`,
        method : 'post'
    },
    authorisedDealer : {
        url: `${backendDomin}/api/submit-app`,
        method: `post`
    },
    getDealer : {
        url: `${backendDomin}/api/dealer`,
        method: 'get'
    },
    upload : {
        url: `${backendDomin}/uploads`
    }
}


export default SummaryApi
