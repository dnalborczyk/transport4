import { randomUUID } from 'crypto'
import type { URLSearchParams } from 'url'

const generated = Array.from(Array(100).keys()).map(() => ({
  description: 'some description',
  id: randomUUID(),
  ingredients: {
    proteins: ['some proteins', 'more proteins'],
    sauces: ['some sauces', 'more sauces'],
    shell: 'some shell',
    toppings: ['some toppings', 'more toppings'],
  },
  instructions: 'some instructions',
  name: 'some name',
}))

export async function getRecipesFromDataStore(params: URLSearchParams) {
  // read from to database
  // ...

  if (params.get('sortbyid')?.toUpperCase() === 'DESC') {
    return generated.sort((a, b) => {
      if (a < b) {
        return -1
      }

      if (a > b) {
        return 1
      }

      return 0
    })
  }

  return generated
}
