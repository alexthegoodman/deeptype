export const env = process.env.NEXT_PUBLIC_APP_ENV;

export const protocol = env === "production" ? "https://" : "http://";

export const cookieDomain =
  env === "production" ? "deeptype.app" : "localhost";

export const fullDomain =
  env === "production" ? "deeptype.app" : process.env.NEXT_PUBLIC_HOST;

export const fullDomainPort =
  env === "production"
    ? "deeptype.app"
    : process.env.NEXT_PUBLIC_HOST + ":3000";

export const graphqlUrl =
  env === "production"
    ? "https://commontext-api.herokuapp.com/graphql"
    : `https://localhost:4000/graphql`;

export const searchUrl =
    env === "production"
      ? "https://rapid-search.herokuapp.com/graphql"
      : `http://localhost:4001/graphql`;
