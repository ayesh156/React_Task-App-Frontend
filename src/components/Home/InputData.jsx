import React, { useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import axios from "axios";

const InputData = ({ inputDiv, setInputDiv, addTask }) => {
    const [Data, setData] = useState({ title: "", desc: "" });

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    const change = (e) => {
        const { name, value } = e.target;
        setData({ ...Data, [name]: value });
    };

    const submitData = async () => {
        if (Data.title === "" || Data.desc === "") {
            alert("All fields are required");
        } else {
            try {
                const response = await axios.post(
                    process.env.REACT_APP_ENDPOINT + "/api/v2/create-task",
                    Data,
                    { headers }
                );

                if (response.status === 200) {
                    // Add new task to the parent component state
                    addTask(true);  // Assuming the response contains the new task

                    // Clear input fields and hide input form
                    setData({ title: "", desc: "" });
                    setInputDiv("hidden");
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <>
            <div className={`${inputDiv} top-0 left-0 bg-gray-800 opacity-80 h-screen w-full`}></div>
            <div className={`${inputDiv} top-0 left-0 flex items-center justify-center h-screen w-full`}>
                <div className="w-2/6 bg-gray-900 p-4 rounded">
                    <div className="flex justify-end">
                        <button className="text-2xl hover:text-red-600 transition-all duration-300" onClick={() => setInputDiv("hidden")}>
                            <RxCross2 />
                        </button>
                    </div>
                    <input
                        type="text"
                        placeholder="Title"
                        name="title"
                        className="px-3 py-2 rounded w-full bg-gray-700 mt-3"
                        value={Data.title}
                        onChange={change}
                    />
                    <textarea
                        name="desc"
                        cols="30"
                        rows="10"
                        placeholder="Description.."
                        className="px-3 py-2 rounded w-full bg-gray-700 my-3"
                        value={Data.desc}
                        onChange={change}
                    ></textarea>
                    <button className="px-3 py-2 bg-blue-400 rounded text-black text-xl font-semibold" onClick={submitData}>Submit</button>
                </div>
            </div>
        </>
    );
};

export default InputData;
