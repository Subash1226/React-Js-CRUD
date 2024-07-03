import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'

export default function Home() {
  const [data,setData] = useState([]);
  // useEffect(()=>{
  //   fetch('https://fakestoreapi.com/products')
  //   .then((res)=>res.json())
  //   .then((data)=>setData(data));
  // },[]);
  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
    .then((response) => {
      setData(response.data)
    });
  },[]);
  return (
    <>

{data.map((product)=>(
  <div key={product.id}>
  <p>{product.title}</p>
  <p>{product.price}</p>
  <img src={product.image} width={100} height={100} alt="" />
  <p>{product.description}</p>
</div>
))}

    <div>Home</div>
    <Link to="/about">About</Link>
    </>
  );
}
