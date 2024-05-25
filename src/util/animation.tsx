
/**
 * For a given value of change in seconds, calculates the
 * exact value of change for this frame to give frame
 * rate independent animation.
 * 
 * @param num - animation speed in value per second
 * @param tDelta - number of seconds since last update
 * @returns 
 */
export const tick = (num: number, tDelta: number): number => (
    num / tDelta
)