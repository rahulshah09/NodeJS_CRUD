const express =require("express");
const app =express(),
      bodyParser = require("body-parser"),
      fs = require('fs');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
const customCss = fs.readFileSync((process.cwd()+"/swagger/swagger.css"), 'utf8');
const cors = require('cors');
//const bodyParser = require('body-parser');

app.use(cors({
    origin: '*'
}));

app.use(express.json()) // => req.body
//app.use(bodyParser.urlencoded({ extended: true}));
//app.use(bodyParser.json());
//pp.use(bodyParser.raw());


app.use(express.json());

app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {customCss}));

const userRouter = require('./routes/user');
userRouter(app);


app.listen(5000, () => {
    console.log("Server is listening on port 5000");
});
/*
//ROUTES

// GET
app.get("/todos", async(req, res) => {
    try {
        const allTodos =await pool.query("SELECT  user_id, user_first_name, user_last_name, user_organization_name, user_email FROM public.user WHERE user_id=2");
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});
// GET BY ID
app.get("/todos/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const todo =await pool.query("SELECT * FROM public.user WHERE user_id = $1",[id]);
        res.json(todo.rows);
    } catch (err) {
        console.error(err.message);
    }
});
// REGISTER BY ID
app.post("/todos", async (req, res) => {
    try {
        const {user_first_name, user_last_name, user_organization_name, user_email, user_created_by, user_status, user_confirmation_status, user_freeze} = req.body;
        const newTodo =await pool.query("INSERT INTO public.user (user_first_name, user_last_name, user_organization_name, user_email, user_created_by, user_status, user_confirmation_status, user_freeze) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *", [user_first_name, user_last_name, user_organization_name, user_email, user_created_by, user_status, user_confirmation_status, user_freeze]);
  
        res.json(newTodo);
    } catch(err) {
        console.error(err.message);
    }
});

// UPDATE
app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { user_first_name, user_last_name, user_organization_name, user_email, user_created_by, user_status, user_confirmation_status, user_freeze } = req.body;

        const UpdateTodo = await pool.query("UPDATE public.user SET user_first_name= $1, user_last_name= $2, user_organization_name= $3, user_email= $4, user_created_by= $5, user_status= $6, user_confirmation_status= $7, user_freeze= $8 WHERE user_id = $9", [user_first_name, user_last_name, user_organization_name, user_email, user_created_by, user_status, user_confirmation_status, user_freeze, id]);
        
        res.json("List is updated");
    } catch(err) {
        console.error(err.message);
    }
});

app.delete("/todos/:id",async(req, res) =>{
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM public.user WHERE user_id =$1", [id]);
   
        res.json("Deleted")
    } catch(err) {
        console.error(err.message);
    }
    
});

/*
app.get('/:user_id', async function(req,res){
    try{
        debugger;
        const sqlQuery = 'SELECT user_id, user_first_name, user_last_name, user_organization_name, user_email FROM public.user WHERE id=?';
        const rows = await pool.query(sqlQuery,  req.params.user_id);
        res.status(200).json(rows);
    } catch(error) {
        res.status(400).send(error.message)
    }


  // res.status(200).json({id:req.params.id})   
})

// insert data in table
/*app.post('/register', async function(req,res) {
    try {
        const {user_first_name, user_last_name, user_organization_name, user_email, user_created_by, user_status, user_confirmation_status, user_freeze} = req.body;

        const sqlQuery = 'INSERT INTO user (user_first_name, user_last_name, user_organization_name, user_email, user_created_by, user_status, user_confirmation_status, user_freeze) VALUES (?,?,?,?,?,?,?,?)';
        const result =await pool.query(sqlQuery, [user_first_name, user_last_name, user_organization_name, user_email, user_created_by, user_status, user_confirmation_status, user_freeze]);

        res.status(200).json({userId: result.insertId});
    } catch (error) {
        res.status(400).send(error.message)
    }
})


const userRouter = require('./routes/user');
const { user } = require("pg/lib/defaults");
app.use('/user',userRouter);
*/
