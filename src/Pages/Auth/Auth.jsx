import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {setToken} from '../../store/Slice'
import styles from './Auth.module.scss'
import pic3Lines from './pic3Lines.png'
import Oggetto from './Oggetto.png'
import Google from './google.png'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { googleLogout, useGoogleLogin } from '@react-oauth/google';

const Auth = () => {
    const token = useSelector(state => state.red1)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const ref1 = useRef(null)
    const ref2 = useRef(null)

    const [ user, setUser ] = useState([]);
    const [ profile, setProfile ] = useState([]);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    // useEffect(
    //     () => {
    //         if (user) {
    //             axios
    //                 .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
    //                     headers: {
    //                         Authorization: `Bearer ${user.access_token}`,
    //                         Accept: 'application/json'
    //                     }
    //                 })
    //                 .then((res) => {
    //                     setProfile(res.data);
    //                     console.log(res.data)
    //                 })
    //                 .catch((err) => console.log(err));
    //         }
    //     },
    //     [ user ])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await axios.post('https://hackaton-ogetto.space/service/login', {
            username: ref1.current.value,
            password: ref2.current.value
        })
    }
     
    const link = 'https://accounts.google.com/o/oauth2/auth?redirect_uri=https://hackaton-ogetto.space/auth/google/cb/&prompt=consent&response_type=code&client_id=805206962011-jshq1eno4takehaaurr499t1un9pcvft.apps.googleusercontent.com&scope=openid email profile&access_type=offline'

    return(
        <div className={styles.container}>
            <div className={styles.container_block1}>
                <img src={pic3Lines} className={styles.container_block1_pic}/>
            </div>
            <div className={styles.container_block2}>
                <img src={pic3Lines} className={styles.container_block2_picReverse}/>
            </div>
            <div className={styles.container_logo}>
                    <img src={Oggetto} className={styles.container_block1_pic} />
            </div>


            <form className={styles.container_auth} onSubmit={handleSubmit}>
                <div className={styles.container_auth_block1}>
                    <input className={styles.container_auth_block1_input} ref={ref1} type='text' placeholder='электронная почта'/>
                    <input className={styles.container_auth_block1_input} ref={ref2} type='password' placeholder='пароль'/>
                </div>
                <div className={styles.container_auth_block2}>
                    <button type='submit' className={styles.container_auth_block2_btn1}>
                        войти
                    </button>
                    <p className={styles.container_auth_block2_text}>
                        или
                    </p>
                    <button type='submit' className={styles.container_auth_block2_btn2} onClick={login}>
                            <div className={styles.container_auth_block2_btn2_pic}>
                                <img src={Google} alt="" className={styles.container_Google}/>
                            </div>
                            <p className={styles.container_auth_block2_btn2_text}>
                                продолжить с Google
                            </p>
                        </button>
                    <p className={styles.container_auth_block2_text} onClick={() => navigate('Reg')}>
                        Нет аккаунта? Регистрация
                    </p>
                </div>
            </form>
        </div>
    )
}


export default Auth