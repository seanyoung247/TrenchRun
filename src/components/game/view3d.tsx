
import React from 'react'
import Player from '../../types/player'
import './view3d.css'

type view3DProps = {
    player : Player,
    children: React.ReactNode,
}

export const View3D = ({ player, children }: view3DProps) => (
    <div className='view3d' style={{
        '--x': player.offset.x, '--y': player.offset.y
    }}>
        { children }
    </div>
)