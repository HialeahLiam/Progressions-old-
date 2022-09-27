const getBaseUrl = () => {
  let url;
  switch (process.env.NODE_ENV) {
    case 'production':
      url = 'https://34.229.88.194';
      break;
    case 'development':
    default:
      url = 'http://localhost:3001';
  }

  return url;
};

const baseUrl = getBaseUrl();

export default baseUrl;
