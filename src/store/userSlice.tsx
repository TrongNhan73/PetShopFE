import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { User } from '../types'

// Define a type for the slice state


// Define the initial state using that type
const initialState: User = {
  email: null,
  phone: null,
  address: null,
  access_token: null,
  user_name: null,
  role_id: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      Object.assign(state, action.payload)

    }
  },
})

export const { setUser } = userSlice.actions


export default userSlice.reducer