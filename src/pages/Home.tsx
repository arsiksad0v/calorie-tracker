import React from 'react';
import { Link } from 'react-router-dom';
import MealList from '../components/MealList';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Calorie Tracker</h1>
      <Link to="/meals/new">Add new meal</Link>
      <MealList />
    </div>
  );
};

export default Home;
