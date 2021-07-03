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

  useEffect(()=> {
    const event = window.addEventListener('scroll', ()=> {
      // console.log(`innerHeight ${window.innerHeight}`);
      // console.log(`scrollY ${window.scrollY}`);
      // console.log(`body height ${document.body.scrollHeight}`); 
      // if((window.innerHeight + window.scrollY) >= document.body.scrollHeight) { // 이것보다 크거나 같으면
      //   // console.log('check!!'); // 스크롤이 끝까지 내려가면 check가 콘솔에 출력된다. -> 이것을 이용해 image fetch
      // } 

      if(!loading && (window.innerHeight + window.scrollY) >= document.body.scrollHeight) { //loading이 되고 있지 않을 때에만 실행
        console.log('check');
      } 

    }); //스크롤 이벤트가 발생하면 
    return () => window.removeEventListener('scroll', event);
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
      <div className="photos-center">
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
