import { useState, useEffect } from 'react';

import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';

import './App.css';

const App = () => {
  console.log( 'App.js Render' );

  const [ searchField, setSearchField ] = useState('a'); // [ value, setValue function ]
  const [ title, setTitle ] = useState( '' );
  const [ monsters, setMonsters ] = useState( [] );
  const [ filteredMonsters, setFilteredMonsters ] = useState( monsters );

  useEffect( () => {
    fetch( 'https://jsonplaceholder.typicode.com/users' )
      .then( response => response.json() )
      .then( json     => setMonsters( json ) );
  }, [] );

  useEffect( () => {
    const newfilteredMonsters = monsters.filter( (monster ) => {
      return monster.name.toLocaleLowerCase().includes( searchField );
    } );

    setFilteredMonsters( newfilteredMonsters );
  }, [monsters, searchField] );

  const onSearchChange = ( event ) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField( searchFieldString );
  }

  const onTitleChange = ( event ) => {
    const titleString = event.target.value.toLocaleLowerCase();
    setTitle( titleString );
  }

  return (
    <div className="App">
      <h1 className="app-title">{title}</h1>

      <SearchBox 
        className="search-box"
        onChangeHandler={onSearchChange}
        placeholder='Search Monsters'
      />
      <br />
      <SearchBox 
        className="title-search-box"
        onChangeHandler={onTitleChange}
        placeholder='Set Title'
      />

      <CardList monsters={filteredMonsters}/>
    </div>
  );
}

// class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       monsters: [],
//       filteredMonsters: [],
//       searchString: ''
//     };

//     console.log( 'constructor' );
//   }

//   filterMonsters = ( event ) => {

//     this.setState(
//       () => { return { searchString: event.target.value.toLocaleLowerCase() } }
//     );

//     this.setState( () => {
//       return {
//         filteredMonsters: this.state.monsters.filter( 
//           monster => monster.name
//             .toLocaleLowerCase()
//             .includes( this.state.searchString )
//         )
//       };
//     } );
//   }

//   render() {
//     const { filteredMonsters } = this.state;
//     const { filterMonsters } = this;

//     console.log( 'render' );
  
//     return (
//       <div className="App">
//         <h1 className="app-title">Monsters Rolodex</h1>
//         <SearchBox 
//           className="search-box"
//           onChangeHandler={filterMonsters}
//           placeholder='Search Monsters'
//         />
//         <CardList monsters={filteredMonsters}/>
//       </div>
//     );
//   }
// }

export default App;
