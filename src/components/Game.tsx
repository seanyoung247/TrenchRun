
import { useState, useRef } from 'react'

import { View3D } from './game/view3d'
import { Trench } from './game/Trench'
import { XWing } from './game/XWing'
import { Obstacles } from './game/Obstacles'

import { useKeys } from '../hooks/useKeys'
import { useAnimationFrame } from '../hooks/frame'
import { clamp } from '../util/clamp'
import { tick } from '../util/animation'

import { Point, IIndexable } from '../types/misc'
import Player, { createPlayer } from '../types/player'
import { CollisionCallback } from '../types/collisions'

import './Game.css'

const setPosition = (setter: (p:Player)=>void, player: Player, direction: Point) => {
    setter(
        createPlayer({
            x: clamp(-1, 1, player.offset.x + direction.x),
            y: clamp(-1, 1, player.offset.y + direction.y)
        }, player.position)
    )
}

export const Game = () => {
    const [player, setPlayer] = useState<Player>(createPlayer())
    const playerSpeed = useRef(0.25); // distance units per second

    const collided: CollisionCallback = () => {
        playerSpeed.current = 0
    }

    /* Handle User input */
    useKeys((e:KeyboardEvent) => {
        const keys:IIndexable = {
            ArrowUp: ()=>setPosition(setPlayer, player, {x:0, y:-1}),
            ArrowDown: ()=>setPosition(setPlayer, player, {x:0, y:1}),
            ArrowLeft: ()=>setPosition(setPlayer, player, {x:-1,y:0}),
            ArrowRight: ()=>setPosition(setPlayer, player, {x:1, y:0}),
        }; keys?.[e.key]()
    })

    /* Update game state */
    useAnimationFrame((time: number)=>{
        const distanceTravelled = tick(playerSpeed.current, time)
        setPlayer({...player, position: player.position + distanceTravelled})
    })

    /* Render */
    return (
        <div className="wrapper">
            <View3D player={player}>
                <Trench player={player}>
                    <Obstacles player={player} count={4} onCollision={collided}/>
                    <XWing player={player}/>
                </Trench>
            </View3D>
        </div>
    )
}