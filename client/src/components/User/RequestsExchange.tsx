import React, { useState } from "react";
import productImage from "../../asserts/nano.png";
import image2 from "../../asserts/henfruit.png";

const initialExchangeItems = [
    {
      title: "Nano Bristles Bamboo Toothbrush",
      desc: "Eco-friendly bamboo toothbrush with nano bristles.",
      img: productImage,
      price: "$15",
      quantity: 1,
      code: "520375",
      rating:"4.7"
    },
    {
        title: "Henfruit Farm White Eggs",
        desc: "Farm-fresh white eggs, naturally grown.",
        img: image2,
        price: "$5.6",
        quantity: 1,
        code: "520375",
        rating:"4.8"
      },
    
  ];
function RequestsExchange() {
      const [exchangeItems, setExchangeItems] = useState(initialExchangeItems);
    
  return (
    <div className=" mt-24 p-6 rounded-lg shadow-md max-w-4xl mx-auto my-10">
      <h2 className="text-2xl font-bold mb-6">Exchange Request</h2>
      {exchangeItems.map((item, idx) => (
      <div className="flex flex-col p-4 md:flex-row  gap-6 mb-4 bg-green-100 rounded-lg" key={idx}>

        <div className="flex-shrink-0">
          <img
            src={item.img}
            alt="Product"
            className="w-48 h-48 object-cover rounded"
          />
        </div>

        <div className="flex-1 space-y-4">
          <div>
            <h3 className="text-lg font-semibold">
            {item.title}
            </h3>
            <p className="text-gray-600 text-sm mt-2">
            {item.desc}
            </p>
          </div>

          <div className="flex items-center flex-wrap gap-6 text-sm text-gray-700">
            <span>Price: <strong>{item.price}</strong></span>
            <span>Qty: <strong>{item.quantity}</strong></span>
            <span>Code: <strong>{item.code}</strong></span>

            <div className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded ml-auto">
            {item.rating} ★
            </div>
          </div>

          <div className="flex gap-4 mt-4">
            <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
              Accept
            </button>
            <button className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600">
              Reject
            </button>
          </div>
        </div>
      </div>
       ))}
      

      <div className="border-t mt-6"></div>
    </div>
  );
}

export default RequestsExchange;
