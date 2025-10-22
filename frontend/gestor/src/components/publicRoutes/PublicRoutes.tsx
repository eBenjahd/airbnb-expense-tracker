import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

interface Props {
    children: React.ReactNode
}

function PublicRoutes({children}:Props) {

    const token = Cookies.get('accessToken')

    if (token) {
        return <Navigate to='/' replace/>
    }
  return (
    <>
      {children} 
    </>
  )
}

export default PublicRoutes
