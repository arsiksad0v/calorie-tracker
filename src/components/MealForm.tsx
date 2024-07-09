import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getMeal, createMeal, updateMeal } from '../services/api';
import { Meal } from '../types';

const MealForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getMeal(id)
        .then(response => {
          setMeal(response.data);
          setLoading(false);
        })
        .catch(error => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [id]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.target as HTMLFormElement);
    const data = {
      time: formData.get('time') as string,
      description: formData.get('description') as string,
      calories: parseInt(formData.get('calories') as string),
    };

    if (meal) {
      updateMeal(meal.id, data)
        .then(() => {
          setLoading(false);
        })
        .catch(error => {
          setError(error.message);
          setLoading(false);
        });
    } else {
      createMeal(data)
        .then(() => {
          setLoading(false);
          navigate('/');
        })
        .catch(error => {
          setError(error.message);
          setLoading(false);
        });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Time:
        <select name="time" defaultValue={meal?.time}>
          <option value="Breakfast">Breakfast</option>
          <option value="Snack">Snack</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
        </select>
      </label>
      <label>
        Description:
        <input type="text" name="description" defaultValue={meal?.description} />
      </label>
      <label>
        Calories:
        <input type="number" name="calories" defaultValue={meal?.calories} />
      </label>
      <button type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Save'}
      </button>
    </form>
  );
};

export default MealForm;

