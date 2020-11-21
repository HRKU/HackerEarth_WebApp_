const Category = require("../models/category")

  exports.createCategory = (req, res) => {
    const category = new Category(req.body);
    category.save((err, category) => {
      if (err) {
        return res.status(400).json({
          error: "NOT able to save category in DB"
        });
      }
      res.json({ category });
    });
  };

  exports.getallcategory =
  (req, res) => 
  {
    Category.find().exec((err, categories) => {
      if (err) {
        return res.status(400).json({
          error: "NO categories found"
        });
      }
      res.json(categories);
    });
  };

  exports.getCategoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, cate) => {
      if (err) {
        return res.status(400).json({
          error: "Category not found in DB"
        });
      }
      req.category = cate;
      next();
    });
  };

  exports.getCategory = (req, res) => {
      return res.json(req.category);
    };



  exports.removeCategory = (req, res) => {
    const category = req.category;

    category.remove((err, category) => {
      if(err) {
        return res.status(400).json({
          error: "Failed to remove category. Does not exists."
        });
      }
      res.json({
        message: "Successfully Deleted."
      });
    });
  };


  exports.updateCategory = (req, res) => {
    
      const category = req.category;
     
      category.name = req.body.name;
    
      category.save((err, updatedCategory) => {
        if (err) {
          return res.status(400).json({
            error: "Failed to update category"
          });
        }
        res.json(updatedCategory);
      });
    };
