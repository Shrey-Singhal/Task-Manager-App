import LoginInput from "../components/LoginInput";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from 'react';
import { useAuth } from "../contexts/authContext";

interface ValidLogInDetails {
    email_validity: boolean;
    password_validity: boolean;
}
interface Task {
    _id: string;
    title: string;
    description?: string;
    status: "To Do" | "In Progress" | "Completed";
    dueDate: string;
  }
  
interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
    tasks?: Task[];
}

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState<string>("");
    const [userPassword, setUserPassword] = useState<string>("");

    const [valid_login_details, set_valid_login_details] = useState<ValidLogInDetails>({
        email_validity: true,
        password_validity: true,
    });
    const [all_users, set_all_users] = useState<User[]>([]);

    const { login } = useAuth();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/users");
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                const userData = await response.json();
                set_all_users(userData);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, []);



    const submitSignIn = (e: React.FormEvent): void => {
        e.preventDefault();
        // Check if all fields are entered
        if (!userEmail || !userPassword) return;
        const loggedInUser = all_users.find(u => u.email === userEmail);

        const valid_email = loggedInUser ? true : false;
        const valid_password = loggedInUser?.password === userPassword;

        set_valid_login_details({email_validity: valid_email, password_validity: valid_password});

        if (valid_email && valid_password) {

            login(loggedInUser);
            setTimeout(() => navigate("/"), 1500);
        }

    }

    return(
        <div className="min-h-screen flex flex-col items-center bg-customGrey ">
            <h2 className="text-3xl font-semibold text-black mt-20 mb-6">Welcome Back</h2>
            <div className="w-[380px] bg-white p-4  rounded-md mt-inner_padding shadow-xl">
                <form onSubmit={submitSignIn}>
                    <LoginInput
                        htmlFor="email"
                        input_type="email"
                        update_on_change={setUserEmail}
                        boolean_check={valid_login_details.email_validity}

                    >
                        The email address you entered isn't connected to an account.
                    </LoginInput>

                    <LoginInput
                        htmlFor="password"
                        input_type="password"
                        update_on_change={setUserPassword}
                        boolean_check={valid_login_details.password_validity}
                    >
                        The password that you've entered is incorrect.
                    </LoginInput>

                    <input
                        type ="submit"
                        value = "Log In"
                        className="p-[5px] pl-[16px] pr-[16px] rounded-[6px] text-sm leading-5 cursor-pointer
                        text-customLightBlue transition duration-200 bg-customDarkBlue hover:brightness-150 w-full mb-1"
                    />
                </form>

                <div className="flex justify-between text-blue-500 mt-2 text-sm">
                    Don't have an account?
                    <button
                        onClick={() => navigate("/signUp")}
                        className="font-bold bg-transparent border-none text-blue-500 cursor-pointer">
                        Sign Up
                    </button>
                </div>
            </div>

        </div>

    )
};

export default Login