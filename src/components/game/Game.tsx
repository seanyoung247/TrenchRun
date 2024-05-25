
import { useState } from 'react'

import { View3D } from './view3d'
import { Trench } from './Trench'
import { XWing } from './XWing'
import { Obstacle } from './Obstacle'

import { useKeys } from '../../hooks/useKeys'
import { clamp } from '../../util/clamp'

import { Point, IIndexable } from '../../types/misc'
import Player, { createPlayer } from '../../types/player'

import './Game.css'

const createPlayer = (offset={x:0,y:0}, position=0) => ({
    offset, position
})

const setPos = (setter: (p:Player)=>void, player: Player, direction: Point) => {
    setter(
        createPlayer({
            x: clamp(-1, 1, player.offset.x + direction.x),
            y: clamp(-1, 1, player.offset.y + direction.y)
        }, 0)
    )
}

export const Game = () => {
    const [player, setPlayer] = useState<Player>(createPlayer)
    useKeys((e:KeyboardEvent) => {
        const keys:IIndexable = {
            ArrowUp: ()=>setPos(setPlayer, player, {x:0, y:-1}),
            ArrowDown: ()=>setPos(setPlayer, player, {x:0, y:1}),
            ArrowLeft: ()=>setPos(setPlayer, player, {x:-1,y:0}),
            ArrowRight: ()=>setPos(setPlayer, player, {x:1, y:0}),
        }; keys?.[e.key]()
    })

    return (
        <div className="wrapper">
            <View3D player={player}>
                <Trench>
                    <Obstacle/>
                    <XWing player={player}/>
                </Trench>
            </View3D>
        </div>
    )
}