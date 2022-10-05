import { ActionType } from "../action-types/index";

interface SearchRepositoresAction {
  type: ActionType.SEARCH_REPOSITORIES;
}

interface SearchRepositoresSuccessAction {
  type: ActionType.SEARCH_REPOSITORIES_SUCCESS;
  payload: {
    name: string;
    description: string;
    links: { npm: string; homepage: string; repository: string; bugs: string };
  }[];
}

interface SearchRepositoresErrorAction {
  type: ActionType.SEARCH_REPOSITORIES_ERROR;
  payload: string;
}

export type Action =
  | SearchRepositoresAction
  | SearchRepositoresSuccessAction
  | SearchRepositoresErrorAction;
