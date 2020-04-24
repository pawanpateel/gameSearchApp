import React, { Component } from "react";
import "./styles.css";
class App extends Component {
  state = { searchValue: "", gameResult: [] };
  handleOnChange = event => {
    this.setState({ searchValue: event.target.value });
  };
  handleSearch = () => {
    this.makeApiCall(this.state.searchValue);
  };
  makeApiCall = searchInput => {
    var searchUrl = `http://starlord.hackerearth.com/gamesext`;
    fetch(searchUrl)
      .then(response => {
        return response.json();
      })
      .then(jsonData => {
        this.setState({ gameResult: jsonData.filter(game=>game.title===searchInput
        || game.platform===searchInput 
        || game.genre===searchInput 
        || game.release_year==searchInput)});
      });
  };
  render() {
    return (
      <div>
        <h1>Game Search app</h1>
        <input
          name="text"
          type="text"
          placeholder="Search"
          onChange={event => this.handleOnChange(event)}
          value={this.state.searchValue}
        />
        <button onClick={this.handleSearch}>Search</button>
        {this.state.gameResult ? (
          <div>
              <table>
                  <thead>
                    <tr>
                    <td>Title</td>
                <td>Platform</td>
                <td>Url</td>
                <td>Genre</td>
                <td>Score</td>
                <td>Editors Choice</td>
                <td>Release Year</td>
                    </tr>
                    </thead>
                    <tbody>
            {this.state.gameResult.map((game, index) => (
                
              <tr key={index}>
                <td>{game.title}</td>
                <td>{game.platform}</td>
                <td>{game.url}</td>
                <td>{game.genre}</td>
                <td>{game.score}</td>
                <td>{game.editors_choice}</td>
                <td>{game.release_year}</td>
              </tr>              
            ))}
            </tbody>
            </table>
          </div>
        ) : (
          <p>
            That game is not in our database. <br /> Try searching for another
            game.
          </p>
        )}
      </div>
    );
  }
}
export default App;