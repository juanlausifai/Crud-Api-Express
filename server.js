const express = require('express');
const { PORT } = require('./config');
const app = express();

app.use(express.json());

let id = 2;
const DB = [{ id: 1, name: 'Juan', age: 30 }];

app.get('/api/users', (req, res) => {
  res.json(DB);
});

app.post('/api/users', (req, res) => {
  const user = {
    id: id++,
    name: req.body.name,
    age: req.body.age,
  };

  const userName = user.name.toLowerCase().trim();

  if (DB.some((item) => item.name.toLowerCase().trim() === userName)) {
    res.status(409).json({
      message: '`name` debe ser único',
    });
  } else {
    DB.push(user);
    res.json(user);
  }
});

app.get('/api/users/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = DB.find((item) => item.id === userId);

  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
});

// DB.findIndex((item) => item.id === userId);
DB.findIndex((item) => item.id === userId);

app.delete('/api/users/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const userIndex = DB.findIndex((item) => item.id === userId);

  if (userIndex > -1) {
    DB.splice(userIndex, 1);
    res.json({
      message: 'User deleted!',
    });
  } else {
    res.sendStatus(404);
  }
});

// @TODO: Implementar actualización de datos del usuario
// Criterios:
//   - Valide datos ingresados (`name` debe ser único, no deben faltar datos).
//   - Valide si el ID existe.

app.listen(PORT, () => {
  console.info(`Escuchando en puerto ${PORT}`);
});
