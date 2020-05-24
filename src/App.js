import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { Router } from "@reach/router";
// import Loadable from "react-loadable";
import pf from "petfinder-client";

import NavBar from "./NavBar";
import { Provider } from "./SearchContext";

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET,
});

// react-loadable version
// const LoadableDetails = Loadable({
//   loader: () => import("./Details"),
//   loading() {
//     return <h1>Loading split out code...</h1>;
//   },
// });

// Native React version
const Details = lazy(() => import("./Details"));
const Results = lazy(() => import("./Results"));
const SearchParams = lazy(() => import("./SearchParams"));

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: "Seattle, WA",
      animal: "",
      breed: "",
      breeds: [],
      handleAnimalChange: this.handleAnimalChange,
      handleBreedChange: this.handleBreedChange,
      handleLocationChange: this.handleLocationChange,
      getBreeds: this.getBreeds,
    };
  }

  handleLocationChange = (event) => {
    this.setState({
      location: event.target.value,
    });
  };

  handleAnimalChange = (event) => {
    this.setState(
      {
        animal: event.target.value,
      },
      this.getBreeds
    );
  };

  handleBreedChange = (event) => {
    this.setState({
      breed: event.target.value,
    });
  };

  getBreeds() {
    if (this.state.animal) {
      petfinder.breed
        .list({ animal: this.state.animal })
        .then((data) => {
          if (
            data.petfinder &&
            data.petfinder.breeds &&
            Array.isArray(data.petfinder.breeds.breed)
          ) {
            this.setState({
              breeds: data.petfinder.breeds.breed,
            });
          } else {
            this.setState({ breeds: [] });
          }
        })
        .catch(console.error);
    } else {
      this.setState({
        breeds: [],
      });
    }
  }

  render() {
    return (
      <div>
        <NavBar />
        <Provider value={this.state}>
          <Suspense fallback={<h1>loading route …</h1>}>
            <Router>
              <Results path="/" />
              <Details path="/details/:id" />
              <SearchParams path="/search-params" />
            </Router>
          </Suspense>
        </Provider>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
