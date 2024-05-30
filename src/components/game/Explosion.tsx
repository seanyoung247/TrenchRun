
import { useEffect } from 'react'
import explosionSound from '../../assets/explosion/explosion.mp3'
import './Explosion.css'

export const Explosion = () => {
    useEffect(()=>{
        new Audio(explosionSound).play()
    },[])

    return (
        <div className="explosion"/>
    )
}
