const express = require("express");
const { async } = require("q");
const router = express.Router();
const Register = require("schema path")
// const express = require("");


router.delete("/delete/:id",async (req  , res)=>{
try{
await Register.findByIdAndRemove(req.params.id , async (err , result)=>{
    {if(err)
        {
            return req.app.responseHelper.sendResponse(res , false , "something went wrong please try again later",null , 1000);
        }
        return req.app.responseHelper.sendResponse(res , true ,"deleted successfully", null , 1000);
    }
})

}catch(errors){
    console.log(errors);
    req.app.responseHelper.sendResponse(res , false , null , errors.message , 1001);
}
})
router.post("/deleteAllSecure",async (req  , res)=>{
    Register.deleteMany({} , function (err ){
        {
        if(err)
            {
                return req.app.responseHelper.sendResponse(res , false ,"something went wrong please try again later", null , 1000);
            }
            return req.app.responseHelper.sendResponse(res , true, "deleted successfully" , null , 1000);
        }
    })
})
router.post("/deleteMany",async (req  , res)=>{
    let getIds = req.body.ids;
    try{
        await Register.deleteMany({ _id : { $in : getIds}} , async (err , result)=>{
            {if(err)
                {
                    return req.app.responseHelper.sendResponse(res , false ,"something went wrong please try again later", null , 1000);
                }
                return req.app.responseHelper.sendResponse(res , true, "deleted successfully" , null , 1000);
            }
        })
        
        }catch(errors){
            console.log(errors);
            req.app.responseHelper.sendResponse(res , false , null , errors.message , 1001);
        }
})
router.post("/updateStatusToRelease",async (req  , res)=>{
    let getIds =req.body.ids;
    let statusInfos = req.body.statusInfos
    try{
        Register.updateMany({ _id : { $in : getIds}} , { $push : { "statusInfos"  : statusInfos}} , { multi : true} , ((err , result)=>{
            {if(err)
                {
                    return req.app.responseHelper.sendResponse(res , false ,"something went wrong please try again later", null , 1000);
     
                }
                return req.app.responseHelper.sendResponse(res ,true , "released successfully",null , 1000);
            }
        }))
        
        }catch(errors){
            console.log(errors);
            req.app.responseHelper.sendResponse(res , false , null , errors.message , 1001);        }

})
router.post("/add",async (req  , res)=>{
    
    
    try{
        let registers = req.body.registers;
        await Register.insertMany(registers);
            // { _id : { $in : getIds}} , async (err , result)=>{
            // {if(err)
            //     {
                    return req.app.responseHelper.sendResponse(res , true ,"Added successfully", null , 1000);
                // }
                // return req.app.responseHelper.sendResponse(res . false , null , 1000);
            // }
        // })
        
        }catch(errors){
            console.log(errors);
            req.app.responseHelper.sendResponse(res , false , null , errors.message , 1001);
        }

})
router.post("/getRegister",async (req  , res)=>{
    try{
        let filter = {};
        if(req.body.site_id != undefined)
        {
            filter["site.id"]= req.body.site_id;
        }

        if(req.body.plant_id != undefined)
        {
            filter["plant.id"]= req.body.plant_id;
        }


        const register =  await Register.find(filter).sort({riskNoNumeric : 1})
                    return req.app.responseHelper.sendResponse(res ,true ,register , null , 1000);
        
        }catch(errors){
            console.log(errors);
            req.app.responseHelper.sendResponse(res , false , {} , errors.message , 1001);
        }

})
router.post("/getAllRiskBySite",async (req  , res)=>{
    const siteName = req.body.siteName;
    const plant = req.body.plant;
    let filter = [
        {
            $match : {
                "site.name" : { $in :siteName} ,
                "plant.name": {$in : plant}
            }

        },
        {
            $group : {
                "_id" : "$site.name",
                "allRisk" : {
                    $push : {
                        "riskNo" :"$riskNo",
                        "name":"$riskName",
                        "riskNoNumeric":"$riskNoNumeric",
                        "heighestRiskRI":"$heighestRiskRI",
                        "heighestRiskRII":"$heighestRiskRII"
                    }
                }
            }
        }
    ]
    Register.aggregate(filter).exec((err ,data )=>{
        if(err) 
                    return req.app.responseHelper.sendResponse(res ,true , register , null , 1000 , {latestRegister : latestRegister});
        
                    return req.app.responseHelper.sendResponse(res ,true , data , null , 1000 );
        
    })
})
router.post("/getAllRiskByPlant/:siteName",async (req  , res)=>{
    const siteName = req.params.siteName;
    const plant = req.body.plant;
    let filter = [
        {
            $match : {
                "site.name" :siteName ,
                "plant.name": {$in : plant}
            }

        },
        {
            $group : {
                "_id" : "$plant.name",
                "allRisk" : {
                    $push : {
                        "riskNo" :"$riskNo",
                        "name":"$riskName",
                        "riskNoNumeric":"$riskNoNumeric",
                        "heighestRiskRI":"$heighestRiskRI",
                        "heighestRiskRII":"$heighestRiskRII"
                    }
                }
            }
        }
    ]
    Register.aggregate(filter).exec((err ,data )=>{
        if(err) 
                    return req.app.responseHelper.sendResponse(res ,true , register , null , 1000 , {latestRegister : latestRegister});
        
                    return req.app.responseHelper.sendResponse(res ,true , data , null , 1000 );
        
    })
})
router.post("/getAllRegister",async (req  , res)=>{
    try{
        let site = req.body.site;
        let plant = req.body.plant;
        let query = {
            "site.name" : site,
            "plant.name" : plant,
            "statusInfo.status" : { $in  : ["release"]};
        }

        if(Array.isArray(plant))
        {
            query["plant.name"] = { $in : plant}
        }
        const register  = await Register.find(query).sort({ riskNoNumeric : 1 });
        const latestRegister = await Register.findOne({
            "site.name" : site,
            "plant.name" : plant,
        }).sort({ riskNoNumeric : -1 });
                    return req.app.responseHelper.sendResponse(res ,true , register , null , 1000 , {latestRegister : latestRegister});
        
        }catch(errors){
            console.log(errors);
            req.app.responseHelper.sendResponse(res , false , {} , errors.message , 1001);
        }

})
router.post("/getReleasedRegisters",async (req  , res)=>{
    try{
        let site = req.body.site;
        let plant = req.body.plant;
        const register = await Register.find({
            "site.name" : site,
            "plant.name" : plant,
            "statusInfo.status" : "release"}).sort({ riskNoNumeric : 1})
            return req.app.responseHelper.sendResponse(res , true , register , null , 1000);
        
        
        
        }catch(errors){
            console.log(errors);
            req.app.responseHelper.sendResponse(res , false , {} , errors.message , 1001);
        }

})
router.get("/getRegisterByid",async (req  , res)=>{
    try{
        let id = req.query.id;
        const register = Register.find({ _id : id})
                    return req.app.responseHelper.sendResponse(res , true ,register, null , 1000);
        
        }catch(errors){
            console.log(errors);
            req.app.responseHelper.sendResponse(res , false , {} , errors.message , 1000);
        }

})

router.post("/updateRegisterById/:id",async (req  , res)=>{
    try{
        await Register.deleteMany({ _id : { $in : getIds}} , async (err , result)=>{
            {if(err)
                {
                    return req.app.responseHelper.sendResponse(res . false , null , 1000);
                }
                return req.app.responseHelper.sendResponse(res . false , null , 1000);
            }
        })
        
        }catch(errors){
            console.log(errors);
            req.app.responseHelper.sendResponse(res , false , null , errors.message , 1001);
                }

})
module.exports= router;

