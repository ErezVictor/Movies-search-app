import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';
import Suggestions from './Suggestions';

const API_KEY = '157f34ed'; //Needs to be kept on server
const API_URL = 'http://www.omdbapi.com/'

function Search(){
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [results, setResults] = useState([]);
const [error, setError] = useState(false);

//Get year from search string
const getYear = (text) => {
  let year = '';
  const validYear = /\d{4}/.exec(text);
  if (validYear != undefined && validYear.length > 0) {
    year = validYear[0];
  }
  return year;
}

//Fetch data from the movie directory endpoint
  async function getInfo(text, pageNum){
    const year = getYear(text);
    axios.get(`${API_URL}?apikey=${API_KEY}&type=movie&page=${pageNum}&y=${year}&s=${text.replace(year, '').trim()}`)
      .then(({ data }) => {
        if (data && data.Search && data.Search.length > 0) {
        setResults(data.Search);
        } else {
          setResults([]);
        }
      })
      .catch(() => setError(true))
}

// use debounce of 500 ms for search fubctionality
  const debouncedGetSearch = useMemo(() => debounce(getInfo, 500), []);

  useEffect(() => {
    if (query && query.replace(/\s/g, '').length) {
        debouncedGetSearch(query, page);
    } 
}, [query, page, debouncedGetSearch]);

//render the next & prev buttons according 
const renderButtons = () => {
  const jsx = [];
  if (results != undefined && results.length >= 10) {
    if (page > 1) {
      jsx.push(<button type='button' style={styles.Prev} onClick={() => {setPage(page-1)}}>Prev</button>);  
    }
jsx.push(<button type='button' style={styles.Next} onClick={() => {setPage(page+1)}}>Next</button>);
  }
  return jsx;
}

const updateValue = (value) => {
  if (value != undefined) {
    if (!value.target.value.startsWith(value)) {
      setPage(1);
    }
    setQuery(value.target.value);
  }else {
    setQuery('');
    setPage(1);
  }
}
    return (
      <form>
        <input
          placeholder="Search for a movie..."
          style={styles.Search}
          value={query}
          onChange={(value) => updateValue(value)}
        />
        <div style={styles.Suggestions}>
        <Suggestions results={results} text={query} />
        </div>
        {renderButtons()}
      </form>
    )
}

const styles = {
  Prev: {
    marginRight: '10px',
    marginTop: '10px',
  },

  Next: {
    marginTop: '10px',
  },

  Suggestions: {
    marginTop: '20px',
  },

  Search: {
    width:'60%',
  }
}
export default Search