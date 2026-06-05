import { createAuthClient } from "better-auth/client"
import {BACKEND_URL} from "root/shared/constants/common.constants.js";

export const auth = createAuthClient({
  baseURL: BACKEND_URL
})

