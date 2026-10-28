// Shared helper for looking up a record in the Sanity "member" roster.
// Used by both the login page and the members-only page's access gate.
const SANITY_PROJECT_ID = 'orv2fvsx'
const SANITY_DATASET = 'production'
const SANITY_API_VERSION = 'v2025-06-30'

// Uses a $param instead of splicing the email into the query string, since
// email is user-supplied input.
export async function findMember(email) {
  const query = encodeURIComponent(
    '*[_type == "member" && lower(email) == lower($email)][0]{_id, status}',
  )
  const emailParam = encodeURIComponent(JSON.stringify(email))
  const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?query=${query}&$email=${emailParam}&perspective=published`
  return fetchData(url)
}
