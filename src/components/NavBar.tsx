import { useNavigate } from "react-router-dom"

const Header = () => {
  let navigate = useNavigate();

  return (
    <div className='p-4 pl-24 pr-24 bg-custom-background text-custom-white flex justify-between items-center'>
      <h2 onClick={() => navigate("/")} className="cursor-pointer">NewEnd - GenMode</h2>
      <h4 onClick={() => navigate("/how")} className="cursor-pointer">How it works?</h4>
    </div>
  )
}

export default Header