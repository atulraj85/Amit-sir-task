"use client"

import React, { useState } from 'react';

const RFPForm = ({ onSubmit }) => {
  // Define location options
  const locationOptions = [
    { value: 'Andaman and Nicobar Islands', label: 'Andaman and Nicobar Islands' },
    { value: 'Andhra Pradesh', label: 'Andhra Pradesh' },
    { value: 'Arunachal Pradesh', label: 'Arunachal Pradesh' },
    { value: 'Assam', label: 'Assam' },
    { value: 'Bihar', label: 'Bihar' },
    { value: 'Chandigarh', label: 'Chandigarh' },
    { value: 'Chhattisgarh', label: 'Chhattisgarh' },
    { value: 'Dadra and Nagar Haveli and Daman and Diu', label: 'Dadra and Nagar Haveli and Daman and Diu' },
    { value: 'Delhi', label: 'Delhi' },
    { value: 'Goa', label: 'Goa' },
    { value: 'Gujarat', label: 'Gujarat' },
    { value: 'Haryana', label: 'Haryana' },
    { value: 'Himachal Pradesh', label: 'Himachal Pradesh' },
    { value: 'Jammu and Kashmir', label: 'Jammu and Kashmir' },
    { value: 'Jharkhand', label: 'Jharkhand' },
    { value: 'Karnataka', label: 'Karnataka' },
    { value: 'Kerala', label: 'Kerala' },
    { value: 'Ladakh', label: 'Ladakh' },
    { value: 'Lakshadweep', label: 'Lakshadweep' },
    { value: 'Madhya Pradesh', label: 'Madhya Pradesh' },
    { value: 'Maharashtra', label: 'Maharashtra' },
    { value: 'Manipur', label: 'Manipur' },
    { value: 'Meghalaya', label: 'Meghalaya' },
    { value: 'Mizoram', label: 'Mizoram' },
    { value: 'Nagaland', label: 'Nagaland' },
    { value: 'Odisha', label: 'Odisha' },
    { value: 'Puducherry', label: 'Puducherry' },
    { value: 'Punjab', label: 'Punjab' },
    { value: 'Rajasthan', label: 'Rajasthan' },
    { value: 'Sikkim', label: 'Sikkim' },
    { value: 'Tamil Nadu', label: 'Tamil Nadu' },
    { value: 'Telangana', label: 'Telangana' },
    { value: 'Tripura', label: 'Tripura' },
    { value: 'Uttar Pradesh', label: 'Uttar Pradesh' },
    { value: 'Uttarakhand', label: 'Uttarakhand' },
    { value: 'West Bengal', label: 'West Bengal' }
    // Add more states as needed
  ];

  const defaultLocation = 'Delhi';

  const [technicalItems, setTechnicalItems] = useState([{ productName: '', description: '', quantity: '', location: defaultLocation }]);
  const [financialItems, setFinancialItems] = useState([{ productName: '', description: '', quantity: '', location: defaultLocation, estimatedMax: '' }]);

  const handleTechnicalItemInputChange = (index, field, value) => {
    const updatedTechnicalItems = [...technicalItems];
    updatedTechnicalItems[index][field] = value;
    setTechnicalItems(updatedTechnicalItems);
  };

  const handleFinancialItemInputChange = (index, field, value) => {
    const updatedFinancialItems = [...financialItems];
    updatedFinancialItems[index][field] = value;
    setFinancialItems(updatedFinancialItems);
  };

  const addTechnicalItem = () => {
    setTechnicalItems([...technicalItems, { productName: '', description: '', quantity: '', location: defaultLocation }]);
  };

  const addFinancialItem = () => {
    setFinancialItems([...financialItems, { productName: '', description: '', quantity: '', location: defaultLocation, estimatedMax: '' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass form data to parent component for handling
    onSubmit({ technicalItems, financialItems });
    // Reset form fields
    setTechnicalItems([{ productName: '', description: '', quantity: '', location: defaultLocation }]);
    setFinancialItems([{ productName: '', description: '', quantity: '', location: defaultLocation, estimatedMax: '' }]);
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-gray-100 shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Request for Products</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6">
          {/* Technical Section */}
          <div className="bg-white rounded-md p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Technical</h3>
            {technicalItems.map((item, index) => (
              <div key={index} className="grid grid-cols-1 gap-4 mt-5">
                <hr className="border-[1.3px]"/>
                {/* Product Name */}
                <div>
                  <label htmlFor={`technical-product-name-${index}`} className="block text-sm font-medium text-gray-700">Product Name</label>
                  <input
                    id={`technical-product-name-${index}`}
                    type="text"
                    value={item.productName}
                    onChange={(e) => handleTechnicalItemInputChange(index, 'productName', e.target.value)}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                {/* Description */}
                <div>
                  <label htmlFor={`technical-description-${index}`} className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    id={`technical-description-${index}`}
                    value={item.description}
                    onChange={(e) => handleTechnicalItemInputChange(index, 'description', e.target.value)}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full h-24 resize-none focus:outline-none focus:border-blue-500"
                    required
                  ></textarea>
                </div>
                {/* Quantity */}
                <div>
                  <label htmlFor={`technical-quantity-${index}`} className="block text-sm font-medium text-gray-700">Quantity</label>
                  <input
                    id={`technical-quantity-${index}`}
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleTechnicalItemInputChange(index, 'quantity', e.target.value)}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                {/* Location */}
                <div>
                  <label htmlFor={`technical-location-${index}`} className="block text-sm font-medium text-gray-700">Location</label>
                  <select
                    id={`technical-location-${index}`}
                    value={item.location}
                    onChange={(e) => handleTechnicalItemInputChange(index, 'location', e.target.value)}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
                    required
                  >
                    {locationOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
            <button type="button" onClick={addTechnicalItem} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Add Technical Item</button>
          </div>

          {/* Financial Section */}
          <div className="bg-white rounded-md p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Financial</h3>
            {financialItems.map((item, index) => (
              <div key={index} className="grid grid-cols-1 gap-4 mt-5">
                <hr className="border-[1.3px]"/>
                {/* Product Name */}
                <div>
                  <label htmlFor={`financial-product-name-${index}`} className="block text-sm font-medium text-gray-700">Product Name</label>
                  <input
                    id={`financial-product-name-${index}`}
                    type="text"
                    value={item.productName}
                    onChange={(e) => handleFinancialItemInputChange(index, 'productName', e.target.value)}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                {/* Description */}
                <div>
                  <label htmlFor={`financial-description-${index}`} className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    id={`financial-description-${index}`}
                    value={item.description}
                    onChange={(e) => handleFinancialItemInputChange(index, 'description', e.target.value)}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full h-24 resize-none focus:outline-none focus:border-blue-500"
                    required
                  ></textarea>
                </div>
                {/* Quantity */}
                <div>
                  <label htmlFor={`financial-quantity-${index}`} className="block text-sm font-medium text-gray-700">Quantity</label>
                  <input
                    id={`financial-quantity-${index}`}
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleFinancialItemInputChange(index, 'quantity', e.target.value)}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                {/* Location */}
                <div>
                  <label htmlFor={`financial-location-${index}`} className="block text-sm font-medium text-gray-700">Location</label>
                  <select
                    id={`financial-location-${index}`}
                    value={item.location}
                    onChange={(e) => handleFinancialItemInputChange(index, 'location', e.target.value)}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
                    required
                  >
                    {locationOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                {/* Estimated Maximum */}
                <div>
                  <label htmlFor={`financial-estimated-max-${index}`} className="block text-sm font-medium text-gray-700">Estimated Maximum</label>
                  <input
                    id={`financial-estimated-max-${index}`}
                    type="number"
                    value={item.estimatedMax}
                    onChange={(e) => handleFinancialItemInputChange(index, 'estimatedMax', e.target.value)}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
              </div>
            ))}
            <button type="button" onClick={addFinancialItem} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Add Financial Item</button>
          </div>
        </div>

        {/* Submit button */}
        <button type="submit" className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full">Submit</button>
      </form>
    </div>
  );
};

export default RFPForm;
