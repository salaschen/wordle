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
    const bottom = [ 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DEL']
    const dispatch = useDispatch()
    const tryNum = useSelector(state => state.tryNumber)

    // handle the virtual keyboard keystrokes
    const keyHandler = (event) => {
        event.preventDefault()
        const value = event.target.textContent
        if (value === 'DEL') {
            dispatch({ type: 'DELETE_GUESS', tryNum: tryNum })
        }
        else {
            dispatch({ type: 'ADD_GUESS', tryNum: tryNum, data: value })
        }
    }

    return (
        // The keyboard is a grid item of the board but also the container of the keys.
        <Grid container item sx={{KeyboardBackgroundStyle}} rowSpacing={1}>
            <Grid item container id="topRow" justifyContent="start" spacing={2}>
                { topRow.map(key => 
                    {
                        return (
                            <Grid key={key} item sm={1.2} >
                                <Button onClick={keyHandler} className="virtual-key" variant="outlined">{key}</Button>
                            </Grid>
                        )
                    })
                }
            </Grid>
            <Grid item container id="midRow" justifyContent="start" md={12} spacing={2}>
                { midRow.map(key => 
                    {
                        return (
                            <Grid key={key} item sm={1.3} >
                                <Button onClick={keyHandler} className="virtual-key" variant="outlined">{key}</Button>
                            </Grid>
                        )
                    })
                }
                {
                    
                }
            </Grid>
            <Grid item container id="bottom" justifyContent="start" spacing={2}>
                { bottom.map(key => 
                    {
                        return (
                            <Grid key={key} item sm={1.5} >
                                <Button onClick={keyHandler} className="virtual-key" variant="outlined">{key}</Button>
                            </Grid>
                        )
                    })
                }
            </Grid>
 
        </Grid>
    )
}

export default Keyboard

