import '../styles/App.scss';
import { useEffect, useState } from 'react';
import callToApi from '../services/api';
import Filters from './Filters';
import ListScenes from './ListScenes';
import { Routes, Route } from 'react-router-dom';
import ls from '../services/localStorage';

const App = () => {
  // Estados

  const [ApiScenes, setApiScenes] = useState([]);
  const [searchMovie, setSearchMovie] = useState('');
  const [selectYear, setSelectYear] = useState('');

  useEffect(() => {
    if (ApiScenes.length === 0) {
      callToApi().then((response) => {
        setApiScenes(response);
      });
    }
  }, [ApiScenes.length]);

  const handleChange = (value) => {
    setSearchMovie(value);
  };

  const handleSelect = (value) => {
    setSelectYear(value);
  };

  const filteredScenes = ApiScenes.filter((scene) =>
    scene.movie.toLowerCase().includes(searchMovie)
  ).filter((itemScene) => {
    if (selectYear === '') {
      return true;
    } else {
      return selectYear === itemScene.year.toString();
    }
  });

  const getYears = () => {
    const years = ApiScenes.map((scene) => scene.year);
    const uniqueYears = new Set(years);
    const yearsArray = [...uniqueYears];
    return yearsArray.sort();
  };

  return (
    <div>
      <header>
        <h1>Owen Wilson's "WOW"</h1>
      </header>
      <main>
        <Filters
          handleChange={handleChange}
          searchMovie={searchMovie}
          selectYear={selectYear}
          handleSelect={handleSelect}
          years={getYears()}
        />
        <ListScenes filteredScenes={filteredScenes} />
      </main>
    </div>
  );
};

export default App;
