interface Story {
    title: string;
    genre: string;
    story: {
      start: StoryBranch;
      branches: { [key: string]: StoryBranch };
    };
  }
  
  interface StoryBranch {
    story_segment: string;
    branches?: { [key: string]: StoryBranch };
  }
  
  async function processBranch(
    branchData: StoryBranch,
    parentId: string,
    isExtraTwist: boolean,
    publish_headers: Headers,
    header: Headers
  ): Promise<void> {
    const data = Object.entries(branchData);
  
    console.log(branchData)
    for (const [key, value] of data) {
      // Append a unique identifier to each branch's title
      const branch_title = key + parentId;
      
      const branch_request = {
        hashParentId: parentId,
        isExtraTwist: isExtraTwist,
        title: branch_title,
        body: value,
      };
  
      const branch_response = await fetch(twistsUrl, {
        method: "POST",
        headers: header,
        body: JSON.stringify(branch_request),
      });
  
      if (!branch_response.ok) {
        throw new Error(`HTTP error! Status: ${branch_response.status}`);
      }
  
      const branch_data = await branch_response.json();
      const branch_hash = branch_data["hashId"];
  
      console.log(`Branch ${branch_data.title} done processing ${branch_hash}`);
  
      if (value.branches) {
        // Process sub-branches for the current branch
        for (const subBranchKey in value.branches) {
          const subBranch = value.branches[subBranchKey];
          await processBranch(
            subBranch,
            branch_hash,
            true,
            publish_headers,
            header
          );
        }
      }
  
      const publish_response = await fetch(
        `https://story3.com/api/v2/twists/${branch_hash}/publish`,
        {
          method: "POST",
          headers: publish_headers,
        }
      );
  
      if (!publish_response.ok) {
        throw new Error(`HTTP error! Status: ${publish_response.status}`);
      }
    }
  }
  
  async function uploadToStory3(
    authToken: string,
    json_text: string
  ): Promise<any> {
    try {
      let json_data: Story = JSON.parse(json_text);
  
      const headers = new Headers();
      headers.append("Authorization", `Bearer ${authToken}`);
      headers.append("x-auth-token", authToken);
      headers.append("accept", "application/json");
      headers.append("Content-Type", "application/json");
  
      const title_request = {
        title: json_data.title,
        body: json_data.story.start.story_segment,
      };
  
      const title_response = await fetch(storiesUrl, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(title_request),
      });
  
      if (!title_response.ok) {
        throw new Error(`HTTP error! Status: ${title_response.status}`);
      }
  
      const data = await title_response.json();
      const story_hash = data["hashId"];
      console.log("story hash : ", story_hash);
  
      const publish_headers = new Headers();
      publish_headers.append("Authorization", `Bearer ${authToken}`);
      publish_headers.append("x-auth-token", authToken);
      publish_headers.append("accept", "application/json");
  
      await processBranch(
        json_data.story.start,
        story_hash,
        true,
        publish_headers,
        headers
      );
  
      console.log("story done processing");
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  
  const storiesUrl = "https://story3.com/api/v2/stories";
  const twistsUrl = "https://story3.com/api/v2/twists";
  const authToken = import.meta.env.VITE_STORY3_APIKEYS;
  let uploadStory = async (json_text: string): Promise<any> => {
    // Your JSON data here
    json_text = `{
        "title": "Chronicles of the Galactic Ronin",
        "genre": "Space Opera,Adventure,Fantasy",
        "story": {
          "start": {
            "story_segment": "In the vast expanse of the cosmos, you find yourself aboard the starship 'Wanderer's Blade,' a legendary vessel seeking a masterless warrior known as the Galactic Ronin. Your journey begins as you stand on the ship's bridge, surrounded by blinking control panels and holographic star maps.",
            "branch_1": "Embark on a quest to the outer rim, following rumors of the Galactic Ronin's last sighting.",
            "branch_2": "Investigate a distress signal from a nearby asteroid belt, suspecting it might be related to the Galactic Ronin."
          },
          "branch_1": {
            "story_segment": "As you venture into the outer rim, the ship's sensors detect anomalies in the fabric of space. A mysterious portal appears, tempting you with the promise of uncovering the Galactic Ronin's secrets. Do you dare to enter?",
            "branch_3": "Enter the portal, risking the unknown.",
            "branch_4": "Continue your journey without entering the portal, staying focused on finding the Galactic Ronin."
          },
          "branch_2": {
            "story_segment": "Upon reaching the asteroid belt, you discover a hidden base where an intergalactic smuggling ring operates. They possess information about the Galactic Ronin's whereabouts. Do you negotiate with them or confront them head-on?",
            "branch_5": "Negotiate with the smugglers to gain information.",
            "branch_6": "Confront the smugglers and retrieve the information forcefully."
          },
          "branch_3": {
            "story_segment": "The portal transports you to a dimension where time flows differently. You encounter ancient beings who offer to share their knowledge in exchange for a service. Do you accept their offer or attempt to return through the portal?",
            "branch_7": "Accept the beings' offer and gain their knowledge.",
            "branch_8": "Attempt to return through the portal, uncertain of the consequences."
          },
          "branch_4": {
            "story_segment": "Continuing your journey, you stumble upon a hidden planet where the Galactic Ronin is said to have retired. However, a powerful guardian challenges you before allowing entry. Do you face the guardian in combat or try to outsmart it?",
            "branch_9": "Engage in combat with the guardian to prove your worth.",
            "branch_10": "Use your wit and cunning to outsmart the guardian and gain access to the planet."
          },
          "branch_5": {
            "story_segment": "Negotiating with the smugglers proves challenging, but after tense discussions, they agree to provide information. However, they demand a favor in return. Do you agree to their terms or attempt to find another way to obtain the information?",
            "branch_11": "Agree to the smugglers' terms and fulfill the favor.",
            "branch_12": "Refuse the smugglers' demands and search for an alternative solution."
          },
          "branch_6": {
            "story_segment": "Confronting the smugglers leads to a fierce space battle. After defeating them, you recover the information about the Galactic Ronin's last known location. However, the battle has attracted the attention of a powerful space faction. Do you flee or stand your ground?",
            "branch_13": "Flee from the approaching space faction to avoid conflict.",
            "branch_14": "Stand your ground and prepare for a showdown with the approaching space faction."
          }
        }
      }
      `

      return uploadToStory3(authToken, json_text)
  };
  
  export default uploadStory;
  