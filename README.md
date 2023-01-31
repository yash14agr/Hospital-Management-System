# Hospital-Management-System
---
#### This is a project made using Node.js , Express.js , MongoDB and Mongoose. The main AIM of this project was to connect all the pages using express.js and execute different queries.
We have 7 buttons in Home Page. If the Patient is suffering from some common disease and is not serious, then he/she is taken to OPD. If the person is serious and needs to be admitted, then he/she is taken to Casualty-Department.

IN OPD, the person is supposed to fill the details and according to the symtoms, he/she is assigned a particular doctor.All these details are stored in MongoDB.Then, the patient is send to the particular department and if treated, the ACTIVE mark is set to false. Else, ACTIVE is set to false.Similarly, ADMITTED and DEATH mark is set.

IN CASUALTY-DEPARTMENT, again the details are entered and stored in Database. The main difference between the OPD and CASUALTY is, in Casualty department, patient is directly admitted with the fees of 200 while in OPD, patient can be treated with the fees of 100 but if he/she is serious, then the patient is admitted and a extra fees of Rs.100 is charged.

We can Register new Doctors.

we can see the Details of Patient and Doctors and Update/Delete them.

Finally, we can see the stats.

---
Mongoose function :

1.	Find() : 
```
await Doctor.find({symtoms:sym})
```

2.	FindAndUpdate() :

```
await Doctor.findByIdAndUpdate(data[0]._id,data[0])
```

3.	FindById():

```
await OpdSchema.findById(req.params.id)
```

4.	Sort():

```
const displayOpdPatient =await OpdSchema.find().sort({name:1});
```


5.	FindByIdAndDelete():

```
const result=await OpdSchema.findByIdAndDelete(req.params.id)
```


6.	Aggregate() with $match:
```
//doctors whose earning is greater than 1000   
let docs = await Doctor.aggregate([{ $match: filter }]);
```


7.	Aggregate() with $group:
```
//sum of Patients wrt age  
    let docs1_a = await OpdSchema.aggregate([{$group: {_id: '$age',count: { $sum: 1 }}}])  
    let docs1_b = await CasualtySchema.aggregate([{$group: {_id: '$age', count: { $sum: 1 } } }])
```
 
8.	Aggregate to find total earning of all doctors  
```
    //sum of earning of all doctors  
    let docs2 = await Doctor.aggregate([
        {$group: {
            _id: 'total',
            total: {$sum:'$earning'}
        }
    }])
```


9.	Aggregate() with $group, $sort, $project :  
```
//All the doctors  
    let docs3 = await Doctor.aggregate([
        {$group: {_id: '$_id',name:{"$first":'$name'}}},
        {$sort: {"name":1}},
        {$project:{"_id":0}}
    ])  
```
    
 ### Home page:
![image](https://user-images.githubusercontent.com/97373985/215687304-0fc4ec97-bfa0-4533-860a-132d0d743f43.png)

 ### AddOpdPatient:
![image](https://user-images.githubusercontent.com/97373985/215687348-55e76049-db30-48d8-9ab2-95abb972e0e6.png)

### SubmitOpdPatient
![image](https://user-images.githubusercontent.com/97373985/215687393-adc62afe-f8e8-4585-a3ce-15d55c7a2d62.png)

### Opd-treated
![image](https://user-images.githubusercontent.com/97373985/215687437-a27729d5-140d-44af-af13-1bf354d12c02.png)

### Opd-admit
![image](https://user-images.githubusercontent.com/97373985/215687467-8db421d1-4523-4c10-be02-a1edb9533428.png)

### Opd-death
![image](https://user-images.githubusercontent.com/97373985/215687509-04cab7a7-23f9-48ee-a2ea-18bb4dec3b83.png)

### AddCasualtyPatient
![image](https://user-images.githubusercontent.com/97373985/215687542-2971dd8e-2303-4389-a485-1c42d2b46739.png)

### SubmitCasultyPatient
![image](https://user-images.githubusercontent.com/97373985/215687559-6bd33fb2-59ba-4d8a-9894-51508a2ca877.png)

### Casualty-death
![image](https://user-images.githubusercontent.com/97373985/215687589-3acc01f8-053b-478e-93ee-09b094f08a24.png)

### AddDoctor
![image](https://user-images.githubusercontent.com/97373985/215687610-700ba3f4-b3ca-46b0-a6e1-204a930712a3.png)

### ShowPatient
![image](https://user-images.githubusercontent.com/97373985/215687630-a1eed7ff-f227-4e28-9088-381c5f48aff6.png)

### ShowDoctor
![image](https://user-images.githubusercontent.com/97373985/215687648-c0cc1a87-1403-4bd3-bfd3-724d4cf6403c.png)

### Statistics
![image](https://user-images.githubusercontent.com/97373985/215687668-855795eb-b938-4599-ab16-1d7e4d2681ea.png)
