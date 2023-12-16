import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setProfileMenu } from '../../Redux_Store/Action_Creators';
import { useEffect } from 'react';
const PersonalDetails = (props) => {
    useEffect(() => {
        document.title = 'Profile'
    }, [])
    return (
        <>
            <Box sx={{ border: '1px solid lightgrey' }}>
                <Typography variant='h6' sx={{ marginTop: '30px', marginLeft: '220px', fontWeight: 'bold' }}>Profile Details</Typography>
                <div style={{ width: '80%', marginTop: '30px', borderBottom: '1px solid lightgrey', backgroundColor: 'grey', marginLeft: '100px' }}></div>
                <table style={{ margin: 'auto', marginTop: '50px', width: '600px' }}>
                    <tbody>
                        <tr >
                            <td style={{ fontWeight: 'normal', fontFamily: 'verdana', fontSize: '18px', width: '200px', textAlign: 'left', height: '50px', paddingLeft: '20px' }}>Full Name</td>
                            <td style={{ fontWeight: 'normal', fontFamily: 'verdana', fontSize: '18px', paddingLeft: '20px' }}>{props.name}</td>
                        </tr>
                        <tr >
                            <td style={{ fontWeight: 'normal', fontFamily: 'verdana', fontSize: '18px', width: '200px', textAlign: 'left', height: '50px', paddingLeft: '20px' }}>Mobile Number</td>
                            <td style={{ fontWeight: 'normal', fontFamily: 'verdana', fontSize: '18px', paddingLeft: '20px' }}>{props.mob}</td>
                        </tr>
                        <tr >
                            <td style={{ fontWeight: 'normal', fontFamily: 'verdana', fontSize: '18px', width: '200px', textAlign: 'left', height: '50px', paddingLeft: '20px' }}>Email ID</td>
                            <td style={{ fontWeight: 'normal', fontFamily: 'verdana', fontSize: '18px', paddingLeft: '20px' }}>{props.mail}</td>
                        </tr>
                        <tr >
                            <td style={{ fontWeight: 'normal', fontFamily: 'verdana', fontSize: '18px', width: '200px', textAlign: 'left', height: '50px', paddingLeft: '20px' }}>Gender</td>
                            <td style={{ fontWeight: 'normal', fontFamily: 'verdana', fontSize: '18px', paddingLeft: '20px' }}>{props.gender}</td>
                        </tr>
                        <tr >
                            <td style={{ fontWeight: 'normal', fontFamily: 'verdana', fontSize: '18px', width: '200px', textAlign: 'left', height: '50px', paddingLeft: '20px' }}>Date Of Birth</td>
                            <td style={{ fontWeight: 'normal', fontFamily: 'verdana', fontSize: '18px', paddingLeft: '20px' }}>{props.dob}</td>
                        </tr>
                        <tr >
                            <td style={{ fontWeight: 'normal', fontFamily: 'verdana', fontSize: '18px', width: '200px', textAlign: 'left', height: '50px', paddingLeft: '20px' }}>Location</td>
                            <td style={{ fontWeight: 'normal', fontFamily: 'verdana', fontSize: '18px', paddingLeft: '20px' }}>{props.loc}</td>
                        </tr>
                        <tr >
                            <td style={{ fontWeight: 'normal', fontFamily: 'verdana', fontSize: '18px', width: '200px', textAlign: 'left', height: '50px', paddingLeft: '20px' }}>Alternate Mobile</td>
                            <td style={{ fontWeight: 'normal', fontFamily: 'verdana', fontSize: '18px', paddingLeft: '20px' }}>{props.altmob}</td>
                        </tr>
                        <tr >
                            <td style={{ fontWeight: 'normal', fontFamily: 'verdana', fontSize: '18px', width: '200px', textAlign: 'left', height: '50px', paddingLeft: '20px' }}>Hint Name</td>
                            <td style={{ fontWeight: 'normal', fontFamily: 'verdana', fontSize: '18px', paddingLeft: '20px' }}>{props.hint}</td>
                        </tr>
                    </tbody>
                </table>
                <Button sx={{
                    marginTop: '30px', marginLeft: '230px', fontSize: '18px', width: '600px', color: 'white', backgroundColor: 'rgb(250, 50, 84)',
                    '&:hover': { backgroundColor: 'rgb(250, 50, 84)' }
                }} component={Link} to='/my' onClick={() => props.setProfileMenu('editdetails')}>EDIT</Button>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
            </Box>
        </>
    )
}
const mapDispatchToProps = (dispatch) => {
    return {
        setProfileMenu: (data) => dispatch(setProfileMenu(data))
    }
}

export default connect(null, mapDispatchToProps)(PersonalDetails);