const { Customers, Identifiers } = require("../models/one-to-one");

// create customer
const createCustomer = async (req, res, next) => {
  try {
    const customerReq = new Customers(req.body);
    const customerResult = await customerReq.save();
    //create identifier
    const identifyReq = new Identifiers({
        customer: customerResult,
    })
    const identifyResult = await identifyReq.save()
    //return
    return res.status(200).json({
      statusCode: 200,
      data: identifyResult,
      message: "Add customer successfully!",
    });
  } catch (error) {
    res.status(400).json({
      statusCode: 400,
      message: "Bad request",
    });
  }
};

const getIdentifierById = async (req, res,next)=>{
    try {
        const identifierId = req.params.id
        const result =await Identifiers.findById(identifierId).populate(
            'customer',
            '_id name age gende',
        )
        return res.status(200).json({
            statusCode:200,
            data: result,
        })
    } catch (error) {
        res.status(400).json({
            statusCode:400,
            message:'Bad request',
        })
    }
}

const getAllIdentifiers = async (req, res,next)=>{
    try {
        const result =await Identifiers.find({}).populate(
            'customer',
            '_id name age gende',
        )
        return res.status(200).json({
            statusCode:200,
            data: result,
        })
    } catch (error) {
        res.status(400).json({
            statusCode:400,
            message:'Bad request',
        })
    }
}

// create identifier
// get customer by identifierId - get identifier
// get customer

module.exports={
    createCustomer,
    getIdentifierById,
    getAllIdentifiers,
}