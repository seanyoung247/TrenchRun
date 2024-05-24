
import xwingImg from '../assets/xwingp.png'
import './XWing.css'

type XWingProps = {
    position: {x:number, y: number}
}

export const XWing = ({position}: XWingProps) => (
    <div className="xwing" style={{
        '--tex': `url(${xwingImg})`,
        '--x': position.x,
        '--y': position.y,
    }}/>
)