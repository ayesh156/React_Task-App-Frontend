import React, {useEffect, useState} from 'react';
import {FaEdit} from "react-icons/fa";
import {MdDelete} from "react-icons/md";
import {PiHeartBold, PiHeartFill} from "react-icons/pi";
import {IoAddCircleSharp} from "react-icons/io5";
import axios from "axios";

const Cards = ({ home, setInputDiv, data }) => {
    // Initialize tasks state with the received data prop
    const [tasks, setTasks] = useState(data);

    useEffect(() => {
        setTasks(data);  // Update tasks when data prop changes
    }, [data]);

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    }

    const handleCompleteTask = async (id) => {
        try {
            const response = await axios.put(
                process.env.REACT_APP_ENDPOINT + `/api/v2/update-complete-task/${id}`,
                {},
                { headers }
            );

            if (response.status === 200) {
                // Toggle the complete status of the task in the state
                setTasks(tasks.map(task =>
                    task._id === id ? { ...task, complete: !task.complete } : task
                ));
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleImportant = async (id) => {
        try {
            const response = await axios.put(
                process.env.REACT_APP_ENDPOINT + `/api/v2/update-imp-task/${id}`,
                {},
                { headers }
            );

            if (response.status === 200) {
                // Toggle the important status of the task in the state
                setTasks(tasks.map(task =>
                    task._id === id ? { ...task, important: !task.important } : task
                ));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const deleteTask = async (id) => {
        try {
            const response = await axios.delete(
                process.env.REACT_APP_ENDPOINT + `/api/v2/delete-task/${id}`,
                { headers }
            );
            if (response.status === 200) {
                // Remove the deleted task from the state
                setTasks(tasks.filter(task => task._id !== id));
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="grid grid-cols-3 gap-4 p-4">
            {tasks && tasks.map((items, i) => (
                <div key={i} className="flex flex-col justify-between bg-gray-800 rounded-sm p-4">
                    <div>
                        <h3 className="text-xl font-semibold">{items.title}</h3>
                        <h3 className="text-gray-300 my-2">{items.desc}</h3>
                    </div>
                    <div className="mt-4 w-full flex items-center">
                        <button
                            className={`${items.complete ? "bg-green-700" : "bg-red-400"} p-2 rounded w-3/6`}
                            onClick={() => handleCompleteTask(items._id)}
                        >
                            {items.complete ? "Completed" : "Incomplete"}
                        </button>
                        <div className="text-white p-2 w-3/6 text-2xl font-semibold flex justify-around">
                            <button onClick={()=>handleImportant(items._id)}>
                                {items.important === false ? (
                                    <PiHeartBold />
                                ): (
                                    <PiHeartFill className="text-red-500" />
                                )}

                            </button>
                            <button><FaEdit /></button>
                            <button onClick={()=>deleteTask(items._id)}><MdDelete /></button>
                        </div>
                    </div>
                </div>
            ))}
            {home === "true" && (
                <div
                    className="flex flex-col justify-center items-center bg-gray-800 rounded-sm p-4 text-gray-300 hover:scale-105 transition duration-300 cursor-pointer"
                    onClick={() => setInputDiv("fixed")}
                >
                    <IoAddCircleSharp className="text-5xl" />
                    <h2 className="text-2xl mt-4">Add Task</h2>
                </div>
            )}
        </div>
    );
}

export default Cards;