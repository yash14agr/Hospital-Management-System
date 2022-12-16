const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path');
const app = express()
// const Patient = require("./model/patientSchema");
const Doctor = require("./model/doctorSchema");
const CasualtySchema = require("./model/casualtySchema");
const OpdSchema = require("./model/OpdSchema");
// const patient = require('./model');
// const { findByIdAndUpdate, aggregate } = require('./model/patientSchema');
const dbURI = 'mongodb+srv://admin:admin1234@cluster0.qvd3lrv.mongodb.net/Hospital1?retryWrites=true&w=majority'

//error was comming
mongoose.set('strictQuery', true);

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    app.listen(3000, (req, res) => {
        console.log("App is running on port 3000")
    })
})
.catch((error)=>{
    console.log(error);
})


//setting template engine
app.set('view engine', 'ejs')

//static files (css/js)
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}))

app.get("/",(req, res)=> {
	res.render("home")
})

//---------------------------------------------------------------------------------
//OPD PATIENTS
app.get("/AddOpdPatient",(req,res)=>{
    res.render("AddOpdPatient")
})
app.post("/SubmitOpdPatient",async (req,res)=>{
    const sym=req.body.symtoms
    await Doctor.find({symtoms:sym})
    .then(async (data)=>{
        data[0].earning=parseInt(data[0].earning) + parseInt(100);
        //Update query
        await Doctor.findByIdAndUpdate(data[0]._id,data[0])
        req.body.fee=100
            const p1=new OpdSchema(req.body)
            try {
                await p1.save();
                // console.log(p1)
                res.render("SubmitOpdPatient",{data:data,p:p1})
            } 
            catch (error) {
                res.status(500).send(error);
            }
    }) 
    .catch((error)=>{
        console.log(error);
    })
})

app.get("/Opd-treated/:id",async (req,res)=>{
    // console.log(req.params.id)
    await OpdSchema.findById(req.params.id)
    .then(async (data)=>{
        // console.log(data)
        data.active='false';
        await OpdSchema.findByIdAndUpdate(data._id,data)
        // console.log(data)
        res.render("Opd-treated",{data:data})
    })
    .catch((error)=>{
        console.log(error)
    })
})

app.get("/Opd-admit/:id",async(req,res)=>{
    await OpdSchema.findById(req.params.id)
    .then(async (data)=>{
        data.fee=data.fee+100;
        data.active='true';
        data.admitted='true';
        await OpdSchema.findByIdAndUpdate(data._id,data)
        res.render("Opd-admit",{data:data})
    })
    .catch((error)=>{
        console.log(error);
    })
})


app.get("/Opd-death/:id",async(req,res)=>{
    await OpdSchema.findById(req.params.id)
    .then(async (data)=>{
        data.active='false';
        data.admitted='false';
        data.death='true';
        await OpdSchema.findByIdAndUpdate(data._id,data)
        res.render("Opd-death",{data:data})
    })
    .catch((error)=>{
        console.log(error);
    })
})
//---------------------------------------------------------------------------------
//CASUALTY PATIENT
app.get("/AddCasualtyPatient",(req,res)=>{
    res.render("AddCasualtyPatient")
})


app.post("/SubmitCasualtyPatient",async (req,res)=>{
    const sym=req.body.symtoms
    await Doctor.find({symtoms:sym})
    .then(async (data)=>{
        data[0].earning=parseInt(data[0].earning) + parseInt(200);
        //Update query
        await Doctor.findByIdAndUpdate(data[0]._id,data[0])
        req.body.fee=200
        req.body.admitted='true'
            const p1=new CasualtySchema(req.body)
            try {
                await p1.save();
                // console.log(p1)
                res.render("SubmitCasualtyPatient",{data:data,p:p1})
            } 
            catch (error) {
                res.status(500).send(error);
            }
    }) 
    .catch((error)=>{
        console.log(error);
    })
})

app.get("/Casualty-treated/:id",async (req,res)=>{
    // console.log(req.params.id)
    await CasualtySchema.findById(req.params.id)
    .then(async (data)=>{
        // console.log(data)
        data.active='false';
        await CasualtySchema.findByIdAndUpdate(data._id,data)
        // console.log(data)
        res.render("Casualty-treated",{data:data})
    })
    .catch((error)=>{
        console.log(error)
    })
})

