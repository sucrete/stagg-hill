import {auth} from './firebase-config.js'
import {findMember} from './memberRoster.js'
import {
  onAuthStateChanged,
  signOut,
} from 'https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js'

const LOGIN_PAGE = 'member-login.html'

// Runs on every load of the members-only page: not signed in, or no longer
// an active member (deactivated/deleted since they last signed in) -> boot
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
    }
  } catch (error) {
    console.error('Member roster check failed:', error)
    window.location.href = LOGIN_PAGE
  }
})
