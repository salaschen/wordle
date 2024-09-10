import Grid from '@mui/material/Grid'
import InputBox from './InputBox'


const RowStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "5px",
    paddingTop: "5px"
}

const InputRow = (props) => {
    let values = props.values
    let idStart = props.idStart
    
    // I need python's list comprehension. :)
    let ids = []
    for (let i = idStart ; i < idStart + 5 ; i++) {
        ids.push(i)
    }

    return (
        <Grid item xs={12} sm={12} style={RowStyle}>
            {
                values.map((v, index) => {
                    return (
                        <InputBox key={index} value={v} order={index} idFor={ids[index]} />
                    )
                })
            }
        </Grid>
    )
}

export default InputRow
