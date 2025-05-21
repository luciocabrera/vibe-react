/**
 * Retrieves the user's preferred language from the browser.
 * If the browser supports multiple languages, it returns the first language in the list.
 * If the browser doesn't support multiple languages, it returns the default language 'en'.
 *
 * @returns The user's preferred language.
 */
export const getLanguage = () =>
  (navigator.languages.length && navigator.languages[0]) ||
  navigator.language ||
  'en';
