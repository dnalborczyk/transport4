import { env } from 'process'
import fetch, { Response } from 'node-fetch'

const { stringify } = JSON

const { API_KEY, RECIPE_BASE_URL } = env as Record<string, string>
const RECIPE_PATH = '/food/ingredients/search'

export async function fetchTacoSauces() {
  const url = new URL(RECIPE_PATH, RECIPE_BASE_URL)
  url.searchParams.append('apiKey', API_KEY)
  url.searchParams.append('query', 'salsa')
  // url.searchParams.append('query', 'tomatillo')

  let response: Response

  try {
    response = await fetch(String(url))
  } catch (err: any) {
    console.error(`Could not fetch data ${err.message}`)
    throw err
  }

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`Data fetch failed. ${text}`)
  }

  let json: unknown

  try {
    json = await response.json()
  } catch (err: any) {
    console.error(`Not a valid json response ${err.message}`)
    throw err
  }

  return {
    body: stringify(json),
    statusCode: 200,
  }
}
