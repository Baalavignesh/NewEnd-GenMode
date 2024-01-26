import OpenAI from "openai";
import storyTheme from "../constants/stories.json";
import { ChatCompletion } from "openai/resources/index.mjs";
import uploadStory from "./Story3_Service";

let openAIKey = import.meta.env.VITE_GPT_3_APIKEY;
console.log(openAIKey)
const openai = new OpenAI({
  apiKey: openAIKey,
  dangerouslyAllowBrowser: true,
});

interface IStoryInfo {
  Genre: string;
  Theme: string;
  Title: string;
}

let getCommandInput = (storyInfo: IStoryInfo): string => {
  let commandInput = `Generate a choose your own adventure type story in the follow format for the given genre:
  IMPORTANT : branches must be limited to 40 characters
  
  Format as JSON
  
  {
  "title": "[Title here]",
  "genre": "[genre1],[genre2],[genre3]..."
  "story":{
  
  "start": { "story_segment" : "[story segment here]",
       "branch_1" : "[option 1]",
       "branch_2" : "[option 2]" },
  
  "branch_1": { "story_segment" : "[story segment here]",
       "branch_3" : "[option 3]",
       "branch_4" : "[option 4]" },
  
  "branch_2": { "story_segment" : "[story segment here]",
       "branch_5" : "[option 5]",
       "branch_6" : "[option 6]" },
  
  "branch_3": { "story_segment" : "[story segment here]",
       "end_1" : "[end 1]",
       "end_2" : "[end 2]" },
  
  "branch_4": { "story_segment" : "[story segment here]",
       "end_3" : "[end 3]",
       "end_4" : "[end 4]" },
  
  "branch_5": { "story_segment" : "[story segment here]",
       "end_5" : "[end 5]",
       "end_6" : "[end 6]" },
  
  "branch_6": { "story_segment" : "[story segment here]",
       "end_7" : "[end 7]",
       "end_8" : "[end 8]" },
  
  }}
  
  Genre: ${storyInfo.Genre}
  Theme:  ${storyInfo.Theme}
  Title:  ${storyInfo.Title};`;

  return commandInput;
};

const GenerateStory = async (
  storyInfo: IStoryInfo
): Promise<ChatCompletion> => {
  console.log("generating story");

  
  let finalCommand = getCommandInput(storyInfo);
  return openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: finalCommand,
      },
    ],
    model: "gpt-3.5-turbo",
  });
};


const uploadGeneratedStory = (story: IStoryInfo) => {
  
}

const automateStories = async (): Promise<any> => {
  let missedOne = [];
  for (const singleStory of storyTheme.stories) {


    let response = await GenerateStory(singleStory);
    console.log(response);
    if (!response.choices[0].message.content) return;
    try {
      let story3Response = await uploadStory(
        response.choices[0].message.content
      );
      console.log(story3Response);
    } catch (e) {
      missedOne.push(singleStory);
    }
    console.log(missedOne);
  }
};



export { GenerateStory, automateStories, uploadGeneratedStory };
