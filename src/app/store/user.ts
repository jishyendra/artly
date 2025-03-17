import { persistentMap } from "@nanostores/persistent";

type User = {
  username: string;
  email: string;
  id: string;
  token?: string;
};
export const user = persistentMap<User>("user", {
  username: "",
  email: "",
  id: "",
  token: "",
});

export const setUser = (newUser: User) => {
  user.set(newUser);
};
