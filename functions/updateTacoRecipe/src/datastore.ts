export async function updateDataStore(id: string /* , payload: unknown */) {
  // write to database
  // ...

  return {
    id,
    message: 'Recipe has been updated.',
  }
}
