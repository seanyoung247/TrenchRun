import './Trench.css'
import floorTex from '../assets/floor.webp'
import wallTex from '../assets/wall.webp'
import { ReactNode } from 'react'

export const Trench = ({children}:{children:ReactNode}) => (
    <div className="floor" style={{
        '--tex': `url(${floorTex})`
    }}>
        <div className="left" style={{'--tex': `url(${wallTex})`}}></div>
        <div className="right" style={{'--tex': `url(${wallTex})`}}></div>

        { children }
    </div>
)