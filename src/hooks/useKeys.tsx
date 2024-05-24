
import { useEffect } from "react"

export const useKeys = (effect: (e:KeyboardEvent)=>void) => {
    useEffect(() => {
        document.addEventListener('keyup', effect)
        return () => document.removeEventListener('keyup', effect)
    }, [effect])
}