import '../styles/Blacksmith.css'
import blacksmithImg from '../assets/blacksmith.png'

const Blacksmith = () => {
    return (
        <div className='blacksmith'>
            <span className='blacksmith-nickname'>Kowal</span>
            <img className='blacksmith-img' src={blacksmithImg}></img>
        </div>
    )
}

export default Blacksmith