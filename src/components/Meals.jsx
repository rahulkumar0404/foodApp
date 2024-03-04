import MealItem from './MealItem';
import useHttp from '../hooks/useHttp';
import Error from './Error';
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

  if (isLoading) {
    return <p className="center">Fetching meal...</p>;
  }

  if (error) {
    return <Error title="Failed to load Meals" message={error} />;
  }
  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
