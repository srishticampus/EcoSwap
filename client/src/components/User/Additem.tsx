import React, { useState } from "react";
import axios from "axios";

function Additem() {
  const [showModal, setShowModal] = useState(false);

  const [data, setData] = useState({
    title: "",
    customTitle: "",
    description: "",
    category: "",
    customCategory: "",
    price: "",
    image: null,
    productquantity: null,
    production_complexity: "",
    customComplexity: "",
    addedByType: "users",
    addedBy: localStorage.getItem("userid"),
  });

  const handlechange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: name === "productquantity" ? Number(value) : value,
    }));
  };

  const validateForm = () => {
    const {
      title,
      customTitle,
      description,
      category,
      customCategory,
      price,
      productquantity,
      production_complexity,
      customComplexity,
      image,
    } = data;

    const finalTitle = title === "other" ? customTitle : title;
    const finalCategory = category === "other" ? customCategory : category;
    const finalComplexity =
      production_complexity === "other"
        ? customComplexity
        : production_complexity;

    if (
      !finalTitle ||
      !description ||
      !finalCategory ||
      !price ||
      !productquantity ||
      !finalComplexity ||
      !image
    ) {
      alert("All fields are required.");
      return false;
    }

    if (isNaN(price) || Number(price) <= 0) {
      alert("Price must be a valid number greater than 0.");
      return false;
    }

    if (isNaN(productquantity) || Number(productquantity) <= 0) {
      alert("Product quantity must be a valid number greater than 0.");
      return false;
    }

    return true;
  };

