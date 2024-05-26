
import Player from "./player"
import { ObstacleData, ObstacleLayout } from "./obstacle"

export type CollisionCallback = (playe?:Player) => void

export const isFilled = (layout:ObstacleLayout, x:number, y:number):boolean => (
    !(x < -1 || x > 1 || y < -1 || y > 1) &&    // Are values in bounds?
    (layout[(x + 1) + (3 * (y + 1))] > 0)       // Is segment filled?
)

export const detectCollision = (player: Player, obstacle: ObstacleData) => (
    // Player is always at first position, so there can 
    // only be a collision if the obstacle is at firstPos
    (Math.floor(obstacle.position) === Math.floor(player.position + 0.1)) &&
    // Player has collided if the obstacle segment at 
    // the same x,y offset as the player is filled
    (isFilled(obstacle.layout, player.offset.x, player.offset.y))
)