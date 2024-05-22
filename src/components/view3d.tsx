
import React from 'react'
import './view3d.css'

type view3DProps = {
    children: React.ReactNode,
}

export const View3D = ({ children }:view3DProps) => (
    <div className='view3d'>
        { children }
    </div>
)