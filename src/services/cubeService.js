const Cube = require('../models/Cube');

// const cubes = [
//     {
//         id: 'iwaf3ywli1re4mb',
//         name: 'Rubik\'s cube',
//         imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUGI9F4FUClgI6CPofz8ru2lSoGOueBJPW2Q&usqp=CAU',
//         difficultyLevel: 3
//     },
//     {
//         id: 'iwaf46oli1rc628',
//         name: 'Rubik\'s cube Jigsaw',
//         imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB_5sx4nmi6GgzTJ-HHnaSFTzWma3xB33iDg&usqp=CAU',
//         difficultyLevel: 6
//     },
// ];

exports.getAll = async (search, from, to) => {
    let result = await Cube.find().lean();

    //TODO: use mongoose to filter
    if (search) {
        result = result.filter(x => x.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (from) {
        result = result.filter(x => x.difficultyLevel >= Number(from));
    }

    if (to) {
        result = result.filter(x => x.difficultyLevel <= Number(to));
    }

    return result;
};

exports.getOne = (cubeId) => Cube.findById(cubeId);

exports.create = async (cubeData) => {
    const cube = new Cube(cubeData);

    await cube.save();

    return cube;
};