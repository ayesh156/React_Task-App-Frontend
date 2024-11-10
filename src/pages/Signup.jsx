import React, {useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {useSelector} from "react-redux";

const Signup = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const history = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            history("/");
        }
    }, [isLoggedIn, history]);

    const [Data, setData] = React.useState({username: "", email: "", password: ""});
    const change =  (e) => {
        const { name, value } = e.target;
        setData({ ...Data, [name]: value });
    }
    const submit = async () => {
        try{
            if (Data.username === "" || Data.email === "" || Data.password === "") {
                alert("All fields are required");
            } else {
                const response = await axios.post(
                    process.env.REACT_APP_ENDPOINT + "/api/v1/sign-in",
                    Data
                )
                setData({username: "", email: "", password: ""});
                console.log(response.data.message);
                history("/login");
            }
        }catch (err){
            alert(err.response.data.message);
        }
    }

    return (
        <div className="h-[98vh] flex items-center justify-center">
            <div className="p-4 w-2/6 rounded bg-gray-800">
                <div className="text-2xl font-semibold">Signup</div>
                <input
                    type="text"
                    placeholder="Username"
                    className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
                    name="username"
                    onChange={change}
                    value={Data.username}
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
                    name="email"
                    required
                    onChange={change}
                    value={Data.email}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
                    name="password"
                    onChange={change}
                    value={Data.password}
                />
                <div className="w-full flex items-center justify-between">
                    <button className="px-3 py-2 bg-blue-400 rounded text-black text-xl font-semibold" onClick={submit}>
                        Sign Up
                    </button>
                    <Link to="/login" className="text-gray-400 hover:text-gray-200 transition-all duration-300">
                        Already having an account? Login here
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Signup;