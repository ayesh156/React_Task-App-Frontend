import React, {useState} from 'react';
import Cards from "../components/Home/Cards";
import {IoAddCircleSharp} from "react-icons/io5";
import InputData from "../components/Home/InputData";

const AllTasks = () => {
    const [inputDiv, setInputDiv] = useState("hidden");

    return (
        <>
        <div>
            <div className="w-full flex justify-end py-2 px-4">
                <button onClick={() => setInputDiv("fixed")}>
                    <IoAddCircleSharp className="text-4xl text-gray-400 hover:text-gray-100 transition-all duration-300" />
                </button>
            </div>
            <Cards home={"true"} setInputDiv={setInputDiv} />
        </div>
            <InputData inputDiv={inputDiv} setInputDiv={setInputDiv} />
        </>
    )
}

export default AllTasks;