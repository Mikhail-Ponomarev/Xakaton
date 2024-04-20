import style from './FirstPage.module.scss'
import molnia from './molnia.png'

const Elem = ({number, days, format, date, time, duration, pic, flag}) => {
    const styleElem = flag == true ? style.container_block2_col1_show_elem : style.container_block2_col1_hide 

    return(
        <div className={styleElem}>
            <div className={style.container_block2_col1_show_elem_picMolnia}>
                <img src={molnia} alt=""  className={style.container_pic}/>
            </div>
            <p className={style.container_block2_col1_show_elem_eventNumber}>
                Событие {number}
            </p>
            <p className={style.container_block2_col1_show_elem_daysToGo}>
                осталось {days} дней
            </p>
            <p className={style.container_block2_col1_show_elem_daysToGo}>
                {format}
            </p>
            <p className={style.container_block2_col1_show_elem_date}>
                {date}
            </p>
            <p className={style.container_block2_col1_show_elem_date}>
                {time}
            </p>
            <p className={style.container_block2_col1_show_elem_date}>
                {duration}
            </p>
            <div className={style.container_block2_col1_show_elem_pic2}>
                <img src={pic} alt=""  className={style.container_pic}/>
            </div>
        </div>
    )
}

export {Elem}