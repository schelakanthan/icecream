const Category = require('../models/categoryMoel')

const  categoryCtrl = {

    getcategories: async(req,res) =>{
        try {
            const categories = await Category.find()
            res.json(categories)
            
        } catch (err) {
         return res.status(500).json({msg:err.message})
            
        }
    },
    createCategory:async(req,res) =>{
        try {
            //person who has role=1 he is a admin
            const {name} = req.body;
            const category = await Category.findOne({name})
            if(category) return res.status(400).json({msg: "This catagoy already exists"})

            const newCategory = new Category({name})
            await newCategory.save()
            res.json({msg: "Created category"})

        } catch (err) {
            return res.status(500).json({msg:err.message})
            
        }
    },
    deleteCategory:async(req,res) =>{
        try {
            await Category.findByIdAndDelete(req.params.id)
            res.json({msg:"Deleted Category"})
        } catch (err) {
            return res.status(500).json({msg:err.message})
            
        }
    },
    updateCategory:async(req,res) =>{
        try {
            const {name} = req.body;
            await Category.findOneAndUpdate({_id:req.params.id},{name})
            res.json({msg:"Updated Category"})
        } catch (err) {
            return res.status(500).json({msg:err.message})
            
        }
    }


    }



module.exports = categoryCtrl