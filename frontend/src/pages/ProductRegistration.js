import React from 'react';

const ProductRegistration = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
      const response = await fetch('http://localhost:8080/api/register', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Registration successful');
      } else {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        alert(`Registration failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-gray-900 text-gray-400 text-center">
      <h1 className="text-white text-left">PRODUCT REGISTRATION</h1>
      <hr className="my-4" />
      <p className="text-gray-500">IT'S A RECORD FOR YOUR INSTALLATION SERVICE</p>
      <br />
      <h2>FILL THE BELOW DETAILS</h2>
      <form id="registration-form" onSubmit={handleSubmit} className="flex flex-col items-center mt-8">
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          className="w-full my-2 p-2 border-none rounded text-gray-900"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone*"
          required
          className="w-full my-2 p-2 border-none rounded text-gray-900"
        />
        <input
          type="email"
          name="email"
          placeholder="Email*"
          required
          className="w-full my-2 p-2 border-none rounded text-gray-900"
        />
        <input
          type="text"
          name="orderNumber"
          placeholder="Order Number*"
          required
          className="w-full my-2 p-2 border-none rounded text-gray-900"
        />
        <input
          type="text"
          name="serialNumber"
          placeholder="Serial Number*"
          required
          className="w-full my-2 p-2 border-none rounded text-gray-900"
        />
        <input
          type="date"
          name="installationDate"
          placeholder="Installation Date*"
          required
          className="w-full my-2 p-2 border-none rounded text-gray-900"
        />
        <label htmlFor="fileUpload" className="flex items-center justify-center p-2 mt-2 border border-gray-400 rounded cursor-pointer">
          INSTALLATION & SERIAL NO PHOTO
        </label>
        <input
          type="file"
          id="fileUpload"
          name="fileUpload"
          accept="image/*"
          required
          className="w-full my-2 p-2 border-none rounded text-gray-400"
        />
        <button type="submit" className="bg-red-700 text-white py-2 px-4 mt-8 rounded cursor-pointer hover:bg-gray-500">
          Submit Details
        </button>
      </form>
    </div>
  );
};

export default ProductRegistration;
