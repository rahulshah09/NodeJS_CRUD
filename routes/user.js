/*const express = require('express');
const { createPoolCluster } = require('pg');
const router = express.Router();
const pool = require('../db');  
*/

module.exports = function(app) {
    var user = require('../controllers/userControllers');

    app.get('/getAllUsers',user.getAllUsers);
    app.get('/getUserById/:id',user.getUserById);
    app.post('/addUser',user.addUser);
    app.put('/editUser/:id',user.editUser);
    app.delete('/deleteUser/:id',user.deleteUser);
}

   

/*
//ROUTES

// GET
router.get("/todos", async(req, res) => {
    try {
        const allTodos =await pool.query("SELECT  user_id, user_first_name, user_last_name, user_organization_name, user_email FROM public.user WHERE user_id=2");
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});
// GET BY ID
router.get("/todos/:id", async (req, res) => {
    const { id } = req.params; 
    try {
        const todo =await pool.query("SELECT * FROM public.user WHERE user_id = $1",[id]);
        res.json(todo.rows);
    } catch (err) {
        console.error(err.message);
    }
});
// REGISTER BY ID
router.post("/todos", async (req, res) => {
    try {
        const {user_first_name, user_last_name, user_organization_name, user_email, user_created_by, user_status, user_confirmation_status, user_freeze} = req.body;
        const newTodo =await pool.query("INSERT INTO public.user (user_first_name, user_last_name, user_organization_name, user_email, user_created_by, user_status, user_confirmation_status, user_freeze) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *", [user_first_name, user_last_name, user_organization_name, user_email, user_created_by, user_status, user_confirmation_status, user_freeze]);
  
        res.json(newTodo);
    } catch(err) {
        console.error(err.message);
    }
});

// UPDATE
router.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { user_first_name, user_last_name, user_organization_name, user_email, user_created_by, user_status, user_confirmation_status, user_freeze } = req.body;

        const UpdateTodo = await pool.query("UPDATE public.user SET user_first_name= $1, user_last_name= $2, user_organization_name= $3, user_email= $4, user_created_by= $5, user_status= $6, user_confirmation_status= $7, user_freeze= $8 WHERE user_id = $9", [user_first_name, user_last_name, user_organization_name, user_email, user_created_by, user_status, user_confirmation_status, user_freeze, id]);
        
        res.json("List is updated");
    } catch(err) {
        console.error(err.message);
    }
});

router.delete("/todos/:id",async(req, res) =>{
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM public.user WHERE user_id =$1", [id]);
   
        res.json("Deleted")
    } catch(err) {
        console.error(err.message);
    }
    
});

*/
