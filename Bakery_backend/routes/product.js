const express = require('express');

const router = express.Router();

var multer  = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null,file.originalname);
  }
});

var upload = multer({ storage: storage })

const {createproduct,getallproduct,
      getproduct,getproductById,getproductByCategoryID,
      updateproduct,removeproduct,getCateProduct
      } = require("../controllers/product");

router.param("productId", getproductById);


router.post("/product/create/",  
    upload.single('productImage'),
    createproduct
    ); 
router.get("/products",getallproduct);
router.get("/product/:productId", getproduct);
router.get("/productCate/:CategoryId", getCateProduct);
router.param("CategoryId", getproductByCategoryID);
router.put("/product/:productId",updateproduct);
router.delete("/product/:productId",removeproduct);



module.exports = router;