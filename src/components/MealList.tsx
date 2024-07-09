import React, { useEffect, useState } from 'react';
import { getMeals, deleteMeal } from '../services/api';
import { Meal } from '../types';

const MealList: React.FC = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getMeals()
      .then(response => {
        if (Array.isArray(response.data)) {
          setMeals(response.data);
        } else {
          setMeals([]);
        }
      })
      .catch(error => setError(error.message))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (id: number) => {
    deleteMeal(id).then(() => {
      setMeals(meals.filter(meal => meal.id !== id));
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);

  return (
    <div>
      <h2>Total calories: {totalCalories} kcal</h2>
      <button onClick={() => window.location.href='/meals/new'}>Add new meal</button>
      {meals.map(meal => (
        <div key={meal.id}>
          <h3>{meal.time}</h3>
          <p>{meal.description}</p>
          <p>{meal.calories} kcal</p>
          <button onClick={() => window.location.href=`/meals/${meal.id}/edit`}>Edit</button>
          <button onClick={() => handleDelete(meal.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default MealList;
