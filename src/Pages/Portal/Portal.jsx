import { Modal } from '../Modal/Modal'
import { createPortal } from 'react-dom'

const modal = document.getElementById("modal")

const Portal = ({func, value, text}) => {
    return(
        <>
            {createPortal(<Modal func={func} value={value} text={text}/>, modal)}
        </>
    )
}

export {Portal}