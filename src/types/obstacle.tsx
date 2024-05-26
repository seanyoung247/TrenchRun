
import { ReactElement } from 'react'
import { Point } from './misc';

export type ObstacleLayout = [
    number, number, number,
    number, number, number,
    number, number, number,
]

export interface ObstacleData {
    position: number,
    segments: ReactElement[],
    layout: ObstacleLayout,
}

const layoutTemplates: readonly ObstacleLayout[] = [
    [1,1,1, 0,0,0, 0,0,0],
    [0,0,0, 1,1,1, 0,0,0],
    [0,0,0, 0,0,0, 1,1,1],
    [1,0,0, 1,0,0, 1,0,0],
    [0,1,0, 0,1,0, 0,1,0],
    [0,0,1, 0,0,1, 0,0,1],
    [1,1,1, 1,0,1, 1,1,1],
    [1,0,1, 1,1,1, 1,0,1],
    [1,1,1, 0,1,0, 1,1,1],
    [1,0,0, 1,0,0, 1,1,0],
    [0,0,1, 0,0,1, 0,1,1],
    [1,1,1, 0,1,0, 0,1,0],
    [1,1,0, 0,0,0, 0,0,0],
    [0,0,0, 0,0,1, 0,0,1],
    [0,0,0, 1,0,0, 1,0,0],
]

export const generateLayout = ():ObstacleLayout => {
    const index = Math.floor(Math.random() * layoutTemplates.length);
    return layoutTemplates[index];
}

export const pointToIndex = (x:number, y:number) => (
    (x + 1) + (3 * (y + 1))
)

export const indexToPoint = (index:number):Point => ({
    x: (index % 3) - 1, y: (Math.floor(index / 3)) - 1
})

export const isFilled = (layout:ObstacleLayout, p:Point):boolean => (
    !(p.x < -1 || p.x > 1 || p.y < -1 || p.y > 1) &&    // Are values in bounds?
    (layout[pointToIndex(p.x, p.y)] > 0)            // Is segment filled?
)