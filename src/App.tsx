
import './App.css'
import { Trench } from './components/Trench'
import { XWing } from './components/XWing'
import { View3D } from './components/view3d'
import './reset.css'

function App() {
    return (
        <div className="wrapper">
            <View3D>
                <Trench/>
                <XWing/>
            </View3D>
        </div>
    )
}

export default App
