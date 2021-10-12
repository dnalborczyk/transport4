import { env } from 'process'
import { Readable } from 'stream'
import fetch, { Response } from 'node-fetch'
import { URL } from 'url'
import { FormData } from 'formdata-node'
import { FormDataEncoder } from 'form-data-encoder'

const { API_KEY, RECIPE_BASE_URL } = env as Record<string, string>
const RECIPE_PATH = '/recipes/visualizeRecipe'

const { entries } = Object

async function postCreateCard(body: any) {
  const url = new URL(RECIPE_PATH, RECIPE_BASE_URL)
  url.searchParams.append('apiKey', API_KEY)

  let response: Response

  const form = new FormData()

  for (const [key, value] of entries(body)) {
    form.append(key, value)
  }

  // https://github.com/octet-stream/form-data
  // Note that `node-fetch` >= 3.x have builtin support for spec-compliant FormData, sou you'll only need the `form-data-encoder` if you use `node-fetch` <= 2.x.
  const encoder = new FormDataEncoder(form)

  try {
    response = await fetch(String(url), {
      body: Readable.from(encoder),
      headers: encoder.headers,
      method: 'POST',
    })
  } catch (err: any) {
    console.error(`Could not download image ${err.message}`)
    throw err
  }

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`Image download failed. ${text}`)
  }

  return response.json()
}

async function fetchImage(url: URL): Promise<Buffer> {
  let response: Response

  try {
    response = await fetch(String(url))
  } catch (err: any) {
    console.error(`Could not fetch image ${err.message}`)
    throw err
  }

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`Image download failed. ${text}`)
  }

  return response.buffer()
}

export async function createTacoRecipeCard(val: any) {
  const { url } = await postCreateCard(val)

  const buffer = await fetchImage(url)

  return {
    body: buffer.toString('base64'),
    headers: {
      'Content-type': 'image/png',
    },
    isBase64Encoded: true,
    statusCode: 200,
  }
}
