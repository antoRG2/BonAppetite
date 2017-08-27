import apiCategories from '../../../api/categories.json';
import apiDishes from '../../../api/dishes.json';

function ApiService() {
    this.categories = apiCategories;
    this.dishes = apiDishes;
}

export default ApiService;