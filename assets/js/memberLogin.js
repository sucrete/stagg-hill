import {auth} from './firebase-config.js'
import {findMember} from './memberRoster.js'
import {
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  updatePassword,
  onAuthStateChanged,
  signOut,
} from 'https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js'

const MEMBERS_PAGE = 'members.html'
const STORAGE_KEY = 'emailForSignIn'

const LINK_COPY = {
  'first-time': {
    subtitle: "Enter your email and we'll send you a link to log in and set a password.",
    buttonText: 'Email me a login link',
    successText: 'Check your email for a login link. Don’t see it? Check your spam folder.',
  },
  forgot: {
    subtitle: "Enter your email and we'll send you a link to reset your password.",
    buttonText: 'Email me a reset link',
    successText: 'Check your email for a reset link. Don’t see it? Check your spam folder.',
  },
}

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

  const choiceView = document.getElementById('choice-view')
  const choiceFirstTime = document.getElementById('choice-first-time')
  const choiceForgotPassword = document.getElementById('choice-forgot-password')
  const showPasswordLoginFromChoice = document.getElementById(
    'show-password-login-from-choice',
  )

  const linkForm = document.getElementById('member-login-form')
  const linkEmailInput = document.getElementById('member-login-email')
  const linkSubmit = document.getElementById('member-login-submit')
  const linkSubmitText = linkSubmit.querySelector('.button-text')
  const backToPasswordLogin = document.getElementById('back-to-password-login')

  const alreadyRegisteredView = document.getElementById('already-registered-view')
  const alreadyRegisteredReset = document.getElementById('already-registered-reset')
  const alreadyRegisteredBack = document.getElementById('already-registered-back')

  const setPasswordForm = document.getElementById('set-password-form')
  const newPasswordInput = document.getElementById('new-password')
  const confirmPasswordInput = document.getElementById('confirm-password')
  const setPasswordSubmit = document.getElementById('set-password-submit')

  const showRequestLink = document.getElementById('show-request-link')
  const showPasswordLogin = document.getElementById('show-password-login')

  const messageEl = document.getElementById('member-login-message')
  const titleEl = document.getElementById('member-login-title')
  const subtitleEl = document.getElementById('member-login-subtitle')

  let lastRequestedEmail = ''

  // Toggles between the views this page can show: the default password
  // login, the first-time/forgot-password choice, the "email me a link"
  // request form, the "already registered" notice, and the "set a password"
  // step shown after confirming identity via the emailed link.
  function showView(view) {
    passwordForm.hidden = view !== 'password'
    requestLinkToggle.hidden = view !== 'password'
    choiceView.hidden = view !== 'choice'
    linkForm.hidden = view !== 'link'
    backToPasswordLogin.hidden = view !== 'link'
    alreadyRegisteredView.hidden = view !== 'already-registered'
    setPasswordForm.hidden = view !== 'set-password'
    messageEl.hidden = true
  }

  function showLinkView(intent) {
    linkForm.dataset.intent = intent
    const copy = LINK_COPY[intent]
    titleEl.textContent = 'Member Login'
    subtitleEl.textContent = copy.subtitle
    linkSubmitText.textContent = copy.buttonText
    showView('link')
  }

  showRequestLink.addEventListener('click', (event) => {
    event.preventDefault()
    showView('choice')
  })
  showPasswordLoginFromChoice.addEventListener('click', (event) => {
    event.preventDefault()
    showView('password')
  })
  showPasswordLogin.addEventListener('click', (event) => {
    event.preventDefault()
    showView('password')
  })
  choiceFirstTime.addEventListener('click', () => showLinkView('first-time'))
  choiceForgotPassword.addEventListener('click', () => showLinkView('forgot'))
  alreadyRegisteredBack.addEventListener('click', () => showView('password'))

  async function completeSignIn(email) {
    // Read before the URL gets cleaned below. Carried on the link itself
    // (not localStorage) so it survives being opened on a different device
    // than it was requested from, and so an older link always reflects the
    // intent it was actually sent for, even if a newer one was requested since.
    const intent = new URLSearchParams(window.location.search).get('intent') || 'first-time'

    try {
      await signInWithEmailLink(auth, email, window.location.href)
      window.localStorage.removeItem(STORAGE_KEY)
      // Drop the single-use sign-in params from the URL so a refresh here
      // doesn't try (and fail) to reuse the same link.
      window.history.replaceState({}, document.title, window.location.pathname)

      titleEl.textContent = intent === 'forgot' ? 'Reset your password' : 'Set a password'
      subtitleEl.textContent =
        intent === 'forgot'
          ? 'Choose a new password for your account.'
          : 'Choose a password so you can log in directly next time.'
      showView('set-password')
    } catch (error) {
      console.error('Member sign-in link error:', error)
      showLinkView('forgot')
      showMessage(
        messageEl,
        'That link is invalid or has expired. Please request a new one below.',
        true,
      )
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
      linkSubmitText.textContent = 'Confirm and sign in'
      titleEl.textContent = 'Member Login'
      subtitleEl.textContent = ''
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
        if (!member || member.status !== 'active') {
          await signOut(auth)
          return
        }

        // Signed in (e.g. from a prior session that was never finished) but
        // never actually set a password — send them to that step rather than
        // letting an existing session skip past it permanently.
        const hasPassword = user.providerData.some((p) => p.providerId === 'password')
        if (!hasPassword) {
          titleEl.textContent = 'Set a password'
          subtitleEl.textContent =
            'Choose a password so you can log in directly next time.'
          showView('set-password')
          return
        }

        window.location.href = MEMBERS_PAGE
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

  // Sends the one-time email link for the given intent ('first-time' or
  // 'forgot'), after confirming the email is an active member.
  async function requestLink(email, intent) {
    const member = await findMember(email)
    if (!member || member.status !== 'active') {
      showMessage(
        messageEl,
        "We couldn't find an active membership for that email.",
        true,
      )
      return
    }

    // Best-effort only: some Firebase projects have email-enumeration
    // protection enabled, which makes this always return an empty list
    // regardless of whether the account exists. When that's the case this
    // check silently no-ops and we just send the link either way.
    if (intent === 'first-time') {
      const methods = await fetchSignInMethodsForEmail(auth, email).catch(() => [])
      if (methods.includes('password')) {
        lastRequestedEmail = email
        showView('already-registered')
        return
      }
    }

    window.localStorage.setItem(STORAGE_KEY, email)

    const continueUrl = new URL(window.location.href)
    continueUrl.searchParams.set('intent', intent)
    await sendSignInLinkToEmail(auth, email, {
      url: continueUrl.toString(),
      handleCodeInApp: true,
    })
    showMessage(messageEl, LINK_COPY[intent].successText, false)
  }

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
      await requestLink(email, linkForm.dataset.intent || 'first-time')
    } catch (error) {
      console.error('Member login error:', error)
      showMessage(messageEl, 'Something went wrong. Please try again.', true)
    } finally {
      linkSubmit.disabled = false
    }
  })

  // "Reset your password" from the already-registered notice — reuses the
  // email they already typed instead of making them re-enter it.
  alreadyRegisteredReset.addEventListener('click', async () => {
    alreadyRegisteredReset.disabled = true
    try {
      showLinkView('forgot')
      await requestLink(lastRequestedEmail, 'forgot')
    } catch (error) {
      console.error('Member login error:', error)
      showMessage(messageEl, 'Something went wrong. Please try again.', true)
    } finally {
      alreadyRegisteredReset.disabled = false
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
