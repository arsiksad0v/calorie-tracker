import axios from 'axios';
import { Meal } from '../types';

const API_URL = 'http://localhost:5173'; 

export const getMeals = () => axios.get(`${API_URL}/meals`);
export const getMealById = (id: number) => axios.get(`${API_URL}/meals/${id}`);
export const addMeal = (meal: Meal) => axios.post(`${API_URL}/meals`, meal);
export const updateMeal = (meal: Meal) => axios.put(`${API_URL}/meals/${meal.id}`, meal);
export const deleteMeal = (id: number) => axios.delete(`${API_URL}/meals/${id}`);