import inquirer from "inquirer";
import { IUser, UserRole } from "../entities/user";
import { TopicManagementService } from "../services/topicManagement";
import { TopicController } from "./topics";

const adminUser: IUser = { id: "admin1", role: UserRole.ADMIN };
const editorUser: IUser = { id: "editor1", role: UserRole.EDITOR };
const viewerUser: IUser = { id: "viewer1", role: UserRole.VIEWER };

let service: TopicManagementService;
export let controller: TopicController;

export const SetUser = async () => {
  if (service !== undefined && controller !== undefined) return;
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "What type of user do you want to be?",
      choices: ["Admin", "Editor", "Viewer"],
    },
  ]);
  console.log(`You selected: ${answers.action}`);
  switch (answers.action) {
    case "Admin":
      service = new TopicManagementService(adminUser);
      controller = new TopicController(service);
      break;
    case "Editor":
      service = new TopicManagementService(editorUser);
      controller = new TopicController(service);
      break;
    case "Viewer":
      service = new TopicManagementService(viewerUser);
      controller = new TopicController(service);
      break;
    default:
      console.log("Bye");
  }
};
