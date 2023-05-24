const uniqid = require('uniqid');
const cubes = [
    {
        id: 'iwaf3ywli1re4mb',
        name: 'Rubik\'s cube',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUGI9F4FUClgI6CPofz8ru2lSoGOueBJPW2Q&usqp=CAU',
        difficultyLevel: 3
    },
    {
        id: 'iwaf46oli1rc628',
        name: 'Rubik\'s cube Jigsaw',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB_5sx4nmi6GgzTJ-HHnaSFTzWma3xB33iDg&usqp=CAU',
        difficultyLevel: 6
    },
];

exports.getAll = (search, from, to) => {
    let result = cubes.slice();

    if (search) {
        result = cubes.filter(x => x.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (from) {
        result = cubes.filter(x => x.difficultyLevel >= Number(from));
    }

    if (to) {
        result = cubes.filter(x => x.difficultyLevel <= Number(to));
    }

    return result;
};

exports.getOne = (cubeId) => cubes.find(x => x.id === cubeId);

exports.create = (cubeData) => {
    const newCube = {
        id: uniqid(),
        ...cubeData,
    };

    cubes.push(newCube);
    return newCube;
};