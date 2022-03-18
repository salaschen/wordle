export const setWin = (dispatch, win) => {
    dispatch({
        type: 'SET_WIN',
        data: win,
    })
}

// Send a notification to the user, by default last 3 seconds.
export const setNotification = (dispatch, text, setNotificationOpen, timeout=3000) => {
    dispatch({
        type: 'SET_NOTIFY', 
        data: text
    })
    setTimeout(() => {
        setNotificationOpen(true)
    }, 500)

    setTimeout(() => {
        setNotificationOpen(false)
    }, timeout+500)
}

export const addCount = (dispatch) => {
    dispatch({
        type: 'ADD_COUNT'
    })
}

export const resetWin = (dispatch) => {
    dispatch({
        type: 'SET_WIN',
        data: false
    })
}

export const resetTry = (dispatch) => {
    dispatch({
        type: 'RESET_TRY'
    })
}

export const resetGuess = (dispatch) => {
    dispatch({
        type: 'RESET_GUESS'
    })
}


