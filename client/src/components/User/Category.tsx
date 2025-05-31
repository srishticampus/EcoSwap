import React, { useState } from "react";
import image1 from "../../asserts/shampoo.png"
import image2 from "../../asserts/bodywash.png"
import image3 from "../../asserts/bampoo.png"
import image4 from "../../asserts/ample.png"
import image5 from "../../asserts/Menswear.png"
import image6 from "../../asserts/womenswear.png"
import image7 from "../../asserts/kidswear.png"
import image8 from "../../asserts/babywear.png"
import image9 from "../../asserts/kitchen.png"
import image10 from "../../asserts/homedecor.png"
import image11 from "../../asserts/storagebag.png"
import image12 from "../../asserts/office.png"

function Category() {
  const categoriesData = [
    {
      title: "Personal Care Products",
      products: [
        { name: "Shampoo Bar", price: "From $12.05", img: image1 },
        { name: "Body Wash", price: "From $13.9", img: image2 },
        { name: "Bamboo Palette", price: "From $25.2", img: image3 },
        { name: "Ample Eco Airless", price: "From $12.05", img: image4 },
        { name: "Natural Soap", price: "From $9.99", img: "" },
        { name: "Face Scrub", price: "From $11.99", img:  ""},
      ],
    },
    {
      title: "Fashion Products",
      products: [
        { name: "Men's Wear", price: "From $32.25", img: image5 },
        { name: "Women's Wear", price: "From $30.50", img: image6 },
        { name: "Kids Wear", price: "From $25.2", img: image7 },
        { name: "Baby Wear", price: "From $12.05", img: image8 },
        { name: "Accessories", price: "From $8.00", img: "" },
      ],
    },
    {
      title: "Daily Products",
      products: [
        { name: "Kitchen Essential", price: "From $32.25", img: image9 },
        { name: "Home Decor", price: "From $12.50", img: image10 },
        { name: "Storage Bags", price: "From $10.3", img: image11 },
        { name: "Office Decor", price: "From $12.05", img: image12 },
        { name: "Baskets", price: "From $15.00", img: "" },
      ],
    },
  ];

  const [activeCategory, setActiveCategory] = useState(null);

  const toggleCategory = (index) => {
    setActiveCategory((prev) => (prev === index ? null : index));
  };

  return (
    <div className="p-6 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Categories</h2>

      {categoriesData.map((category, idx) => {
        const isActive = activeCategory === null || activeCategory === idx;
        const showAll = activeCategory === idx;

        return (
          isActive && (
            <div key={idx} className="mb-10">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">{category.title}</h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {(showAll ? category.products : category.products.slice(0, 4)).map((product, index) => (
                  <div
                    key={index}
                    className=" rounded-lg shadow p-3 hover:shadow-md transition duration-300 bg-green-50"
                  >
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-full h-32 object-cover rounded-md mb-2"
                    />
                    <h4 className="text-sm font-medium text-gray-800">{product.name}</h4>
                    <p className="text-xs text-gray-500">{product.price}</p>
                  </div>
                ))}
              </div>

              {category.products.length > 4 && (
                <div className="mt-4 text-right">
                  <button
                    onClick={() => toggleCategory(idx)}
                    className="text-sm text-indigo-600 hover:underline font-medium bg-green-50"
                  >
                    {activeCategory === idx ? "View Less" : "View More"}
                  </button>
                </div>
              )}
            </div>
          )
        );
      })}
    </div>
  );
}

export default Category;
