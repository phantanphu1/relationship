const { Tutorials, Comments, Categories } = require("../models/one-to-many");

// create category
const createCategory = async (req, res) => {
  try {
    const tutorialId = req.body.tutorialId;

    // const requset ={
    //     name:req.body.name,
    //     description:req.body.description
    // }

    const categoryReq = new Categories(req.body);
    const categoryResult = await categoryReq.save();
    //check body request -> Tutorials->update this categorry in to Tutorials
    if (tutorialId) {
      await Tutorials.findByIdAndUpdate(
        tutorialId,
        { category: categoryResult },
        { new: true, useFindAndModify: false }
      );
    }
    return res.status(200).json({
      statusCode: 200,
      data: categoryResult,
      message: "Add category successfully!",
    });
  } catch (error) {
    res.status(400).json({
      statusCode: 400,
      message: "Bad request",
    });
  }
};

//create comment
const createComment = async (req, res) => {
  try {
    const toturialId = req.body.tutorialId;
    delete req.body.tutorialId;
    // const requset ={
    //     name:req.body.name,
    //     description:req.body.description
    // }

    const commentReq = new Comments(req.body);
    const commentResult = await commentReq.save();
    //check body request -> Tutorials->update this categorry in to Tutorials
    if (toturialId) {
      await Tutorials.findByIdAndUpdate(
        toturialId,
        { $push: { comments: commentResult } },
        { new: true, useFindAndModify: false }
      );
    }
    return res.status(200).json({
      statusCode: 200,
      data: commentResult,
      message: "Add comment successfully!",
    });
  } catch (error) {
    res.status(400).json({
      statusCode: 400,
      message: "Bad request",
    });
  }
};

// add Tutorrial
const createTutorial = async (req, res, next) => {
  try {
    const tutorialReq = new Tutorials(req.body);
    const result = await tutorialReq.save();

    // const requset ={
    //     name:req.body.name,
    //     description:req.body.description
    // }

    return res.status(201).json({
      statusCode: 201,
      data: result,
      message: "Add Tutorial successfully!",
    });
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      message: "Bad request",
    });
  }
};

const getTutorialById = async (req, res, next) => {
  try {
    const tutorialId = req.params.id;
    const result = await Tutorials.findById(tutorialId)
      .populate("category", "_id name description")
      .populate("comments", "_id username comment rating");
    return res.status(200).json({
      statusCode: 200,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      statusCode: 400,
      message: "Bad request",
    });
  }
};

const getAllTutorial = async (req, res, next) => {
  try {
    const result = await Tutorials.find({})
      .populate("category", "_id name description")
      .populate("comments", "_id username comment rating");
    return res.status(200).json({
      statusCode: 200,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      statusCode: 400,
      message: "Bad request",
    });
  }
};

// create identifier
// get customer by identifierId - get identifier
// get customer

module.exports = {
  createCategory,
  createComment,
  createTutorial,
  getTutorialById,
  getAllTutorial,
};
