/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

import {
  prefixObjectValues
} from '../../utils';

export const PREFIX = "@@GLOBAL/";

let types = {
    SELECT_SERIE: "SELECT_SERIE",
    REQUEST_SAVE_USER_INFO: "REQUEST_SAVE_USER_INFO",
    RECEIVE_SAVE_USER_INFO: "RECEIVE_SAVE_USER_INFO",
    FAILURE_SAVE_USER_INFO: "FAILURE_SAVE_USER_INFO",

    BOOKMARK_SERIE: "BOOKMARK_SERIE",
    SEEN_SERIE: "SEEN_SERIE",

    REQUEST_AUTH: "REQUEST_AUTH",
    RECEIVE_AUTH: "RECEIVE_AUTH",
    FAILURE_AUTH: "FAILURE_AUTH",

    LOGOUT_USER: "LOGOUT_USER",

    SHOW_ONLY_SEEN: "SHOW_ONLY_SEEN",
    SHOW_ONLY_BOOKMARKED: "SHOW_ONLY_BOOKMARKED",
    SHOW_ALL: "SHOW_ALL"
};

export default prefixObjectValues(types, PREFIX);
