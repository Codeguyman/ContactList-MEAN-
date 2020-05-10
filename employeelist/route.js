const express = require ('express');
const router = express.Router();

var bodyParser = require('body-parser');

const employees = require ('../models/employee')

var urlencodedParser = bodyParser.urlencoded({ extended: false });



router.get('/employee',(req,res, next)=>{
    employees.find(function(err,employers){
        res.json(employers);
   })
});

router.post('/employees',(req,res,next)=>{
    let newEmployee = new employees({
        name:req.body.name,
        position:req.body.position,
        office:req.body.office,
        salary:req.body.salary
   });
     
   newEmployee.save((err,employees) =>{
       if(err)
       {
           res.json({msg:'Failed to add data'});
       }
       else
       {
           res.json({msg:'contact added successfully'});
       }
   })
    
});

router.delete('/employee/:id',(req,res,next)=>{
    employees.deleteOne({_id: req.params.id}, function(err,result){
    if(err)
    {
       res.json(err);
    }
    else
    {
        res.json(result);
    }
});
});

router.put('/employee/:id', (req,res) => {

    var emp = {
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary,
    };

    employees.findByIdAndUpdate( req.params.id, {$set: emp}, {new: true}, (err, doc) =>{
        if (!err) { res.send(emp);}
        else { console.log('Error in Employee Update:' + JSON.stringify(err, undefined,2)); }
    });
});

 
module.exports=router;