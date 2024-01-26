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
          color1: 0x2b889a,
          backgroundColor: 0x25356b,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00
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
            <div className="bg-secondary bg-opacity-90  text-custom-white p-4 mb-2 rounded">
              <h1 className="text-custom-black w-fit border-b-[1px] mb-6">Welcome to NewEnd</h1>
              <p className="mt-4 text-xl text-custom-black">
                Experience storytelling like never before with NewEnd GenMode.
                Generate personalized stories using our app powered by OpenAI,
                explore twists on Story3, and track story analytics through the
                Story3 API. With extreme flexibility, users can shape narratives
                with countless levels and twists for endless creative
                possibilities.
              </p>
            </div>

            <div className="two-cards flex justify-around items-center p-4 mt-12">
              <div
                className="h-96 w-1/2 flex flex-col justify-center items-center bg-secondary cursor-pointer rounded-xl m-4 hover:bg-primary transition"
                onClick={() => navigate("poststory")}
              >
                <h1 className="text-custom-black">
                  Generate and Post Short Stories
                </h1>
                <p className="text-custom-black">Generate simple short stories of your liking for fun</p>

              </div>
              <div
                className="h-96 w-1/2 flex flex-col justify-center items-center bg-secondary cursor-pointer rounded-xl m-4 hover:bg-primary transition"
                onClick={() => navigate("mystory")}
              >
                <h1 className="text-custom-black">New End - GenMode</h1>
                <p className="text-custom-black">Generate more flexible stories with additional context and number of endings</p>
              </div>
            </div>
          </div>
        </Fade>
      </div>
    </div>
  );
};

export default Dashboard;