app.get("/Casualty-death/:id",async(req,res)=>{
    await CasualtySchema.findById(req.params.id)
    .then(async (data)=>{
        data.active='false';
        data.admitted='false';
        data.death='true';
        await CasualtySchema.findByIdAndUpdate(data._id,data)
        res.render("Casualty-death",{data:data})
    })
    .catch((error)=>{
        console.log(error);
    })
})



//------------------------------------------------------------------------------------

app.get("/AddDoctor",(req,res)=>{
    res.render("AddDoctor")
})

app.post("/SubmitDoctor",async (req,res)=>{
    req.body.earning=0;
    // console.log(req.body)
    const d1=new Doctor(req.body)
    try {
        await d1.save();
        res.render("AddDoctor")
      } catch (error) {
        res.status(500).send(error);
      }
})

app.get("/ShowPatient",async (req,res)=>{
    //Sorting Query
    
    const displayOpdPatient =await OpdSchema.find().sort({name:1});
    const displayCasualtyPatient =await CasualtySchema.find().sort({name:1});
    // const mergeArray=displayOpdPatient.concat(displayCasualtyPatient)
        try {
        res.render("ShowPatient",{data1:displayOpdPatient,data2:displayCasualtyPatient})
      } catch (error) {
        res.status(500).send(error);
      }
})
//for sorting
app.post("/ShowPatient",async (req,res)=>{
    var f=req.body.picker
    // console.log(f)

    //Sorting Query
    if(f==-1){
        const displayOpdPatient =await OpdSchema.find().sort({name:-1});
        const displayCasualtyPatient =await CasualtySchema.find().sort({name:-1});
        try {
        res.render("ShowPatient",{data1:displayOpdPatient , data2:displayCasualtyPatient})
      } catch (error) {
        res.status(500).send(error);
      }
    }
    else{
        const displayOpdPatient =await OpdSchema.find().sort({name:1});
        const displayCasualtyPatient =await CasualtySchema.find().sort({name:1});
        try {
        res.render("ShowPatient",{data1:displayOpdPatient , data2:displayCasualtyPatient})
      } catch (error) {
        res.status(500).send(error);
      }
    }
})


app.get("/ShowDoctor",async (req,res)=>{
    const displayDoctor =await Doctor.find();
    try {
        res.render("ShowDoctor",{data:displayDoctor})
      } catch (error) {
        res.status(500).send(error);
      }
})


app.get("/ShowPatient/update/:id",async (req,res)=>{
    try{
        const result1=await OpdSchema.findById(req.params.id)
        const result2=await CasualtySchema.findById(req.params.id)
        if(result1){
            res.render("updatePatient",{data:result1})
        }else{
            res.render("updatePatient",{data:result2})
        }
    }catch(err){
        console.log(err)
    }
    
})

app.get("/ShowDoctor/update/:id",async (req,res)=>{
    try{
        const result=await Doctor.findById(req.params.id)
        res.render("updateDoctor",{data:result})
    }catch(err){
        console.log(err)
    }
})

// updating patient
app.post("/updatePatient/:id",async (req,res)=>{
    try{
        const res1= await OpdSchema.findById(req.params.id)
        const res2= await CasualtySchema.findById(req.params.id)
        if(res1){
            await OpdSchema.findByIdAndUpdate(req.params.id,req.body)
        }else{
            await CasualtySchema.findByIdAndUpdate(req.params.id,req.body)
        }
        res.redirect("/ShowPatient")
    }
    catch(err){
        console.log(err)
    } 
})

//updating doctor
app.post("/updateDoctor/:id",async (req,res)=>{
    try{
        const result=await Doctor.findByIdAndUpdate(req.params.id,req.body);
        res.redirect("/ShowDoctor")
    }
    catch(err){
        console.log(err)
    } 
})

