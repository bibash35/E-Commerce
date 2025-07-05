import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';

const NewProduct = () => {
  const [data, setData] = useState({
    name: '',
    category: '',
    image:'',
    price: '',
    description: ''
  });
  const [products, setProducts] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://e-commerce-backend-6kxk.onrender.com/api/products');
      setProducts(response.data);
    } catch (error) {
      toast.error('Failed to fetch products.');
    }
  };

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setData({ ...data, image: e.target.files[0] });
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let token = localStorage.getItem("token");

    let formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }

    try {
      if (editMode) {
        await axios.put(`https://e-commerce-backend-6kxk.onrender.com/api/products/${selectedProductId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          },
        });
        toast.success('Product updated successfully!');
      } else {
        await axios.post('https://e-commerce-backend-6kxk.onrender.com/api/products', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          },
        });
        toast.success('Product added successfully!');
      }
      setData({ name: '', category: '', image: '', price: '', description: '' });
      setEditMode(false);
      setSelectedProductId(null);
      fetchProducts();
    } catch (error) {
      toast.error('Failed to save product. Please try again.');
    }
  };

  const handleEdit = (product) => {
    setData({
      name: product.name,
      category: product.category,
      image: null, 
      price: product.price,
      description: product.description
    });
    setSelectedProductId(product._id);
    setEditMode(true);
  };

  const handleDelete = async (id) => {
    let token = localStorage.getItem("token");
    try {
      await axios.delete(`https://e-commerce-backend-6kxk.onrender.com/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success('Product deleted successfully!');
      fetchProducts();
    } catch (error) {
      toast.error('Failed to delete product.');
    }
  };

  return (
    <div className='p-4'>
      <Toaster />
      <form
        className='m-auto w-full max-w-md p-3 shadow-md flex flex-col bg-white'
        onSubmit={handleSubmit}
      >
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          name='name'
          value={data.name}
          onChange={handleChange}
          className='bg-slate-200 p-1 my-1'
        />

        <label htmlFor='category'>Category</label>
        <select
          className='bg-slate-200 p-1 my-1'
          id='category'
          name='category'
          value={data.category}
          onChange={handleChange}
        >
          <option value=''>Select category</option>
          <option value='fruits'>Fruits</option>
          <option value='vegetable'>Vegetable</option>
          <option value='icecream'>Ice Cream</option>
          <option value='dosa'>Dosa</option>
          <option value='pizza'>Pizza</option>
          <option value='rice'>Rice</option>
          <option value='cake'>Cake</option>
          <option value='burger'>Burger</option>
          <option value='sandwich'>Sandwich</option>
        </select>

        <label htmlFor='image'>image</label>
        <input
          type='file'
          name='image'
          onChange={handleChange}
          accept='image/*'
          id='image'
          className='bg-slate-200 p-1 my-1'
        />

        <label htmlFor='price' className='my-1'>Price</label>
        <input
          type='text'
          className='bg-slate-200 p-1 my-1'
          name='price'
          value={data.price}
          onChange={handleChange}
        />

        <label htmlFor='description'>Description</label>
        <textarea
          rows={2}
          name='description'
          value={data.description}
          onChange={handleChange}
          className='bg-slate-200 p-1 my-1 resize-none'
        ></textarea>

        <button
          type='submit'
          className='bg-red-500 hover:bg-red-600 text-white text-lg font-medium my-2 drop-shadow'
        >
          {editMode ? 'Update' : 'Add'} Product
        </button>
      </form>

      <div className="mt-12">
        <h1 className="text-2xl font-bold mb-4">Products</h1>
        <div>
          {products.map((product) => (
            <div key={product._id} className="flex items-center justify-between
            p-4 mb-8 border border-black rounded-md shadow-lg">
              <div>
                <p className="font-semibold">{product.name}</p>
              </div>
              <div>
                <button
                  onClick={() => handleEdit(product)}
                  className="mr-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
