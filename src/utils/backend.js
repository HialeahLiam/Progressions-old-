const getBaseUrl = () => {
  let url;
  switch (process.env.NODE_ENV) {
    case 'production':
      url = 'https://184.72.155.177';
      break;
    case 'development':
    default:
      url = 'http://localhost:3001';
  }

  return url;
};

const baseUrl = getBaseUrl();

export default baseUrl;
