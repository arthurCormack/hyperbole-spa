/*
 *
 * HoroscopesPage constants
 *
 */

export const DEFAULT_ACTION = 'app/HoroscopesPage/DEFAULT_ACTION';

export const TRIGGER_LOAD_HOROSCOPES = 'app/HoroscopesPage/TRIGGER_LOAD_HOROSCOPES';
export const LOAD_HOROSCOPES = 'app/HoroscopesPage/LOAD_HOROSCOPES';// is this the trigger, or the thing that we call right before? does the saga need to do it,
// or can it be called from the componentDidMount; is it redundant / unnessecary for both the compoonentDidMount to dispatch a trigger,
// and for the saga to also dispatch an action that is really nothing more than an announcement that the call is taking place immediedately afterwards?
// maybe it does make sense to have both? it might be more versatile?
export const LOAD_HOROSCOPES_SUCCESS = 'app/HoroscopesPage/LOAD_HOROSCOPES_SUCCESS';
export const LOAD_HOROSCOPES_FAILURE = 'app/HoroscopesPage/LOAD_HOROSCOPES_FAILURE';
export const ZERO_HOROSCOPES = 'app/HoroscopesPage/ZERO_HOROSCOPES';
