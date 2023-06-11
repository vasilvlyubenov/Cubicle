const Cube = require('../models/Cube');

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

exports.getOne = (cubeId) => Cube.findById(cubeId).populate('accessories');

exports.create = async (cubeData) => {
    const cube = new Cube(cubeData);

    await cube.save();

    return cube;
};

exports.attachAccessory = (cubeId, accessoryId) => {
    return Cube.findByIdAndUpdate(cubeId, {$push: {accessories: accessoryId}});
};

exports.delete = (cubeId) => Cube.findByIdAndDelete(cubeId);

exports.edit = (cubeId, cubeData) => Cube.findByIdAndUpdate(cubeId, cubeData);