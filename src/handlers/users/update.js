const database = require('../../database');
const { body, validationResult } = require("express-validator");

// PUT /api/users/:userId
module.exports = (route) => {
  route.put(
'/:userId', 
body("name")
      .trim()
      .notEmpty()
      .withMessage("Campo obligatorio")
      .isLength({ min: 3 })
      .withMessage("Debe tener 3 caracteres"),
    body("age")
      .notEmpty()
      .withMessage("Campo obligatorio")
      .isInt()
      .withMessage("Debe ser un número entero"),
    body('age').custom((value, { req }) => {
        if (!(value>=18 && value<=120)) {
          throw new Error('La edad debe ser mayor a 18 y menor a 120');
        }
        // Indicates the success of this synchronous custom validator
        return true;
      }),  
  (req, res) => {

    let errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

    const name = req.body.name;
    const age = req.body.age;
    //const created_at = req.body.created_at;

    const userId = parseInt(req.params.userId);
    const userIndex = database.DB.findIndex((item) => item.id === userId);

    if (userIndex > -1) {
      created_at = database.DB[userIndex].created_at;
    }

    const date= new Date();
    const dateFormat = `${date.getDay()}-${date.getMonth()+1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
     

    let user = {
        id:userId,
        name: name.trim(),
        age: parseInt(age),
        created_at:created_at,
        updated_at:dateFormat
      };
      
    if (userIndex > -1) {
      database.DB[userIndex] = user;
      res.json({
        message: 'Editado con exito',
      });
    } else {
      res.sendStatus(404);
    }
    
  });
};