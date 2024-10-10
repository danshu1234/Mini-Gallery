import React, { ChangeEvent, FC, useEffect, useState } from "react";
import './App.css'
const Avatar: FC = () => {
    const [ava, setAva] = useState <string | null> (null)
    let avatar;
    if (ava == null) {
        avatar = <div className="avatar"><p className="hereAvatar">Здесь будет ваш аватар</p></div>
    } else {
        avatar = <img src= {ava} className="ava"/>
    }
    useEffect(() => {
            setAva(localStorage.getItem('avatar'))
    }, [])
    return (
        <div>
        {avatar}
        <input type="file" accept=".jpg,.jpeg,.png" onChange={((event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (files !== null && files.length > 0){
            const file = files[0]
            const reader = new FileReader()
            reader.onload = (e) => {
                setAva(e.target?.result as string)
                localStorage.setItem('avatar', e.target?.result as string)
            }
            reader.readAsDataURL(file); 
        }
    })}/><br/>
        </div>
    )
}
export default Avatar