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

import { createSelector } from 'reselect'

function trimURLPrefix(someURL) {
  //remove the http:// or https:// and place simply a // prefix
  // const result = someURL.replace(/(^\w+:|^)\/\//, '');
  // return '//' + result;
  return someURL;
}


export const API_ENPOINT_PREFIX = 'wp-json/zm-content/v1';
const someServerApiURL = typeof process.env.SERVER_API_URL === 'string' ? trimURLPrefix(process.env.SERVER_API_URL) : trimURLPrefix(process.env.API_URL);
export const BASE_URL = typeof window !== 'undefined' ? `${trimURLPrefix(process.env.API_URL)}` : `${someServerApiURL}`;
export const API_URL = typeof window !== 'undefined' ? `${trimURLPrefix(process.env.API_URL)}/${API_ENPOINT_PREFIX}` : `${someServerApiURL}/${API_ENPOINT_PREFIX}`;

export const DEFAULT_LOCALE = 'en';
export const CREATE_CB = 'ez2/App/CREATE_CB';
export const SET_ALLADS_CONTENTCYCLESAFETY = 'ez2/App/SET_ALLADS_CONTENTCYCLESAFETY';
// so we can't use relative urls for asych calls from the server ...
// we have to add a base_url, (if the server environment) ...
export const APICALLURL_GETCATPOST = `${API_URL}/getcatpost`;// this is a constant, but its not the string of an action name, it's the url of an API ...
export const LOAD_CATEGORIZEDPOSTDATA = 'ez2/App/LOAD_CATEGORIZEDPOSTDATA';
export const LOAD_CATEGORIZEDPOSTDATA_SUCCESS = 'ez2/App/LOAD_CATEGORIZEDPOSTDATA_SUCCESS';
export const LOAD_CATEGORIZEDPOSTDATA_ERROR = 'ez2/App/LOAD_CATEGORIZEDPOSTDATA_ERROR';

export const APICALLURL_GETDATEDPOST = `${API_URL}/getdatedpost`;// dynamic url paths in api request url - cb added in saga

export const APICALLURL_GETARCHIVE = `${API_URL}/getarchive`;// dynamic url paths in api request url - cb added in saga
export const APICALLURL_GETARCHIVE2 = `${API_URL}/getarchive2`;// dynamic url paths in api request url - cb added in saga
export const APICALLURL_GETREALESTATE = `${API_URL}/getrealestate`;// dynamic url paths in api request url - cb added in saga

// export const LOAD_ARCHIVEDATA = 'ez2/App/LOAD_ARCHIVEDATA';
// export const LOAD_ARCHIVEDATA_SUCCESS = 'ez2/App/LOAD_ARCHIVEDATA_SUCCESS';
// export const LOAD_ARCHIVEDATA_FAILURE = 'ez2/App/LOAD_ARCHIVEDATA_FAILURE';

export const APICALLURL_GETPOSTS = `${API_URL}/getposts`;// ??
export const LOAD_POSTSDATA = 'ez2/App/LOAD_POSTSDATA';
export const LOAD_POSTSDATA_SUCCESS = 'ez2/App/LOAD_POSTSDATA_SUCCESS';
export const LOAD_POSTSDATA_ERROR = 'ez2/App/LOAD_POSTSDATA_ERROR';

export const LOAD_NEXTPOSTINTOSTACK = 'ez2/App/LOAD_NEXTPOSTINTOSTACK';
export const UPDATE_WINDOW_SCROLL_POSITION = 'ez2/App/UPDATE_WINDOW_SCROLL_POSITION';


// socket io commands - issued from socket.io server
export const SOCKET_RECEIVE_DOCHANNELREGISTRATION = 'client/doChannelRegistration';
export const SOCKET_RECEIVE_PERFORMANCESDATA = 'client/performancesData';
export const SOCKET_SEND_CHANNELREGISTRATION = 'server/registerChannel';

export const SOCKET_RECEIVE_STREAMDATA = 'client/streamData';

export const APICALLURL_GETSLIDESHOW = `${API_URL}/getslideshow`;
export const LOAD_SLIDESHOWDATA_SUCCESS = 'ez2/App/LOAD_SLIDESHOWDATA_SUCCESS';
export const LOAD_SLIDESHOWDATA_ERROR = 'ez2/App/LOAD_SLIDESHOWDATA_ERROR';


export const YOUTUBE_VIDEO_PLAYCOMMAND = 'ez2/App/YOUTUBE_VIDEO_PLAYCOMMAND';

export const APICALLURL_NEWSLETTERSIGNUP = 'http://sub.zoomermedia.ca/sub';
export const NEWSLETTER_SUBSCRIPTION_SIGNUP = 'ez2/App/NEWSLETTER_SUBSCRIPTION_SIGNUP';
export const NEWSLETTER_SUBSCRIPTION_SIGNUP_DONE = 'ez2/App/NEWSLETTER_SUBSCRIPTION_SIGNUP_DONE';

