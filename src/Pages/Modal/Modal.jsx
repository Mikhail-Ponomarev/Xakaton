import styles from './Modal.module.scss'
import pic from './add_delete.png'

const Modal = ({func, value, text}) => {
    if(value === 0) {
        return <></>
    }
    return(
        <div className={styles.cont}>
            <div className={styles.cont_line1}>
                <input className={styles.cont_line1_text} placeholder='Создать встречу' />
                <img src={pic} alt="" className={styles.cont_line1_pic} onClick={() => func(0)} />
            </div>

            <div className={styles.cont_line2}>
                <p className={styles.cont_line2_label}>Описание</p>
                <textarea className={styles.cont_line2_text} placeholder='Добавить описание'>
                </textarea>
            </div>

            <div className={styles.cont_line3}>
                    <div className={styles.cont_line3_block1}>
                        <input type='radio' name='tmp' className={styles.cont_line3_block1_input} />
                        <label className={styles.cont_line3_block1_label}>онлайн</label>
                    </div>

                    <div className={styles.cont_line3_block2}>
                        <input type='radio' name='tmp' className={styles.cont_line3_block1_input}/>
                        <label className={styles.cont_line3_block1_label}>офлайн</label>
                    </div>
            </div>

            <div className={styles.cont_line4}>
                <p className={styles.cont_line2_label}>Введите дату и время</p>
                <input className={styles.cont_line4_text} placeholder='12 декабря в 12:00' />
            </div>


            <button className={styles.cont_btn}>
                {text}
            </button>

        </div>
    )
}


export {Modal}