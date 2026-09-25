const shortid=require("shortid");
const url=require('../models/url');
async function handlegeneratenewshorturl(req,res){
    const body=req.body;
    if(!body.url)return res.status(400).json({error:'url is required'})
        const id=shortid();
    await url.create({
        shortid:id,
        redirecturl:body.url,
        visithistory:[],

    });
    return res.json({id:id});
}
async function handlegetanalytics(req,res){
    const shortid = req.params.shortid;

    const result = await url.findOne({shortid});

    return res.json({
        totalclicks: result.visithistory.length,
        analytics: result.visithistory
    });
}
module.exports={
    handlegeneratenewshorturl,
    handlegetanalytics,
}