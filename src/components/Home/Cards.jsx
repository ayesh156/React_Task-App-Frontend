import React from 'react';
import {FaEdit} from "react-icons/fa";
import {MdDelete} from "react-icons/md";
import {PiHeartBold} from "react-icons/pi";
import {IoAddCircleSharp} from "react-icons/io5";

const Cards = ({ home, setInputDiv }) => {
    const data = [
        {
            title: "The Best Developer",
            desc: "An expert in multiple programming languages with a strong focus on building scalable applications.",
            status: "In Complete"
        },
        {
            title: "Creative Designer",
            desc: "A visionary in digital design, bringing creativity and precision to every project with unique aesthetic appeal.",
            status: "Complete"
        },
        {
            title: "Data Scientist",
            desc: "Skilled in data analysis and machine learning, transforming raw data into actionable insights for strategic decisions.",
            status: "In Complete"
        },
        {
            title: "Project Manager",
            desc: "An organized leader who excels in coordinating teams and ensuring project goals are met on time and within budget.",
            status: "In Complete"
        }
    ];

    // const [importantButton, setImportantButton] = useState("Incomplete");

    return (
        <div className="grid grid-cols-3 gap-4 p-4">
            {data &&
                data.map((items, i) => (
                    <div key={i} className="flex flex-col justify-between bg-gray-800 rounded-sm p-4">
                        <div>
                            <h3 className="text-xl font-semibold">{items.title}</h3>
                            <h3 className="text-gray-300 my-2">{items.desc}</h3>
                        </div>
                        <div className="mt-4 w-full flex items-center">
                            <button className={`${items.status === "In Complete" ? "bg-red-400" : "bg-green-700"} p-2 rounded w-3/6`}>{items.status}</button>
                            <div className="text-white p-2 w-3/6 text-2xl font-semibold flex justify-around">
                                <button><PiHeartBold/>
                                </button>
                                <button><FaEdit/></button>
                                <button><MdDelete/></button>
                            </div>
                        </div>
                    </div>
                ))}
            {home === "true" &&
            <div className="flex flex-col justify-center items-center bg-gray-800 rounded-sm p-4 text-gray-300 hover:scale-105 transition duration-300 cursor-pointer" onClick={()=> setInputDiv("fixed")}>
                <IoAddCircleSharp className="text-5xl" />
                <h2 className="text-2xl mt-4">Add Task</h2>
            </div>
            }
        </div>
    )
}

export default Cards;