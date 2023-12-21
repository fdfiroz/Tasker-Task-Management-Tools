import { IconButton } from '@material-tailwind/react'
import { FaGoogle } from 'react-icons/fa'
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';

const GoogleAuth = () => {
  const { googleLogin } = useAuth();
  const navigate = useNavigate();
    const location = useLocation();
  
  const handleGoogleLogin = async () => {
    const toastId = toast.loading('Logging in ...');

    try {
      await googleLogin();
      toast.success('Logged in', { id: toastId });
      navigate(location.state? location.state: '/')
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