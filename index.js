const express=require('express')
const { connect } = require('./config.js/db')
const { formmodel } = require('./Model/formModel')



const app=express()
app.use(express.json())

app.get('/userform', async (req,res)=>{
    const {userName}=req.body
    try {
        const user= await formmodel.find({userName:userName}) //getting user existing form
        console.log(user)
        res.status(200).json({status: 'success',user})
    } catch (error) {
        res.status(500).json({ error: "error" })
    }
  
})


app.post('/formSubmit', async(req,res)=>{
    const{userName,email,phNo,name,dob}=req.body
    try {
       const user= formmodel({
            userName: userName,
            email: email,
            phNo: phNo,
            name: name,
            dob: dob
        })

        await user.save()
        res.status(200).json({mssg: "form submitted",user})
    } catch (error) {
        res.status(500).json({ error: "error" })
        console.log("error while submitting form",error)
    }
})

app.put('/updateform',async(req,res)=>{

    try {
        
    } catch (error) {
        
    }
})



app.listen(8000,async()=>{
    try {
       await connect
       console.log("connection established")
        console.log("listening on port 8000...")
    } catch (error) {
        console.log("error connecting")
    }
})