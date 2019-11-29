var externalMiddeware = (req,res,next) => {
    if(req.params.name == 'john')
        next();
    else   
        console.log('Name not found')    
}
module.exports.externalMiddeware = externalMiddeware