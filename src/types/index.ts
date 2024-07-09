export interface Meal {
  id: number;
  time: 'Breakfast' | 'Snack' | 'Lunch' | 'Dinner';
  description: string;
  calories: number;
}

