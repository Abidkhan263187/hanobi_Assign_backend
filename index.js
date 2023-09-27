const express = require('express')
var cors = require('cors')
const { connect } = require('./config.js/db')
const { formmodel } = require('./Model/formModel')



const app = express()
app.use(cors({
    origin: '*'
}))
app.use(express.json())

app.post('/userform', async (req, res) => {
    const { userName } = req.body

    try {
        const user = await formmodel.findOne({ userName: userName }) //getting user existing form
        console.log(user)
        res.status(200).json({ status: 'success', user })
    } catch (error) {
        res.status(500).json({ error: "error" })
    }

})


app.post('/formSubmit', async (req, res) => {
    const { userName, email, phNo, name, dob } = req.body
    try {
        const user = formmodel({
            userName: userName,
            email: email,
            phNo: phNo,
            name: name,
            dob: dob
        })

        await user.save()
        res.status(200).json({ mssg: "form submitted", user })
    } catch (error) {
        res.status(500).json({ error: "error while submitting form" })
        console.log("error while submitting form", error)
    }
})

app.put('/formUpdate/:id', async (req, res) => {
    const { id } = req.params;
    const { userName, email, phNo, name, dob } = req.body;

    try {
        // Using here  findByIdAndUpdate to update the document with the provided id
        await formmodel.findByIdAndUpdate(id, {
            userName: userName,
            email: email,
            phNo: phNo,
            name: name,
            dob: dob,
        });

        res.status(200).json({ status: true, message: "Form updated successfully" });
    } catch (error) {
        console.log("Error while updating form ", error);
        res.status(500).json({ error: "Error while updating form" });
    }
});



app.listen(8000, async () => {
    try {
        await connect
        console.log("connection established")
        console.log("listening on port 8000...")
    } catch (error) {
        console.log("error connecting")
    }
})