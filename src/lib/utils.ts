export const jwt = {
  decode: (token: string | undefined) => {
    if (!token) return;

    return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
  },
};
