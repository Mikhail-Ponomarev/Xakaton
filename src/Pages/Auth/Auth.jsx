import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {setToken} from '../../store/Slice'
import styles from './Auth.module.scss'
import pic3Lines from './pic3Lines.png'
import Oggetto from './Oggetto.png'
import Google from './google.png'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'

const Auth = () => {
    const token = useSelector(state => state.red1)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const ref1 = useRef(null)
    const ref2 = useRef(null)


    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await axios.post('https://hackaton-ogetto.space/api/token', {
            username: ref1.current.value,
            password: ref2.current.value
        })
        console.log(response)
    }
     
    const link = 'https://accounts.google.com/o/oauth2/auth?redirect_uri=https://hackaton-ogetto.space/auth/google/cb/&prompt=consent&response_type=code&client_id=805206962011-jshq1eno4takehaaurr499t1un9pcvft.apps.googleusercontent.com&scope=openid email profile&access_type=offline'

    return(
      <div className={styles.container}>

        <div className={styles.container_col1}>
            <div className={styles.container_col1_picReverse}>
                <img src={pic3Lines} alt="" className={styles.container_pic} />
            </div>
        </div>

        <div className={styles.container_col2}>
            <div className={styles.container_col2_oggetto}>
                <img src={Oggetto} alt="" className={styles.container_pic} />
            </div>

            <form onSubmit={handleSubmit}>

                <input type='text' ref={ref1} className={styles.container_col2_input} placeholder='электронная почта' />

                <input type='password' ref={ref2} className={styles.container_col2_input} placeholder='пароль' />

                <button type='submit' className={styles.container_col2_btn}>войти</button>

            </form>

            <p className={styles.container_col2_text}>или</p>

            <button className={styles.container_col2_btn2}>
                <div className={styles.container_col2_btn2_pic}>
                    <img src={Google} alt="" className={styles.container_pic2} />
                </div>
                <p className={styles.container_col2_btn2_text}>продолжить с Google</p>
            </button>

            <p className={styles.container_col2_text} onClick={() => navigate('Reg')} >Нет аккаунта? Регистрация</p>

        </div>

        <div className={styles.container_col3}>
            <div className={styles.container_col3_pic}>
                <img src={pic3Lines} alt="" className={styles.container_pic} />
            </div>
        </div>

      </div>
    )
}


export default Auth