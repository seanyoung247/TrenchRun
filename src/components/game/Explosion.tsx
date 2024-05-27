
import { useEffect } from 'react'
import explosionSound from '../../assets/explosion/explosion.mp3'
import './Explosion.css'

export const Explosion = () => {
    useEffect(()=>{
        const explosionAudio = new Audio(explosionSound)
        explosionAudio.play()
    },[])

    return (
        <div className="explosion"/>
    )
}
