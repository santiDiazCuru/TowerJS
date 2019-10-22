import React from "react";
import Grid from "./Grid";
import Modal from "./Modal";

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentRow: 29,
      tower: [],
      length: 5,
      playing: false,
      interval: 200,
      clear: 0,
      score: 0,
      startModal: true,
      message: "Press space to begin"
    };
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
    this.generateGrid();
  }
  generateGrid() {
    let newTower = [];
    for (let h = 0; h < 30; h++) {
      newTower.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    }
    this.setState({
      tower: newTower
    });
  }

  handleKeyDown(e) {
    if (e.code === "Space") {
      if (!this.state.playing) {
        this.setState({ playing: true, startModal: false }, () =>
          this.play(true)
        );
      } else {
        this.play(false);
      }
    }
  }
  play(play) {
    if (!play) {
      window.clearInterval(this.state.clear);
      if (this.state.currentRow === 29) {
        this.setState(
          {
            currentRow: this.state.currentRow - 1,
            interval: this.state.interval - 5,
            score: 5
          },
          () => this.play(true)
        );
      } else {
        let tower = this.state.tower;
        let ceil = tower[this.state.currentRow];
        let floor = tower[this.state.currentRow + 1];
        let count = 0;
        for (let i = 0; i < floor.length; i++) {
          if (ceil[i] === 1 && floor[i] === 0) {
            ceil[i] = 0;
            count = count + 1;
          }
        }
        tower[this.state.currentRow] = ceil;
        let newInterval = this.state.interval - this.state.interval / 20;
        let newScore = this.state.score + this.state.length - count;
        if (this.state.length - count === 0) {
          this.generateGrid();
          this.setState({
            currentRow: 29,
            startModal: true,
            message: "Looser",
            playing: false,
            interval: 200,
            clear: 0,
            score: 0,
            length: 5
          });
        } else {
          this.setState(
            {
              currentRow: this.state.currentRow - 1,
              length: this.state.length - count,
              tower: tower,
              interval: newInterval,
              score: newScore
            },
            () => this.play(true)
          );
        }
      }
    } else {
      if (this.state.currentRow >= 0) {
        let tower = this.state.tower;
        let row = tower[this.state.currentRow];
        var position = this.state.length - 1;
        let length = this.state.length;
        let interval = this.state.interval;
        let reverse = false;

        function paintCells() {
          for (let i = 0; i < row.length; i++) {
            if (i > position - length && i <= position) {
              row[i] = 1;
            } else {
              row[i] = 0;
            }
          }
          if (reverse && position === this.state.length - 1) reverse = false;
          if (position + 1 == row.length) reverse = true;
          reverse ? position-- : position++;
          tower[this.state.currentRow] = row;
          this.setState({ tower: tower });
        }
        stop = setInterval(paintCells.bind(this), interval);
        this.setState({ clear: stop });
      } else {
        this.setState({
          startModal: true,
          message: "Congrats, you've earned yourself an alfajor"
        });
      }
    }
  }
  render() {
    if (this.state.startModal) {
      return <Modal message={this.state.message} />;
    }
    return <Grid tower={this.state.tower} score={this.state.score} />;
  }
}
