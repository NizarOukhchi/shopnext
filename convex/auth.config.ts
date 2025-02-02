const authConfig = {
  providers: [
    {
      domain: process.env.CLERK_CONVEX_ISSUER,
      applicationID: "convex",
    },
  ],
};

export default authConfig;
