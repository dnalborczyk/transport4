import type {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
  // Context,
} from 'aws-lambda'
import { writeToDataStore } from './datastore'
import { validateRequest, validateResponse } from './validate'

const { parse } = JSON

export default async function postTacoRecipeCard(
  event: APIGatewayProxyEventV2,
  // context: Context,
): Promise<APIGatewayProxyResultV2> {
  const requestErrors = validateRequest(event)

  if (requestErrors) {
    return requestErrors
  }

  const responseBody = await writeToDataStore(
    event.body ? parse(event.body) : null,
  )

  return validateResponse(responseBody)
}
