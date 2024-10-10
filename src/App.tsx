import React, { useEffect, useState } from 'react';
import './App.css';
import Avatar from './Avatar';
import Photos from './Photos';
import Favorites from './Favorites';
import { useNavigate, Route, Routes } from 'react-router-dom';
function App() {
  const navigate = useNavigate()
  const [favorites, setFavorites] = useState <string[]> ([])
  return (
    <div>
    <button className='favourites' onClick={() => {
      navigate('/favorites')
    }}>Избранное</button>
    <Routes>
      <Route path='favorites' element = {<Favorites favorites={favorites}/>}/>
      <Route path='/' element = {<div>
        <Avatar/>
        <Photos favorites={favorites} setFavorites={setFavorites}/>
      </div>}/>
    </Routes>
    </div>
  );
}

export default App;
