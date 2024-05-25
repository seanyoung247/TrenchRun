
import Player from '../../types/player'
import xwingImg from '../../assets/xwing.webp'
import './XWing.css'

type XWingProps = {
    player: Player
}

export const XWing = ({player}: XWingProps) => (
    <div className="xwing" style={{
        '--tex': `url(${xwingImg})`,
        '--x': player.offset.x,
        '--y': player.offset.y,
    }}/>
)