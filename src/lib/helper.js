import { useRef, useEffect } from 'react'

// helper function: To change a flat array into an array of arrays.
export const distributeGuessesToRows = (guesses) => {
    const result = []
    const rows = 5;
    const rowSize = 5;
    for (let i = 0 ; i < rows ;  i++) {
        const row = []
        for (let j = 0 ; j< rowSize ; j++) {
            let cur = guesses[i*rowSize + j]
            if (!cur) {
                row.push('')
            }
            else {
                row.push(cur.toUpperCase())
            }
        }
        result.push(row)
    }
    return result
}


// To register a event listener
// Helper function for keyboard monitor.
export const useEventHandler = (eventName, handler, element = window) => {
    // create a ref that stores handler
    const savedHandler = useRef()
    // console.log(savedHandler) // debug

    useEffect(() => {
        savedHandler.current = handler
    },[handler])

    useEffect(() => {
        // console.log('add event listener') // debug
        function eventHandler (event)  {
            savedHandler.current(event)
        }
        element.addEventListener(eventName, eventHandler)
        return () => {
            element.removeEventListener(eventName, eventHandler)
        }
    }, [eventName, element])
}

