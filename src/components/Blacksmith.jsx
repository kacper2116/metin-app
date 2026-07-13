import React from 'react'
import '../styles/Blacksmith.css'
import blacksmithImg from '../assets/blacksmith.png'
const Blacksmith = () => {
    return (
        <div className='blacksmith'>
            <img className='blacksmith-img' src={blacksmithImg}></img>
        </div>
    )
}

export default Blacksmith