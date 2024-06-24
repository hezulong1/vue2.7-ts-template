interface Config {
  cookieExpires:number;
}

export const CookieConfig: Config = {
  cookieExpires:process.env.NODE_ENV === "development"? 1 : 30
};
