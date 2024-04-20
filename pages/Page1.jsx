import '../index.css'
import { useLocation, useNavigate } from 'react-router-dom'

const Page1 = () => {
    const navigate = useNavigate()
    const goNext = () => navigate(-1)
    // принимаем данные, которые пришли из другого адресса через state 
    const {state} = useLocation()
    return(
        <div className="page1">
            <button className='btn' onClick={goNext}>Go next</button>
        </div>
    )
}

export default Page1
// export {Page1}