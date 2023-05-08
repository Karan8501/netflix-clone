import React from 'react'
import Cardslider from './Cardslider'


function Slider({movies}) {

    const getMoviesFromRange =(from,to) =>{
        return movies.slice(from,to);
    }
  return (
    <div>
        <Cardslider title ="Tarending Now" data={getMoviesFromRange(0,10)}/>
        <Cardslider title ="New Releases" data={getMoviesFromRange(10,20)}/>
        <Cardslider title ="Block  BusterMovies" data={getMoviesFromRange(20,30)}/>
        <Cardslider title ="Popular On Netflix" data={getMoviesFromRange(30,40)}/>
        <Cardslider title ="Action movies" data={getMoviesFromRange(40,50)}/>
        <Cardslider title ="Epic" data={getMoviesFromRange(50,60)}/>
      
    </div>
  )
}

export default Slider
