import React, { Component } from "react";
import axios from "axios";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      breed: "husky",
      images: [],
    };
  }

  componentDidMount() {
    this.fetchDogImages();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.breed !== this.state.breed) {
      this.setState({
        images: [],
      });
      this.fetchDogImages();
    }
  }
  fetchDogImages = () => {
    axios
      .get(`https://dog.ceo/api/breed/${this.state.breed}/images`)
      .then((res) => {
        this.setState({
          images: res.data.message,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  handleChange = (event) => {
    this.setState({
      breed: event.target.value,
    });
  };
  render() {
    return (
      <div className="App">
        <h1>The Dog Website</h1>
        <select value={this.state.breed} onChange={this.handleChange}>
          <option value="husky">Husky</option>
          <option value="beagle">Beagle</option>
          <option value="corgi">Corgi</option>
          <option value="hound">Afghan Hound</option>
        </select>
        <div className="dog-image">
          {this.state.images.map((image) => (
            <img className="images" width="800px" src={image} alt="images" />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
