# Project credentials & links

- **Contact / Git:** set in `.env.local` and `git config` (see below)
- **GitHub:** https://github.com/your-username/franlouco-website
- **Vercel:** https://vercel.com/your-team/franlouco-website

## Contact form (Resend)

Emails from the contact form are sent to the address in `CONTACT_EMAIL` (see `.env.local`) via Resend.

1. Sign up at [resend.com](https://resend.com) and create an API key at [resend.com/api-keys](https://resend.com/api-keys).
2. In the project root, create `.env.local` (copy from `.env.example`):
   ```bash
   RESEND_API_KEY=re_your_key_here
   CONTACT_EMAIL=your-email@example.com
   ```
3. Restart the dev server. Submissions from the contact modal will POST to `/api/contact` and send email via Resend.
4. On Vercel (or other host), add `RESEND_API_KEY` (and optionally `CONTACT_EMAIL`) in the project environment variables.

## Git setup (run locally)

To point this repo at the correct remote and identity:

```bash
git remote set-url origin https://github.com/your-username/franlouco-website.git
git config user.email "your-email@example.com"
```
