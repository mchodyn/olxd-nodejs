const {Category,validate} = require('../model/category');
const validateId = require('../middleware/validateId');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/',async (req,res)=> {
    const categories = await Category.find().sort('name');
    res.send(categories);
});

router.post('/',async (req,res)=> {
   const {error} = validate(req.body);
   if(error) return res.status(400).send(error.details[0].message);

   let category = new Category({name: req.body.name});
   category = await category.save();

   res.send(category)
});

router.get('/:id',validateId,async (req,res)=>{
   const category = await Category.findById(req.params.id);

   if(!category) return res.status(404).send('the category with given id not found');

   res.send(category);
});
module.exports = router;