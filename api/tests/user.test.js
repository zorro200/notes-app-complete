const User = require('../models/User')
const bcrypt = require('bcrypt')
const { api, getUsers } = require('./helpers')
const moongose = require('mongoose')
const { server } = require('../index')

describe.only('creating a new user', () => {
  beforeEach(async () => {
    await User.deleteMany

    const passwordHash = await bcrypt.hash('psswd', 10)
    const user = new User({ username: 'miduroot', passwordHash })

    await user.save()
  })

  test('works as expected creating a fresh username',
    async () => {
      const usersAtStart = await getUsers()

      const newUser = {
        nick: 'midudev',
        name: 'Miguel',
        password: 'tw1tch'
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await getUsers()

      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

      const usernames = usersAtEnd.map(u => u.nick)
      expect(usernames).toContain(newUser.nick)
    })

  afterAll(() => {
    moongose.connection.close()
    server.close()
  })
})
