// monitor user's keyboard input, if they decided not to use the virtual keyboard.
export const keypressHandler = (event, dispatch) => {
    const keycode = event.keyCode
    const aCode = 65
    const zCode = 90
    const delCode = 8 // backspace
    // ignore non-alphabet and backspace keystrokes.
    if (keycode !== delCode && (keycode < aCode || keycode > zCode)) {
        return 
    }

    // handle deletion.
    if (keycode === delCode) {
        // setValues(values.slice(0, values.length-1))
        dispatch({
            type: 'DELETE'
        })
    }
    else {
        dispatch({
            type: 'ADD',
            data: event.key
        })
    }
}

