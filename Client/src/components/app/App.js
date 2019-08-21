import React from 'react';
import './App.css';
import VoteForm from '../vote-form/index'
import Results from "../results";
import Grow from "@material-ui/core/Grow";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {toggleResultVisibility: false};
    }

    triggerShowResults = () => {
        this.setState(prevState => ({...prevState,
            toggleResultVisibility: !prevState.toggleResultVisibility
        }));
    };

    render() {
        return (
            <div className="App">
                <Grow timeout={500} in={true}>
                    <VoteForm toggleResultVisibility={this.triggerShowResults}/>
                </Grow>
                <Grow timeout={500} in={this.state.toggleResultVisibility}>
                    <Results toggleResultVisibility={this.triggerShowResults}/>
                </Grow>
            </div>
        );
    }
}

export default App;
