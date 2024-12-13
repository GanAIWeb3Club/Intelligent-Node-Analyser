import { Plugin } from "@ai16z/eliza";
import { GetApiUrlAction } from "./actions/get-node-url.action.js";
import { ApiJsonDataProvider } from "./providers/node-status.provider.js";
export const NodeApiStatusPlugin: Plugin = {
  name: "Node status",
  description: "Retrieve Node data from API and summarize",

  actions: [
    new GetApiUrlAction()
  ],
  providers: [new ApiJsonDataProvider()],
};

