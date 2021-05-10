const database = require("../../../database");
const { body, validationResult } = require("express-validator");

/**
 * POST /api/users
 *
 * name: obligatorio, debe tener por lo menos 3 caracteres
 * age: obligatorio
 */
module.exports = (route) => {
  route.post(
    "/",
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
    body('name').custom((value, { req }) => {
        if (!(database.DB.findIndex((item) => item.name === req.body.name)===-1)) {
          throw new Error('Nombre Repetido');
        }
        // Indicates the success of this synchronous custom validator
        return true;
      }),
    body('age').custom((value, { req }) => {
        if (!(value>=18 && value<=120)) {
          throw new Error('La edad debe ser mayor a 18 y menor a 120');
        }
        // Indicates the success of this synchronous custom validator
        return true;
      }),  
    (req, res) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const name = req.body.name;
      const age = req.body.age;
      const date= new Date();
      const dateFormat = `${date.getDay()}-${date.getMonth()+1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;


      const user = {
        name: name.trim(),
        age: parseInt(age),
        created_at: dateFormat,
        updated_at: ''
      };

      database.add(user);
      res.json(user);
    }
  );
};
