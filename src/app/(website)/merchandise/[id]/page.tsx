import React from 'react'
import ProductDetailSection from '../_Components/ProductDetails'
import GarmentSpecsSection from '../_Components/GarmentSpecsSection'
import ProductImageSlider from '../_Components/RecommendedProducts'
import FAQAccordionSection from '../_Components/FAQAccordionSection'

const page = () => {
  return (
    <div>
      <ProductDetailSection/>
      <GarmentSpecsSection/>
      <ProductImageSlider/>
      <FAQAccordionSection/>
    </div>
  )
}

export default page