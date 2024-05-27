
import Player from "./player"
import { ObstacleData, isFilled } from "./obstacle"

export type CollisionCallback = (playe?:Player) => void

// TODO: Replace with good collision detection...
export const detectObstacleCollision = (player: Player, obstacle: ObstacleData) => (
    // Player is always at first position, so there can 
    // only be a collision if the obstacle is at firstPos
    (Math.floor(obstacle.position) === Math.floor(player.position + 0.2)) &&
    // Player has collided if the obstacle segment at 
    // the same x,y offset as the player is filled
    (isFilled(obstacle.layout, {x:player.offset.x, y:player.offset.y}))
)