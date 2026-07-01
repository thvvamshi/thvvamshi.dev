import { audioStreaming } from "./audio-streaming";
import { deploymentPlatform } from "./deployment-platform";
import { financeApi } from "./finance-api";
import { identityReconciliation } from "./identity-reconciliation";
import { skillNavigator } from "./skill-navigator";
import { teamTaskManager } from "./team-task-manager";
import { userManagement } from "./user-management";
import { vedaAi } from "./veda-ai";
import { voiceAi } from "./voice-ai";

export const projects = [
  deploymentPlatform,
  vedaAi,
  voiceAi,
  audioStreaming,
  identityReconciliation,
  teamTaskManager,
  userManagement,
  financeApi,
  skillNavigator,
];
