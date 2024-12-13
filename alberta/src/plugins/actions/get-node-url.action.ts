import {
  Action,
  ActionExample,
  Handler,
  HandlerCallback,
  Validator,
} from "@ai16z/eliza";
import { Memory } from "@ai16z/eliza";

// TODO: Split the action
interface ApiUrlResponse {
  url: string;
}

function extractUrl(input: string): string | null {
  const urlRegex = /https?:\/\/[^\s/$.?#].[^\s]*/gi; // Regex to match URLs
  const match = input.match(urlRegex); // Find matches in the input string
  return match ? match[0] : null; // Return the first match or null if none found
}

export class GetApiUrlAction implements Action {

  public readonly name = "GET_API_URL";
  public readonly description = "Retrieves the API URL for a given service";
  public readonly similes = [
    "SET_API_ENDPOINT",
    "API_URL",
    "FETCH_API_URL",
    "URL_FOR_API",
    "GET_API",
  ];
  public readonly examples: ActionExample[][] = [
    [
      {
        user: "{{user1}}",
        content: {
          text: "Here is my node API URL",
        },
      },
      {
        user: "{{agentName}}",
        content: {
          text: "",
          action: "SET_API_URL",
        },
      },
    ],
    [
      {
        user: "{{user1}}",
        content: {
          text: "Can you get me the response from API URL?",
        },
      },
      {
        user: "{{agentName}}",
        content: {
          text: "I couldn't find the API URL. Can you provide the service name?",
        },
      },
      {
        user: "{{user1}}",
        content: {
          text: "The node has next API URL. Make GET request,",
        },
      },
      {
        user: "{{agentName}}",
        content: {
          text: "",
          action: "GET_API_URL",
        },
      },
    ],
  ];

  public readonly handler: Handler = async (
    _runtime,
    _message,
    _state,
    _options?: { [key: string]: unknown },
    _callback?: HandlerCallback
  ): Promise<boolean> => {
    let apiUrl: string | null = null;

    const conversationMemoryManager = _runtime.getMemoryManager("conversation")!;
    
    if (typeof _message.content.text === 'string') {
      const userEndpoint = extractUrl(_message.content.text);
      console.log("[GetApiUrlAction] user_endpoint", userEndpoint);
      apiUrl = userEndpoint;
      conversationMemoryManager.createMemory(
        {
          "roomId": _message.roomId,
          "userId": _message.userId,
          "agentId": _message.agentId,
          "content": {
            "apiUrl": apiUrl,
            "text": _message.content.text,
          },
        },
        true
      );
    } else {
      console.log("[GetApiUrlAction] _message.content.text is not a string");
    }

    const conversationMemories = await conversationMemoryManager.getMemoriesByRoomIds({
      roomIds: [_message.roomId]
    });


    console.log("[GetApiUrlAction] conversationMemories", conversationMemories);

    for (const memory of conversationMemories) {
      if (memory.content.apiUrl !== undefined) {
        apiUrl = memory.content.apiUrl as string;
        break;
      }
    }

    if (apiUrl == null) {
      _callback?.({
        text: "I couldn't find the API URL. Could you please specify the service or provide additional context?",
      });
      return false;
    }

    // Return the API URL
    _callback?.({
      text: `The API URL is: ${apiUrl}`,
    });
    return true;
  };

  public readonly validate: Validator = async (): Promise<boolean> => {
    return true;
  };
}
