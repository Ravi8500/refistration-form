const express=require("express");//frame work
const mongoose=require("mongoose");//intracting with mongoDB
const bodyparser=require("body-parser");//making of complex data to readable form
const dotenv=require("dotenv");//encryption of passwords


const app=express();//instance of express
dotenv.config();//hide password

 const port=process.env.PORT ||3000;
// const port=3000;

const username=process.env.MONGODB_USERNAME;
const password=process.env.MONGODB_PASSWORD;

mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.biti3zb.mongodb.net/registartionformDB`,{
// mongoose.connect('mongodb+srv://ravitejaneelakantam2003:z50rkO1ZxKKfbDW1@cluster0.ykx0v3q.mongodb.net/registrationformDb',{
useNewUrlParser:true,
useUnifiedTopology:true,
});

// mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.ykx0v3q.mongodb.net/registrationformDb`, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });




// registration schema
const registrationSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
});
// mode of registration schema
const Registration=mongoose.model("registration",registrationSchema);


app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/pages/index.html");
});

app.post("/register",async(req,res)=>{
    try{

        const {name,email,password}=req.body;
        const exsitingUser= await Registration.findOne({email: email});
        if(!exsitingUser){
            const registrationData= new Registration({
                name,
                email,
                password,
            });
            await registrationData.save();
            res.redirect("/success");

        }
        else{
            console.log("User alraedy exist");
            res.redirect("/error");
        }

       
    }
    catch(error){
        console.log(error);
            res.redirect("/error");
    }
});

app.get("/success",(req,res)=>{
    res.sendFile(__dirname+"/pages/success.html");

});
app.get("/error",(req,res)=>{
    res.sendFile(__dirname+"/pages/error.html");

});





app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});





