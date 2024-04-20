import React, { Suspense, lazy, useState } from "react";
import styles from './Heade.module.scss'
import oggetto from './oggetto.png'
import chat1 from './action=event_Default.png'
import chat2 from './action=event_Hover.png'
import channel1 from './action=calendar_default.png'
import channel2 from './action=event_Hover.png'
import workers1 from './action=workers_Default.png'
import workers2 from './action=workers_Hover.png'

import loop from './search.png'
import notification from './notification.png'
import { defer, useLoaderData } from 'react-router-dom'


const Header = ({pic_src}) => {
    const {comment} = useLoaderData()
    console.log(comment)

    const [style1, setStyle1] = useState('inherit')
    const [style2, setStyle2] = useState('inherit')
    const [style3, setStyle3] = useState('inherit')


    const [chat, setChat] = useState(chat1)
    const [channel, setChannel] = useState(channel1)
    const [worker, setWorker] = useState(workers1)


    return(
        <div className={styles.header}>
            <div className={styles.header_ogetto}>
                <img src={oggetto} className={styles.header_pic} />
            </div>

            <div className={styles.header_chat} style={{backgroundColor: style1}}
                onMouseOver={() => setStyle1('var(--yelllow, #FD0)')}
                onMouseOut={() => setStyle1('inherit')}
            >
                <img src={chat} className={styles.header_pic} />
            </div>

            <div className={styles.header_channel} style={{backgroundColor: style2}}
                onMouseOver={() => setStyle2('var(--yelllow, #FD0)')}
                onMouseOut={() => setStyle2('inherit')}
            >
                <img src={channel} className={styles.header_pic} />
            </div>


            <div className={styles.header_workers} style={{backgroundColor: style3}}
                onMouseOver={() => setStyle3('var(--yelllow, #FD0)')}
                onMouseOut={() => setStyle3('inherit')}
            >
                <img src={worker} className={styles.header_pic} />
            </div>
            <button className={styles.header_btn}>Создать событие</button>
            <div className={styles.header_inputBlock}>
                <input type='text' className={styles.header_inputBlock_field} placeholder='поиск'/>
                <div className={styles.header_inputBlock_loop}>
                    <img src={loop} className={styles.header_pic} />
                </div>
            </div>
            <div className={styles.header_notification}>
                <img src={notification} className={styles.header_pic} />
            </div>
            <div className={styles.header_logo}>
                <img src={pic_src} className={styles.header_pic} />
            </div>
        </div>


    )
}

const getComment = async () => {
    const resp = await fetch('https://jsonplaceholder.typicode.com/posts/1')
    if(!resp.ok) {
        throw new Response('', {status: 404, statusText: 'Not found'})
    }
    return resp.json()
}

const HeaderLoader =  () => {
    return defer({
        comment: getComment()
    })
}


export {Header, HeaderLoader}

