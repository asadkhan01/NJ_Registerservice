const jwt = require('jsonwebtoken');
const config = require('../config/config');
const mongoose = require("mongoose");
/ role add delete access /
const rolesAllAccess=['Plant Manager', 'Plant PHA Leader', 'PSM Manager', 'Super User'];
const rolesExcludedurl=['register/deleteMany', 'register/updateStatusToRelease', 'register/add", "register/delete','register/deleteMany','register/updateRegistryById'];
exports.verifyToken (req, res, next) => {
/* this function is used to verify the token which user pass in the API */

const authHeader = req.headers['authorization'];
const uid = parseInt(req.headers['uid']);
const token = authHeader && authHeader.split(' ')[1];
const url= req.url;


if (token == null) return req.app.responseHelper.sendResponse (res, false, {}, 'Sorry, your token is not valid!', 401);
jwt.verify(token, config. JWT_SECRETE_KEY, (err, user) =>{}
if (err) {

console.log(err.message)

return req.app.responseHelper.sendResponse (res, false, (), 'Sorry, your token expired! Please login again.", 401);

'register/deleteMany","register/updateRegisterly

}

var usersCollection mongoose.connection.db.collection('users'); usersCollection.find({ userId: uid, token: token }).toArray((err, data) => {

if (err || data.length == 0) {

return req.app.responseHelper.sendResponse (res, false, (), 'Sorry, your token is not valid!", 401);

}

let getRoles-data[@]['roles ].map((data)->data['role_name']); let rolevalid-checkRoleAccess (getRoles, url);

f(!rolevalid) {

return req.app.responseHelper.send Response (res, false, (), 'Sorry, your token is not valid!!, 401);

next();

function checkRoleAccess(data,url){

   
    var giveAccess=false;
    
    if(data.length>0){
    
    data.forEach((val)=>{
    
    if(rolesAllAccess.includes (val)){
    
    giveAccess=true;
    
    });
    
    })
    
    }
    
    let findUrl=roles ExcludedUrl.findIndex((val) => url.indexOf(val)>-1);
    
    if(!giveAccess && findurl-==-1){
    
    giveAccess=true;
    
    return giveAccess;