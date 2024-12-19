import { create } from 'zustand'

const UseUserStore = create((set) => ({
  user:{
    id: null,
    email: null,
    name: null
  },
  updateUser: (newUser) => set((state) =>({
    user: {
      id: newUser.id !== undefined ? newUser.id : state.user.id,
      email: newUser.email !== undefined ? newUser.email : state.user.email,
      name: newUser.name !== undefined ? newUser.name : state.user.name
    }
  })),
  resetUser: () => set({
    user:{
      id: null,
      email: null,
      name: null
  }})
}))

export default UseUserStore