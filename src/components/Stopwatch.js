import React, { Component } from 'react';

class Stopwatch extends Component{

  state = {
    isRunning: false,
    elapsedTime: 0,
    previousTime: 0
  };

  componentDidMount() {
    this.intervalId = setInterval(
      () => this.tick(), 100
    )
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  tick = () => {
    if (this.state.isRunning) {
      const now = Date.now();
      this.setState(prevSate => ({
        previousTime: now,
        elapsedTime: prevSate.elapsedTime + (now - prevSate.previousTime)
      }));
    }
  };

  handleStartStop = () => {
    if (!this.state.isRunning) {
      this.setState({ previousTime: Date.now() })
    }
    this.setState( prevState => {
      return {
        isRunning: !prevState.isRunning
      }
    });
  };

  handleReset = () => {
    this.setState({
      elapsedTime: 0
    });
  };

  render() {
    const second = Math.floor(this.state.elapsedTime/1000);
    return (
      <div className="stopwatch">
        <h2>Stopwatch</h2>
        <span className="stopwatch-time">{ second }</span>
        <button onClick={this.handleStartStop}>{this.state.isRunning? 'Stop': 'Start'}</button>
        <button onClick={this.handleReset}>Reset</button>
      </div>
    )
  }

}

export default Stopwatch;
