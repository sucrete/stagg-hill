import {auth} from './firebase-config.js'
import {findMember} from './memberRoster.js'
import {
  onAuthStateChanged,
  signOut,
} from 'https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js'

const LOGIN_PAGE = 'member-login.html'

// Resolves once the visitor is confirmed as a signed-in, active member.
// Other pages (e.g. the draft preview pages) can await this before rendering
// anything sensitive, instead of just running the check as a side effect.
export const memberReady = new Promise((resolve) => {
  // Runs on every load of a gated page: not signed in, or no longer an
  // active member (deactivated/deleted since they last signed in) -> boot
  // them back to the login page.
  onAuthStateChanged(auth, async (user) => {
    if (!user || !user.email) {
      window.location.href = LOGIN_PAGE
      return
    }

    try {
      const member = await findMember(user.email)
      if (!member || member.status !== 'active') {
        await signOut(auth)
        window.location.href = LOGIN_PAGE
        return
      }
      resolve(user)
    } catch (error) {
      console.error('Member roster check failed:', error)
      window.location.href = LOGIN_PAGE
    }
  })
})
