import postTacoRecipeCard from '../index'

const { parse, stringify } = JSON

describe('postTacoRecipeCard', () => {
  test('...', async () => {
    expect.assertions(1)

    const response = await postTacoRecipeCard({
      body: stringify({
        description: 'some description',
        ingredients: {
          proteins: ['beef', 'tofu'],
          shell: 'corn',
          toppings: ['tomatoe'],
        },
        instructions: 'some instructions',
        name: 'my famous taco',
      }),
      headers: {
        'content-type': 'application/json',
      },
      version: '',
      routeKey: '',
      rawPath: '',
      rawQueryString: '',
      requestContext: {} as any, // TEMP FIXME
      isBase64Encoded: false,
    })

    // @ts-ignore TODO FIXME
    expect(parse(response.body)).toMatchInlineSnapshot(
      {
        id: expect.any(String),
      },
      `
      Object {
        "id": Any<String>,
        "message": "Recipe has been created.",
      }
    `,
    )
  })
})