const handlepredict = async () => {
  const finalTitle = data.title === "other" ? data.customTitle : data.title;
  const finalCategory =
    data.category === "other" ? data.customCategory : data.category;
  const finalComplexity =
    data.production_complexity === "other"
      ? data.customComplexity
      : data.production_complexity;

  try {
    const response = await axios.post("http://localhost:8000/predict", {
      title: finalTitle,
      category: finalCategory,
      production_complexity: finalComplexity,
      market_demand: "medium", // hardcoded for now
    });

    console.log(response.data, "Prediction response");

    // Apply floor operation here
    setData((prevData) => ({
      ...prevData,
      price: Math.floor(response.data.data.price),
    }));
  } catch (error) {
    console.error("Prediction error:", error);
  }
};


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const formData = new FormData();
      formData.append(
        "title",
        data.title === "other" ? data.customTitle : data.title
      );
      formData.append("description", data.description);
      formData.append(
        "category",
        data.category === "other" ? data.customCategory : data.category
      );
      formData.append("price", data.price);
      formData.append("productquantity", data.productquantity);
      formData.append(
        "production_complexity",
        data.production_complexity === "other"
          ? data.customComplexity
          : data.production_complexity
      );
      formData.append("addedByType", data.addedByType);
      formData.append("addedBy", data.addedBy);
      formData.append("image", data.image);

      const response = await axios.post(
        "http://localhost:8000/product/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success === true) {
        setShowModal(true);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.log("error in frontend", error);
    }
  };

  const titleCategoryMap = {
    cloth_shopping_bag: ["cotton", "jute"],
    beeswax_food_wrap: ["cotton_beeswax"],
    bamboo_toothbrush: ["bamboo"],
    reusable_kitchen_towel: ["cotton"],
    coconut_shell_bowl: ["coconut_shell"],
    natural_soap_shampoo: ["herbal"],
    handmade_candle: ["soy_wax", "beeswax"],
    organic_cosmetic: ["herbal_oil"],
    handwoven_clothes: ["khadi", "organic_cotton"],
    jute_slipper: ["jute", "jute_cotton"],
    handmade_jewelry: ["wood_seeds", "recycled_materials"],
    handmade_basket: ["jute", "bamboo", "cane"],
    terracotta_planter: ["clay"],
    recycled_paper_notebook: ["recycled_paper"],
    other: [],
  };

  const availableCategories =
    data.title && titleCategoryMap[data.title]?.length
      ? titleCategoryMap[data.title]
      : [
          "beeswax",
          "bamboo",
          "coconut_shell",
          "jute_cotton",
          "khadi",
          "cotton_beeswax",
          "herbal_oil",
          "clay",
          "cane",
          "recycled_paper",
          "wood_seeds",
          "soy_wax",
          "organic_cotton",
          "cotton",
          "jute",
          "herbal",
          "recycled_materials",
        ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-[30rem] max-w-xl h-auto bg-white p-8 rounded-lg shadow mt-[7rem] mb-10">
        <form onSubmit={handleSubmit}>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">ADD ITEM</h2>

          {/* Title Dropdown */}
          <label className="block text-sm font-medium text-gray-900">
            Product Name
          </label>
          <select
            name="title"
            value={data.title}
            onChange={handlechange}
            className="w-full border p-2 mt-1 rounded"
          >
            <option value="">Select a product</option>
            <option value="handmade_candle">Candle</option>
            <option value="bamboo_toothbrush">bamboo_toothbrush</option>
            <option value="coconut_shell_bowl">coconut_shell_bowl</option>
            <option value="jute_slipper">Slipper</option>
            <option value="beeswax_food_wrap">beeswax_food_wrap</option>
            <option value="organic_cosmetic">Organic Cosmetic</option>
            <option value="terracotta_planter">Planter</option>
            <option value="handwoven_clothes">handwoven_clothes</option>
            <option value="recycled_paper_notebook">
              recycled_paper_notebook
            </option>
            <option value="handmade_jewelry">Jewelry</option>
            <option value="reusable_kitchen_towel">
              reusable_kitchen_towel
            </option>
            <option value="cloth_shopping_bag">cloth_shopping_bag</option>
            <option value="natural_soap_shampoo">Soap & Shampoo</option>
            <option value="handmade_basket">handmade_basket</option>
            {/* <option value="toys">Toys</option>
            <option value="lights">Lights</option>
            <option value="bottles">Bottles</option> */}
            <option value="menstrual_products">Menstrual Products</option>
            {/* <option value="straws">Straws</option> */}
            <option value="other">Other</option>
          </select>
          {data.title === "other" && (
            <input
              type="text"
              name="customTitle"
              value={data.customTitle}
              onChange={handlechange}
              placeholder="Enter product name"
              className="w-full border p-2 mt-2 rounded"
            />
          )}

          {/* Category Dropdown */}
          <label className="block mt-4 text-sm font-medium text-gray-900">
            Category
          </label>
          <select
            name="category"
            value={data.category}
            onChange={handlechange}
            className="w-full border p-2 mt-1 rounded"
          >
            <option value="">-- Select Category --</option>
            {availableCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase())}
              </option>
            ))}
            <option value="other">Other</option>
          </select>
          {data.category === "other" && (
            <input
              type="text"
              name="customCategory"
              value={data.customCategory}
              onChange={handlechange}
              placeholder="Enter category"
              className="w-full border p-2 mt-2 rounded"
            />
          )}

          {/* Complexity Dropdown */}
          <label className="block mt-4 text-sm font-medium text-gray-900">
            Production Complexity
          </label>
          <select
            name="production_complexity"
            value={data.production_complexity}
            onChange={handlechange}
            className="w-full border p-2 mt-1 rounded"
          >
            <option value="">-- Select Complexity --</option>
            <option value="machine_made">Machine Made</option>
            <option value="handmade">Handmade</option>
            <option value="other">Other</option>
          </select>
          {data.production_complexity === "other" && (
            <input
              type="text"
              name="customComplexity"
              value={data.customComplexity}
              onChange={handlechange}
              placeholder="Enter complexity"
              className="w-full border p-2 mt-2 rounded"
            />
          )}

          <button
            className="mt-2 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition duration-200"
            type="button"
            onClick={handlepredict}
          >
            Predict Price
          </button>

          {/* Price */}
          <label className="block mt-4 text-sm font-medium text-gray-900">
            Price
          </label>
          <input
            type="text"
            name="price"
            value={data.price}
            onChange={handlechange}
            className="w-full border p-2 rounded"
          />

          {/* Description */}
          <label className="block mt-4 text-sm font-medium text-gray-900">
            Description
          </label>
          <textarea
            name="description"
            value={data.description}
            onChange={handlechange}
            rows={3}
            className="w-full border p-2 rounded"
          ></textarea>

          {/* Image */}
          <label className="block mt-4 text-sm font-medium text-gray-900">
            Image
          </label>
          <input
            type="file"
            onChange={(e) => setData({ ...data, image: e.target.files[0] })}
            className="w-full"
          />

          {/* Quantity */}
          <label className="block mt-4 text-sm font-medium text-gray-900">
            Quantity
          </label>
          <input
            type="number"
            name="productquantity"
            value={data.productquantity}
            onChange={handlechange}
            className="w-full border p-2 rounded"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 mt-6 rounded hover:bg-indigo-500"
          >
            Save Product
          </button>
        </form>

        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-sm w-full">
              <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-green-100">
                <svg
                  className="size-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                Product added
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="mt-6 rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-500"
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Additem;
