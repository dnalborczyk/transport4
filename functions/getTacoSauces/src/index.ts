import type { APIGatewayProxyResultV2 } from 'aws-lambda'
import { fetchTacoSauces } from './datastore'

export default async function postTacoRecipeCard(): Promise<APIGatewayProxyResultV2> {
  return fetchTacoSauces()
}
