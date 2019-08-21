import React from 'react';
import './results.css';
import {Card} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import Fab from "@material-ui/core/Fab";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {Refresh} from '@material-ui/icons';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const ResultsView = props => {
    const {toggleResultVisibility, refreshResults, resultsRows, ...rest} = props;
    return (
        <Card className="Card"  {...rest}>

            <Box className="Card-title" fontSize="h6.fontSize">
                Results
            </Box>
            <div style={{marginLeft: "auto", marginTop: "-2.7em"}}>
                <Fab style={{borderRadius: 0}} color="default" size='small' onClick={refreshResults}>
                    <Refresh/>
                </Fab>
                <Fab style={{borderRadius: 0}} color="secondary" size='small' onClick={toggleResultVisibility}>
                    X
                </Fab>
            </div>

            <CardContent>
                <div className="container" style={{flexWrap: "nowrap"}}>
                    <div>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Candidate Name</TableCell>
                                    <TableCell align="right">Votes</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {resultsRows.map(row => (
                                    <TableRow key={row.candidateId}>
                                        <TableCell component="th" scope="row" >
                                            {row.candidateName}
                                        </TableCell>
                                        <TableCell align="right">{row.votes}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                   <div style={{overflow:"hidden"}}>
                       <BarChart
                           width={450}
                           height={340}
                           data={resultsRows}
                           maxBarSize={10}
                           barCategoryGap={3}

                       >
                           <CartesianGrid />
                           <XAxis dataKey="candidateName" tick={{fontSize: 13}} />
                           <YAxis  />
                           <Tooltip />

                           <Bar dataKey="votes" fill="#285c7e"/>

                       </BarChart>
                   </div>
                </div>
            </CardContent>
        </Card>

    );
};
export default ResultsView;
