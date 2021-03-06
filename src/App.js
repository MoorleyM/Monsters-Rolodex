import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';
import './App.css';
import { Component } from 'react';

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      // Optimized search value stored below
      searchField: '',
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => 
        this.setState(() => {
          return {monsters: users};
        }
      )
    );
  }

  // Optimizing previous code from input onChange to Component
  onSearchChange = (event) => {
    // Storing sarch value in state so it's accessible everywhere
    const searchField = event.target.value.toLocaleLowerCase();
    this.setState(() => {
      return {searchField};
    });
  }

  render () {

    // optimizing code so this. or this.state can be removed
    const {monsters, searchField} = this.state;
    const {onSearchChange} = this;

    // Filtering down from original list of monsters using the searchfield
    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    return (
      <div className="App">
        <h1 className="app-title">Monsters Rolodex</h1>
        <SearchBox
          clasName='monsters-search-box' 
          onChangeHandler={onSearchChange} 
          placeholder='search monsters'
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
