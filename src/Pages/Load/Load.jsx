import style from './Load.module.scss'
import sun from './oggetto-sign.png'
const Load = ({func}) => {

    setTimeout(() => {
        func(2)
    }, 2500)

    return(
        <div className={style.cont}>
            <img src={sun} alt="" className={style.cont_pic} />
        </div>
    )

}

export {Load}