import { Typography } from "@mui/material"

const Heading = (props) => {
    return (
        <>
            <Typography variant='h4' sx={{ fontFamily: 'monospace', fontWeight: 'bold', color: 'rgb(34, 51, 51)', marginTop: '70px', marginLeft: '80px' }}>{props.title}</Typography>
        </>
    )
}

export default Heading;