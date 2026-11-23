import {auth} from './firebase-config.js'
import {signOut} from 'https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js'

const LOGIN_PAGE = 'member-login.html'

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('member-logout-btn')
  if (!btn) return

  btn.addEventListener('click', () => {
    signOut(auth).then(() => {
      window.location.href = LOGIN_PAGE
    })
  })
})
