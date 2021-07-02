import React, { useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import Photo from './Photo'
// const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`
const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`
const mainUrl = `https://api.unsplash.com/photos/`
const searchUrl = `https://api.unsplash.com/search/photos/`

function App() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]); //empty array
  const fetchImages = async () => {
    setLoading(true)
    let url; //it will change depending on weather we search the photo.
    url = `${mainUrl}${clientID}` // check the env file in root
    try {
      const response = await fetch(url);
      const data = await response.json();
      setPhotos(data);
      setLoading(false);
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  }
  useEffect(() => {
    fetchImages()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("hello");
  }

  return (
  <main>
    <section className="search">
      <form action="" className="search-form">
        <input type="text" placeholder="검색" className="form-input"/>
        <button type="submit" className="submit-btn" onClick={handleSubmit}><FaSearch/></button>
      </form>
    </section>
    <section className='photos'>
      <div className="photo-center">
        {photos.map((image, index) => {
          return <Photo key={image.id}{...image}/> //Photo.js 
        })}
      </div>
        {loading && <h2 className="loading">Loading</h2>}
    </section>
  </main>
  )
}

export default App
