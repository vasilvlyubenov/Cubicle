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
        difficultyLevel: 3
    },
];

exports.getAll = () => cubes.slice();

exports.getOne = (cubeId) => cubes.find(x => x.id === cubeId);

exports.create = (cubeData) => {
    const newCube = {
        id: uniqid(),
        ...cubeData,
    };

    cubes.push(newCube);
    return newCube;
};