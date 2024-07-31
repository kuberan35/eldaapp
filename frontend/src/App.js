import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import SummaryApi from './common'; // Assuming this is a utility file with API endpoints and methods
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';

function App() {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);  

  const userData = {}; // Define your user data here

  // Set token on the initial render
  useEffect(() => {
    fetch('https://eldaapp.onrender.com/set-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ user: userData }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Token set:', data);
      })
      .catch(error => {
        console.error('Error setting token:', error);
      });
  }, []);

  // Fetch user details
  const fetchUserDetails = async () => {
    try {
      const dataResponse = await fetch(SummaryApi.current_user.url, {
        method: SummaryApi.current_user.method,
        credentials: 'include',
      });
      const dataApi = await dataResponse.json();
      if (dataApi.success) {
        dispatch(setUserDetails(dataApi.data));
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  // Fetch user's cart product count
  const fetchUserAddToCart = async () => {
    try {
      const dataResponse = await fetch(SummaryApi.addToCartProductCount.url, {
        method: SummaryApi.addToCartProductCount.method,
        credentials: 'include',
      });
      const dataApi = await dataResponse.json();
      setCartProductCount(dataApi?.data?.count || 0);
    } catch (error) {
      console.error('Error fetching cart product count:', error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
    fetchUserAddToCart();
  }, []);

  return (
    <Context.Provider value={{
      fetchUserDetails, 
      cartProductCount, 
      fetchUserAddToCart
    }}>
      <ToastContainer position='top-center' />
      <Header />
      <main className='min-h-[calc(100vh-120px)] pt-16'>
        <Outlet />
      </main>
      <Footer />
    </Context.Provider>
  );
}

export default App;
