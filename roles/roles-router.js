const router = require('express').Router();
const knex = require('knex');


const knexConfig = {
  client: 'sqlite3',
  connection: {
    filename: './data/rolex.db3'
  },
  useNullAsDefault: true //required only for sql3
}
const db = knex(knexConfig);

router.get('/', (req, res) => {
  // get the roles from the database
  db('roles')
  .then(roles => {
    res.status(200).json({roles})
  })
  .catch(err => {
    res.status(500).json({message: err})
  })
});

router.get('/:id', (req, res) => {
  // retrieve a role by id
  db('roles')
  .where({id: req.params.id})
  .then(role => {
    res.status(200).json({role})
  })
  .catch(err => {
    res.status(500).json({err})
  })
});

router.post('/', (req, res) => {
  // add a role to the database
  db('roles')
  .insert(req.body, 'id') //second argument is just returning that last item id added to db

  .then(ids => {
    res.status(201).json({ids})
  })
 // .catch(err  => {res.status(500).json({message: err})})
});

router.put('/:id', (req, res) => {
  // update roles
  const changes = req.body;
  db('roles')
  .where({id: req.params.id}).update(changes)
  .then(count => {
    if (count > 0) {
      res.status(200).json({message: `${count >= 1 ? `${count} record updated` : `${count} records updated`} `})
    } else {
      res.status(401).json({message: 'role not found'})
    }
  })
  .catch(err => {
    res.status(500).json({message: err})
  })
});

router.delete('/:id', (req, res) => {
  // remove roles (inactivate the role)
  res.send('Write code to remove a role');
});



module.exports = router;
