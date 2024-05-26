
import { ReactElement, useRef } from 'react'

import Player from '../../types/player'
import { CollisionCallback, detectCollision } from '../../types/collisions'
import { ObstacleData, ObstacleLayout, generateLayout } from '../../types/obstacle'
import { classList } from '../../util/css'

import './Obstacles.css'

type ObstacleProps = {
    player: Player,
    start?: number,
    onCollision?: CollisionCallback | null,
}

const genSegments = (layout:ObstacleLayout) => layout.map((v,i) => (
    <div key={i} className={ classList("segment", (v === 1)&&"filled") }/> 
))

const newObstacleData = (
    position: number=0, 
    layout: ObstacleLayout=[0,0,0, 0,0,0, 0,0,0], 
    segments: ReactElement[]=genSegments(layout)
):ObstacleData => ({position, segments, layout})

export const Obstacle = ({player, start=0, onCollision=null}:ObstacleProps) => {
    const firstPos = player.position
    const lastPos = firstPos + 20
    const descriptor = useRef<ObstacleData>(newObstacleData(firstPos + start))

    // If the obstacle is behind the player:
    if (descriptor.current.position + 2 < firstPos) {
        // remove it and create a new one at the end of the trench
        const layoutTemplate = generateLayout()
        descriptor.current = newObstacleData(
            lastPos, layoutTemplate, genSegments(layoutTemplate)
        )
    }

    if (onCollision !== null && detectCollision(player, descriptor.current)) {
        onCollision()
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
    onCollision?: CollisionCallback | null,
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