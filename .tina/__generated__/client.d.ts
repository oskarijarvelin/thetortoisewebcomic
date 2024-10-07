import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: '25aaf6f2a42ddc1b3810bb8130333dd8a333c086', queries,  });
export default client;
  