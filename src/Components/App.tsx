import React, { useEffect, useState } from 'react';
import '../App.css';
import Avatar from './Avatar';
import Photos from './Photos';
import Favorites from './Favorites';
import Registration from './Registration';
import Enter from './Enter';
import { useNavigate, Route, Routes, useLocation } from 'react-router-dom';

function App() {
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState<string[]>([]);
    const [btnFavorites, setBtnFavorites] = useState<boolean>(true);
    const [authorization, setAuthorization] = useState<string>('registration');
    const [showBtn, setShowBtn] = useState<boolean>(false);
    const location = useLocation();

    let authorizate;
    let favAndExit;

    if (authorization === 'registration') {
        authorizate = <Registration authorization={authorization} setAuthorization={setAuthorization} />;
    } else if (authorization === 'succes') {
        authorizate = (
            <div className='succes-contain'>
                <h2 className="name-app">Mini-Gallery</h2>
                <img
                    className="arrow"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Breezeicons-actions-22-go-down.svg/2048px-Breezeicons-actions-22-go-down.svg.png"
                    onClick={() => setShowBtn(!showBtn)}
                />
                <Avatar authorization={authorization} setAuthorization={setAuthorization} />
                <Photos favorites={favorites} setFavorites={setFavorites} />
            </div>
        );
    } else if (authorization === 'enter') {
        authorizate = <Enter authorization={authorization} setAuthorization={setAuthorization} />;
    }

    if (btnFavorites) {
        favAndExit = (
            <div className='favAndExit'>
                <p onClick={() => {
                        navigate('/favorites');
                        setShowBtn(false);
                    }}
                    className='fav-btn'
                >
                    Избранное
                </p>
                <p onClick={() => {
                        setAuthorization('enter');
                        setShowBtn(false);
                        localStorage.setItem('authorizate', 'enter');
                    }}
                    className='exit-btn'
                >
                    Выйти
                </p>
            </div>
        );
    }

    useEffect(() => {
        const arrFavorites = localStorage.getItem('favorites');
        if (arrFavorites) {
            setFavorites(JSON.parse(arrFavorites));
        }
        const isAuthorizate = localStorage.getItem('authorizate');
        if (isAuthorizate) {
            setAuthorization(isAuthorizate);
        }
    }, []);

    useEffect(() => {
        if (location.pathname === '/' && authorization === 'succes' && showBtn) {
            setBtnFavorites(true);
        } else {
            setBtnFavorites(false);
        }
    });

    return (
        <div className='main'>
            {favAndExit}
            <Routes>
                <Route path='favorites' element={<Favorites favorites={favorites} setFavorites={setFavorites} />} />
                <Route path='/' element={authorizate} />
            </Routes>
        </div>
    );
}

export default App;
