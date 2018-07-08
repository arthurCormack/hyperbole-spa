/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const FIRST_GENERIC_HOME_CONSTANT = 'ez2/Home/FIRST_GENERIC_HOME_CONSTANT';

export const FETCH_HOMEPAGE = 'ez2/Home/FETCH_HOMEPAGE';

export const LOAD_HOMESTART = 'ez2/Home/LOAD_HOMESTART';
export const LOAD_HOMESTART_SUCCESS = 'ez2/Home/LOAD_HOMESTART_SUCCESS';
export const LOAD_HOMESTART_FAILURE = 'ez2/Home/LOAD_HOMESTART_FAILURE';
