const mongoose = require("moongoose");
const schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator")

const registerSchema = new Schema(
     {
       site:{
        id:{

           type:String,
            },
         name:{
             type:String,  
              },
               },
           plant:{
   id :{
       type:String,
    
},
name:{
    type:String,
}
},
        createdBy:{
id :{
    type : String,
},
name :{
    type : String,

},
},
riskNo :{
    type : String,
    required : true,
},
riskNoNumeric:{
    type : Number,
    default : 99,
},
asset :{
    type:String,
},
riskName:{
    type : String,
    //unique : true,
    required: true,
},
riskEventDesc:{
    type : String,
},
riskOwner:[
    {
        type : String,
    }
],
riskCategory:{
    type : String,
    required:false,
},
riskArea:{
    type : String,
    required: false,
},
riskSource:{
    type : String,
},
causeAndConsequences:{
    causes:[
        {
            cause:{
                type:String,
            },
            category:{
                type:String,
            },
        }
    ],
    consequence:[
        {
            type:String,
        },
    ],

    
},
consequenceCategory:{
    healthAndSaftey:{
        type:String,
    },
    enviroment:{
type:String,
    },
    nonFinancial:{
        type:String,
    },
    financial:{
        type : String,
    },
},
likeliHood:{
    type : Number,
},
fcWorst:{
    type : String,
},
worstCredibleRisk:{
    healthAndSaftey:{
        type:String,
    },
    enviroment : {
        type : String,
    },
    worstCredibleRisk:{
        healthAndSaftey:{
            type:String,
        },
        enviroment:{
            type:String,
        },
        nonFinancial:{
            type:String,
        },
        financial:{
            type : String,
        },

    },
    highestRiskRI:{
        type:String,
    },
    barries:[
        {
            name :{
                type : String,
            },
            description:{
                type:String,
            },
            activities:[
                {
                    activity:{
                        type:String,
                    },
                    owner:{
                        type:String,
                    },

                },
            ],
            barrierFamily:{
                type:String,
            },
            assestNo:{
                type:String,
            },
            barrierOwner:{
                type:String,
            },
            purposeOfBarrier:{
                type:String,
            }

        },

    ],
    netLikelihood:{

        type:Number,
    },
    fcvNet:{
        type:Number
    },
      netImpact:{
        healthAndSaftey:{type:String,},
        enviroment:{type:String,},
        nonFinancial:{type:String,},
        financial:{type:String,},
    },
    netRisk:{
        healthAndSaftey:{type:String,},
    enviroment:{type:String,},
    nonFinancial:{type:String,},
    financial:{type:String,},
},
highestRiskRI:{type:String,},
proposedControlAndAction:[{
    proposedControlOrRiskRespDesc:{type:String},
    proposedControlOrRiskRespType:{type:String},
    actionPlanOwner:[{
        type:String,
    }],
    typeOfBarrier:{
        type:String,
    },

},
],
futureLikelihood:{type:String},
futureImpact:{
    healthAndSaftey:{type:String,},
    enviroment:{type:String,},
    nonFinancial:{type:String,},
    financial:{type:String,}, 

},

    

futureRisk:{
    healthAndSaftey:{type:String,},
    enviroment:{type:String,},
    nonFinancial:{type:String,},
    financial:{type:String,},
},
highestRiskRIII:{type:String,},
statusInfos:[
{
    status:{type:String,},
    remarks:{type:String,},
    enteredBy:{type:String,},
    enteredOn:{type:String},
},
],
validateRecord:{type:Boolean,default:false,},
uploadedby:{type:String,},
active:{type:Boolean,default:true},

},


{ timestamps : true}
);
registerSchema.plugin(uniqueValidator);
registerSchema.set("toJSON",{virtuals:true});
module.exports = mongoose.model("pendingriskRegisters",registerSchema);