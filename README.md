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
//    id: 1,
//    name: 'dolor',
//    contact: 'dolor',
//    department: 'libero',
//    manager: [Getter],
//    email: 'scaffold.awesome41@gmail.com'
// }
console.log(manager);

// {
//   id: 1,
//   name: 'dolor',
//   contact: 'dolor',
//   department: 'libero',
//   manager: [Getter],
//   email: 'scaffold.awesome41@gmail.com'
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

If the in built-in primitives are not sufficient you can always pass a pure function for a field like this

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
// this will pluralize 'Course', 'Project' to courses and projects and them as getters to generated Student fixture
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

