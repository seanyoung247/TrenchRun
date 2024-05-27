
import { useState, useRef } from 'react'

import { View3D } from './game/view3d'
import { Trench } from './game/Trench'
import { XWing } from './game/XWing'
import { Obstacles } from './game/Obstacles'

import { useKeys } from '../hooks/useKeys'
import { useAnimationFrame } from '../hooks/frame'
import { useSwipeable } from 'react-swipeable'

import { clamp } from '../util/clamp'
import { lerp } from '../util/animation'

import { Point, IIndexable } from '../types/misc'
import Player, { createPlayer } from '../types/player'
import { CollisionCallback } from '../types/collisions'

import './Game.css'

const setPosition = (setter: (p:Player)=>void, player: Player, direction: Point) => {
    setter(
        createPlayer({
                x: clamp(-1, 1, player.offset.x + direction.x),
                y: clamp(-1, 1, player.offset.y + direction.y)
            },
            player.position,
            player.speed,
            player.isAlive
        )
    )
}

export const Game = () => {
    const [player, setPlayer] = useState<Player>(createPlayer())
    const playerSpeed = useRef(4); // distance units per second

    const collided: CollisionCallback = () => {
        player.isAlive = false;
    }

    /* Handle User input */
    const actions = {
        moveUp: ()=>setPosition(setPlayer, player, {x:0, y:-1}),
        moveDn: ()=>setPosition(setPlayer, player, {x:0, y:1}),
        moveLt: ()=>setPosition(setPlayer, player, {x:-1, y:0}),
        moveRt: ()=>setPosition(setPlayer, player, {x:1, y:0}),
    }
    /* Keyboard */
    useKeys((e:KeyboardEvent) => {
        const keys:IIndexable = {
            ArrowUp: actions.moveUp,
            ArrowDown: actions.moveDn,
            ArrowLeft: actions.moveLt,
            ArrowRight: actions.moveRt,
        }
        if (player.isAlive) keys?.[e.key]()
    })
    /* Touchscreen Swipe */
    const touch = useSwipeable({
        onSwipedUp: actions.moveUp,
        onSwipedDown: actions.moveDn,
        onSwipedLeft: actions.moveLt,
        onSwipedRight: actions.moveRt,
    });

    /* Update game state */
    useAnimationFrame((time: number)=>{
        const distanceTravelled = player.isAlive ? 
            lerp(playerSpeed.current, time / 1000) : 0
        setPlayer({...player, position: player.position + distanceTravelled})
    })

    /* Render */
    return (
        <div {...touch} className="wrapper">
            <View3D player={player}>
                <Trench player={player}>
                    <Obstacles player={player} count={4} onCollision={collided}/>
                    <XWing player={player}/>
                </Trench>
            </View3D>
        </div>
    )
}