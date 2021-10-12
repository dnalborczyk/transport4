import type {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
  // Context,
} from 'aws-lambda'
import { deleteFromDataStore } from './datastore'

export default async function deleteTacoRecipe(
  event: APIGatewayProxyEventV2,
  // context: Context,
): Promise<APIGatewayProxyResultV2> {
  // @ts-ignore TODO FIXME
  return deleteFromDataStore(event.pathParameters.id)
}
