const Product = require("../models/product");
const Category = require("../models/category");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
var multer  = require('multer');
const mongoose = require("mongoose");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

var upload = multer({ storage: storage })

  exports.createproduct = (req, res) => {
    const product = new Product(req.body);
    product.photoByPath = req.file.path; // for image

    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "NOT able to save product in DB",
          msg: err
          
          
        });
      }
      res.json({ product });
    });
  };

  exports.getallproduct =
  (req, res) => 
  {
    Product.find().exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "NO products found"
        });
      }
      res.json(products);
    });
  };

  exports.getproductById = (req, res, next, id) => {
    Product.findById(id)
      .populate("category") 
      .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "product not found in DB"
        });
      }
      
      req.product = product;
      next();
    });
  };
  exports.getproductByCategoryID = (req, res, next, id) => {
    var c_id = mongoose.Types.ObjectId(id)
     
    Product.find({category:c_id})
      // .populate("category") 
      .exec((err, Cate) => {
      if (err) {
        return res.status(400).json({
          error: "Category not found in DB",
          e: err
        });
      }
      
      req.cate = Cate;
      next();
    });
  };

  exports.getproduct = (req, res) => {
      return res.json(req.product);
    };
  exports.getCateProduct = (req, res) => {
      return res.json(req.cate);
    };
    



  exports.removeproduct = (req, res) => {
    const productIndvisual = req.product;

    productIndvisual.deleteOne((err, product) => {
      if(err) {
        return res.status(400).json({
          error: "Failed to remove product. Does not exists."
        });
      }
      res.json({
        message: "Successfully Deleted."
      });
    });
  };


  exports.updateproduct = (req, res) => {
    
      const product = req.product;

      product.rating = req.body.rating
      // product.ProductName = req.body.ProductName;
      // product.Description = req.body.Description;
      // product.Cost = req.body.Cost;
      // product.stock = req.body.stock;
      // product.photoByPath = req.body.photoByPath;
    
      product.save((err, updatedproduct) => {
        if (err) {
          return res.status(400).json({
            error: "Failed to update product",
            error: err
          });
        }
        res.json(updatedproduct);
      });
    };
