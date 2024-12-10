const Workout = require('../database/workoutAdapter')
const { v4: uuid } = require('uuid')


const getAllWorkouts = (filterParams) => {
    try {
        const allWorkout = Workout.getAllWorkouts(filterParams)
        return allWorkout;
    } catch (error) {
        throw error;
    }
}

const getOneWorkout = (id) => {
    const allWorkout = Workout.getAllWorkouts()
    allWorkout.forEach((entreno) => {
        if (entreno.id === id) devolver = entreno;
    })
    if (!devolver) throw {status: "FAILED", message: "The entered id is not correct or is empty"}
    return devolver;
}

const createNewWorkout = (newWorkout) => {
    const workoutToInsert = {
        ...newWorkout,
        id: uuid(),
        fechaCreacion: new Date().toLocaleString('es-ES', { timeZone: "UTC" }),
        fechaActualizacion: new Date().toLocaleString('es-ES', { timeZone: "UTC" })
    }
    try {
        const create = Workout.createNewWorkout(workoutToInsert)
        return create;
    } catch (error) {
        throw error;
    }
}

const updateOneWorkout = (id, nombre, modo, equipamiento, ejercicios, consejosDelEntrenador) => {
    try {
        const actualizado = Workout.updateOneWorkout(id, nombre, modo, equipamiento, ejercicios, consejosDelEntrenador)
        return actualizado;
    } catch (error) {
        throw error
    }
}

const deleteOneWorkout = (id) => {
    try {
        Workout.deleteOneWorkout(id);
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllWorkouts,
    getOneWorkout,
    createNewWorkout,
    updateOneWorkout,
    deleteOneWorkout
}