const express = require('express')
const cors = require('cors');

require("./db/conn");
const users = require("./models/users");

const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
    origin: 'http://localhost:3000', // allow only requests from this origin
    methods: ['GET', 'POST'], // allow only these HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // allow only these headers
  };
  
  app.use(cors(corsOptions));

app.use(express.json());

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // // Website you wish to allow to connect
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');

    // // Request methods you wish to allow
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // // Request headers you wish to allow
    //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // // Set to true if you need the website to include cookies in the requests sent
    // // to the API (e.g. in case you use sessions)
    // res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//create a new users
app.post('/create-users',(req,res) => {
    console.log(req.body);
    const user = new users(req.body);
    user.save().then(() => {
        res.status(201).send(user);
    })

   res.send("success!");
})

//get all data
app.get("/users-get", async (req,res) => {
    try{
        const usersList = await users.find();
        if(!usersList){
            return res.status(404).send();
        }else{
            res.send(usersList);
        }
    }catch(e){
        res.send(e)
    }
})
//update
// app.post('/update-users/:id', async(req,res) => {
//     const _id = req.params.id;
//     const name = req.body.name;
//     const email = req.body.email;
//     const phone = req.body.phone;

//     console.log(req.body.name);
//     users.findByIdAndUpdate({_id},{"name": name,"email": email,"phone": phone}, function(err, result){

//         if(err){
//             res.send(err)
//         }
//         else{
//             res.send(result)
//         }

//     })
// })



//get data by id
// app.get("/users/:id", async (req,res) => {
//     try{
//         const _id = req.params.id;
//         const studentData = await users.findById(_id);
//         console.log(studentData);

//         if(!studentData){
//             return res.status(404).send();
//         }else{
//             res.send(studentData);
//         }
//     }catch(e){
//         res.send(e)
//     }
//     res.send("Get student data");
// })

// Use CORS middleware
//app.use(cors());

app.listen(port,() => {
    console.log(`connection is setup at ${port}`);
})