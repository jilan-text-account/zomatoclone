import bodyParser from "body-parser";
import express from "express";
import pg from "pg";
import upload from "express-fileupload";

const app=express();
const port=4000;

 const db=new pg.Client({
     user:"your user name",
     host:"host name",
     password:"your password",
     database:"your database",
     port:0000,
 });

 db.connect();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(upload());

app.get("/", async (req, res) => {
    try {
        const result = await db.query("select * from items");
        const items = result.rows;

        const images = items.map(item => {
            if (item.image_data) {
                return item.image_data.toString('base64');
            } else {
                return null;
            }
        });

        res.render("index.ejs", {
            listItems: items,
            images: images,
        });
    } catch (error) {
        console.log(error);
    }
});

app.get("/about",(req,res)=>{
    try {
        res.render("./partials/about.ejs")
    } catch (error) {
        console.log(error);
    }
});

app.get("/contact",(req,res)=>{
    try {
        res.render("./partials/contact.ejs")
    } catch (error) {
        console.log(error);
    } 
})

app.get("/help",(req,res)=>{
    try {
        res.render("./partials/help.ejs")
    } catch (error) {
        console.log(error);
    }
})


app.post("/add",async(req,res)=>{
 try {
    
    const title=req.body.title;
    const description=req.body.description;
    const file=req.files.file
    const filedata=file.data

    await db.query("insert into items(title, description, image_data) values($1, $2, $3)",[title, description, filedata]);
    res.redirect("/");

 }catch (error){
    console.log(err);
 }
});

app.post("/delete", async (req, res) => {
    const id = req.body.listItemsId;
    try {
        await db.query('DELETE FROM items WHERE id = $1', [id]);
        res.redirect("/");
    } catch (error) {
        console.log(error);
    }
});



app.listen(port, ()=>{
    console.log(`server is running ${port}`)
});
