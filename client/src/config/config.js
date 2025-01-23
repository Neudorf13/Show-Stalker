//config.js allows you to switch from development to production mode
//this inturn changes the API endpoints across the project

export const getBaseURL = () => {

  const isProduction = false;

  return isProduction
    ? 'https://your-production-url.com'
    : 'http://localhost:8080';
};
