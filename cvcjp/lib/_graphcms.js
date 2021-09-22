import { GraphQLClient } from "graphql-request";

const graphcms = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHCMS_URL);

export { graphcms };
