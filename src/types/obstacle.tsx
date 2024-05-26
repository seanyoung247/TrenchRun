
import { ReactElement } from 'react'

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
