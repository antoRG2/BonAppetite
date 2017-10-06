import apiCategories from '@/api/categories.json';
import apiDishes from '@/api/dishes.json';
import apiMeasurements from '@/api/measurements.json';
import apiIngredients from '@/api/ingredients.json';

function ApiService() {
    this.categories = apiCategories;
    this.dishes = apiDishes;
    this.measurements = apiMeasurements;
    this.ingredients = apiIngredients;
}

export default ApiService;