export const PAGINATEDPAGE_PAGINATE = 'ez2/App/PAGINATEDPAGE_PAGINATE';
export const PAGINATEDPAGE_PAGE_LOADED = 'ez2/App/PAGINATEDPAGE_PAGE_LOADED';
export const ACTIVATE_STREAMERROR_EMERGENCYPROTOCOL = 'ez2/App/ACTIVATE_STREAMERROR_EMERGENCYPROTOCOL';

export const SET_SCROLLTOP = 'ez2/App/SET_SCROLLTOP';

export const CLEAR_CAARDD = 'ez2/App/CLEAR_CAARDD';
export const SET_CAARDD = 'ez2/App/SET_CAARDD';

export const SET_SIDEBARINDEX = 'app/App/SET_SIDEBARINDEX';
// export const SET_LEADERBOARDINDEX = 'app/App/SET_LEADERBOARDINDEX';
export const SET_SIDEBAR_DISPLAYDATA = 'app/App/SET_SIDEBAR_DISPLAYDATA';
export const SET_LEADERBOARD_DISPLAYDATA = 'app/App/SET_LEADERBOARD_DISPLAYDATA';

export const SET_SPONSOREDCONTENTINDEX = 'app/App/SET_SPONSOREDCONTENTINDEX';
export const SET_SPONSOREDCONTENTINDEX2 = 'app/App/SET_SPONSOREDCONTENTINDEX2';

export const ACTIVATE_GENERAL_WAYPOINT_SLEEP_TIMEOUT = 'app/App/ACTIVATE_GENERAL_WAYPOINT_SLEEP_TIMEOUT';
export const DEACTIVATE_GENERAL_WAYPOINT_SLEEP_TIMEOUT = 'app/App/DEACTIVATE_GENERAL_WAYPOINT_SLEEP_TIMEOUT';
export const DEFAULT_GENERAL_WAYPOINT_SLEEP_TIMEOUT_DURATION = 100;// milliseconds

export const APICALLURL_GETFEATUREDFOUR = `${API_URL}/getfeaturedfour`;
export const APICALLURL_GETHOMEHERO = `${API_URL}/gethomehero`;
export const APICALLURL_GETMOSTPOPULAR = `${API_URL}/getmostpopular`;
export const APICALLURL_GETFEATUREDSINGLEBIG = `${API_URL}/getfeaturedsinglebig`;
export const APICALLURL_GETTRENDINGLIST = `${API_URL}/gettrendinglist`;
export const APICALLURL_GETHOMETILE = `${API_URL}/gethometile`;
export const APICALLURL_GETHOTTOPICS = `${API_URL}/gethottopics`;
export const APICALLURL_GETCUSTOMHOTTOPICS = `${API_URL}/getcustomhottopics`;
export const APICALLURL_GETRECENTPOSTS = `${API_URL}/getrecentposts`;
export const APICALLURL_GETFEATUREDBIN = `${API_URL}/getfeaturedbin`;
export const APICALLURL_GETINSETFEATURED = `${API_URL}/getsinglefeaturedinset`;
export const APICALLURL_GETCURRENTMAG = `${API_URL}/getcurrentmag`;
export const APICALLURL_GETHOMEPOLL = `${API_URL}/gethomepoll`;
export const APICALLURL_GETAUTHORPAGE = `${API_URL}/getauthor`;
export const APICALLURL_GETADDITIONALAUTHORPOSTS = `${API_URL}/getauthorposts`;
export const APICALLURL_GETHOMEQUOTE = `${API_URL}/gethomequote`;
export const APICALLURL_GETTILES = `${API_URL}/gettiles`;
export const APICALLURL_GETSPECIALCATRECENTPOSTS = `${API_URL}/getposts`;
export const APICALLURL_CONTINUETOGAMES = `${API_URL}/wp-json/wp/v2/pages&slug=continue-to-games`;
export const APICALLURL_GETFEATUREDGAMES = `${API_URL}/getfeaturedgames`;

export const APICALLURL_GETADMINMENUMARKUP = `${API_URL}/standaloneadminmenu`;
export const APICALLURL_GETPOLLMARKUP = `${API_URL}/jedenpoll`;
export const APICALLURL_HOROSCOPES = `${API_URL}/gethoroscopes`;// this is a constant, but its not the string of an action name, it's the url of an API ...

export const APICALLURL_GETHOMESTART = `${API_URL}/gethomestart`;
export const APICALLURL_GETFEATUREDPOULARTRENDING = `${API_URL}/getfeaturedpopulartrending`;
