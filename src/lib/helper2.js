// monitor user's keyboard input, if they decided not to use the virtual keyboard.
export const keypressHandler = (event, dispatch, tryNum) => {
    const keycode = event.keyCode
    const aCode = 65
    const zCode = 90
    const delCode = 8 // backspace
    
    // console.log(event) // debug

    // ignore non-alphabet and backspace keystrokes.
    if (keycode !== delCode && (keycode < aCode || keycode > zCode)) {
        return 
    }

    // handle deletion.
    if (keycode === delCode) {
        // setValues(values.slice(0, values.length-1))
        dispatch({
            type: 'DELETE_GUESS',
            tryNum: tryNum,
        })
    }
    else {
        dispatch({
            type: 'ADD_GUESS',
            data: event.key,
            tryNum: tryNum
        })
    }
}

// The function that handles when the user submit a guess by hitting 'enter'
// It sends the feedback to the user, and update the tryNum
// return the feedback to the caller.
export const handleSubmit = (event, dispatch, guess, target) => {
    const length = guess.filter(ch => ch !== '').length
    if (length < 5) {
        // TODO: Make a notification to the user.
        console.log('you need 5 letters!')
        return '' 
    } else {
        // Valid Guess.
        // Accept the guess, compare it with the target and give feedback to the user.
        const result = feedback(target, guess)
        console.log(result) // debug

        // update the tryNum
        dispatch({
            type: 'ADD_TRY'
        })
        return result
    }
}


// Feedback of the wordle. 
// For example: target = 'MOVIE', guess = 'BIBLE', return '.y..g' 
// . means mismatch, y means right word in wrong position, g means exact match.
// Maybe add some test cases
export const feedback = (target, guess) => {
    const result = ['.','.','.','.','.']
    const mismatches = new Map()

    // Get the exact matches first (green)
    for (let i = 0 ; i < 5 ; i++) {
        if (target[i] === guess[i]) {
            result[i] = 'g'
        }
        else {
            if (mismatches.has(target[i])) {
                mismatches[target[i]] += 1
            } else {
                mismatches[target[i]] = 1
            }
        }
    }

    // Now get the yellow matches
    for (let i = 0 ; i < 5 ; i++) {
        if (mismatches[guess[i]] > 0 && result[i] === '.') {
            result[i] = 'y'
            mismatches[guess[i]] -= 1
        }
    }
    return result
}

// Uncomment this line and delete the export to the above functions, to run the test.
// when comment this line, add the export back to the above functions.
// module.exports = feedback
