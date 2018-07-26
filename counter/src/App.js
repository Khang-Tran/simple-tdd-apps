import React, {Component} from 'react';
import './App.css';

class App extends Component {
    state = {
        counter: 0,
        error: false
    };

    onDecrementButtonClick = () => {
        if (this.state.counter === 0) {
            this.setState({error: true});
        }
        else
            this.setState({counter: this.state.counter - 1})
    };

    onIncrementButtonClick = () => {
        if (this.state.error === true)
            this.setState({error: false});
        this.setState({counter: this.state.counter + 1})
    };

    render() {
        return (
            <div data-test='component-app'>
                <h1 data-test='counter-display'>
                    The counter is {this.state.counter}
                </h1>
                <button data-test='increment-button' onClick={this.onIncrementButtonClick}>
                    Increment Counter
                </button>
                <button data-test='decrement-button' onClick={this.onDecrementButtonClick}>
                    Decrement Counter
                </button>
                {this.state.error &&
                <h4 data-test='invalid-error'>Cannot decrease under 0</h4>}
            </div>
        );
    }
}

export default App;
