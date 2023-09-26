import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Navlinks() {
    let location = useNavigate();

    return (
        <div className='nav-links'>
             <a className='link' onClick={() => location('/')}>Home</a>
            <a className='link' onClick={() => location('/')}>Portfoilio</a>
            <a className='link' onClick={() => location('/')}>Watchlist</a>
            </div>
  )
}
