import { FC, useEffect, useState } from "react";
import '../Styles/Favorites.css'
interface PropsFavorites {
    favorites: string[];
    setFavorites: Function;
}

const Favorites: FC<PropsFavorites> = (props) => {
    let emptiness;

    if (props.favorites.length === 0) {
        emptiness = <h1 className="emptiness">Здесь будут ваши избранные фото</h1>;
    }

    return (
        <div>
            {emptiness}
            <ul className="favorites">
                {props.favorites.map((item, index) => {
                    return (
                        <li key={index}>
                            <div>
                                <img src={item} className="favorite" />
                                <p className="delete-from-favorites"
                                    onClick={() => {
                                        const filterFavorites = props.favorites.filter((el) => el !== item);
                                        if (filterFavorites.length === 0) {
                                            localStorage.setItem('favorites', JSON.stringify([]));
                                            props.setFavorites([]);
                                        } else {
                                            props.setFavorites(filterFavorites);
                                            localStorage.setItem('favorites', JSON.stringify(filterFavorites));
                                        }
                                    }}
                                >
                                    Удалить из избранного
                                </p>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Favorites;
