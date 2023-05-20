import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function MovieDetails() {
  let { id, mediaType } = useParams()

  const [details, setdDetails] = useState({})

  async function getTrending(id, mediaType) {

    let { data } = await axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=b7bb611fc2fd5976c520c5d4885876b5&language=en-US`)
    setdDetails(data)
    console.log(data);
  }

  useEffect(() => {
    getTrending(id, mediaType)
  }, [])


  return (
    <>
      <div className="row py-5">
        <div className="col-md-3">
          {details.poster_path ? <img src={'https://image.tmdb.org/t/p/w500' + details.poster_path} className='w-100' alt="" /> :
            <img src={'https://image.tmdb.org/t/p/w500' + details.profile_path} className='w-100' alt="" />
          }
        </div>
        <div className="col-md-6 d-flex align-items-center">
          <div className=''>
            <h2>{details.title}{details.name}</h2>
            <p className='text-muted my-3'>{details.overview} {details.biography}</p>
            {details.vote_average? <h4>Vote : {details.vote_average}</h4> : ""}
            {details.vote_average? <h4>Vote Count : {details.vote_count}</h4> : ""}
            
          </div>
        </div>
      </div>

    </>
  )
}
