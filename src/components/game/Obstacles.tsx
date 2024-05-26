
import { ReactElement, useRef } from 'react'

import Player from '../../types/player'
import { ObstacleLayout, generateLayout } from '../../types/obstacle'
import { classList } from '../../util/css'

import './Obstacles.css'

type ObstacleProps = {
    player: Player,
    start?: number,
    onCollision?: (()=>void) | null,
}

type ObstacleData = {
    position: number,
    segments: ReactElement[],
    layout: ObstacleLayout,
}

const genSegments = (layout:ObstacleLayout) => layout.map(v => (
    <div className={ classList("segment", (v === 1)&&"filled") }/> 
))

const newObstacleData = (
    position=0, 
    layout:ObstacleLayout=[0,0,0, 0,0,0, 0,0,0], 
    segments:ReactElement[]=genSegments(layout)
):ObstacleData => ({position, segments, layout})

export const Obstacle = ({player, start=0, onCollision=null}:ObstacleProps) => {
    const firstPos = player.position
    const lastPos = firstPos + 20
    const descriptor = useRef<ObstacleData>(newObstacleData(firstPos + start))

    // If the obstacle is behind the player:
    // remove it and create a new one at the end of the trench
    if (descriptor.current.position + 2 < firstPos) {
        const layoutTemplate = generateLayout()
        descriptor.current = newObstacleData(
            lastPos, layoutTemplate, genSegments(layoutTemplate)
        )
    }

    if (onCollision !== null) {
        // Player is always at first position, so there can 
        // only be a collision if the obstacle is at firstPos
        if (Math.floor(descriptor.current.position) === Math.floor(firstPos)) {
            // Player has collided if the obstacle segment at 
            // the same x,y offset as the player is filled

        }
    }

    return (
        <div className="obstacle" style={{
            '--zPos': lastPos - descriptor.current.position 
        }}>
            { descriptor.current.segments }
        </div>
    )
}

type ObstacleListProps = {
    player: Player,
    count?: number,
    onCollision?: (()=>void) | null,
}

export const Obstacles = ({player, count=1, onCollision=null}:ObstacleListProps) => {
    const obstacles = []
    for (let i = 0; i < count; i++) {
        const start = (i * 5) + 10
        obstacles.push(
            <Obstacle key={i} player={player} start={start} onCollision={onCollision}/>
        )
    }

    return <>{ obstacles }</>
}