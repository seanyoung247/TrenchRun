
import { ReactElement, useEffect, useRef } from 'react'

import Player from '../../types/player'
import { generateLayout } from '../../types/obstacle'
import { classList } from '../../util/css'

import './Obstacles.css'

type ObstacleProps = {
    player: Player,
    start?: number,
}

export const Obstacle = ({player, start=0}:ObstacleProps) => {
    const firstPos = player.position
    const lastPos = firstPos + 20
    const position = useRef(firstPos + start)
    const layout = useRef<ReactElement[]>([])

    if (position.current < firstPos) {
        const layoutTemplate = generateLayout()
        layout.current = layoutTemplate.map(v => (
            <div className={ classList("segment", (v === 1)&&"filled") }/>
        ))

        position.current = lastPos
    }

    return (
        <div className="obstacle" style={{
            '--zPos': lastPos - position.current 
        }}>
            { layout.current }
        </div>
    )
}

type ObstacleListProps = {
    player: Player,
    count?: number,
    onCollision?: (()=>void) | null,
}

export const Obstacles = ({player, count=1, onCollision=null}:ObstacleListProps) => {
    const obstacles = useRef<ReactElement[]>()
    useEffect(() => {
        obstacles.current = []
        for (let i = 0; i < count; i++) {
            obstacles.current.push(
                <Obstacle key={i} player={player} start={(i * 5) + 10}/>
            )
        }
    }, [count, player])

    if (onCollision !== null) {
        // Do collision detection
    }

    return <>{ obstacles.current }</>
}