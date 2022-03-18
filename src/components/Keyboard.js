/**
The virtual keyboard.
*/
import Grid from '@mui/material/Grid'
import ButtonUnstyled from '@mui/base/ButtonUnstyled'
import Button from '@mui/material/Button'
import { useDispatch, useSelector } from 'react-redux'

const KeyboardBackgroundStyle = {
    backgroundColor: "#ececec",
    paddingTop: "5px",
    margin: "10px",
}

const ButtonStyle = {
    minWidth: "40px",
}



const Keyboard = (props) => {

    const topRow = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
    const midRow = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
    const bottom = [ 'ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DEL']
    const dispatch = useDispatch()
    const tryNum = useSelector(state => state.tryNumber)

    // handle the virtual keyboard keystrokes
    const keyHandler = (event) => {
        event.preventDefault()
        const value = event.target.textContent
        if (value === 'DEL') {
            dispatch({ type: 'DELETE_GUESS', tryNum: tryNum })
        }
        else if (value == 'ENTER') {
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

    return (
        // The keyboard is a grid item of the board but also the container of the keys.
        <div sx={{KeyboardBackgroundStyle}} >
            <div  sx={{"display": "flex"}}  id="topRow" className="virtual-key-row" spacing={2}>
                { topRow.map(key => 
                    {
                        return (
                            <ButtonUnstyled key={key} id={key+'button'}
                                onClick={keyHandler} className="virtual-key" >
                                {key}
                            </ButtonUnstyled>
                        )
                    })
                }
            </div>
            <div sx={{KeyboardBackgroundStyle}} id="midRow" className="virtual-key-row" spacing={2}>
                { midRow.map(key => 
                    {
                        return (
                            <ButtonUnstyled key={key} id={key+'button'}
                                onClick={keyHandler} className="virtual-key" variant="outlined">
                                {key}
                            </ButtonUnstyled>
                        )
                    })
                }
                {
                    
                }
            </div>
            <div sx={{KeyboardBackgroundStyle}} id="bottom"  className="virtual-key-row">
                { bottom.map(key => 
                    {
                        return (
                            <ButtonUnstyled key={key} id={key+'button'}
                                onClick={keyHandler} 
                                className="virtual-key" variant="outlined">
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

