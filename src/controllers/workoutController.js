const workoutService = require('../services/workoutService')

const getAllWorkouts = (req,res) => {
    const {modo} = req.query;
    const {limit} = req.query;
    try {
        const allWorkout = workoutService.getAllWorkouts({modo,limit});
        res.status(200).send({status: "OK", data: allWorkout})
    } catch(error) {
        res.status(error?.status || 500).send({status: "FAILED", data: {error: error?.message || "NO DATA"}})
    }
}

const getOneWorkout = (req,res) => {
    if (!req.params.workoutId) res.status(404).send({status: "FAILED",data: {error: "The key 'id' is missing or empty"}})
    try {
        const oneWorkout = workoutService.getOneWorkout(req.params.workoutId);
        res.status(200).send({status: "OK", data: oneWorkout})
    } catch (error) {
        res.status(error?.status || 500).send({status: "FAILED", error: error?.message})
    }
}

const createNewWorkout = (req,res) => {
    const {body} = req;
    if (!body.nombre || !body.modo || !body.equipamiento || !body.ejercicios || !body.consejosDelEntrenador) {
        res.status(400).send({satus: "FAILED", data: {error: "One of the following keys is missing or is empty in request body: 'name', 'mode', 'equiptment', 'exercises', 'trainerTips'"}})
        return;
    }

    try {
        const newWorkout = {
            nombre: body.nombre,
            modo: body.modo,
            equipamiento: body.equipamiento,
            ejercicios: body.ejercicios,
            consejosDelEntrenador: body.consejosDelEntrenador
        }
        const createWorkout = workoutService.createNewWorkout(newWorkout)
        res.status(201).send({status: "OK", data: createWorkout})
    } catch (error) {
        res.status(error?.status || 500)
        .send({status: "FAILED", data: {error: error?.message || error}})
    }
}

const updateOneWorkout = (req,res) => {
    if (!req.params.workoutId){
        res.status(404).send({status: "FAILED",message: 'The entered id is not correct or is empty'})
        return;
    }
    try {
        const update = workoutService.updateOneWorkout(req.params.workoutId,req.body.nombre,req.body.modo,req.body.entrenamiento,req.body.ejercicios,req.body.consejosDelEntrenador)
        res.status(200).send({status: (update)? 'Actualizado correctamente':'No se ha podido actualizar'})
    } catch (error) {
        res.status(error?.status || 500).send({status:"FAILED", message: error?.message || error})
    }
}

const deleteOneWorkout = (req,res) => {
    if (!req.params.workoutId){
        res.status(404).send({status: "FAILED",message: 'The entered id is not correct or is empty'})
        return;
    }
    try {
        workoutService.deleteOneWorkout(req.params.workoutId)
        res.status(200).send({status: "Workout deleted"})
    } catch (error) {
        res.status(error?.status || 500).send({status: "FAILED", message: error?.message || error})
    }
}

module.exports = {
    getAllWorkouts,
    getOneWorkout,
    createNewWorkout,
    updateOneWorkout,
    deleteOneWorkout
}