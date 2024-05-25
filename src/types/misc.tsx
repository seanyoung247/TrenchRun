
export interface IIndexable {
    [key: string]: ()=>void;
}

export interface Point {
    x: number, y: number
}