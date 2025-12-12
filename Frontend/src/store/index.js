import { createStore } from 'vuex'


import meImg from '@/assets/me.png'
import tartuImg from '@/assets/tartu.jpg' 
import codeImg from '@/assets/code.png'

export default createStore({
  state: {
    posts: [
      { id: 1, author: 'Alice', date: 'Oct 23, 2025', text: 'My Endpoint: https://api.npoint.io/90b72b9763737cea7f4b', profile_image: meImg, likes: 0 },
      { id: 2, author: 'Bob', date: 'Oct 22, 2025', text: 'Tartu 2022', image_data: tartuImg, profile_image: meImg, likes: 0 },
      { id: 3, author: 'Charlie', date: 'Oct 21, 2025', text: 'Edit me: https://www.npoint.io/docs/90b72b9763737cea7f4b', profile_image: meImg, likes: 0 },
      { id: 4, author: 'Dana', date: 'Oct 20, 2025', text: 'Finally the weekend! Time to relax.', profile_image: meImg, likes: 0 },
      { id: 5, author: 'Eve', date: 'Oct 19, 2025', text: 'Created a new playlist on Spotify.', profile_image: meImg, likes: 0 },
      { id: 6, author: 'Frank', date: 'Oct 18, 2025', text: 'Great workout at the gym today.', profile_image: meImg, likes: 0 },
      { id: 7, author: 'Grace', date: 'Oct 17, 2025', text: 'Tried my favorite recipe, turned out amazing!', profile_image: meImg, likes: 0 },
      { id: 8, author: 'Hank', date: 'Oct 16, 2025', text: 'Need urgent help with this code!!!!', image_data: codeImg, profile_image: meImg, likes: 0 },
      { id: 9, author: 'Ivy', date: 'Oct 15, 2025', text: 'A short walk always feels good.', profile_image: meImg, likes: 0 },
      { id: 10, author: 'Jack', date: 'Oct 14, 2025', text: 'Eurodance auf 2', profile_image: meImg, likes: 0 }
    ]
  },
  getters: {
    posts(state) { return state.posts },
    postById: (state) => (id) => state.posts.find(p => p.id === id)
  },
  mutations: {
    incrementLike(state, id) {
      const p = state.posts.find(x => x.id === id)
      if (p) p.likes++
    },
    resetLikes(state) {
      state.posts.forEach(p => { p.likes = 0 })
    }
  },
  actions: {},
  modules: {}
})
