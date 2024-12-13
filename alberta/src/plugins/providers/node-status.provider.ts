import { Memory, Provider, IAgentRuntime, State } from "@ai16z/eliza";
import axios from "axios";

export class ApiJsonDataProvider implements Provider {
  async get(
    _runtime: IAgentRuntime,
    _message: Memory,
    _state?: State
  ): Promise<String> {
    let apiUrl: string | null = null;

    console.log("[ApiJsonDataProvider] Starting the get method...");

    const conversationMemoryManager = _runtime.getMemoryManager("conversation")!;
    console.log("[ApiJsonDataProvider] Conversation memory manager:", conversationMemoryManager);
    const conversationMemories = await conversationMemoryManager.getMemoriesByRoomIds({
      roomIds: [_message.roomId]
    });

    console.log("[ApiJsonDataProvider] Retrieved conversation memories:", conversationMemories);

    for (const memory of conversationMemories) {
      console.log("[ApiJsonDataProvider] Checking memory:", memory);
      if (memory.content.apiUrl) {
        apiUrl = memory.content.apiUrl as string;
        console.log("[ApiJsonDataProvider] Found API URL:", apiUrl);
        break;
      }
    }

    if (!apiUrl) {
      console.log("[ApiJsonDataProvider] No API URL found in memory");
      return "API URL not found in memory.";
    }

    try {
      console.log(`[ApiJsonDataProvider] Fetching data from: ${apiUrl}`);
      const response = await axios.get(apiUrl, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("[ApiJsonDataProvider] Successfully fetched data:", response.data);
      return response.data; // Return the JSON data
    } catch (error) {
      console.error("[ApiJsonDataProvider] Error while fetching data:", error);
      if (axios.isAxiosError(error)) {
        console.error("[ApiJsonDataProvider] Axios error response:", error.response?.data);
        return error.response?.data?.message || error.message ;
      }
      console.error("[ApiJsonDataProvider] Unknown error occurred");
      return "An unknown error occurred.";
    } finally {
      console.log("[ApiJsonDataProvider] Exiting the get method...");
    }
  }
}
