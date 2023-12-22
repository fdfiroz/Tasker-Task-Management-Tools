import { IconButton } from '@material-tailwind/react'
import { FaGithub } from 'react-icons/fa'
import { useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import useAxios from '../../hooks/useAxios';

const GithubAuth = () => {
  const { githubLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axios = useAxios()


  const handleGithubLogin = async () => {
    const toastId = toast.loading('Logging in ...');

    try {
      const res = await githubLogin();
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
        .then(res => {
          console.log(res)
        })
      }

      toast.success('Logged in', { id: toastId });
      navigate(location.state? location.state: '/')
    } catch (error) {
      toast.error(error.message, { id: toastId });
    }
  }
  return (
    <>
    <IconButton onClick={handleGithubLogin} className="rounded bg-[#333333] hover:shadow-[#333333]/20 focus:shadow-[#333333]/20 active:shadow-[#333333]/10">
      <FaGithub className="fab fa-github text-lg"></FaGithub>
      </IconButton>
      </>
  )
}

export default GithubAuth