import type {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from 'aws-lambda'
import { createTacoRecipeCard } from './datastore'

const { parse } = JSON

// example body:
// const body = {
//   author: 'foo',
//   backgroundColor: '#ffffff',
//   backgroundImage: 'none',
//   // image: null,
//   fontColor: '#333333',
//   imageUrl:
//     'https://spoonacular.com/recipeCardImages/recipeCard-1633829271259.png',
//   ingredients: 'foo',
//   instructions: 'foo',
//   mask: 'starMask',
//   readyInMinutes: 60,
//   servings: 4,
//   source: 'spoonacular.com',
//   title: 'foo',
// }

export default async function postTacoRecipeCard(
  event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyResultV2> {
  return createTacoRecipeCard(event.body ? parse(event.body) : null)
}
