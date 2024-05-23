
import './App.css'
import { Trench } from './components/Trench'
import { XWing } from './components/XWing'
import { View3D } from './components/view3d'
import './reset.css'

function App() {
    return (
        <View3D>
            <Trench/>
            <XWing/>
        </View3D>
    )
}

export default App
