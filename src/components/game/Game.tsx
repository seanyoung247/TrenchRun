
import { useState } from 'react'

import { View3D } from './view3d'
import { Trench } from './Trench'
import { XWing } from './XWing'
import { Obstacle } from './Obstacle'

import { useKeys } from '../../hooks/useKeys'
import { useAnimationFrame } from '../../hooks/frame'
import { clamp } from '../../util/clamp'

import { Point, IIndexable } from '../../types/misc'
import Player, { createPlayer } from '../../types/player'

import './Game.css'

// const setPosition = (setter: (p:Player)=>void, player: Player, direction: Point) => {
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
    useKeys((e:KeyboardEvent) => {
        const keys:IIndexable = {
            ArrowUp: ()=>setPosition(setPlayer, player, {x:0, y:-1}),
            ArrowDown: ()=>setPosition(setPlayer, player, {x:0, y:1}),
            ArrowLeft: ()=>setPosition(setPlayer, player, {x:-1,y:0}),
            ArrowRight: ()=>setPosition(setPlayer, player, {x:1, y:0}),
        }; keys?.[e.key]()
    })

    useAnimationFrame(()=>{
        setPlayer({...player, position:player.position + 0.1})
    })


    return (
        <div className="wrapper">
            <View3D player={player}>
                <Trench player={player}>
                    <Obstacle/>
                    <XWing player={player}/>
                </Trench>
            </View3D>
        </div>
    )
}