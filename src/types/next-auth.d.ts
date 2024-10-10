declare module 'next-auth' {
  interface Session {
    user: {
      /** The user's ID **/
      id: string;
      /** The user's name **/
      name: string;
      /** The user's email **/
      email: string;
      /** The user's profile picture **/
      image: string;
    };
  }
}
