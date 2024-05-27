import { Point } from "./misc";

export default interface Player {
    speed: number,      // speed in units per second
    offset: Point,      // X,Y offset
    isAlive: boolean,   // Player alive or dead?
    position: number,   // Z World position
}

export const createPlayer = (

    offset={x:0,y:0}, 
    position=0, 
    speed=4, 
    isAlive=true

) => ({ offset, position, speed, isAlive })