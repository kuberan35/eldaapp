import React, { useEffect, useState } from 'react';
import { IoLogoFacebook, IoLogoInstagram } from "react-icons/io5";
import { BsTwitterX } from "react-icons/bs";
import SummaryApi from '../common';

const CustomerSupport = () => {
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const today = new Date().getDay();
    document.getElementById(days[today]).classList.add('text-white');
  }, []);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const message = event.target.message.value;
    const phone = event.target.phone.value;
    // const emailList = event.target.emailList.value; 

    //             
    const response = await fetch(SummaryApi.contactUs.url, {
      method: SummaryApi.contactUs.method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, message, phone }),
    });

    if (response.ok) {
      alert('Your message has been sent successfully.');
    } else {
      alert('There was an issue sending your message. Please try again later.');
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto bg-gray-900 text-gray-400">
      {!showForm ? (
        <div className="text-center">  
          <h1 className="text-white">CUSTOMER SUPPORT</h1>
          <hr className="my-4 border-white" />
          <p>WE ARE ALWAYS HERE TO SUPPORT OUR CUSTOMERS..!</p>
          <a href="https://wa.me/918098318834" target="_blank" rel="noopener noreferrer">
            <button className="bg-green-500 text-white py-2 px-4 mt-6 rounded hover:bg-green-600">Message us on WhatsApp</button>
          </a>
          <div className="flex flex-wrap justify-around mt-8">
            <div className="w-1/2 p-2">
              <h4 className="text-f9f9f9">ELDA ELECTRONICS</h4>
              <p>Registered Office: Plot No 85 A</p>
              <p>Ring Road Housing Sector,</p>
              <p>Madhavaram, Chennai, Tamil Nadu, India</p>
              <p>08098318834</p>
              <p><a href="mailto:support@eldaelectronics.com" className="hover:text-white">support@eldaelectronics.com</a></p>
            </div>
            <div className="w-1/2 p-2">
              <h4 className="text-f9f9f9">Working Hours</h4>
              <p id="monday">Mon 09:00 am – 05:00 pm</p>
              <p id="tuesday">Tue 09:00 am – 05:00 pm</p>
              <p id="wednesday">Wed 09:00 am – 05:00 pm</p>
              <p id="thursday">Thu 09:00 am – 05:00 pm</p>
              <p id="friday">Fri 09:00 am – 05:00 pm</p>
              <p id="saturday">Sat 09:00 am – 05:00 pm</p>
              <p id="sunday">Sun Closed</p>
            </div>
          </div>
          <button onClick={toggleForm} className="bg-red-600 text-white py-2 px-4 mt-6 rounded hover:bg-gray-500">INQUIRIES</button>
          <div className="text-center py-8">
            <h2 className="text-white">CONNECT WITH US</h2>
            <hr className="my-4 border-white" />
            <div className="flex justify-center space-x-4">
              <a href="#" className="text-2xl text-gray-400 hover:text-white"><IoLogoFacebook /></a>
              <a href="#" className="text-2xl text-gray-400 hover:text-white"><IoLogoInstagram /></a>
              <a href="#" className="text-2xl text-gray-400 hover:text-white"><BsTwitterX /></a>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-white">CUSTOMER SUPPORT</h1>
          <hr className="my-4 border-white" />
          <h3>INQUIRIES</h3>
          <form id="inquiry-form" onSubmit={handleSubmit} className="space-y-4">
            <input type="text" id="name" name="name" placeholder="Name*" required className="w-full p-3 text-black rounded" />
            <input type="email" id="email" name="email" placeholder="Email*" required className="w-full p-3 text-black rounded" /> {/*  from address */}
            <textarea id="message" name="message" placeholder="Message" required className="w-full p-3 text-black rounded"></textarea>
            <input type="text" id="phone" name="phone" placeholder="Phone Number*" required className="w-full p-3 text-black rounded" />
            <button type="submit" className="w-full bg-red-600 text-white py-3 rounded hover:bg-gray-500">Send</button>
          </form>
          <div className="text-center mt-6">
            <button type="button" onClick={toggleForm} className="bg-gray-700 text-white py-3 px-6 rounded hover:bg-gray-500">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerSupport;
