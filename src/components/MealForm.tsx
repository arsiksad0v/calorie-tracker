import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { addMeal, updateMeal, getMealById } from '../services/api';
import { Meal } from '../types';

const MealForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [meal, setMeal] = useState<Meal>({ id: 0, time: 'Breakfast', description: '', calories: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getMealById(Number(id))
        .then(response => setMeal(response.data))
        .catch(error => setError(error.message))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMeal(prevMeal => ({
      ...prevMeal,
      [name]: name === 'calories' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (id) {
      updateMeal(meal)
        .then(() => {
          setLoading(false);
          setError(null);
        })
        .catch(error => {
          setLoading(false);
          setError(error.message);
        });
    } else {
      addMeal(meal)
        .then(() => navigate('/'))
        .catch(error => {
          setLoading(false);
          setError(error.message);
        });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="time">Meal Time</label>
        <select id="time" name="time" value={meal.time} onChange={handleChange}>
          <option value="Breakfast">Breakfast</option>
          <option value="Snack">Snack</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
        </select>
      </div>
      <div>
        <label htmlFor="description">Meal Description</label>
        <textarea
          id="description"
          name="description"
          value={meal.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="calories">Calories</label>
        <input
          type="number"
          id="calories"
          name="calories"
          value={meal.calories}
          onChange={handleChange}
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Save'}
      </button>
    </form>
  );
};

export default MealForm;


