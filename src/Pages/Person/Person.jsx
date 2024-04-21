import styles from './Person.module.scss'
import green from './Frame6.png'
import red from './Frame7.png'

const Person = ({pic, name, age, post, hobbies, func, func2}) => {

    return(
        <div className={styles.con}>
            <div className={styles.con_logo}>
                <img src={pic} alt="" className={styles.con_pic} />
            </div>

            <div className={styles.con_info}>
                <p className={styles.con_info_name}>{name}</p>
                <p className={styles.con_info_age}>{age}</p>
                <p className={styles.con_info_job}>{post}</p>
            </div>

            <div className={styles.con_hobbies}>
                <p className={styles.con_hobbies_title}>Увлечения</p>
                {hobbies.map(elem => <p className={styles.con_hobbies_text}>{elem}</p>)}
            </div>

            <div className={styles.con_btns} >
                <img src={green} alt=""  className={styles.con_btns_pic} onClick={() => func2(1)}/>
                <img src={red} alt=""  className={styles.con_btns_pic} onClick={() => func(0)}/>
            </div>

        </div>
    )
    
}

export {Person}