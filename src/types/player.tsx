import { Point } from "./misc";

export default interface Player {
    offset: Point,      // X,Y offset
    position: number,   // Z World position
}

export const createPlayer = (offset={x:0,y:0}, position=0) => ({
    offset, position
})