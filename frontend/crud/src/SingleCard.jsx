import React from 'react'
import { IoTrashSharp } from "react-icons/io5";
import { FiEdit2 } from "react-icons/fi";
import { useState } from 'react';
import axios from 'axios';

const SingleCard = ({name , price , color , id , getData}) => {
    const [show , setShow] = useState(false)
    const [formField , setFormField] = useState({name2 : name , price2 : price , color2 : color})
    const {name2 , price2 , color2} = formField

    const handleChange = (e) => {
        setFormField({
            ...formField, 
            [e.target.name] : e.target.value
        })
    }

    const handleClick = async(e) => {
        e.preventDefault()
        let response = await axios.put(`http://localhost:5174/update-products/${id}`, {
            name : name2 , price : price2 , color : color2
        })
        console.log(response.data); 
        getData(); 
        setShow(false)
    }

    const deleteProduct = async() => {
        let response = await axios.delete(`http://localhost:5174/delete-products/${id}`)
        console.log(response.data)
        getData()
    }

  return (
    <div>
      <div  className=" bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-gray-800">
          {name}
        </h2>

        <span className="flex justify-center items-center gap-2 text-lg font-semibold px-1 py-1">
          <IoTrashSharp onClick={deleteProduct}  className='text-red-500 cursor-pointer'/>
          <FiEdit2 onClick={() => setShow(!show)} className='text-blue-400 cursor-pointer'/>
        </span>
      </div>

      {/* Details */}
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-500">Price</span>
          <span className="font-bold text-green-600">
            ${price}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-500">Color</span>

          <div className="flex items-center gap-2">
            <span
              className="w-4 h-4 rounded-full "
              style={{ backgroundColor: color , border : `1px solid ${color}` }}
            ></span>
          </div>
        </div>
      </div>




        <div className={`${show ? 'block' : 'hidden'} mt-5 bg-white rounded-3xl shadow-2xl border border-gray-200 p-8`}>
          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Add New Product
            </h1>
            <p className="text-gray-500 mt-2">
              Fill in the product details below
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Product Name
              </label>
              <input
                type="text"
                name='name2'
                value={name2}
                onChange={handleChange}
                placeholder="Enter product name"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition duration-300"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Price
              </label>
              <input
                name='price2'
                value={price2}
                onChange={handleChange}
                type="number"
                placeholder="$0.00"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition duration-300"
              />
            </div>

            {/* Color */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Color
              </label>
              <input
                name='color2'
                value={color2}
                onChange={handleChange}
                type="text"
                placeholder="e.g. Black"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition duration-300"
              />
            </div>

            {/* Buttons */}
              <button
                onClick={handleClick}
                type="submit"
                className="w-full active:scale-95 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 shadow-lg hover:shadow-xl transition duration-300"
              >
                Add Product
              </button>
          </form>
        </div>




    </div>
    </div>
  )
}

export default SingleCard
