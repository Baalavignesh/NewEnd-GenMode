import React from "react";
import Header from "../../components/NavBar";
import openAI from "../../assets/openai.jpg";
import path from "../../assets/path.jpg";
import tree from "../../assets/tree.gif";
import world from "../../assets/world.jpg";
import { Fade } from "@mui/material";

const HowItWorks: React.FC = () => {
  return (
    <div>
      <Header />

      <h2 className="m-16 text-center text-4xl ">
        Working of NewEnd - GenMode
      </h2>

      <Fade in={true} timeout={1000}>
        <section className="p-0">
          <div className="mb-16 flex flex-wrap bg-secondary p-12">
            <div className="mb-6  lg:mb-0 w-6/12 pr-6">
              <div className="cursor-pointer overflow-hidden object-none rounded-lg bg-cover h-[350px] flex justify-center items-center">
                <img src={openAI} className="w-full" />
              </div>
            </div>

            <div className="w-6/12 p-12 flex flex-col">
              <h3 className="mb-4 text-2xl font-bold">
                Next Gen Generative AI
              </h3>
              <div className="flex items-center text-sm font-medium">
                OpenAI
              </div>
              <p className="mb-6 text-neutral-500"></p>
              <p className="text-neutral-500 text-xl">
                Our app uses the OpenAI magic to create stories just for you.
                You pick a title, genre, and theme, and voila! A custom-made
                tale unfolds, blending your ideas with AI wizardry. Get ready
                for a cool journey where your story dreams come true!
              </p>
              <br></br>

              <p className="text-neutral-500 text-xl">
                Provide more context and additional information about your idea
                to create personalized stories to your liking.
              </p>
            </div>
          </div>

          <div className="mb-16 flex flex-wrap bg-secondary p-12">
            <div className="w-6/12 p-12 flex flex-col">
              <h3 className="mb-4 text-2xl font-bold">
                Choose your path, add your twist
              </h3>
              <div className="flex items-center text-sm font-medium">
                Story3 Implementation
              </div>
              <p className="mb-6 text-neutral-500"></p>
              <p className="text-neutral-500 text-xl">
                In NewEnd, users generate their stories in our website and
                upload to Story3. Once there, they can explore different twists,
                choose their preferred narrative path, and even create their own
                twists. It's a dynamic and interactive platform, putting
                storytelling control directly in the hands of our users.
              </p>
              <br></br>

              <p className="text-neutral-500 text-xl">
                Track and Analyze all your stories in one place with the help of
                Story3 API for analysis on click rates and popular twists on
                stories
              </p>
            </div>

            <div className="mb-6  lg:mb-0 w-6/12 pr-6">
              <div className="cursor-pointer overflow-hidden rounded-lg bg-cover h-[400px]">
                <img src={path} className="w-full" />
              </div>
            </div>
          </div>

          <div className="mb-16 flex flex-wrap bg-secondary p-12">
            <div className="mb-6  lg:mb-0 w-6/12 pr-6">
              <div className="cursor-pointer overflow-hidden rounded-lg bg-cover ">
                <img src={tree} className="w-full" />
              </div>
            </div>
            <div className="w-6/12 p-12 flex flex-col">
              <h3 className="mb-4 text-2xl font-bold">
                Extreme Flexibilty in creating stories
              </h3>
              <div className="flex items-center text-sm font-medium">
                NewEnd GenMode
              </div>
              <p className="mb-6 text-neutral-500"></p>
              <p className="text-neutral-500 text-xl">
                NewEnd-GenMode allows users to create stories with n-number of
                levels and twists. Users can provide additional information to
                explore new endings to their favorite movies, series and even
                fictional books.
              </p>
              <br></br>
              <p className="text-neutral-500 text-xl">
                The branch starts at the root and every node is a twist. The
                leaf node is the unique ending for each of the decision. Through
                Pre-Order Traversal a precise template is created and fed to
                OpenAI to generate immersive stories with infinite
                possibilities.
              </p>
            </div>
          </div>

          <div className="mb-16 flex flex-wrap bg-secondary p-12">
            <div className="w-6/12 p-12 flex flex-col">
              <h3 className="mb-4 text-2xl font-bold">Future of NewEnd</h3>
              <div className="flex items-center text-sm font-medium">
                Integration of 3rd party application
              </div>
              <p className="mb-6 text-neutral-500"></p>
              <p className="text-neutral-500 text-xl">
                We can integrate other application like Reddit, X.com to get
                inspiration and suggestions from other users and feed it back to
                OpenAI to create an unimaginable endings.
              </p>

              <br></br>

              <p className="text-neutral-500 text-xl">
                Colloborate multiple twist and a community discussion under
                stories to better understand the viewers and add more twist to
                existing stories
              </p>
            </div>

            <div className="mb-6 w-6/12 pr-6 flex justify-center items-center">
              <div className="cursor-pointer overflow-hidden rounded-lg bg-cover h-[400px]">
                <img src={world} className="w-full" />
              </div>
            </div>
          </div>
        </section>
      </Fade>
    </div>
  );
};

export default HowItWorks;
