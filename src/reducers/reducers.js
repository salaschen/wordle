// Control the count state - used to refresh/reset the game
export const countReducer = (state = 0, action) => {
    switch (action.type) {
        case 'ADD_COUNT':
            return state + 1
        default:
            return state
    }
}


// Control the Win state
export const winReducer = (state = false, action) => {
    switch (action.type) {
        case 'SET_WIN': 
            return action.data
        default:
            return state
    }
}

// Control the notification state
export const notifyReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_NOTIFY':
            return action.data

        default:
            return state
    }
}

// Specify how many tries the users have been made already.
// Starts from 0, then 1,2,3,4,5.
export const trynumberReducer = (state = 0, action) => {
    switch (action.type) {
        case 'ADD_TRY':
            return state + 1

        case 'RESET_TRY':
            return 0

        default:
            return state
    }
}

// Guesses: The letters users input and will be shown in the InputBoxes
// Original: It's an array of six arrays, each subarray has 5 '' empty strings.
const originalGuesses = () => {
    const row = ['','','','','']
    let result = []
    for (let i = 0 ; i < 6 ; i++) {
        result.push(row.concat())
    }
    return result
}

// For gettting the actual length of user's guess
const rowLength = (row) => {
    return row.filter(ch => ch !== '').length 
}

// The reducer for user guesses.
// Can handle when user puts more character when needed
// can handle when user deletes more than they can.
export const guessReducer = (state = originalGuesses(), action) => {

    switch (action.type) {
        case 'ADD_GUESS': {
            const tryNum = action.tryNum
            const letter = action.data
            const row = state[tryNum]
            // if already has 5 guesses, do nothing.
            const length = rowLength(row)
            if (length >= 5)  {
                return state
            }
            else {
                row[length] = letter.toUpperCase()
                let result = state.concat()
                result[tryNum] = row
                return result 
            }
            return
        }
        
        case 'DELETE_GUESS':  {
            // delete one character for the current guess
            const tryNum = action.tryNum
            const row = state[tryNum]
            const length = rowLength(row)
            if (length === 0) {
                return state
            }
            else {
                row[length-1] = ''
                let result = state.concat()
                result[tryNum] = row
                return result
            }
            return
        }
            

        case 'RESET_GUESS':
            return originalGuesses()

        default:
            return state
    }
}

// The reducer for the target word.
export const wordReducer = (state = '', action) => {
    switch (action.type) {
        case 'INIT_WORD':
            return action.data

        case 'RESET_WORD':
            return ''

        default:
            return state
    }
}
