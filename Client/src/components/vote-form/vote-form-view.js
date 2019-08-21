import React from 'react';
import './vote-form.css';
import {Card} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import {AccountCircle} from "@material-ui/icons";
import InputAdornment from "@material-ui/core/InputAdornment";
import Box from "@material-ui/core/Box";
import theme from '../../theme'
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";

const VoteFormView = props => {
    const {voterID, candidates, selectedIndex, handleChange, handleSubmit, isFormValid, isSubmitted, toggleResultVisibility,resetForm, ...rest} = props;


    return (
        <Card {...rest} className="Card">
            <Box className="Card-title" fontSize="h6.fontSize">
                Vote
            </Box>
            <CardContent>
                <div className="container">
                    <div>
                        <TextField className="text"
                                   name="voterID"
                                   required
                                   value={voterID}
                                   onChange={handleChange}
                                   id="id-num"
                                   label="Id Number"
                                   variant="outlined"
                                   helperText="your ID number most have 9 digits"
                                   InputProps={{
                                       startAdornment: (
                                           <InputAdornment position="start" style={{color: theme.palette.primary.main}}>
                                               <AccountCircle/>
                                           </InputAdornment>
                                       ),
                                   }}
                        />
                    </div>
                    <div style={{padding: '0 20px'}}>
                        <FormControl component='div' variant="outlined" style={{width: '300px'}}>
                            <InputLabel htmlFor="outlined-age-simple">
                                Candidate
                            </InputLabel>
                            <Select name="candidates"
                                input={<OutlinedInput labelWidth={75} id="outlined-age-simple" value={-1}/>}
                            value={selectedIndex} onChange={handleChange}>
                                {
                                    candidates.map((candidate) =>
                                        <MenuItem value={candidate.id.toString()} key={candidate.id.toString()}
                                                  component='li'>
                                            {candidate.name}
                                        </MenuItem>)
                                }
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <Button disabled={!isFormValid} variant="contained" color="primary" size="large" onClick={handleSubmit}
                                style={{paddingTop: '14px', paddingBottom: '14px'}}>
                            Vote!
                            <Icon style={{paddingLeft: '10px'}}>send</Icon>
                        </Button>

                    </div>
                    {isSubmitted &&
                    <div className="show-results">
                        <Button style={{marginRight:'0.5em'}} variant="outlined" color="secondary" size="small" onClick={resetForm}>
                            Clear
                        </Button>
                        <Button variant="outlined" color="primary" size="small" onClick={toggleResultVisibility}>
                            Show/Hide Results
                        </Button>
                    </div>
                    }
                </div>


            </CardContent>
        </Card>
    );
};
export default VoteFormView;
