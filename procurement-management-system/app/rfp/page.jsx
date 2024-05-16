// pages/rfp.js

import React from 'react';
import Link from 'next/link';

const RFPPage = () => {
  return (
    <div className="m-8">
      <h1 className="text-3xl font-bold mb-6">Request for Products</h1>
      <Link href="/form">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Request for Products</button>
      </Link>
    </div>
  );
};

export default RFPPage;
