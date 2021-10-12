import type {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from 'aws-lambda'
import OpenAPIRequestValidator from 'openapi-request-validator'
import OpenAPIResponseValidator from 'openapi-response-validator'
import schema from '../schema/schema.json'
import type { paths } from '../schema/schema.types'

const requestValidator = new OpenAPIRequestValidator(
  // @ts-ignore TEMP FIXME
  schema.paths['/recipe/taco'].post,
)
const responseValidator = new OpenAPIResponseValidator(
  // @ts-ignore TEMP FIXME
  schema.paths['/recipe/taco'].post,
)

const { parse, stringify } = JSON

export function validateRequest(
  event: APIGatewayProxyEventV2,
): APIGatewayProxyResultV2 | void {
  const { body, headers, pathParameters, queryStringParameters } = event

  const request = {
    body: body ? parse(body) : null,
    headers,
    params: pathParameters,
    query: queryStringParameters,
  }

  const requestErrors = requestValidator.validateRequest(request)

  if (requestErrors) {
    return {
      body: stringify(requestErrors.errors),
      statusCode: requestErrors.status,
    }
  }

  return undefined
}

export function validateResponse(
  responseBody: paths['/recipe/taco']['post']['responses']['200']['content']['application/json'],
): APIGatewayProxyResultV2 {
  const responseErrors = responseValidator.validateResponse(200, responseBody)

  if (responseErrors) {
    return {
      body: stringify(responseErrors.errors),
      statusCode: 500, // TODO TEMP
    }
  }

  return {
    body: stringify(responseBody),
    statusCode: 200,
  }
}
