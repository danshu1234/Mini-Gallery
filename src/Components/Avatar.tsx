import React, { ChangeEvent, FC, useEffect, useState } from "react";
import '../Styles/Avatar.css';

interface PropsAvatar {
    authorization: string,
    setAuthorization: Function,
}

const Avatar: FC<PropsAvatar> = (props) => {
    const [ava, setAva] = useState<string | null>(null);
 let avatar;
    let miniAvatar;

    if (ava == null) {
        miniAvatar = <div className="miniAva"></div>;
    } else {
        miniAvatar = <img src={ava} className="miniAvatar" alt="Мини-аватар"/>;
    }

    if (ava == null) {
        avatar = <div className="avatar"><p className="hereAvatar">Здесь будет ваш аватар</p></div>;
    } else {
        avatar = <img src={ava} className="ava" alt="Аватар"/>;
    }

    useEffect(() => {
        const storedAvatar = localStorage.getItem('avatar');
        if (storedAvatar) {
            setAva(storedAvatar);
        }
    }, []);

    return (
        <div className="avatar-contain">
            {avatar}
            <label className="custom-ava-upload">
                Выбрать аватар
                <input type="file" accept=".jpg,.jpeg,.png" onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        const files = event.target.files;
                        if (files !== null && files.length > 0) {
                            const file = files[0];
                            const reader = new FileReader();
                            reader.onload = (e) => {
                                setAva(e.target?.result as string);
                                localStorage.setItem('avatar', e.target?.result as string);
                            };
                            reader.readAsDataURL(file);
                        }
                    }} 
                />
            </label>
            {miniAvatar}
        </div>
    );
}

export default Avatar;
