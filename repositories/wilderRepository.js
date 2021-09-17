const wilderModel = require('../models/wilderModel');

module.exports = {
    create: async (name, city, skills) => {
        await WilderModel.init();
        const wilder = new WilderModel({
            name,
            city,
            skills,
        });
        return wilder.save();
    },
    find: (id) => {
        return WilderModel.findById(id).exec();
    },
    findAll: () => {
        return wilderModel.find({}).exec();
    },
    /* update: (id, name, city, skills) => {
        return wilderModel.findByIdAndUpdate(id, { name, city, skills }).exec();
    }, */
    update: async (id, name, city, skills) => {
        await wilderModel.updateOne({ _id: id }, {
            name,
            city,
            skills
        });
        return wilderModel.findById(id).exec();
    },
    delete: (id) => {
        return wilderModel.findByIdAndDelete(id).exec();
    },
}