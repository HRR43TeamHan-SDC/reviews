import React, { useState, useEffect } from 'react';
// import React from 'react';
import axios from 'axios';
import Toolbar from './Toolbar.jsx';
import Reviews from './Reviews.jsx';
import './App.css';

const App = () => {
  const [reviews, setReviews] = useState([]);

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);



  const id = window.location.pathname.split('/')[1];

  useEffect(() => {
    axios.get(`/api/reviews/${id}`)
      .then((result) => {
        setReviews(result.data);
      })
      .catch((err) => console.log('error ', err));
  }, []);

  const sortReviews = (sort, list) => {
    if ((!sort || sort === 'Newest') && !list.length) {
      axios.get(`/${id}`)
        .then((result) => {
          setReviews(result.data);
        })
        .catch((err) => console.log('error ', err));
    } else {
      axios.get(`/sort/${id}/${sort || 0}/${JSON.stringify(list)}`)
        .then((result) => {
          setReviews(result.data);
        })
        .catch((err) => console.log('error ', err));
    }
  };
  return (
    <div>
      <Toolbar sortReviews={sortReviews} />
      <Reviews reviews={reviews} />
    </div>
  );
};

export default App;
