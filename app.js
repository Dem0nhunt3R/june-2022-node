const express = require('express');

const {fileService} = require("./utils");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// app.get('/users', (req, res) => {
//     if (usersDB.length === 0) {
//         console.log('no users')
//         return res.json('There are no users yet');
//     }
//
//     res.json(usersDB);
// });
//
// app.get('/users/:id', (req, res) => {
//     const {id} = req.params;
//     if (Number.isInteger(+id)) {
//         const find = usersDB.find(user => user.id === +id);
//         if (!find) {
//             console.log('Not found')
//             return res.status(404).json('User with ID ' + id + ' not found');
//         }
//         return res.json(find);
//     } else {
//         console.log('ID is not a number')
//         return res.status(400).json('ID is not a number');
//     }
// });
//
// app.post('/users', (req, res) => {
//     const user = req.body;
//
//     if (!user.name) {
//         return res.status(400).json('Enter your name');
//     }
//
//     if (!user.age) {
//         return res.status(400).json('Enter your age');
//     }
//
//     const newUser = {id: usersDB.length + 1, ...user};
//     usersDB.push(newUser);
//
//     res.status(201).json('Created');
// });
//
// app.put('/users/:id', (req, res) => {
//     const {id} = req.params;
//     const user = req.body;
//
//     if (Number.isInteger(+id)) {
//         const find = usersDB.find(user => user.id === +id);
//         if (!find) {
//             console.log('Not found')
//             return res.status(404).json('User with ID ' + id + ' not found');
//         }
//
//         if (!user.name) {
//             return res.status(400).json('Enter your name');
//         }
//
//         if (!user.age) {
//             return res.status(400).json('Enter your age');
//         }
//
//         const assign = Object.assign(find, user);
//         res.status(201).json(assign);
//
//     } else {
//         console.log('ID is not a number')
//         return res.status(400).json('ID is not a number');
//     }
// });
//
// app.delete('/users/:id', (req, res) => {
//     const {id} = req.params;
//     if (Number.isInteger(+id)) {
//         const index = usersDB.findIndex(user => user.id === +id);
//         if (index === -1) {
//             console.log('Not found')
//             return res.status(404).json('User with ID ' + id + ' not found');
//         }
//         console.log(index)
//         usersDB.splice(usersDB[index], 1);
//         console.log(usersDB)
//         return res.json('deleted');
//     } else {
//         console.log('ID is not a number');
//         return res.status(400).json('ID is not a number');
//     }
// })

app.get('/users', async (req, res) => {
    const users = await fileService.reader();
    res.json(users);
});

app.get('/users/:id', async (req, res) => {
    const {id} = req.params;

    if (Number.isNaN(+id)) {
        return res.json('ID is not a number');
    }

    const users = await fileService.reader();
    const find = users.find(user => user.id === +id);

    if (!find) {
        return res.status(404).json('User with ID ' + id + ' not found');
    }

    res.json(find);
});

app.post('/users', async (req, res) => {
    const {name, age} = req.body;

    if (!name || name.length < 2) {
        return res.status(400).json('Invalid name');
    }

    if (!age || age < 18 || Number.isNaN(age)) {
        return res.status(400).json('Invalid age');
    }

    const users = await fileService.reader();
    const newUser = {id: users.length + 1, name, age};
    users.push(newUser);
    await fileService.writer(users);

    res.status(201).json(newUser);
});

app.put('/users/:id', async (req, res) => {
    const id = +req.params['id'];

    if (Number.isNaN(id)) {
        return res.status(400).json('ID is not a number');
    }

    const users = await fileService.reader();
    const find = users.find(user => user.id === id);

    if (!find) {
        return res.status(404).json('User with ID ' + id + ' not found');
    }

    const userInfo = req.body;

    if (userInfo.name && userInfo.name.length < 2) {
        return res.status(400).json('Invalid name');
    }

    if (userInfo.age && userInfo.age < 18) {
        return res.status(400).json('Invalid age');
    }

    const newUser = Object.assign(find, userInfo);
    await fileService.writer(users);

    res.status(201).json(newUser);
});

app.delete('/users/:id', async (req, res) => {
    const id = +req.params['id'];

    if (Number.isNaN(id)) {
        return res.status(400).json('ID is not a number');
    }

    const users = await fileService.reader();
    const index = users.findIndex(user => user.id === id);

    if (index === -1) {
        return res.status(404).json('User with ID ' + id + ' not found');
    }

    users.splice(index, 1);
    await fileService.writer(users);

    res.sendStatus(204);
})

app.listen(5000, () => {
    console.log('Server listen 5000')
});