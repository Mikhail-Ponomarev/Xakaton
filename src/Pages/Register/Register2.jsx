import styles from './Register.module.scss'
import pic3Lines from '../Auth/pic3Lines.png'
import Oggetto from '../Auth/Oggetto.png'
import { useRef, useState } from 'react'
import { setInfo } from '../../store/Slice2'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const Reg2 = () => {
    const [value1, setValue1] = useState(0)
    const [value2, setValue2] = useState(0)
    const ref1 = useRef(null)
    const ref2 = useRef(null)
    const ref3 = useRef(null)
    const ref4 = useRef(null)
    const ref5 = useRef(null)
    const dispath = useDispatch()
    const navigate = useNavigate()

    const DATE_REGEXP = /^\d{2}\.\d{2}\.\d{4}$/

    function isDateValid(value) {
        return DATE_REGEXP.test(value);
    }




    const handleSubmit = (e) => {
        e.preventDefault()
        const lastname = ref1.current.value
        const name = ref2.current.value
        const date = ref3.current.value
        const post = ref4.current.value
        const hobbies = ref5.current.value

        if(!isDateValid(date)) {
            setValue1(1)
        } else if(!ref1 || !ref2 || !ref3 || !ref4 || !ref5) {
            setValue2(1)
        } else {
            dispath(setInfo({lastname: lastname, name: name, date: date, post: post, hobbies: hobbies}))
            navigate('/Reg2')
        }
        
    }


    return(
        <div className={styles.con}>
            <div className={styles.con_col1}>
                <div className={styles.con_col2_logo}>
                    <img src={Oggetto} alt=""  className={styles.con_pic}/>
                </div>
                <div className={styles.con_col1_pic}>
                    <img src={pic3Lines} alt='' className={styles.con_picReverse} />
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className={styles.con_col2}>
                    <p className={styles.con_col2_header}>Заполните данные о себе</p>

                    <div className={styles.con_col2_inputBlock}>
                        <div className={styles.con_col2_inputBlock_cont1}>
                            <label className={styles.con_label}>фамилия</label>
                            <input type="text"  className={styles.con_input1} ref={ref1}/>
                        </div>
                        <div className={styles.con_col2_inputBlock_cont1}>
                            <label className={styles.con_label}>имя</label>
                            <input type="text"  className={styles.con_input1} ref={ref2}/>
                        </div>
                    </div>

                    <div className={styles.con_col2_block}>
                        <label className={styles.con_label}>дата рождения</label>
                        <input type="text" placeholder='25.04.1985' ref={ref3} className={styles.con_col2_input}/>
                    </div>
                    <div className={styles.con_col2_block}>
                        <label className={styles.con_label}>должность</label>
                        <input type="text"  ref={ref4} className={styles.con_col2_input}/>
                    </div>
                    <div className={styles.con_col2_block}>
                        <label className={styles.con_label}>активности (не более 4)</label>
                        <input type="text"  ref={ref5} className={styles.con_col2_input}/>
                    </div>

                    <button type='submit' className={styles.con_col2_btn}>продолжить</button>
                    <p style={{opacity: value1, fontSize: '24px', color: 'red'}}>Дата рождения некорректна</p>
                    <p style={{opacity: value2, fontSize: '24px', color: 'red'}}>Не все поля заполнены</p>
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

export default Reg2