import { ChangeEvent, FC } from "react";
import { useState } from "react";
interface PropsEnter {
    authorization: string,
    setAuthorization: Function,
}
const Enter: FC <PropsEnter> = (props) => {
    const [log, setLog] = useState <string> ('')
    const [pass, setPass] = useState <string> ('')
    const [isEnter, setIsEnter] = useState <string> ('')
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
                    const getStorage = localStorage.getItem('dataEnter')
                    if (getStorage) {
                        const parseStorage = JSON.parse(getStorage)
                        if (parseStorage.login === log && parseStorage.password === pass) {
                            setIsEnter('Вы успешно вошли в систему...')
                            setTimeout(() => {
                                props.setAuthorization('succes')
                            }, 1500);
                            localStorage.setItem('authorizate', 'succes')
                        } else {
                            setIsEnter('Вы ввели неверные данные')
                        }
                    }
                } else {
                    setIsEnter('Пожалуйста, введите данные для входа')
                }
            }}>Войти</button><br/>
            {isEnter}
        </div>
    )
}

export default Enter