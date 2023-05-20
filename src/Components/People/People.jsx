import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function People() {
    const [people, setPeople] = useState([])
    let mediaType = 'person'
    let nums = new Array(10).fill(1).map((elem,index)=>index +1);
    console.log(nums);
  
    async function getTrending(page) {
      let { data } = await axios.get(`https://api.themoviedb.org/3/person/popular?api_key=b7bb611fc2fd5976c520c5d4885876b5&language=en-US&page=${page}`)
      setPeople(data.results)
      // console.log(data.results);
    }
  
    useEffect(() => {
      getTrending(1)
    }, [])
  
    return (
      <>
        <div className="row">
          {people.map((item, index) =>        <div key={index} className="col-md-3">
            <Link to={`/moviedetails/${item.id}/${mediaType}`} className='text-decoration-none text-white'>
              <div className='position-relative'>
                <img src={'https://image.tmdb.org/t/p/w500' + item.profile_path} className='w-100' alt="" />
  
  
                <h3 className='h5'>{item.name}</h3>
             
  
              </div>
            </Link>
          </div>
   )}
  
        </div>
        <nav className='py-5'>
          <ul className='pagination pagination-sm d-felx justify-content-center'>
            {nums.map((page)=>          <li key={page} onClick={()=>getTrending(page)} className='page-item p-1'>
              <Link  className='page-link bg-transparent text-white'>{page}
              </Link>
            </li>)}
  
          </ul>
        </nav>
      </>
    )

}
