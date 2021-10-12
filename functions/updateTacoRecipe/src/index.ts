import type {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from 'aws-lambda'
import { updateDataStore } from './datastore'

export default async function updateTacoRecipe(
  event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyResultV2> {
  // @ts-ignore TODO FIXME
  return updateDataStore(event.pathParameters.id, event.body)
}
