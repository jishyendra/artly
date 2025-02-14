import { createClient } from "better-auth";

const authClient = createClient({});


const { data, error } = await authClient.signUp.email({
  email: "test@example.com",
  password: "password1234",
  name: "test",
  image: "https://example.com/image.png",
});
