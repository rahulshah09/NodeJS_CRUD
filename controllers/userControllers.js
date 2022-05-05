const { request, response } = require('express');
const pool = require('../db');

// status data message
const handleSuccess = ({
    res,
    statusCode=200,
    result = true,
    data
}) => res.status(statusCode).send({
    result,
    message: "success",
    data
});

const handleError = ({
    res,
    statusCode = 400, 
    err = "error", 
    result = false, 
    data = null,
}) => {
    return res.status(statusCode).send({
        result,
        message: err,
        data
    });
};




exports.getAllUsers = (async (req, res) => {
    try {
        
        const allTodos = await pool.query("SELECT  * FROM public.user");
        //res.status(200).json({ data: allTodos.rows, message: 'success' });
        handleSuccess({res: res,statusCode:200,result:true,data:allTodos.rows});

    } catch (err) {
       // res.status(400).json({ data: null, message: err.message });
        //console.log(handleError({res: res,statusCode:400,message:err,result:false,data:null}));
        handleError({res: res,statusCode:400,message:err,result:false,data:null});
    }
});


exports.getUserById = (async (req, res) => {
    const { id } = req.params;
    try {
        const todo = await pool.query("SELECT * FROM public.user WHERE user_id = $1", [id]);
       // res.json(todo.rows);
       handleSuccess({res: res,statusCode:200,result:true,data:todo.rows});
    } catch (err) {
        //console.error(err.message);
       handleError({res: res,statusCode:400,message:err,result:false,data:null});
    }
});


// REGISTER BY ID
exports.addUser = (async (req, res) => {
    try {
        const { user_first_name, user_last_name, user_organization_name, user_email, user_created_by, user_status, user_confirmation_status, user_freeze } = req.body;
        const newTodo = await pool.query("INSERT INTO public.user (user_first_name, user_last_name, user_organization_name, user_email, user_created_by, user_status, user_confirmation_status, user_freeze) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *", [user_first_name, user_last_name, user_organization_name, user_email, user_created_by, user_status, user_confirmation_status, user_freeze]);

        //res.json(newTodo);
        handleSuccess({res: res,statusCode:200,result:true,data:newTodo});
    } catch (err) {
        handleError({res: res,statusCode:400,message:err,result:false,data:null});
    }
});             

exports.editUser = (async (req, res) => {
    try {
        const { id } = req.params;
        const { user_first_name, user_last_name, user_organization_name, user_email, user_created_by, user_status, user_confirmation_status, user_freeze } = req.body;

        const UpdateTodo = await pool.query("UPDATE public.user SET user_first_name= $1, user_last_name= $2, user_organization_name= $3, user_email= $4, user_created_by= $5, user_status= $6, user_confirmation_status= $7, user_freeze= $8 WHERE user_id = $9", [user_first_name, user_last_name, user_organization_name, user_email, user_created_by, user_status, user_confirmation_status, user_freeze, id]);

       // res.json("List is updated");
       handleSuccess({res: res,statusCode:200,result:true,data:UpdateTodo});
    } catch (err) {
        handleError({res: res,statusCode:400,message:err,result:false,data:null});
    }
});


exports.deleteUser = (async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM public.user WHERE user_id =$1", [id]);

       // res.json("Deleted")
       handleSuccess({res: res,statusCode:200,result:true,data:deleteTodo});
    } catch (err) {
        handleError({res: res,statusCode:400,message:err,result:false,data:null});
    }

});
