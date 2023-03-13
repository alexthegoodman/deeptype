import { gql } from "graphql-request";

export const exportMutation = gql`
  mutation ExportMutation($type: String!, $html: String!) {
    export(type: $type, html: $html)
  }
`;
