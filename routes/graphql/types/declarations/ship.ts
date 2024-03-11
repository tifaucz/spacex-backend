import { gql } from 'graphql-tag';

export const Ship = gql`
  type Mission {
    flight: String
    name: String
  }

  type Ship {
    id: ID!
    name: String
    class: String
    image: String
    active: Boolean!
    abs: Int
    home_port: String
    imo: Int
    mmsi: Int
    model: String
    roles: [String]
    status: String
    type: String
    year_built: Int
    missions: [Mission]
    createdAt: Date!
    updatedAt: Date!
  }

  input ShipsInput {
    pagination: PaginationInput
  }
`;
