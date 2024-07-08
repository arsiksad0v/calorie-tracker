import axios from 'axios';

const API_URL = 'http://localhost:5173/meals'; 

export const getMeals = () => axios.get(API_URL);
export const getMeal = (id: string) => axios.get(`${API_URL}/${id}`);
export const createMeal = (meal: any) => axios.post(API_URL, meal);
export const updateMeal = (id: string, meal: any) => axios.put(`${API_URL}/${id}`, meal);
export const deleteMeal = (id: string) => axios.delete(`${API_URL}/${id}`);