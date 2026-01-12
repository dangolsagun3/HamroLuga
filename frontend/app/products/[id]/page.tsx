
'use client'
import React from 'react'
import { useState, useEffect } from 'react';

const id = () => {
    const[product,setProduct]=useState<any>(null);
    const fetchProducts=async()=>{
        try{
            const response=await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
            const data=await response.json();
            setProduct(data);
        }catch(error){
            console.error("Error fetching product:",error);
        }
        useEffect(()=>{
            fetchProducts();
        },[]);
    };
  return (
    <div>
        {JSON.stringify(product)}
    </div>

  )
}

export default id