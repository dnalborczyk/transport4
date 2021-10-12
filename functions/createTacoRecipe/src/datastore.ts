import { randomUUID } from 'crypto'

export async function writeToDataStore(/* payload: unknown */) {
  // write to database
  // ...

  return {
    id: randomUUID(), // random fake id
    message: 'Recipe has been created.',
  }
}
