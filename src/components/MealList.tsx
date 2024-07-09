import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMeals, deleteMeal } from '../services/api';
import { Meal } from '../types';

const MealList: React.FC = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getMeals()
      .then(response => {
        setMeals(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id: string) => {
    deleteMeal(id)
      .then(() => {
        setMeals(meals.filter(meal => meal.id !== id));
      })
      .catch(error => {
        setError(error.message);
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const totalCalories = meals.reduce((total, meal) => total + meal.calories, 0);

  return (
    <div>
      <h2>Total calories: {totalCalories} kcal</h2>
      {meals.map(meal => (
        <div key={meal.id}>
          <h3>{meal.time}</h3>
          <p>{meal.description}</p>
          <p>{meal.calories} kcal</p>
          <Link to={`/meals/${meal.id}/edit`}>Edit</Link>
          <button onClick={() => handleDelete(meal.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default MealList;
