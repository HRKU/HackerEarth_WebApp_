const express = require('express')

const router = express.Router();

const {createCategory,getallcategory,
      getCategory,getCategoryById,
      updateCategory,removeCategory
      } = require("../controllers/category");

router.param("categoryId", getCategoryById);


router.post("/category/create/",createCategory);
router.get("/categories",getallcategory);
router.get("/category/:categoryId", getCategory);
router.put("/category/:categoryId",updateCategory);
router.delete("/category/:categoryId",removeCategory);



module.exports = router;

