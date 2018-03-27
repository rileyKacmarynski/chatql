export const typeDefs = `
  type AuthPayload {
      user {
        id
    }
    token  
  }

  type Query {
    authPayload: AuthPayload
  }
`;