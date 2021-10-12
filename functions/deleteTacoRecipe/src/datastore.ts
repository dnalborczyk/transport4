export async function deleteFromDataStore(id: string) {
  // delete from database
  // ...

  return {
    id,
    message: 'Recipe has been deleted.',
  }
}
