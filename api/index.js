//all imports required
const express = require('express')
const cors = require("cors")
const app = express();
const User = require('./models/User')
const Post = require("./models/Post")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")

const secret = "" //REPLACE 

app.use(cors({ credentials: true, origin: "http://localhost:5173" }))
app.use(express.json())
app.use(cookieParser())


//const bodyParser = require("body-parser");
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

//const salt = bcrypt.genSaltSync(10); implement this later on

//connect to database

//REPLACE
mongoose.connect("mongodb+srv://<username>:<password>@blogcluster.l9y8gwt.mongodb.net/?retryWrites=true&w=majority&appName=BlogCluster")

//registering
app.post('/register', async (req, res) => {
    const { user, pass } = req.body;

    try {
        if (user.length < 5) {
            return res.status(422).json("Username is too short")
        }

        // Check if the username already exists
        const existingUser = await User.findOne({ user });

        if (existingUser) {
            return res.status(400).json("Username Already Exists");
        }


        //pass: bcrypt.hashSync(pass, salt)
        else {


            const userDoc = await User.create({ user, pass });
            return res.status(201).json("Success!");
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json("Error")
    }
});


//login, returns token
app.post('/login', async (req, res) => {
    const { user, pass } = req.body;

    try {
        const checkUser = await User.findOne({ user })

        if (checkUser.pass === pass) {
            jwt.sign({ user, id: checkUser._id }, secret, {}, (err, token) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json("Error token")
                }

                res.status(200).cookie("token", token).json({
                    id: checkUser._id,
                    user
                })
            })
            //return res.status(200).json("success")
        }
        else {
            return res.status(300).json("incorrect password")
        }

    }
    catch (e) {
        console.error(e)
        return res.status(500).json("Cannot Find Username")
    }

});


//returns logged in user info if available
app.get("/profile", (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        if (err)
            res.json(null);
        else {
            res.json(info)
        }

    })

})

//logout
app.post("/logout", (req, res) => {
    res.cookie("token", "").json("ok")
})

//creates post, verifies token
app.post("/create", async (req, res) => {
    const { token } = req.cookies;
    try {
        jwt.verify(token, secret, {}, async (err, info) => {
            if (err) {
                return res.status(401).json("Unauthorized");
            }
            else {



                const { title, summary, imageURL, text, author, authorID } = req.body;
                //const { title, summary, imageURL, text, author } = req.body;

                if (!title || !summary || !imageURL || !text || !author) {
                    return res.status(400).json({ message: 'All fields must be filled out' });
                }

                const post = await Post.create({ title, summary, imageURL, text, author, authorID });

                //const post = await Post.create({ title, summary, imageURL, text, author});
                return res.status(200).json()
            }
        })
    }
    catch (e) {
        console.log(e);
        return res.status(500).json("API error???")
    }
})

//gets all posts from db
app.get("/post", async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts).status(200);
    } catch (err) {
        res.status(500).send(err);
    }
});

//validating post/* url
app.get("/posts/:postID", async (req, res) => {
    try {
        const { postID } = req.params;

        if (!mongoose.isValidObjectId(postID)) {
            return res.status(404).json({ error: 'Invalid postID' });
        }

        const post = await Post.findOne({ _id: postID });

        if (!post) {
            return res.status(404).json("Post not found");
        }

        else {
            return res.status(200).json(post);
        }

    } catch (err) {
        return res.status(500).json("Error fetching post");
    }
});


app.listen(4000);

