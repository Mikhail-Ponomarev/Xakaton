import add_done from './add_done.png'
import add_delete from './add_delete.png'
import style from './FirstPage.module.scss'
import { Elem } from './Elem'

const List = ({flag, flag2, index}) => {
    const endpoints = ['', '']
    const endpoint = endpoints[index]
    const mass = [
        {number: 1, days: 365, format: 'online', date: '21.04.2024', time: '18:40', duration: '1h40min'},
        {number: 1, days: 365, format: 'online', date: '21.04.2024', time: '18:40', duration: '1h40min'},
        {number: 1, days: 365, format: 'online', date: '21.04.2024', time: '18:40', duration: '1h40min'},
    ]
    const pic = flag2 == true ? add_done : add_delete
    const styleElem = flag == true ? style.container_block2_col1_show : style.container_block2_col1_hide


    return(
        <div className={styleElem}>
            {
                mass.map(elem => {
                    return <Elem number={elem.number} days={elem.days} format={elem.format} date={elem.date} time={elem.time} 
                    duration={elem.duration} pic={pic} flag={flag}/>
                })
            }
        </div>
    )

    
}

export {List}