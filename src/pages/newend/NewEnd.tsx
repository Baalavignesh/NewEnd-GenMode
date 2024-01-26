import React, { useState } from "react";
import Header from "../../components/NavBar";
import { useForm, SubmitHandler } from "react-hook-form";
import { Fade } from "@mui/material";
import CreateTree from "../../services/StoryTemplate";
import { GenerateGenModeStory } from "../../services/ChatGPT";
import uploadStory from "../../services/Story3_Service";

type Inputs = {
  Title: string;
  Genre: string;
  Theme: string;
  AdditionalInfo: string;
  Twists: number;
  Endings: number;
};

const MyStories: React.FC = () => {
  let [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    setIsLoading(true);
    let template = CreateTree(data.Twists);
    let storyResponse = await GenerateGenModeStory(data, template);

    if (storyResponse.choices[0].message.content)
      uploadStory(storyResponse.choices[0].message.content);
  };

  return (
    <div className="w-full">
      <Header />

      <div className="flex min-h-screen  w-full">
        <Fade in={true} timeout={1000}>
          <div className="flex flex-col gap-6 pl-24 pr-24 mt-12 max-h-screen w-full">
            <h3 className="w-full text-center border-b-[1px] pb-6"> Enter the Information to generate GenMode Stories</h3>
            <div className="w-full mt-4">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-2 w-full justify-center"
              >
                <div className="flex gap-12 justify-center">
                  <div className="w-2/6 flex flex-col gap-4">
                    <div>
                      <label
                        htmlFor="title"
                        className="mr-4 w-full flex justify-between mb-2"
                      >
                        Title
                        {errors.Title && (
                          <span className="text-red-600">
                            This field is required
                          </span>
                        )}
                      </label>
                      <input
                        id="title"
                        {...register("Title", { required: true })}
                        className="p-4 border-2 rounded border-dark-color w-full"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="genre"
                        className="mr-4 w-full flex justify-between mb-2"
                      >
                        Genre
                        {errors.Genre && (
                          <span className="text-red-600">
                            This field is required
                          </span>
                        )}
                      </label>
                      <input
                        id="genre"
                        {...register("Genre", { required: true })}
                        className="p-4 border-2 rounded border-dark-color w-full"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="title"
                        className="mr-4 w-full flex justify-between mb-2"
                      >
                        Theme
                        {errors.Theme && (
                          <span className="text-red-600">
                            This field is required
                          </span>
                        )}
                      </label>

                      <input
                        id="title"
                        {...register("Theme", { required: true })}
                        className="p-4 border-2 rounded border-dark-color w-full"
                      />
                    </div>
                  </div>
                  <div className="w-2/6 flex flex-col gap-4">
                    <div className="flex items-center gap-12">
                      <div className="w-full">
                        <label
                          htmlFor="twist"
                          className="mr-4 w-full flex justify-between mb-2"
                        >
                          Twist
                        </label>

                        <input
                          id="twist"
                          {...register("Twists")}
                          type="number"
                          className="p-4 border-2 rounded border-dark-color w-full"
                        />
                      </div>
                      <div className="w-full">
                        <label
                          htmlFor="ending"
                          className="mr-4 w-full flex justify-between mb-2"
                        >
                          Endings
                        </label>

                        <input
                          id="ending"
                          type="number"
                          {...register("Endings")}
                          className="p-4 border-2 rounded border-dark-color w-full"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="additionalinformation"
                        className="mr-4 w-full flex justify-between mb-2 mt-3"
                      >
                        Additional Information
                        {errors.AdditionalInfo && (
                          <span className="text-red-600">
                            This field is required
                          </span>
                        )}
                      </label>
                      <textarea
                      
                      rows={6}
                        id="additionalinformation"
                        {...register("AdditionalInfo", { required: true })}
                        className="p-4 border-2 rounded border-dark-color w-full block text-sm text-gray-900 bg-gray-50"
                      />
                    </div>
                  </div>
                </div>

                <div className=" flex w-fit bg-custom-background p-4 rounded text-custom-white  self-center mt-8 cursor-pointer">
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
                  <input type="submit" value="Generate and Publish Story" />
                </div>
              </form>
            </div>

          </div>
        </Fade>
      </div>
    </div>
  );
};

export default MyStories;
