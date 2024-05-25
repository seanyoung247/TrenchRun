
import { ReactElement, useRef } from 'react'

import Player from '../../types/player'
import { generateLayout } from '../../types/obstacle'
import { classList } from '../../util/css'

import './Obstacle.css'

type ObstacleProps = {
    player: Player
}

export const Obstacle = ({player}:ObstacleProps) => {
    const layout = useRef<ReactElement[]>([])
    const position = player.position % (125 / 5);
    const lastPosition = useRef<number>(position + 1)
    
    /* If the obstacle position has reset, regenerate it's layout */
    if (position < lastPosition.current) {
        const layoutTemplate = generateLayout()
        layout.current = layoutTemplate.map(v => (
            <div className={ classList("segment", (v === 1)&&"filled") }/>
        ))
    }

    lastPosition.current = position

    return (
        <div className="obstacle" style={{
            '--zPos': position
        }}>
            { layout.current }
        </div>
    )
}