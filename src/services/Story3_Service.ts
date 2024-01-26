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
      return uploadToStory3(authToken, json_text)
  };
  
  export default uploadStory;
  