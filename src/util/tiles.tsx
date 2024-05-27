// import vent01 from '../assets/tiles/vent01.webp'
// import vent02 from '../assets/tiles/vent02.webp'
// import warning01 from '../assets/tiles/warning01.webp'
// import warning02 from '../assets/tiles/warning02.webp'
import tile01 from '../assets/tiles/tile01.webp'
import tile02 from '../assets/tiles/tile02.webp'
import tile03 from '../assets/tiles/tile03.webp'
import tile04 from '../assets/tiles/tile04.webp'
import tile05 from '../assets/tiles/tile05.webp'
import tile06 from '../assets/tiles/tile06.webp'
import tile07 from '../assets/tiles/tile07.webp'
import tile08 from '../assets/tiles/tile08.webp'
import tile09 from '../assets/tiles/tile09.webp'
import tile10 from '../assets/tiles/tile10.webp'
import tile11 from '../assets/tiles/tile11.webp'
import tile12 from '../assets/tiles/tile12.webp'

export const tiles = [
    // vent01,
    // vent02,
    // warning01,
    // warning02,
    tile01,
    tile02,
    tile03,
    tile04,
    tile05,
    tile06,
    tile07,
    tile08,
    tile09,
    tile10,
    tile11,
    tile12,
]

export const getRandomTile = () => 
    `url(${tiles[Math.floor(Math.random() * tiles.length)]}`