/**
InputBox: only accepts one letter, and allow background color to be changed by user, only after its value has been set..
*/
import { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
// import { useDispatch } from 'react-redux'


// Define colors to be used in the Box
// Originally from the NY-times Wordle game
// const YELLOW = "#c9b458"
const WHITE = "#fff"
// const GREEN = "#6aaa64"
// const GRAY = "#86888a"
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
    let id = props.idFor
    let value = props.value
    // const dispatch = useDispatch() ; // not needed
    const [order, setOrder] = useState(0)
    // scheme represents the color index of the box
    // const [scheme, setScheme] = useState(-1)
    const [personalStyle ] = useState({
        background: WHITE,
        color: BLACK,    
    })

    // const colors = [GREEN, YELLOW, GRAY]

    useEffect(() => {
        // setValue(props.value)
        setOrder(props.order)
    }, [value, props.order])


    return (
        <Grid item className="flip-card-inner" id={id} 
            sx={{...InputBoxStyle, order: order, ...personalStyle}}>
            <div className="flip-card-front">
            {value}
            </div>
            <div id={id+'back'} className="flip-card-back">
            {value}
            </div>
        </Grid>
    )
}

export default InputBox



