const BaseController = require("../../utils/baseControllers");
const Institutions = require("../../models/Institutions");

const instituImageController = new BaseController(Institutions, [], [], "institutionProfileImage");
module.exports = instituImageController;