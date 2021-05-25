const getRoute = (route: string): string => {
  if (!route) {
    throw new Error(`Route path is required.`);
  }

  return !route.startsWith('/') ? route : route.substr(1);
};

export default getRoute;
