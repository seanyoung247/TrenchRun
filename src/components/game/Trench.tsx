
import { ReactNode } from 'react'

import Player from '../../types/player'

import floorTex from '../../assets/floor.webp'
import wallTex from '../../assets/wall.webp'
import './Trench.css'

type TrenchProps = {
    player: Player,
    children: ReactNode
}

export const Trench = ({player, children}:TrenchProps) => (
    <div className="floor" style={{
        '--tex': `url(${floorTex})`,
        '--zPos': player.position
    }}>
        <div className="left" style={{'--tex': `url(${wallTex})`}}></div>
        <div className="right" style={{'--tex': `url(${wallTex})`}}></div>

        { children }
    </div>
)