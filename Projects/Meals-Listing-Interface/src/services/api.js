const BASE_URL = 'https://api.freeapi.app/api/v1/public/meals';

/**
 * Fetch paginated list of meals with optional search query
 */
export async function fetchMeals({ page = 1, limit = 12, query = '' } = {}) {
  try {
    const params = new URLSearchParams();
    if (page) params.append('page', page);
    if (limit) params.append('limit', limit);
    if (query && query.trim()) params.append('query', query.trim());

    const response = await fetch(`${BASE_URL}?${params.toString()}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const json = await response.json();
    if (json.success && json.data) {
      return {
        meals: json.data.data || [],
        page: json.data.page || 1,
        limit: json.data.limit || limit,
        totalPages: json.data.totalPages || 1,
        totalItems: json.data.totalItems || 0,
        hasNextPage: json.data.nextPage || false,
        hasPreviousPage: json.data.previousPage || false,
      };
    }
    throw new Error(json.message || 'Failed to fetch meals');
  } catch (err) {
    console.error('Error fetching meals:', err);
    throw err;
  }
}

/**
 * Fetch single meal details by idMeal
 */
export async function fetchMealById(idMeal) {
  try {
    const response = await fetch(`${BASE_URL}/meal/${idMeal}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const json = await response.json();
    if (json.success && json.data) {
      return json.data;
    }
    throw new Error(json.message || 'Failed to fetch meal details');
  } catch (err) {
    console.error(`Error fetching meal ${idMeal}:`, err);
    throw err;
  }
}

/**
 * Fetch a random meal
 */
export async function fetchRandomMeal() {
  try {
    const response = await fetch(`${BASE_URL}/meal/random`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const json = await response.json();
    if (json.success && json.data) {
      return json.data;
    }
    throw new Error(json.message || 'Failed to fetch random meal');
  } catch (err) {
    console.error('Error fetching random meal:', err);
    throw err;
  }
}

/**
 * Helper function to extract ingredients & measures from raw API object
 */
export function extractIngredients(meal) {
  if (!meal) return [];
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push({
        id: i,
        name: ingredient.trim(),
        measure: measure ? measure.trim() : '',
      });
    }
  }
  return ingredients;
}

/**
 * Helper to convert country area string to flag emoji
 */
export function getAreaFlag(area) {
  const flags = {
    American: '🇺🇸',
    British: '🇬🇧',
    Canadian: '🇨🇦',
    Chinese: '🇨🇳',
    Croatian: '🇭🇷',
    Dutch: '🇳🇱',
    Egyptian: '🇪🇬',
    Filipino: '🇵🇭',
    French: '🇫🇷',
    Greek: '🇬🇷',
    Indian: '🇮🇳',
    Irish: '🇮🇪',
    Italian: '🇮🇹',
    Jamaican: '🇯🇲',
    Japanese: '🇯🇵',
    Kenyan: '🇰🇪',
    Malaysian: '🇲🇾',
    Mexican: '🇲🇽',
    Moroccan: '🇲🇦',
    Polish: '🇵🇱',
    Portuguese: '🇵🇹',
    Russian: '🇷🇺',
    Spanish: '🇪🇸',
    Thai: '🇹🇭',
    Tunisian: '🇹🇳',
    Turkish: '🇹🇷',
    Ukrainian: '🇺🇦',
    Vietnamese: '🇻🇳',
  };
  return flags[area] || '🍽️';
}
