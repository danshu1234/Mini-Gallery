import React, { useEffect, useState } from 'react';
import './App.css';
import Avatar from './Avatar';
import Photos from './Photos';
import Favorites from './Favorites';
import { useNavigate, Route, Routes, useLocation } from 'react-router-dom';
function App() {
  const navigate = useNavigate()
  const [favorites, setFavorites] = useState <string[]> ([])
  const [btnFavorites, setBtnFavorites] = useState <boolean> (true)
  const [dark, setDark] = useState <boolean> (false)
  const location = useLocation()
  let btnFav;
  let theme;
  if (btnFavorites == true) {
    btnFav = <button className='favorites-btn' onClick={() => {
      navigate('/favorites')
    }}>Избранное</button>
  }
  if (dark == false) {
    theme = <div className='light-topic'>
    {btnFav}
    <label className="switch">
        <input type="checkbox" onChange={() => {
          setDark(!dark)
          localStorage.setItem('dark', JSON.stringify(!dark))
        }}/>
        <span className="slider"></span>
    </label>
    <Routes>
      <Route path='favorites' element = {<Favorites  favorites={favorites} setFavorites={setFavorites}/>}/>
      <Route path='/' element = {<div>
        <Avatar/>
        <Photos favorites={favorites} setFavorites={setFavorites}/>
      </div>}/>
    </Routes>
    </div>
  } else if (dark == true) {
    theme = <div className='dark-topic'>
    {btnFav}
    <label className="switch">
        <input type="checkbox" onChange={() => {
          setDark(!dark)
          localStorage.setItem('dark', JSON.stringify(!dark))
        }}/>
        <span className="slider"></span>
    </label>
    <Routes>
      <Route path='favorites' element = {<Favorites  favorites={favorites} setFavorites={setFavorites}/>}/>
      <Route path='/' element = {<div>
        <Avatar/>
        <Photos favorites={favorites} setFavorites={setFavorites}/>
      </div>}/>
    </Routes>
    </div>
  }
  useEffect(() => {
    const arrFavorites = localStorage.getItem('favorites')
    if (arrFavorites){
      setFavorites(JSON.parse(arrFavorites))
    }
    const isDark = localStorage.getItem('dark')
    if (isDark) {
      setDark(JSON.parse(isDark))
    }
  }, [])
  useEffect(() => {
    if (location.pathname == '/'){
      setBtnFavorites(true)
    } else {
      setBtnFavorites(false)
    }
  })
  return ( 
    <div>
    {theme}
    </div>
  );
}

export default App;
