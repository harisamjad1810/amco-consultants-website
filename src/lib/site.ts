// Addresses the site links to. One place, so a domain change is one edit.

export const SITE_URL = 'https://amcoconsultants.tech'
export const ERP_URL = 'https://amcoerp.com'
export const ERP_LOGIN_URL = `${ERP_URL}/login`

/**
 * Where the "Request a free demo" form posts.
 *
 * The website never touches a database. The ERP owns the `demo_requests`
 * table and exposes ONE public, write-only endpoint for it; the Super Admin
 * reads the requests on ERP › Super Admin › Demo Requests.
 *
 * Fixed at build time. For a local test against the dev API:
 *   NEXT_PUBLIC_DEMO_REQUEST_URL=http://localhost:4000/api/public/demo-request npm run preview
 */
export const DEMO_REQUEST_URL =
  process.env.NEXT_PUBLIC_DEMO_REQUEST_URL || `${ERP_URL}/api/public/demo-request`
