import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import SingleCard from './SingleCard'

const App = () => {

const [formField , setFormField] = useState({name : '' , price : '' , color : ''})

const [data , setData] = useState([])

  const {name , price , color} = formField

  const handleChange = (e) => {
    setFormField({
      ...formField, 
      [e.target.name] : e.target.value
    })
  }

  const handleClick = async(e) => {
    e.preventDefault()

    let response = await axios.post('http://localhost:5174/add-products' , {
      name , price , color
    })

    console.log(response.data)

    getPoducts()

    setFormField({name : '' , price : '' , color : ''})

  }

  const getPoducts = async() => {
    let response = await axios.get('http://localhost:5174/get-products')
    console.log(response.data)
    setData(response.data)
  }

  useEffect(()=> {
    getPoducts()
  } , [])

  return (
    <>
      <div className=" bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-8">
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
                value={name}
                name='name'
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
                value={price}
                name='price'
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
                value={color}
                name='color'
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
     <div className='container px-6 pb-6 grid grid-cols-4 gap-4 bg-gray-100'>
        {
          data?.map((item , index) => {
            return <SingleCard key={index} {...item} getData = {getPoducts}/>
          })
        }
      </div>
    </>
  )
}

export default App
