const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/UserSchema');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/auth');

router.post('/register', async (req, res) => {

    const { email, password } = req.body;
    if(!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
    let user = await User.findOne({ email });
    if(user) {
        return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        email,
        password: hashedPassword

    })
    await newUser.save();
    let token = jwt.sign ({email,id:newUser._id}, process.env.SECRET_KEY,{expiresIn:"1w"} )  
    return res.status(201).json({ message: 'User registered successfully', token,user:newUser });     

    })


    router.post('/signin', async (req, res) => {
        const { email, password } = req.body;
        if(!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        let user = await User.findOne({ email });
        if(user && await bcrypt.compare(password,user.password)){
            let token = jwt.sign ({email,id:user._id}, process.env.SECRET_KEY,{expiresIn:"1w"} )  
    return res.status(201).json({ message: 'User registered successfully', token,user });
        }

        else {
            return res.status(400).json({ message: 'Invalid email or password' });
        }


    })

    router.get('/:id', async (req, res) => {
        const user = await User.findById(req.params.id)
        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user });

    })


    router.put("/favorite/:id", verifyToken, async(req,res)=>{
        try {
            const userId = req.user.id
            const recipeId= req.params.id

const user = await User.findById(userId);

             if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.favorites) {
      user.favorites = [];
    }

            if(user.favorites.includes(recipeId)){
                user.favorites.pull(recipeId)
            }
            else{
                 user.favorites.push(recipeId)
            }

            await user.save()
            res.json({favourites:user.favorites})


        } catch (error) {
            res.status(500).json({error:error.message})
        }
    })

module.exports = router;