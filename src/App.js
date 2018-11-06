import React, { Component } from "react";
import PuppyCard from "./components/PuppyCard/PuppyCard";
import Nav from "./components/Nav";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import Container from "./Container";
import Row from "./Row";
import Column from "./Column";
import puppies from "./puppies.json";
import "./App.css";

function shufflePuppies(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

class App extends Component {
  // Set this.state
  state = {
    puppies,
    currentScore: 0,
    bestScore: 0,
    rightWrong: "",
    clicked: [],
  };

  handleClick = id => {
    if (this.state.clicked.indexOf(id) === -1) {
      this.handleIncrement();
      this.setState({ clicked: this.state.clicked.concat(id) });
    } else {
      this.handleReset();
    }
  };

  handleIncrement = () => {
    const newScore = this.state.currentScore + 1;
    this.setState({
      currentScore: newScore,
      rightWrong: ""
    });
    if (newScore >= this.state.bestScore) {
      this.setState({ bestScore: newScore });
    }
    else if (newScore === 12) {
      this.setState({ rightWrong: "You've collected all 12 puppies!" });
    }
    this.handleShuffle();
  };

  handleReset = () => {
    this.setState({
      currentScore: 0,
      bestScore: this.state.bestScore,
      rightWrong: "Try Again!",
      clicked: []
    });
    this.handleShuffle();
  };

  handleShuffle = () => {
    let shuffledPuppies = shufflePuppies(puppies);
    this.setState({ puppies: shuffledPuppies });
  };

  render() {
    return (
      <Wrapper>
        <Nav
          title=" Collector Memory Clicky Game"
          score={this.state.currentScore}
          bestScore={this.state.bestScore}
          rightWrong={this.state.rightWrong}
        />

        <Title>
          Collect all 12 adorable Puppies without any duplicates and you win!!!
        </Title>

        <Container>
          <Row>
            {this.state.puppies.map(puppies => (
              <Column size="md-3 sm-6">
                <PuppyCard
                  key={puppies.id}
                  handleClick={this.handleClick}
                  handleIncrement={this.handleIncrement}
                  handleReset={this.handleReset}
                  handleShuffle={this.handleShuffle}
                  id={puppies.id}
                  image={puppies.image}
                />
              </Column>
            ))}
          </Row>
        </Container>
      </Wrapper>
    );
  }
}

export default App;
