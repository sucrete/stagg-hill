import {auth} from './firebase-config.js'
import {findMember} from './memberRoster.js'
import {
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  signInWithEmailAndPassword,
  updatePassword,
  onAuthStateChanged,
  signOut,
} from 'https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js'

const MEMBERS_PAGE = 'members.html'
const STORAGE_KEY = 'emailForSignIn'

function showMessage(el, text, isError) {
  el.textContent = text
  el.classList.toggle('is-error', Boolean(isError))
  el.hidden = false
}

document.addEventListener('DOMContentLoaded', () => {
  const passwordForm = document.getElementById('password-login-form')
  const loginEmailInput = document.getElementById('login-email')
  const loginPasswordInput = document.getElementById('login-password')
  const passwordSubmit = document.getElementById('password-login-submit')
  const requestLinkToggle = document.getElementById('request-link-toggle')

  const linkForm = document.getElementById('member-login-form')
  const linkEmailInput = document.getElementById('member-login-email')
  const linkSubmit = document.getElementById('member-login-submit')
  const backToPasswordLogin = document.getElementById('back-to-password-login')

  const setPasswordForm = document.getElementById('set-password-form')
  const newPasswordInput = document.getElementById('new-password')
  const confirmPasswordInput = document.getElementById('confirm-password')
  const setPasswordSubmit = document.getElementById('set-password-submit')

  const showRequestLink = document.getElementById('show-request-link')
  const showPasswordLogin = document.getElementById('show-password-login')

  const messageEl = document.getElementById('member-login-message')
  const titleEl = document.getElementById('member-login-title')
  const subtitleEl = document.getElementById('member-login-subtitle')

  // Toggles between the three views this page can show: the default
  // password login, the "email me a link" request form (first-time setup
  // or forgotten password), and the "set a password" step shown after
  // confirming identity via that emailed link.
  function showView(view) {
    passwordForm.hidden = view !== 'password'
    requestLinkToggle.hidden = view !== 'password'
    linkForm.hidden = view !== 'link'
    backToPasswordLogin.hidden = view !== 'link'
    setPasswordForm.hidden = view !== 'set-password'
  }

  showRequestLink.addEventListener('click', (event) => {
    event.preventDefault()
    showView('link')
  })
  showPasswordLogin.addEventListener('click', (event) => {
    event.preventDefault()
    showView('password')
  })

  async function completeSignIn(email) {
    try {
      await signInWithEmailLink(auth, email, window.location.href)
      window.localStorage.removeItem(STORAGE_KEY)
      // Drop the single-use sign-in params from the URL so a refresh here
      // doesn't try (and fail) to reuse the same link.
      window.history.replaceState({}, document.title, window.location.pathname)

      titleEl.textContent = 'Set a password'
      subtitleEl.textContent =
        'Choose a password so you can log in directly next time.'
      showView('set-password')
    } catch (error) {
      console.error('Member sign-in link error:', error)
      showMessage(
        messageEl,
        'That link is invalid or has expired. Please request a new one below.',
        true,
      )
      showView('link')
    }
  }

  // Returning from the emailed link: complete sign-in, then prompt to set a
  // password. This same link doubles as the "forgot password" recovery path.
  if (isSignInWithEmailLink(auth, window.location.href)) {
    const storedEmail = window.localStorage.getItem(STORAGE_KEY)
    if (storedEmail) {
      completeSignIn(storedEmail)
    } else {
      // Link was opened on a different device/browser than it was requested
      // from — ask the member to confirm their email before finishing sign-in.
      linkForm.dataset.mode = 'confirm'
      linkSubmit.querySelector('.button-text').textContent = 'Confirm and sign in'
      showView('link')
      showMessage(messageEl, 'Confirm your email to finish signing in.', false)
    }
  } else {
    // Not returning from a link — if this browser already has a valid,
    // still-active session, skip straight to the members area.
    onAuthStateChanged(auth, async (user) => {
      if (!user || !user.email) return

      try {
        const member = await findMember(user.email)
        if (member && member.status === 'active') {
          window.location.href = MEMBERS_PAGE
        } else {
          await signOut(auth)
        }
      } catch (error) {
        console.error('Existing session check failed:', error)
      }
    })
  }

  // Traditional email + password login.
  passwordForm.addEventListener('submit', async (event) => {
    event.preventDefault()
    const email = loginEmailInput.value.trim()
    const password = loginPasswordInput.value
    if (!email || !password) return

    passwordSubmit.disabled = true
    try {
      await signInWithEmailAndPassword(auth, email, password)
      window.location.href = MEMBERS_PAGE
    } catch (error) {
      console.error('Password login error:', error)
      showMessage(messageEl, 'Incorrect email or password.', true)
    } finally {
      passwordSubmit.disabled = false
    }
  })

  // Request a one-time email link — used for first-time password setup and
  // for resetting a forgotten password.
  linkForm.addEventListener('submit', async (event) => {
    event.preventDefault()
    const email = linkEmailInput.value.trim()
    if (!email) return

    linkSubmit.disabled = true

    if (linkForm.dataset.mode === 'confirm') {
      await completeSignIn(email)
      linkSubmit.disabled = false
      return
    }

    try {
      const member = await findMember(email)
      if (!member || member.status !== 'active') {
        showMessage(
          messageEl,
          "We couldn't find an active membership for that email.",
          true,
        )
        return
      }

      window.localStorage.setItem(STORAGE_KEY, email)
      await sendSignInLinkToEmail(auth, email, {
        url: window.location.href,
        handleCodeInApp: true,
      })
      showMessage(messageEl, 'Check your email for a login link.', false)
    } catch (error) {
      console.error('Member login error:', error)
      showMessage(messageEl, 'Something went wrong. Please try again.', true)
    } finally {
      linkSubmit.disabled = false
    }
  })

  // Setting/resetting a password once identity's been confirmed via the link.
  setPasswordForm.addEventListener('submit', async (event) => {
    event.preventDefault()
    const password = newPasswordInput.value
    const confirmation = confirmPasswordInput.value

    if (password.length < 8) {
      showMessage(messageEl, 'Password must be at least 8 characters.', true)
      return
    }
    if (password !== confirmation) {
      showMessage(messageEl, 'Passwords do not match.', true)
      return
    }

    setPasswordSubmit.disabled = true
    try {
      await updatePassword(auth.currentUser, password)
      window.location.href = MEMBERS_PAGE
    } catch (error) {
      console.error('Set password error:', error)
      showMessage(
        messageEl,
        'Something went wrong setting your password. Please try again.',
        true,
      )
    } finally {
      setPasswordSubmit.disabled = false
    }
  })
})
