# Scaffold.js

Creating test fixtures has never been so easy

```js
const scaffold = require('scaffold');
const faker = require('faker');
const schema = {
    types: {
        Employee: {
            id: 'id',
            name: 'string',
            contact: 'string',
            department: 'string',
            manager: 'Employee',
            email: {
                _func: [faker.internet.email, 'scaffold', 'awesome'],
            },
        },
    },
};
const {employeeGenerator} = scaffold({
    hasManyMin: 1,
    schema,
});
const employee = employeeGenerator();
const manager = employee.manager;
console.log(employee);
// {
//     id: 1,
//     name: 'non',
//     contact: 'sapien',
//     department: 'nec',
//     manager: [Getter],
//     email: 'scaffold_awesome@gmail.com'
// }
console.log(manager);
// {
//     id: 2,
//     name: 'nisi',
//     contact: 'adipiscing',
//     department: 'sapien',
//     manager: [Getter],
//     email: 'scaffold26@yahoo.com'
// }
```

Supports multiple in-built primitive types

```js
[
    boolean,
    date,
    float,
    id, // generates unique id
    number, // generates a random integer
    string, // generates a random word
    text, // generates a sentence
]
```

If the in built primitives are not sufficient you can always pass a pure function for a field like this

```js
{
    email: {
        _func: [faker.internet.email, 'scaffold', 'awesome']
    }
}
```

where the first element is a pure function where-as the rest of the elements are arguments to this function

### Relations in schema

A fixture in general will have one-many relation or one-one relation scaffold.js makes it easy to manage such relations
without any state dependency between them

#### One-Many

one-many relationship is made possible through _hasMany field within a type

```js
{
    User: {
        _hasMany: {
            friends: ['User']
        }
    }
}
// this will add a friends getter in the generated user fixture
{
    Student: {
        _hasMany: ['Course', 'Project']
    }
}
// this will pluralize 'Course', 'Project' to courses and projects and add them as getters to the generated Student fixture
```

### One-One

one-one relationship doesn't require a special field within a type

```js
{
    Employee: {
        manager: 'Employee'
    }
}
// scaffold.js will check if the 'Employee' type exist and attaches a manager getter to the generated employee fixture
```

check out an elaborate example [here](https://github.com/sreekar2307/scaffold.js/blob/master/examples/scaffold-git.js) 

