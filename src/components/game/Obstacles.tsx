
import { ReactElement, useRef } from 'react'

import Player from '../../types/player'
// import { Point } from '../../types/misc'
import { CollisionCallback, detectObstacleCollision } from '../../types/collisions'
import { ObstacleData, ObstacleLayout, generateLayout, indexToPoint, isFilled } from '../../types/obstacle'
import { classList } from '../../util/css'

import tile from '../../assets/tiles/tile01.webp'
import './Obstacles.css'
import { getRandomTile } from '../../util/tiles'

type ObstacleProps = {
    player: Player,
    start?: number,
    onCollision?: CollisionCallback | null,
}

const genSegments = (layout:ObstacleLayout) => layout.map((v,i,a) => {
    const filled = (v > 0)
    const p = indexToPoint(i)
    const edges = [
        {side:'left', p:{x:-1,y:0}},
        {side:'right', p:{x:1,y:0}},
        {side:'top', p:{x:0,y:-1}},
        {side:'bottom', p:{x:0,y:1}},
    ]
    // Add sides to blank tiles where they border a filled one.
    const sides = (!isFilled(a as ObstacleLayout, p)) ? edges.map(v => (
        isFilled(a as ObstacleLayout, {x:(p.x + v.p.x), y:(p.y + v.p.y)})&&(
            <div key={v.side} 
                className={classList('side', v.side)}
                style={{'--tex': `url(${tile})`}}
            />
        )
    )).filter(v=>v) : []

    return (
        <div key={i} 
            className={ classList("segment", (filled)&&"filled") }
            style={{'--tex': getRandomTile()}}
        >
            { sides }
        </div>
    )
})

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

    if (detectObstacleCollision(player, descriptor.current)) {
        onCollision?.(player)
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