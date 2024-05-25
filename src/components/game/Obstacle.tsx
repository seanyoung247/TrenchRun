
import Player from '../../types/player'
import './Obstacle.css'

type ObstacleProps = {
    player: Player
}

export const Obstacle = ({player}:ObstacleProps) => (
    <div className="obstacle" style={{
        '--zPos': (player.position) % (100 / 5)
    }}/>
)