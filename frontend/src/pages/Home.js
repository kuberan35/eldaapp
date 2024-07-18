import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>
      <VerticalCardProduct category={"televisions"} heading={"Televisions"}/>
      <VerticalCardProduct category={"tower fans"} heading={"Tower Fans"}/>
      <VerticalCardProduct category={"kettles"} heading={"Kettles"}/> 
    </div>
  )
}

export default Home