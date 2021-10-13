import type {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from 'aws-lambda'
import { deleteFromDataStore } from './datastore'

export default async function deleteTacoRecipe(
  event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyResultV2> {
  // @ts-ignore TODO FIXME
  return deleteFromDataStore(event.pathParameters.id)
}
