import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import GoogleAuth from "../components/SocialAuth/GoogleAuth";
import GithubAuth from "../components/SocialAuth/GithubAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";


const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {createUser, handleUpdateProfile} = useAuth()
  const [name, setName] = useState('')
  const [photoURL, setPhotoURL] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  

  const handelSubmit = async (e) =>{
    e.preventDefault();

    console.log(name, photoURL, email, password);
    if (password.length < 8) {
      toast.error("The password must be at least 6 characters long.");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      toast.error("The password must contain at least one capital letter.");
      return;
    }
    if (!/[!@#$%^&*()]/.test(password)) {
      toast.error("The password must contain at least one special character.");
      return;
    }
    const toastId = toast.loading('Creating user ...');
    try {
      await createUser(email, password);
      await handleUpdateProfile(name, photoURL)
      .then(() => {
        toast.success('User Created', { id: toastId });
        
        navigate(location.state? location.state: '/');
      })
    } catch (error) {
      console.log(error);
      toast.error(error.message, { id: toastId });
    }
  }

    
  

  return (
    <>
    <Helmet>
      <title>Blogify Register</title>
    </Helmet>
    <div className="h-screen w-full mx-auto">
     <div className="flex items-center justify-center justify-items-center md:py-10">
     <Card className="w-96 mx-auto pt-10 container">
      <CardHeader
        variant="gradient"
        color="gray"
        className="grid h-28 place-items-center"
      >
        <Typography variant="h3" color="white">
          Register
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
      <Input label="Name" size="lg" type="text" required onBlur={(e)=> setName(e.target.value)}/>
      <Input label="Profile Image Link" size="lg" type="url" required onBlur={(e)=> setPhotoURL(e.target.value)}/>
        <Input label="Email" type="email" size="lg" required onBlur={(e)=> setEmail(e.target.value)}/>
        <Input label="Password" size="lg" type="password"  required onBlur={(e)=> setPassword(e.target.value)}/>
        <Typography
        variant="small"
        color="gray"
        className="mt-2 flex  gap-1 font-normal"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="-mt-px h-6 w-6"
        >
          <path
            fillRule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
            clipRule="evenodd"
          />
        </svg>
        Use at least 8 characters, one uppercase, one lowercase and one number.
      </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button variant="gradient" type="submit" fullWidth onClick={handelSubmit}>
          Register
        </Button>
        <div className="flex gap-2 justify-center flex-col-2 items-center mt-4">
      <GoogleAuth/>
      <GithubAuth/>
    </div>
        <Typography variant="small" className="mt-6 flex justify-center">
          Have an account?
          <Link to={"/login"}>
          <Typography
            as="a"
            variant="small"
            color="blue-gray"
            className="ml-1 font-bold"
          >
            Login
          </Typography>
          </Link>
          
        </Typography>
        
      </CardFooter>
    </Card>
     </div>
    </div>
    </>
  )
}

export default Register