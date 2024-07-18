import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Login from '../pages/Login'
import ForgotPassowrd from '../pages/ForgotPassowrd'
import SignUp from '../pages/SignUp'
import AdminPanel from '../pages/AdminPanel'
import AllUsers from '../pages/AllUsers'
import AllProducts from '../pages/AllProducts'
import CategoryProduct from '../pages/CategoryProduct'
import ProductDetails from '../pages/ProductDetails'
import Cart from '../pages/Cart'
import SearchProduct from '../pages/SearchProduct'
import Blog from '../pages/BlogPage'
import ContactUsPage from '../pages/ContactUsPage'
import ServiceRequest from '../pages/ServiceRequest'
import CustomerSupport from '../pages/CustomerSupport'
import ProductRegistration from '../pages/ProductRegistration'
import AuthorizedDealer from '../pages/AuthorizedDealer'
import AuthorizedServiceCenter from '../pages/AuthorizedServiceCenter'
import Membership from '../pages/MemberShip'
// import AdminApplication from '../pages/AdminApplications'
import AdminApplications from '../pages/AdminApplications'
import AdminDealer from '../pages/AdminDealer'


const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children : [
            {
                path : "",
                element : <Home/>
            },
            {
                path : "login",
                element : <Login/>
            },
            {
                path : "forgot-password",
                element : <ForgotPassowrd/>
            },
            {
                path : "sign-up",
                element : <SignUp/>
            },
            {
                path : "product-category",
                element : <CategoryProduct/>
            },
            {
                path : "product/:id",
                element : <ProductDetails/>
            },
            {
                path : 'cart',
                element : <Cart/>
            },
            {
                path : "search",
                element : <SearchProduct/>
            },
            {
                path : "admin-panel",
                element : <AdminPanel/>,
                children : [
                    {
                        path : "all-users",
                        element : <AllUsers/>
                    },
                    {
                        path : "all-products",
                        element : <AllProducts/>
                    },
                    {
                        path : "AdminApplications",
                        element : <AdminApplications/>
                    },
                    {
                        path : "AdminDealer",
                        element : <AdminDealer/>
                    }

                ]
            },
            {
                path : "create-checkout-session",
                element : <Cart/>
            },
            {
                path :"Blog",
                element: <Blog/>
            },
            {
                path : "ContactUsPage",
                element: <ContactUsPage/>
            },
            {
                path : "ServiceRequest",
                element : <ServiceRequest/>
            },
            {
                path : "CustomerSupport",
                element : <CustomerSupport/>
            },
            {
                path : "ProductRegistration",
                element : <ProductRegistration/>
            },
            {
                path : "AuthorizedDealer",
                element : <AuthorizedDealer/>
            },
            {
                path : "AuthorizedServiceCenter",
                element : <AuthorizedServiceCenter/>
            },
            {
                path : "MemberShip",
                element : <Membership/>
            }
         
        ]
    }
])


export default router