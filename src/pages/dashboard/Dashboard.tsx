import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/NavBar";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {}, []);

  useEffect(() => {
    console.log("dashboard screen");
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <div className="pl-24 pr-24 mt-12 max-h-screen">
        <h1>Welcome to NewEnd</h1>
        <p className="mt-4">
          Next Gen stories with custom ending to existing stories and new ones
        </p>

        <div className="two-cards flex justify-around items-center p-4 h-full mt-12">
          <div className="h-96 w-1/2 flex justify-center items-center bg-secondary rounded-xl m-4 hover:bg-primary transition" onClick={() => navigate('poststory')}>
            <h1>Generate and post story</h1>
          </div>
          <div className="h-96 w-1/2 flex justify-center items-center bg-secondary rounded-xl m-4 hover:bg-primary transition" onClick={() => navigate('mystory')}>
            <h1>My Stories</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
