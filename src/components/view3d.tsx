
import React from 'react'
import './view3d.css'

type view3DProps = {
    position : {x:number,y:number},
    children: React.ReactNode,
}

export const View3D = ({ position, children }:view3DProps) => (
    <div className='view3d' style={{
        '--x': position.x, '--y': position.y
    }}>
        { children }
    </div>
)