
import Player from '../../types/player'
import xwingImg from '../../assets/xwing.webp'
import './XWing.css'
import { Explosion } from './Explosion'
import { classList } from '../../util/css'

type XWingProps = {
    player: Player
}

export const XWing = ({player}: XWingProps) => (
    <div 
        className={classList( 'xwing', player.isAlive&&'alive' )}
        style={{
            '--tex': `url(${xwingImg})`,
            '--x': player.offset.x,
            '--y': player.offset.y,
        }}
    >
        {!player.isAlive&&<Explosion/>}
    </div>
)