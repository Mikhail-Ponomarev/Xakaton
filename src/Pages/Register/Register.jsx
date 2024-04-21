import styles from './Register.module.scss'
import pic3Lines from '../Auth/pic3Lines.png'
import Oggetto from '../Auth/Oggetto.png'
import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

const Reg = () => {
    const ref1 = useRef(null)
    const ref2 = useRef(null)
    const ref3 = useRef(null)
    const navigate = useNavigate()
    
    const lastname = useSelector(state => state.red2.lastname)
    const name = useSelector(state => state.red2.name)
    const date = useSelector(state => state.red2.date)
    const post = useSelector(state => state.red2.post)
    const hobbies = useSelector(state => state.red2.hobbies)

    const [value1, setValue1] = useState(0)
    const [value2, setValue2] = useState(0)

    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    function isEmailValid(value) {
        return EMAIL_REGEXP.test(value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const pass = ref2.current.value
        const pass2 = ref3.current.value
        const email = ref1.current.value
        let flag = true
        if(pass != pass2) {
            setValue1(1)
            flag = false
        }
        if(!isEmailValid(email)) {
            setValue2(1)
            flag = false
        }
        if(flag) {
            const responce = await axios.post('http://127.0.0.1:7888/api/auth/login', {
                username: email,
                first_name: name,
                last_name: lastname,
                email: email,
                password: pass
            })
            console.log(responce)
            // navigate('App/FirstPage')
        }
        
    }

    return(
        <div className={styles.con}>
            <div className={styles.con_col1}>
                <div className={styles.con_col1_pic}>
                    <img src={pic3Lines} alt='' className={styles.con_picReverse} />
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className={styles.con_col2}>
                    <div className={styles.con_col2_logo}>
                        <img src={Oggetto} alt=""  className={styles.con_pic}/>
                    </div>
                    <input type="text" placeholder='введите электронную почту' ref={ref1} className={styles.con_col2_input}/>
                    <input type="password" placeholder='придумайте пароль' ref={ref2} className={styles.con_col2_input}/>
                    <input type="password" placeholder='подтвердите пароль' ref={ref3} className={styles.con_col2_input}/>
                    <button type='submit' className={styles.con_col2_btn}>регистрация</button>
                    <p style={{opacity: value1, fontSize: '24px', color: 'red'}}>Пароли не совпадают</p>
                    <p style={{opacity: value2, fontSize: '24px', color: 'red'}}>Не корректный email</p>
                </div>

            </form>
            <div className={styles.con_col3}>
                <div className={styles.con_col3_pic}>
                    <img src={pic3Lines} alt='' className={styles.con_pic} />
                </div>
            </div>
            
            
        </div>
    )
}

export default Reg