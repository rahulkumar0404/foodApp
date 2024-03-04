import MealItem from './MealItem';
import useHttp from '../hooks/useHttp';

const requestConfig = {};
export default function Meals() {
  // const [loadedMeals, setLoadedMeals] = useState([]);

  // useEffect(() => {
  //   async function fetchMeals() {
  //     const response = await fetch('');
  //     if (!response.ok) {
  //       throw new Error("Failed to load the value");
  //     }
  //     const meals = await response.json();
  //     setLoadedMeals(meals);
  //   }
  //   fetchMeals()
  // }, []);

  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp('http://localhost:3000/meals', requestConfig, []);

  console.log(loadedMeals);
  if (isLoading) {
    return <p>Fetching meal...</p>;
  }
  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
