/**
The virtual keyboard.
*/
import ButtonUnstyled from '@mui/base/ButtonUnstyled'
import { useDispatch, useSelector } from 'react-redux'
// import { trynumberReducer } from '../reducers/reducers'

const KeyboardBackgroundStyle = {
    backgroundColor: "#ececec",
    paddingTop: "5px",
    margin: "10px",
}

const Keyboard = (props) => {

    const topRow = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
    const midRow = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
    const bottom = [ 'ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DEL']
    const dispatch = useDispatch()
    const tryNum = useSelector(state => state.tryNumber)
    const letterMap = useSelector(state => state.letterMap)

    // handle the virtual keyboard keystrokes
    const keyHandler = (event) => {
        event.preventDefault()
        const value = event.target.textContent
        if (value === 'DEL') {
            dispatch({ type: 'DELETE_GUESS', tryNum: tryNum })
        }
        else if (value === 'ENTER') {
            // trigger the keyboard press event.
            const event = document.createEvent('Event')
            event.initEvent('keydown', true, true)
            event.key = 'Enter'
            document.dispatchEvent(event)
        }
        else {
            dispatch({ type: 'ADD_GUESS', tryNum: tryNum, data: value })
        }
    }

    const getKeyClass = (key) => {
        if (letterMap.has(key)) {
            let result = mapLetterCodeToClassName(letterMap.get(key))
            return result
        } else {
            return ""
        }
    };

    // . -> gray
    // g -> green
    // y -> yellow
    const mapLetterCodeToClassName = (code) => {
        switch (code) {
            case '.':
                return 'gray'
            case 'g':
                return 'green'
            case 'y':
                return 'yellow'
            default:
                return ""
        }
    };

    return (
        // The keyboard is a grid item of the board but also the container of the keys.
        <div sx={{KeyboardBackgroundStyle}} >
            <div id="topRow" className="virtual-key-row" spacing={2}>
                { topRow.map(key => 
                    {
                        return (
                            <ButtonUnstyled key={key} id={key+'button'}
                                onClick={keyHandler} className={"virtual-key " + getKeyClass(key)} >
                                {key}
                            </ButtonUnstyled>
                        )
                    })
                }
            </div>
            <div id="midRow" className="virtual-key-row" spacing={2}>
                { midRow.map(key => 
                    {
                        return (
                            <ButtonUnstyled key={key} id={key+'button'}
                                onClick={keyHandler} className={"virtual-key " + getKeyClass(key)} variant="outlined">
                                {key}
                            </ButtonUnstyled>
                        )
                    })
                }
            </div>
            <div id="bottom"  className="virtual-key-row">
                { bottom.map(key => 
                    {
                        return (
                            <ButtonUnstyled key={key} id={key+'button'}
                                onClick={keyHandler} 
                                className={"virtual-key " + getKeyClass(key)} variant="outlined">
                                {key}
                            </ButtonUnstyled>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Keyboard