//....................................................................
//deletion
app.get("/ShowPatient/delete/:id",async (req,res)=>{
    // console.log(req.params.id)
    const res1=await OpdSchema.findById(req.params.id);
    if(res1){
        try{
            const result=await OpdSchema.findByIdAndDelete(req.params.id)
            const displayOpdPatient =await OpdSchema.find().sort({name:1});
            const displayCasualtyPatient =await CasualtySchema.find().sort({name:1});
                try {
                res.render("ShowPatient",{data1:displayOpdPatient,data2:displayCasualtyPatient})
              } catch (error) {
                res.status(500).send(error);
              }
        }catch(err){
            console.log(err)
        }
    }else
    {
        try{
            const result=await CasualtySchema.findByIdAndDelete(req.params.id)
            const displayOpdPatient =await OpdSchema.find().sort({name:1});
            const displayCasualtyPatient =await CasualtySchema.find().sort({name:1});
                try {
                res.render("ShowPatient",{data1:displayOpdPatient,data2:displayCasualtyPatient})
              } catch (error) {
                res.status(500).send(error);
              }
        }
        catch(err){
            console.log(err)
        }
    }
    
    
})

app.get("/ShowDoctor/delete/:id",async (req,res)=>{
    // console.log(req.params.id)

    try{
        const result=await Doctor.findByIdAndDelete(req.params.id)
        const displayDoctor =await Doctor.find();
        res.render("ShowDoctor",{data:displayDoctor})
    }catch(err){
        console.log(err)
    }
})


//...............................................
//statistics
app.get("/statistics",async (req,res)=>{
    var filter= { earning: { $gte: 1000 } };
    //doctors whose earning is greater than 1000
    let docs = await Doctor.aggregate([
        { $match: filter }
      ]);
      console.log("docs")
      console.log(docs)
      
      
    //sum of Patients wrt age
    let docs1_a = await OpdSchema.aggregate([
        {$group: {
            _id: '$age',
            count: { $sum: 1 }
        }
    }])
    let docs1_b = await CasualtySchema.aggregate([
        {$group: {
            _id: '$age',
            count: { $sum: 1 }
        }
    }])
    // console.log("docs1")
    // console.log(docs1)
    var arr5=[]
    var arr6=[]
    docs1_a.forEach((ele)=>{
        arr5.push(ele._id)
        arr6.push(ele.count)
    })
    docs1_b.forEach((ele)=>{
        arr5.push(ele._id)
        arr6.push(ele.count)
    })
    console.log("arr5:")
    console.log(arr5)
    console.log("arr6:")
    console.log(arr6)
    
    //sum of earning of all doctors
    let docs2 = await Doctor.aggregate([
        {$group: {
            _id: 'total',
            total: {$sum:'$earning'}
        }
    }])
    console.log("docs2")
    console.log(docs2)
    
    //All the doctors
    let docs3 = await Doctor.aggregate([
        {$group: {_id: '$_id',name:{"$first":'$name'}}},
        {$sort: {"name":1}},
        {$project:{"_id":0}}
    ])
    console.log("docs3")
    console.log(docs3)

    //
    // var doc4=await Doctor.aggregate( [
    //     {
    //        $lookup: {
    //           from: "Patient",
    //           localField: "name",
    //           foreignField: "doctor",
    //           as: "testingArray1"
    //        }
    //     }
    //  ] )
    
    //graph1
     //sending doctors name in arr1 and earning in arr2 
    var r=await Doctor.find({},{'name':1,'earning':1,'_id':0})
    var arr1=[]
    var arr2=[]
    r.forEach((ele)=>{
        arr1.push(ele.name)
        arr2.push(ele.earning)
    })

    //graph2 
    var r1_a=await OpdSchema.aggregate([
        {
            $group:{
                _id:"$symtoms",
                count:{"$count":{}}
        }}
    ])
    var r1_b=await CasualtySchema.aggregate([
        {
            $group:{
                _id:"$symtoms",
                count:{"$count":{}}
        }}
    ])
    
    var arr3=[]
    var arr4=[]
    r1_a.forEach((ele)=>{
        arr3.push(ele._id)
        arr4.push(ele.count)
    })
    r1_b.forEach((ele)=>{
        arr3.push(ele._id)
        arr4.push(ele.count)
    })
    // console.log(arr3)
    // console.log(arr4)
    res.render("stat",{arr1:arr1 , arr2:arr2 , arr3:arr3 , arr4:arr4 ,arr5:arr5, arr6:arr6})
})