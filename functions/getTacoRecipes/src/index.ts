import { URLSearchParams } from 'url'
import type {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
  Context,
} from 'aws-lambda'
import { getRecipesFromDataStore } from './datastore'

export default async function getTacoRecipes(
  event: APIGatewayProxyEventV2,
  context: Context,
): Promise<APIGatewayProxyResultV2> {
  const urlSearchParams = new URLSearchParams(
    event.queryStringParameters as Record<string, string>, // would not support multi values
  )

  // @ts-ignore TODO FIXME
  return getRecipesFromDataStore(urlSearchParams)
}
