import { ChangeEvent, FC, useEffect, useState } from "react";
import '../Styles/Enter.css'
interface PropsReg {
    authorization: string;
    setAuthorization: Function;
}

const Registration: FC<PropsReg> = (props) => {
    const [log, setLog] = useState<string>('')
    const [pass, setPass] = useState<string>('')
    const [isEnter, setIsEnter] = useState<string>('')

    interface Enter {
        login: string;
        password: string;
    }

    return (
        <div className="reg-container">
            <h2 className="head-reg">Mini-Gallery</h2>
            <input placeholder="login" onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setLog(event.target.value);
                    setIsEnter('');
                }} 
                className="login-reg-input" 
            /><br/>
            <input placeholder="password" 
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setPass(event.target.value);
                    setIsEnter('');
                }} 
                className="password-reg-input" 
            />
            <button onClick={() => {
                    if (log !== '' && pass !== '') {
                        const arrPass = pass.split('');
                        if (arrPass.length < 8) {
                            setIsEnter('Пароль - не менее 8 символов')
                        } else {
                            setIsEnter('Вы успешно зарегистрированы...')
                            setTimeout(() => {
                                props.setAuthorization('succes')
                            }, 1500);
                            const dataEnter: Enter = {
                                login: log,
                                password: pass
                            };
                            localStorage.setItem('dataEnter', JSON.stringify(dataEnter))
                            localStorage.setItem('authorizate', 'succes')
                        }
                    } else {
                        setIsEnter('Пожалуйста, введите данные')
                    }
                }} 
                className="reg-btn"
            >
                Зарегистрироваться
            </button>
            <p className="data-reg">{isEnter}</p>
        </div>
    );
}

export default Registration;
