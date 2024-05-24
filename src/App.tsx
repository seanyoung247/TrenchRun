
import { View3D } from './components/view3d'
import { Trench } from './components/Trench'
import { XWing } from './components/XWing'
import { Obstacle } from './components/Obstacle'

import { useKeys } from './hooks/useKeys'
import { clamp } from './util/clamp'

import './App.css'
import './reset.css'
import { useState } from 'react'

function App() {
    const [position, setPosition] = useState({x:0,y:0})
    useKeys((e:KeyboardEvent) => {
        switch (e.key) {
            case 'ArrowUp':
                setPosition({x:position.x, y:clamp(-1, 1, --position.y)})
                break
            case 'ArrowDown':
                setPosition({x:position.x, y:clamp(-1, 1, ++position.y)})
                break
            case 'ArrowLeft':
                setPosition({x:clamp(-1, 1, --position.x), y:position.y})
                break
            case 'ArrowRight':
                setPosition({x:clamp(-1, 1, ++position.x), y:position.y})
                break
        }
    })

    return (
        <div className="wrapper">
            <View3D position={position}>
                <Trench>
                    <Obstacle/>
                    <XWing position={position}/>
                </Trench>
            </View3D>
        </div>
    )
}

export default App
