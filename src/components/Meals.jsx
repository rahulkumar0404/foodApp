import { useState, useEffect } from 'react';

export default function Meals() {
  const [loadedMeals, setLoadedMeals] = useState([]);

  useEffect(() => {
    async function fetchMeals() {
      const response = fetch('http:localhost:3000/meals');
      if (!response.ok) {
        throw new Error("Failed to load the value");
      }
      const meals = await response.json();
      setLoadedMeals(meals);
    }
    fetchMeals()
  }, []);
  return (
    <ul id="meals">
      {loadedMeals.map((meal) => {
        <li key={meal.id}>{meal.name}</li>;
      })}
    </ul>
  );
}