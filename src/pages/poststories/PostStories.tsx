import React, { useEffect, useState } from "react";
import Header from "../../components/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons/faCopy";
import UploadStory from "../../services/Story3_Service";
import { GenerateStory } from "../../services/ChatGPT";
import { Fade } from "@mui/material";

const PostStories: React.FC = () => {
  let [newStory, setNewStory] = useState<string>("");
  let [isLoading, setIsLoading] = useState<boolean>(false);

  let [genre, setGenere] = useState<string>("");
  let [theme, setTheme] = useState<string>("");
  let [title, setTitle] = useState<string>("");

  let handleChatGPT = async () => {
    let storyResponse = await GenerateStory({
      Title: title,
      Genre: genre,
      Theme: "",
    });
    console.log(storyResponse);

    if (storyResponse.choices[0].message.content)
      setNewStory(storyResponse.choices[0].message.content);
    setIsLoading(false);
  };

  // useEffect(() => {
  //   CreateTree();
  // });

  let handleInput = (e: any) => {
    if (e.target.name == "genere") {
      setGenere(e.target.value);
    } else if (e.target.name == "theme") {
      setTheme(e.target.value);
    } else if (e.target.name == "title") {
      setTitle(e.target.value);
    }
  };
  return (
    <div>
      <Header />

      <Fade in={true} timeout={1000}>

      <div className="flex flex-col justify-center items-center gap-6 pl-24 pr-24 mt-12 max-h-screen">
        <h3 className="w-1/2"> Enter the Information for the story</h3>
        <div className="w-full flex flex-col justify-center items-center gap-4">
          <div className="flex justify-center items-center w-1/2">
            <label htmlFor="title" className="mr-4 w-32">
              Title
            </label>

            <input
              id="title"
              name="title"
              className="p-4 border-2 rounded border-dark-color w-full"
              placeholder="Enter the title of the story"
              value={title}
              onChange={(e) => handleInput(e)}
            ></input>
          </div>

          <div className="flex justify-center items-center w-1/2">
            <label htmlFor="genere" className="mr-4 w-32">
              Genere
            </label>

            <input
              id="genere"
              name="genere"
              className="p-4 border-2 rounded border-dark-color w-full"
              placeholder="Enter the genere of the story"
              value={genre}
              onChange={(e) => handleInput(e)}
            ></input>
          </div>
          <div className="flex justify-center items-center w-1/2">
            <label htmlFor="theme" className="mr-4 w-32">
              Theme
            </label>

            <input
              id="theme"
              name="theme"
              value={theme}
              onChange={(e) => handleInput(e)}
              className="p-4 border-2 rounded border-dark-color w-full"
              placeholder="Enter the theme of the story"
            ></input>
          </div>

          <div className="flex justify-center items-center w-1/2  gap-12">


            <button
              className="flex bg-custom-background p-4 rounded text-custom-white self-end"
              disabled={isLoading && true}
              onClick={() => {
                setIsLoading(true);
                handleChatGPT();
              }}
            >
              {isLoading && (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
              Generate Story
            </button>
          </div>
        </div>

        <div className="relative w-full overflow-scroll bg-secondary h-96 rounded">
          <button
            className="absolute right-0 p-4 bg-primary text-custom-white"
            onClick={() => {
              navigator.clipboard.writeText(newStory);
            }}
          >
            <FontAwesomeIcon icon={faCopy} />
          </button>
          <div className="p-4 overflow-scroll">
            <pre>
              {newStory
                ? JSON.parse(JSON.stringify(newStory, null, 2))
                : "No Story Generated yet"}
            </pre>
          </div>
        </div>

        <div>
          <button
            className=" right-0 p-4 bg-primary text-custom-white"
            onClick={() => UploadStory(newStory)}
          >
            Post Story
          </button>
        </div>
      </div>
      </Fade>
    </div>
  );
};

export default PostStories;
