import './Trench.css'
import floorTex from '../assets/floor.webp'

export const Trench = () => (
    <div className="floor" style={{
        '--floor': `url(${floorTex})`
    }}>
        <div className="left"></div>
        <div className="right"></div>
    </div>
)