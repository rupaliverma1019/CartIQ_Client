import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { getPersonalRecommendations } from '../../services/personalRecommendationService'
import FeaturedProducts from './FeaturedProducts'

const PersonalRecommendations = () => {
    const {token} = useSelector((state)=>state.auth)
    const [products , setProducts ] = useState([])

    useEffect(()=>{
    if(!token) 
    return;
const loadRecommendations = async() =>{
try {
    const data = await getPersonalRecommendations(token)
setProducts(data.products || [])
} catch (error) {
    console.error(error)
}
}
loadRecommendations()
    },[token])

    if(products.length == 0)
        return null 
  return (
    <div>
        <div className="mt-10">
             <h2 className="text-3xl font-bold mb-6">
        Recommended For You
      </h2>
<FeaturedProducts products={products}/>
        </div>
        
        
    </div>
  )
}

export default PersonalRecommendations