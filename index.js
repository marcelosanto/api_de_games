const express = require('express')
const app = express()
const bodyParse = require('body-parser')
const cors = require('cors')
const jwt = require('jsonwebtoken')

const jwtSecret = 'okdaoadsij83u3004954ujirjgjddszf'

app.use(cors())
app.use(bodyParse.urlencoded({ extended: false }))
app.use(bodyParse.json())

let DB = {
  games: [
    {
      id: 23,
      title: 'Call of Dutty',
      year: 2019,
      price: 60,
    },
    {
      id: 70,
      title: 'Sea of thieves',
      year: 2018,
      price: 40,
    },
    {
      id: 2,
      title: 'Minecraft',
      year: 2012,
      price: 20,
    },
  ],
  users: [
    {
      id: 1,
      name: 'Marcelo Santos',
      email: 'mama@rocha.com',
      password: 'mamajs',
    },
    {
      id: 10,
      name: 'Alice Santos',
      email: 'lili2020@rocha.com',
      password: 'lili2020js',
    },
  ],
}

app.get('/games', (req, res) => {
  res.statusCode = 200
  res.json(DB.games)
})

app.get('/game/:id', (req, res) => {
  if (isNaN(req.params.id)) {
    res.sendStatus(400)
  } else {
    let id = parseInt(req.params.id)

    let game = DB.games.find((g) => g.id == id)

    if (game != undefined) {
      res.statusCode = 200
      res.json(game)
    } else {
      res.sendStatus(404)
    }
  }
})

app.post('/game', (req, res) => {
  let { title, price, year } = req.body

  DB.games.push({
    id: 89889,
    title,
    price,
    year,
  })

  res.sendStatus(200)
})

app.delete('/game/:id', (req, res) => {
  if (isNaN(req.params.id)) {
    res.sendStatus(400)
  } else {
    let id = parseInt(req.params.id)
    let index = DB.games.findIndex((g) => g.id == id)

    if (index == -1) {
      res.sendStatus(404)
    } else {
      DB.games.splice(index, 1)
      res.sendStatus(200)
    }
  }
})

app.put('/game/:id', (req, res) => {
  if (isNaN(req.params.id)) {
    res.sendStatus(400)
  } else {
    let id = parseInt(req.params.id)
    let game = DB.games.find((g) => g.id == id)

    if (game !== undefined) {
      let { title, price, year } = req.body

      if (title != undefined) {
        game.title = title
      }
      if (price != undefined) {
        game.price = price
      }
      if (year != undefined) {
        game.year = year
      }

      res.sendStatus(200)
    } else {
      res.sendStatus(404)
    }
  }
})

app.post('/auth', (req, res) => {
  let { email, password } = req.body

  if (email != undefined) {
    let user = DB.users.find((u) => u.email == email)

    if (user != undefined) {
      if (user.password == password) {
        jwt.sign({ id: user.id, email: user.email }, jwtSecret)

        res.status(200)
        res.json({ err: 'Token falso' })
      } else {
        res.status(401)
        res.json({ err: 'Credenciais inválidas' })
      }
    } else {
      res.status(404)
      res.json({ err: 'O E-mail enviado não existe na base de dados!!!' })
    }
  } else {
    res.status(400)
    res.json({ err: 'O E-mail enviado é ínvalido' })
  }
})

app.listen(45678, () => console.log('API RODANDO'))
