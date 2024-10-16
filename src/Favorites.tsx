import { FC, useEffect, useState } from "react";
interface PropsFavorites {
   favorites: string[] 
   setFavorites: Function
}
const Favorites: FC <PropsFavorites> = (props) => {
    let emptiness;
    if (props.favorites.length == 0) {
        emptiness = <h1>Здесь пока пусто</h1>
    }
    return (
        <div className="favorites-contain">
            {emptiness}
            <ul className="favorites">
            {props.favorites.map((item, index) => {
                return <li key={index}><div><img src={item} className="favorite"/><p className="delete-from-favorites" onClick={() => {
                    const filterFavorites = props.favorites.filter((el) => el !== item)
                    if (filterFavorites.length == 0) {
                        localStorage.setItem('favorites', JSON.stringify([]))
                        props.setFavorites([])
                    } else {
                        props.setFavorites(filterFavorites)
                        localStorage.setItem('favorites', JSON.stringify(filterFavorites))
                    }
                }}>Удалить из избранного</p></div></li>
            })}
          </ul>
        </div>
    )
}
export default Favorites