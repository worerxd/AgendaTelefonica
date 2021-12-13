const express = require('express');
const morgan = require('morgan');

const router = express.Router();

morgan.token('body', (req, res) => JSON.stringify(req.body));

const persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423122"
    },
    
]


const generateId = () => {
    const maxId = persons.length > 0 ? Math.max(...persons.map(p => p.id)) : 0;
    return maxId+1;
}

// get all persons
router.get('/persons', (req, res) => {
    res.json(persons)
})

//get info
router.get('/info', (req, res) => {
    const date = new Date(Date.now());
    res.send(`<p>Phonebook has info for ${persons.length} people</p> <p>${date}</p>`)
})

// get one person
router.get('/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find( p => p.id === id)
    if(!person) return res.status(404).send('Person Not found');
    res.json(person)
})

// delete one person
router.delete('/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const personToDelete = persons.find( p => p.id === id);
    if(!personToDelete) return res.status(404).json({error: 'Person Not found'});
    
    res.status(200).send(`The person with id: ${personToDelete.id} has been deleted`);
})


// post a person
router.post('/persons', morgan(':method :url :status :res[content-length] - :response-time ms :body'), (req, res) => {
    const newPerson = req.body;

    if(!newPerson.name || !newPerson.number) return res.status(400).json({error: 'Name and Number missing'});

    const isNameUsed = persons.filter( p => p.name === newPerson.name);
    
    if(isNameUsed.length>0) return res.status(400).json({error: 'Name must be unique'});

    res.status(201).json({message: "Person Created", status: 201, data: {id: generateId(), ...newPerson }})

})


module.exports = router;