const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
  const Chatkit = require('@pusher/chatkit-server')

const app = express()

  const chatkit = new Chatkit.default({
    instanceLocator: 'v1:us1:d3894417-5357-4418-b0e4-3b9e6973f914',
    key: '8a889480-927a-49f1-a281-7c133bf98fca:yi3OfNKE+W0f48DF36oOUR5+Cn4stKAbIpwdh/Uf+e4=',
  })

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.post('/users', (req, res) => {
    const { username } = req.body
    chatkit
      .createUser({
          id: username,
          name: username
      })
      .then(() => res.sendStatus(201))
      .catch(error => {
          if (error.error_type === 'services/chatkit/user_already_exists') {
              res.sendStatus(200)
            } else {
              res.status(error.status).json(error)
            }
        })
  })

app.post('/authenticate', (req, res) => {
    const authData = chatkit.authenticate({ userId: req.query.user_id })
      res.status(authData.status).send(authData.body)
    })


const PORT = 3001
app.listen(PORT, err => {
  if (err) {
    console.error(err)
  } else {
    console.log(`Running on port ${PORT}`)
  }
})