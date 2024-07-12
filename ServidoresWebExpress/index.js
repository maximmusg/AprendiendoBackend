const express = require('express')
const coockieParser = require("cookie-parser")
const query = require('express/lib/middleware/query')
const app = express()

const PORT = 3000

app.use(express.json())
app.use(coockieParser())

app.get("/", (req,res) => {
    res.send("hola mundo desde express")
})

app.get("/json", (req,res) => {
    res.json({mensaje: "Hola mundo "})
})

app.post("/request/:id", (req,res) => {
    const requestObject = {
        body: req.body,
        cookies: req.cookies,
        hostname: req.hostname,
        ip: req.ip,
        method: req.method,
        params: req.params,
        path: req.path,
        protocol: req.protocol,
        query: req.query,
        secure: req.secure,
        contentType: req.get("Content-Type"),
        isJson: req.is("json")
    };
    res.json(requestObject)
})

app.get("/response", (req,res)=>{
    res.cookie("myCookie", "Hola cookie")
    res.set("X-custom-header", "MaximilianoGjson")
    res.status(200).send("Mira los headers y las cookies!")
})

// app.get("/maxi", (req,res) => {
//     res.json({Nombre: "Maxi ", Edad: "29", Trabajo: "Esclavo" })
// })

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto http://localhost:${PORT} `);
})  