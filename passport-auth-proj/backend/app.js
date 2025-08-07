const express = require('express');
const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

const app = express();
app.use(express.urlencoded({extended:false}));

//Dummy user database
const users = [{id:1, username:'Sudha', password:'secret'}];

//Initialize session
app.use(session({
    secret:'mysecret',
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge: 1*60*1000 //1 minute
    }
}))

//Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

//Local Strategy
passport.use(new LocalStrategy((username,password, done)=>{
    const user = users.find(user=>user.username === username);
    if(!user){
        return done(null,false, {message: "Incorrect username"})
    }
    if(user.password!== password){
        return done(null,false, {message:'Incorrect password'})
    }
    return done(null,user)
}));

//Serialize user(stores user  id in session)
passport.serializeUser((user,done)=>{
    done(null,user.id)
});

//Deserialize user(retrieves full userinfo from session)
passport.deserializeUser((id,done)=>{
    const user = users.find(user=> user.id === id)
    done(null,user)
});

//Routes
app.get('/', (req,res)=>{
    res.send(`<h1>Home</h1><a href="/login">Login</a>`)
})

app.get('/login', (req,res)=>{
    res.send(`
        <h1>Login Form</h1>
        <form method = "post" action="/login">
        <input name="username" placeholder="Username" /><br />
        <input name="password" placeholder="Password" /><br />
        <button type="submit">Login</button>
        </form>        
        `)
});

app.post('/login', passport.authenticate('local',{
    successRedirect: '/dashboard',
    failureRedirect: '/login'
}));

app.get('/dashboard', isAuthenticated, (req,res)=>{
    res.send(`<h1>dashboard</h1>
        <p>Welcome ${req.user.username}</p>
        <a href='/logout'>Logout</a>        
        `)
})

app.get('/logout', (req,res)=>{
    req.logout(err=>{
        if(err){return next(err)}
        res.redirect('/');
    })
});

function isAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next();    }
    res.redirect('/login')
}

app.listen(3000,()=>{
    console.log("server is running")
})