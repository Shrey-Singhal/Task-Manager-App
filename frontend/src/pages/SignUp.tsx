import React, { useEffect, useState } from 'react'
import LoginInput from '../components/LoginInput'
import { useNavigate } from 'react-router-dom';

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

const SignUp = () => {
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [email_validity, set_email_validity] = useState<boolean>(true);
  const [email_format_validity, set_email_format_validity]= useState<boolean>(true);
  const [all_users, set_all_users] = useState<User[]>([]);

  const isValidEmail = (email: string) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  }

  useEffect(()=> {
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

  const createUserInDatabase = async (userName: string, userEmail: string, userPassword: string) => {
    try {
      const response = await fetch('http://localhost:5000/api/users', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              name: userName,
              email: userEmail,
              password: userPassword
          })
      });
        if (!response.ok) {
            throw new Error('Failed to create user');
        }

        const userData: User = await response.json();
        console.log("User created successfully:", userData);
    } catch (error) {
        console.error("Error creating user:", error);
    }

  }

  const submitSignUp = async (e:React.FormEvent): Promise<void> => {
    e.preventDefault();

    // Directly check the email format
    if (!isValidEmail(userEmail)) {
      set_email_format_validity(false);
      return; // Exit early if the email format is invalid
    }
    set_email_format_validity(true);

    // Check if the email is already in use
    const found_user = all_users.find((u) => u.email === userEmail);
    if (found_user) {
      set_email_validity(false);
      return; // Exit early if email is already taken
    }
    set_email_validity(true);

    await createUserInDatabase(userName, userEmail, userPassword);

    // Redirect to login after successful signup
    setTimeout(() => navigate("/login"), 1500);
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-customGrey ">
        <h2 className="text-3xl font-semibold text-black mt-20 mb-6">Create a new account</h2>
        <div className="w-[380px] bg-white p-4  rounded-md mt-inner_padding shadow-xl">
            <form onSubmit={submitSignUp}>
                <LoginInput
                    htmlFor="name"
                    input_type="name"
                    update_on_change={setUserName}
                    boolean_check={email_validity}

                >
                </LoginInput>
                <LoginInput
                    htmlFor="email"
                    input_type="email"
                    update_on_change={setUserEmail}
                    boolean_check={email_validity && email_format_validity}

                >
                  {!email_format_validity && "The format of the email is wrong"}
                  {!email_validity && "The email address you entered is already taken."}
                    
                </LoginInput>

                <LoginInput
                    htmlFor="password"
                    input_type="password"
                    update_on_change={setUserPassword}
                >
                </LoginInput>

                <input
                    type ="submit"
                    value = "Sign Up"
                    className="p-[5px] pl-[16px] pr-[16px] rounded-[6px] text-sm leading-5 cursor-pointer
                    text-customLightBlue transition duration-200 bg-customDarkBlue hover:brightness-150 w-full mb-1"
                />
            </form>
        </div>

    </div>

  )
}

export default SignUp