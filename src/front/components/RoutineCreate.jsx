import React from "react"
import { useState, useEffect } from "react"

const RoutineCreate = () => {

    const [routineId, setRoutineId] = useState("")
    const [routineName, setRoutineName] = useState("")

    const [day, setDay] = useState("")
    const [set, setSet] = useState("")
    const [reps, setReps] = useState("")
    const [rest_time, setRest_time] = useState("")

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const createRoutineId = async (evento) => {
        evento.preventDefault()
        const response = await fetch(`${backendUrl}api/routines`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: routineName })
        })
        const data = await response.json()
        setRoutineId(data.id)
    }

    const createRoutine = async (evento) => {
        evento.preventDefault()
        const response = await fetch(`${backendUrl}api/routinesworkout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                routine_id: routineId,
                workout_id: "3",
                day: day,
                sets: set,
                reps: reps,
                rest_time: rest_time
            })
        })
    }




    return (<>

        <div className=" m-auto w-sm">
            <img className="w-sm" src="src/front/assets/img/LOGO HORIZONTAL/Recurso 8ldpi.png " alt="" />

            {!routineId ? (
                <form
                   >
                    <div className="mt-2">
                        <input
                            className="border-current rounded-md bg-amber-400"
                            value={routineName}
                            onChange={(e) => setRoutineName(e.target.value)}
                            type="text"
                            placeholder="Routine Name"
                        />
                    </div>
                    <div className="mt-5">
                        <button
                            className="border-current rounded-md bg-amber-400"
                            type="submit"
                            onClick={createRoutineId}
                        >
                            Create Routine
                        </button>
                    </div>
                </form>
            ) : (
                <form
                    className="place-items-center"
                   
                >
                    <div className="mt-2">
                        <input
                            className="border-current rounded-md bg-amber-400"
                            value={day}
                            onChange={(e) => setDay(e.target.value)}
                            type="text"
                            placeholder="Day"
                        />
                    </div>
                    <div className="mt-2">
                        <input
                            className="border-current rounded-md bg-amber-400"
                            value={set}
                            onChange={(e) => setSet(e.target.value)}
                            type="text"
                            placeholder="Sets"
                        />
                    </div>
                    <div className="mt-2">
                        <input
                            className="border-current rounded-md bg-amber-400"
                            value={reps}
                            onChange={(e) => setReps(e.target.value)}
                            type="text"
                            placeholder="Reps"
                        />
                    </div>
                    <div className="mt-2">
                        <input
                            className="border-current rounded-md bg-amber-400"
                            value={rest_time}
                            onChange={(e) => setRest_time(e.target.value)}
                            type="text"
                            placeholder="Rest Time"
                        />
                    </div>
                    <div className="mt-5">
                        <button
                            className="border-current rounded-md bg-amber-400"
                            type="submit"
                            onClick={createRoutine}
                        >
                            Finish Routine
                        </button>
                    </div>
                </form>
            )}



        </div>



    </>)

}

export default RoutineCreate