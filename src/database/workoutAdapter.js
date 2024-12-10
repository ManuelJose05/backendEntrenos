const e = require('express');
const DB = require('./db.json')
const fs = require('fs')
const getAllWorkouts = (filterParams) => {
    try {
        let workout = DB.entrenamientos;
        if (filterParams.modo && filterParams.limit && filterParams.limit < DB.entrenamientos.length){
            let copia = DB.entrenamientos.filter((entreno) => entreno.modo.toLocaleLowerCase().includes(filterParams.modo.toLocaleLowerCase()));
            return copia.splice(0,filterParams.limit)
        }
        if (filterParams.modo) return DB.entrenamientos.filter((entreno) => entreno.modo.toLocaleLowerCase().includes(filterParams.modo.toLocaleLowerCase()))
        if (filterParams.limit && filterParams.limit < DB.entrenamientos.length) return DB.entrenamientos.splice(0,filterParams.limit)
        return workout;
    } catch (error) {
        throw {status: 500, message: error};
    }
}

const createNewWorkout = (workout) => {
    DB.entrenamientos.forEach(element => {
        if (element.nombre === workout.nombre) {
            throw {
                status: 400,
                message: `Workout with the name ${workout.nombre} alredy exists`
            }
        }
    });
    try {
        DB.entrenamientos.push(workout)
        saveData()
    } catch (error) {
        throw {status: 500, message: error?.message || error}
    }
}

const saveData = () => {
    fs.writeFileSync('src/database/db.json', JSON.stringify(DB), { encoding: "utf-8" })
}

const deleteOneWorkout = (id) => {
    try {
        DB.entrenamientos = DB.entrenamientos.filter((entreno) => entreno.id !== id)
        saveData()
    } catch (error) {
        throw {status: 500, message: "Cannot delete workout"}
    }
}

const updateOneWorkout = (id, nombre, modo, equipamiento, ejercicios, consejosDelEntrenador) => {
    actualizado = false
    try {
        DB.entrenamientos.forEach(entreno => {
            if (entreno.id === id) {
                entreno.nombre = (nombre)? nombre : entreno.nombre
                entreno.modo = (modo)? modo : entreno.modo
                entreno.equipamiento = (equipamiento)? equipamiento : entreno.equipamiento
                entreno.ejercicios = (ejercicios)? ejercicios : entreno.ejercicios
                entreno.consejosDelEntrenador = (consejosDelEntrenador)? nombconsejosDelEntrenadorre : entreno.consejosDelEntrenador
                entreno.fechaActualizacion = new Date().toLocaleString('es-ES', "UTC");
                console.log(entreno)
                actualizado = true
                saveData()
            }
        })
        return actualizado;
    } catch (error) {
        throw {status: 500, message: 'Cannot update workout'}
    }
}

module.exports = { getAllWorkouts, createNewWorkout, deleteOneWorkout,updateOneWorkout }