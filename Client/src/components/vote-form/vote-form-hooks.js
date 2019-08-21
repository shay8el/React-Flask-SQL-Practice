import React, {useEffect, useState} from "react";
import VoteFormView from './vote-form-view'
import * as axios from "axios";
import Noty from 'noty';

function VoteForm(props) {
    const {toggleResultVisibility, ...rest} = props;

    const [candidates, setCandidates] = useState([]);
    const [voterID, setVoterID] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [isFormValid, setIsFormValid] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const url = 'http://127.0.0.1:5000/get_candidates';
            const result = await axios(url);
            const newCandidates = [...candidates, ...result.data];
            setCandidates(newCandidates);
        };
        if (candidates.length === 0) {
            fetchData().catch((e) => console.log(e));
        }
    }, [candidates]);


    const idToaster = (targetValue) => {
        Noty.setMaxVisible(1);
        let errorToast = new Noty({type: 'error', timeout: 3000});
        if ((targetValue.length > 9) || (!/^\d*$/.test(targetValue))) {
            setIsFormValid(false);
            errorToast.setText('Id number invalid', true);
            errorToast.show();
        } else {
            Noty.closeAll();
            Noty.clearQueue();
        }
    };

    const formChecker = () => setIsFormValid((voterID.length === 9) && (/^\d*$/.test(voterID)) && (selectedIndex !== -1));
    useEffect(formChecker, [voterID, selectedIndex]);
    const handleChange = (e) => {
        e.preventDefault();
        const targetName = e.target.name;
        const targetValue = e.target.value;
        if (targetName === 'candidates') {
            setSelectedIndex(targetValue);
        } else if (targetName === 'voterID') {
            setVoterID(targetValue);
            idToaster(targetValue);
        }
    };

    const sendVoteToServer = async () => {
        const url = 'http://127.0.0.1:5000/send_vote';
        const vote = {voterID: voterID, candidateID: selectedIndex};
        axios.post(url, vote).then(resp => {
            new Noty({text: resp.data, type: 'success', timeout: 3000}).show();
        }).catch(
            reason => {
                new Noty({text: reason.response.data, type: 'error', timeout: 3000}).show();
            }
        )
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendVoteToServer().then(()=>setIsSubmitted(true));
    };
    const resetForm = () => {
        setVoterID('');
        setSelectedIndex(-1);
        setIsFormValid(false);
        setIsSubmitted(false);
    };
    const viewProps = {...rest, voterID, candidates, selectedIndex, handleChange, handleSubmit, isFormValid, isSubmitted, toggleResultVisibility,resetForm};
    return (<VoteFormView {...viewProps}/>);
}

export default VoteForm;
