/**
InputBox: only accepts one letter, and allow background color to be changed by user, only after its value has been set..
*/
import { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import { useDispatch } from 'react-redux'


// Define colors to be used in the Box
// Originally from the NY-times Wordle game
const YELLOW = "#c9b458"
const WHITE = "#fff"
const GREEN = "#6aaa64"
const GRAY = "#86888a"
const BLACK = "#212121"

const InputBoxStyle = {
    fontSize: {
        xs: "25px",
        sm: "50px",
    },
    display: "flex",
    border: "1px solid lightgrey",
    justifyContent: "center",
    alignItems: "center",
    flexBasis: "auto",
    width: {
        xs: 30, 
        sm: 70,
    },
    height: {
        xs: 30,
        sm: 70,
    },
    userSelect: "none",
}


const InputBox = (props) => {
    let id = props.id
    let value = props.value
    const dispatch = useDispatch() ;
    const [order, setOrder] = useState(0)
    // scheme represents the color index of the box
    const [scheme, setScheme] = useState(-1)
    const [personalStyle, setPersonalStyle] = useState({
        background: WHITE,
        color: BLACK,    
    })

    const colors = [GREEN, YELLOW, GRAY]

    useEffect(() => {
        // setValue(props.value)
        setOrder(props.order)

        // when the value was deleted, remove any color scheme as well.
        if (value === '') {
            setPersonalStyle({
                background : WHITE,
                color : BLACK
            })

           // update the global info states
            dispatch({
                type: 'PUT_INFO',
                index: id,
                data: '.',
            })
        } else {
            // when user begins to type in, set the default color to Gray, to minimize the times that users
            // have to click.
            setPersonalStyle({
                background: GRAY,
                color: WHITE
            })
            setScheme(2) // set it to gray
        }
    }, [value])

    const onClick = () => {
        // if the box is not assigned any letter, do not change the color.
        if (value === '') 
            return 

        // rotate the scheme when user click the box.
        let temp = (scheme + 1) % 3
        setScheme(temp)
        setPersonalStyle({
            background : colors[temp],
            color : WHITE
        })

        // update the global info
        let data = '.'
        data = colors[temp] === GREEN ? 'G' : colors[temp] === YELLOW ? 'Y' : '.'
        dispatch({
            type: 'PUT_INFO',
            index: id,
            data: data
        })
    }


    return (
        <Grid item 
            onClick={onClick}
            sx={{...InputBoxStyle, order: order, ...personalStyle}}>
            {value}
        </Grid>
    )
}

export default InputBox



