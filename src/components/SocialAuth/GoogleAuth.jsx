import { IconButton } from '@material-tailwind/react'
import { FaGoogle } from 'react-icons/fa'
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';

const GoogleAuth = () => {
  const { googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axios = useAxios()
  const handleGoogleLogin = async () => {
    const toastId = toast.loading('Logging in ...');

    try {
      const res = await googleLogin();
      console.log(res)
      if (res.user.email) {
        const name = res.user?.displayName;
        const email = res.user?.email;
        const photoURL = res.user?.photoURL;
        const uid = res.user?.uid;
        const emailVerified = res.user?.emailVerified;
        const createdAt = res.user?.metadata?.creationTime;
        const lastSignInTime = res.user?.metadata?.lastSignInTime;
        const user = { name, email, uid, lastSignInTime, emailVerified, createdAt, photoURL };
        console.log(user)
        axios.put("/users", user)
      }
      toast.success('Logged in', { id: toastId });
      navigate(location.state ? location.state : '/')
    } catch (error) {
      toast.error(error.message, { id: toastId });
    }
  }
  return (
    <>
      <IconButton onClick={handleGoogleLogin} className="rounded bg-[#ea4335] hover:shadow-[#ea4335]/20 focus:shadow-[#ea4335]/20 active:shadow-[#ea4335]/10">
        <FaGoogle className="fab fa-github text-lg" ></FaGoogle>
      </IconButton>
    </>
  )
}

export default GoogleAuth