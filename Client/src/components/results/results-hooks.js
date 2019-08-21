import React, {useEffect, useState} from "react";
import ResultsView from './results-view'
import * as axios from "axios";

function Results(props) {
    const {toggleResultVisibility, ...rest} = props;

    const [resultsRows, setResultsRows] = useState([]);
    const [refreshTrigger, setRefreshTrigger] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            const url = 'http://127.0.0.1:5000/get_results';
            const result = await axios(url);
            const newResults = [...result.data];
            setResultsRows(newResults);
        };
        fetchData().catch((e) => console.log(e));
    }, [refreshTrigger]);
    const refreshResults = () => {
        setRefreshTrigger(!refreshTrigger)
    }
    const viewProps = {...rest,resultsRows, toggleResultVisibility,refreshResults};
    return (<ResultsView {...viewProps}/>);
}

export default Results;
