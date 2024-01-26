import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/NavBar";
import NET from "vanta/dist/vanta.net.min";
import * as THREE from "three";
import { Fade } from "@mui/material";
const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const vantaRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        NET({
          el: vantaRef.current,
          THREE: THREE,
          scale: 0.5,
          scaleMobile: 1.0,
          color1: 0x2b889a,
          backgroundColor: 0x25356b,
          points: 10.0,
          maxDistance: 30.0,
          spacing: 20.0,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  useEffect(() => {
    console.log("dashboard screen");
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <div
        className="pl-24 pr-24 pt-12 h-screen text-custom-white"
        ref={vantaRef}
      >
        <Fade in={true} timeout={1000}>
          <div>
          <div className="bg-primary bg-opacity-80  text-custom-white p-4 mb-2 rounded">
          <h1>Welcome to NewEnd</h1>
          <p className="mt-4">
            Next Gen story generator with generative AI powered by GPT-3.5 to
            explore new short stories and exciting new endings for existing
            stories
          </p>
        </div>

        <div className="two-cards flex justify-around items-center p-4 mt-12">
          <div
            className="h-96 w-1/2 flex justify-center items-center bg-secondary cursor-pointer rounded-xl m-4 hover:bg-primary transition"
            onClick={() => navigate("poststory")}
          >
            <h1 className="text-custom-black">
              Generate and Post Short Stories
            </h1>
          </div>
          <div
            className="h-96 w-1/2 flex justify-center items-center bg-secondary cursor-pointer rounded-xl m-4 hover:bg-primary transition"
            onClick={() => navigate("mystory")}
          >
            <h1 className="text-custom-black">New Endings</h1>
          </div>
        </div>
          </div>

        </Fade>

      </div>
    </div>
  );
};

export default Dashboard;
