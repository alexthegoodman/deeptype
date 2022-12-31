export const env = process.env.NEXT_PUBLIC_APP_ENV;

export const protocol = env === "production" ? "https://" : "http://";

export const cookieDomain =
  env === "production" ? "commontext.app" : "localhost";

export const fullDomain =
  env === "production" ? "commontext.app" : process.env.NEXT_PUBLIC_HOST;

export const fullDomainPort =
  env === "production"
    ? "commontext.app"
    : process.env.NEXT_PUBLIC_HOST + ":3000";

export const graphqlUrl =
  env === "production"
    ? "https://commonplace.social:4000/graphql"
    : `http://${process.env.NEXT_PUBLIC_HOST}:4000/graphql`;
