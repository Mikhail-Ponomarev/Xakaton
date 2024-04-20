import {useDispatch, useSelector} from 'react-redux'
import { useNavigate, defer, useLoaderData} from 'react-router-dom'
import {removeToken} from '../../store/Slice'
import style from './FirstPage.module.scss'
import axios from 'axios'
import coffee from './coffee.png'
import strelka from './strelka.png'
import { useState } from 'react'
import { List } from './List'


const FirstPage = () => {
    const token = useSelector(state => state.red1.token)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {post} =  useLoaderData()
    console.log(post)

    const [style1, setStyle1] = useState(style.container_block2_col1_title_pic)
    const [style2, setStyle2] = useState(style.container_block2_col1_title_pic)
    const [flag1, setFlag1] = useState(false)
    const [flag2, setFlag2] = useState(false)


    // if(!token) {
    //     navigate('/', {replace: true})
    // }

    const handleClick1 = () => {
        setFlag1(!flag1)
        if (flag1) {
            setStyle1(style.container_block2_col1_title_pic3)
        } else {
            setStyle1(style.container_block2_col1_title_pic2)
        }
    }


    const handleClick2 = () => {
        setFlag2(!flag2)
        if (flag2) {
            setStyle2(style.container_block2_col1_title_pic3)
        } else {
            setStyle2(style.container_block2_col1_title_pic2)
        }
    }

    return(
        <div className={style.container}>
            <div className={style.container_block1}>
                <button className={style.container_block1_btn}>
                    <img src={coffee} className={style.container_block1_btn_pic}/>
                </button>
                <p className={style.container_block1_text}>
                    найдите товарища на вечер среди коллектива (1 попытка в неделю)
                </p>
            </div>
            <div className={style.container_block2}>
                <div className={style.container_block2_col1}>
                    <div className={style.container_block2_col1_title} onClick={handleClick1}>
                        <p className={style.container_block2_col1_title_text}>
                            Запланированные события
                        </p>
                        <div className={style1}>
                            <img src={strelka} alt="" className={style.container_pic}/>
                        </div>
                    </div>

                    <List flag={flag1} flag2={false} index={0}/>

                    <div className={style.container_block2_col1_title} onClick={handleClick2}>
                        <p className={style.container_block2_col1_title_text}>
                            Другие события
                        </p>
                        <div className={style2}>
                            <img src={strelka} alt="" className={style.container_pic}/>
                        </div>
                    </div>

                    <List flag={flag2} flag2={true} index={1}/>

                </div>
                <div className={style.container_block2_col2}>
                </div>
            </div>
        </div>
    )
}

const getPost = async () => {
    const resp = await fetch('https://jsonplaceholder.typicode.com/posts/1')
    if(!resp.ok) {
        throw new Response('', {status: 404, statusText: 'Not found'})
    }
    return resp.json()
}

const FirstPageLoader =  () => {
    return defer({
        post: getPost()
    })
}


export default FirstPage
export {FirstPageLoader}
