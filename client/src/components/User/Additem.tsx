import React, { useState } from 'react';
import axios from "axios"

function Additem() {
  const [showModal, setShowModal] = useState(false);



  const [data, setData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    image: null,
    productquantity: null,
    productcode: "",
    addedByType: "users",
    addedBy: localStorage.getItem("userid")
  })
  const handlechange = (e) => {
    const { name, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: name === 'productquantity' ? Number(value) : value
    }));
  };
  const validateForm = () => {
    const {
      title, description, category, price, productquantity,
      productcode, image
    } = data;

    if (
      !title || !description || !category || !price ||
      !productquantity || !productcode || !image
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

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  try {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("price", data.price);
    formData.append("productquantity", data.productquantity);
    formData.append("productcode", data.productcode);
    formData.append("addedByType", data.addedByType);
    formData.append("addedBy", data.addedBy);
    formData.append("image", data.image);

    const response = await axios.post("http://localhost:8000/product/add", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

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



  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-[30rem] max-w-xl h-[54rem] bg-white p-8 rounded-lg shadow mt-[7rem] mb-10">
        <form onSubmit={handleSubmit}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10">
              <h2 className="text-lg font-semibold text-gray-900">ADD ITEM</h2>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label htmlFor="username" className="block text-sm font-medium text-gray-900">Product Name</label>
                  <div className="">
                    <div className="flex items-center rounded-md bg-white pl-3 border border-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
                      <input onChange={handlechange} value={data.title}
                        type="text"
                        name="title"
                        id="username"
                        className="block w-full py-1.5 px-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-full">
                  <label htmlFor="about" className="block text-sm font-medium text-gray-900">Product description</label>
                  <div className="mt-2">
                    <textarea onChange={handlechange} value={data.description}
                      name="description"
                      id="about"
                      rows="3"
                      className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label htmlFor="cover-photo" className="block text-sm font-medium text-gray-900">Product picture</label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      <svg className="mx-auto size-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon">
                        <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clipRule="evenodd" />
                      </svg>
                      <div className="mt-4 flex text-sm text-gray-600">
                        <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500">
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="image"
                            type="file"
                            className="sr-only"
                            onChange={(e) => setData({ ...data, image: e.target.files[0] })}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-600">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-900">Price</label>
                  <input
                    type="text" onChange={handlechange} value={data.price}
                    name="price"
                    id="first-name"
                    className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600"
                  />
                </div>
                <div className="sm:col-span-3">
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-900">category</label>
                  <input
                    type="text" onChange={handlechange} value={data.category}
                    name="category"
                    id="first-name"
                    className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="last-name" className="block text-sm font-medium text-gray-900">Quantity</label>
                  <input
                    type="number" onChange={handlechange} value={data.productquantity}
                    name="productquantity"
                    id="last-name"
                    className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600"
                  />
                </div>

                <div className="sm:col-span-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-900">Product Code</label>
                  <input
                    id="email" onChange={handlechange} value={data.productcode}
                    name="productcode"
                    type="text"
                    className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button type="button" className="text-sm font-semibold text-gray-900">Cancel</button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-sm w-full">
            <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-green-100">
              <svg className="size-8 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>

            <h3 className="mt-4 text-lg font-semibold text-gray-900">Product added</h3>

            <div className="mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-500"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Additem;
