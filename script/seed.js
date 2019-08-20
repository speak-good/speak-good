'use strict'

const db = require('../server/db')
const {User, Video} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      firstName: 'Cody',
      lastName: 'Pug',
      email: 'cody@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'Murphy',
      lastName: 'Prosacco',
      email: 'murphy@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'Sherman',
      lastName: 'Jacobs',
      email: 'shyann67@yahoo.com',
      password: '123'
    }),
    User.create({
      firstName: 'Rosalinda',
      lastName: 'Beatty',
      email: 'conner_Purdy@hotmail.com',
      password: '123'
    }),
    User.create({
      firstName: 'Frank',
      lastName: 'Batz',
      email: 'genoveva38@hotmail.com',
      password: '123'
    })
  ])

  const videos = await Promise.all([
    Video.create({
      slouch: 33.0,
      transcript: 'Blanditiis quo est eaque. Voluptate nam autem cum numquam.',
      fillerCount: 3
    }),
    Video.create({
      slouch: 12.3,
      transcript: 'Granite pricing structure Home Loan Account',
      fillerCount: 4
    }),
    Video.create({
      slouch: 10.3,
      transcript: 'implementation Jamaican Dollar',
      fillerCount: 0
    }),
    Video.create({
      slouch: 1.3,
      transcript: 'benchmark Lebanese Pound China',
      fillerCount: 1
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
