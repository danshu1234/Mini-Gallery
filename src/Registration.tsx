import { ChangeEvent, FC, useEffect, useState } from "react";
interface PropsReg {
    authorization: string,
    setAuthorization: Function,
}
const Registration: FC <PropsReg> = (props) => {
    const [log, setLog] = useState <string> ('')
    const [pass, setPass] = useState <string> ('')
    const [isEnter, setIsEnter] = useState <string> ('')
    interface Enter {
        login: string,
        password: string,
    }
    return (
        <div>
            <input placeholder="login" onChange={(event: ChangeEvent <HTMLInputElement>) => {
                setLog(event.target.value)
                setIsEnter('')
            }}/><br/>
            <input placeholder="password" onChange={(event: ChangeEvent <HTMLInputElement>) => {
                setPass(event.target.value)
                setIsEnter('')
            }}/><br/>
            <button onClick={() => {
                if (log !== '' && pass !== '') {
                    const arrPass = pass.split('')
                    if (arrPass.length < 8) {
                        setIsEnter('Парль должен состоять не менее чем из 8 символов')
                    } else {
                        setIsEnter('Вы успешно зарегистрированы...')
                        setTimeout(() => {
                            props.setAuthorization('succes')
                        }, 1500);
                        const dataEnter: Enter = {
                            login: log,
                            password: pass
                        }
                        localStorage.setItem('dataEnter', JSON.stringify(dataEnter))
                        localStorage.setItem('authorizate', 'succes')
                    }
                } else {
                    setIsEnter('Пожалуйста, введите логин и пароль')
                }
            }}>Зарегистрироваться</button><br/>
            {isEnter}
        </div>
    )
}
export default Registration