//  IMPORT FUNCTION FROM PRODUCT MODEL //

const productModel = require("../models/ProjectModel.js");

//  GET ALL PRODUCTS //

const showProducts = (req, res) => {
    productModel.getProducts((err, results)=> {
         if (err){
        res.send(err);
    } else{
        res.json(results);
    }
    });
   
}

//  GET A SINGLE PPRODUCT //
const showProductById = (req, res) => {
    productModel.getProductById(req.params.id, (err, results) => {
        if (err){
            res.send(err);
        } else{
            res.json(results);
        }
    });
}

//  CREATE A NEW PRODUCT //

const createProduct = (req, res) => {
    const data = req.body;
    productModel.insertProduct(data, (err, results)=> {
        if (err) {
            res.send(err);
        } else{
            res.json(results);
        }
    });
}

//  UPDATE PRODUCT //
const updateProduct = (req, res) => {
    const data = req.body;
    const id = req.params.id;
    productModel.updateProductById(data, id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

//  DELETE PRODUCT //

const deleteProduct = (req, res) => {
    const id = req.params.id;
    productModel.deleteProductById(id, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

module.exports = {
    showProducts,
    showProductById,
    createProduct,
    updateProduct,
    deleteProduct
};