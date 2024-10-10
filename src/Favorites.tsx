import { FC } from "react";
interface PropsFavorites {
   favorites: string[] 
}
const Favorites: FC <PropsFavorites> = (props) => {
    return (
        <div>
            {props.favorites.map((item, index) => {
                return <li key={index}><img src={item}/></li>
            })}
          
        </div>
    )
}
export default Favorites