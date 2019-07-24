import React, { Component } from 'react';
import Header from './Header';
import Player from './Player';
import AddPlayerForm from "./AddPlayerForm";

class App extends Component {
  score = 0;
  state = {
    players: []
  };

  handleScoreChange = (index, delta) => {
    this.setState( prevState => ({
      score: prevState.players[index].score += delta
    }));
  };

  handleRemovePlayer = (id) => {
    this.setState( prevState => {
      return {
        players: prevState.players.filter(p => p.id !== id)
      };
    });
  };

  handleAddPlayer = (player) => {
    const newPlayer = {
      name: player,
      score: 0,
      id: this.state.players.length
    };

    this.setState( prevState => {
      return {
        players: [
          ...prevState.players,
          newPlayer
        ]
      };
    });
  };

  render() {
    return (
      <div className="scoreboard">
        <Header
          title="Scoreboard"
          players={this.state.players}
        />

        {/* Players list */}
        {this.state.players.map( (player, index) =>{
          this.score = this.score < player.score? player.score: this.score;
            return(<Player
              name={player.name}
              id={player.id}
              index={index}
              key={player.id.toString()}
              changeScore={this.handleScoreChange}
              removePlayer={this.handleRemovePlayer}
              score={player.score}
              champ={this.score === player.score}
            />)
          }
        )}
        <AddPlayerForm addPlayer={this.handleAddPlayer}/>
      </div>
    );
  }
}

export default App;
