'use client'

import { useState, type CSSProperties, type FormEvent } from 'react'
import type { Dictionary } from '@/i18n/get-dictionary'
import type { Locale } from '@/i18n/config'
import { DEMO_REQUEST_URL } from '@/lib/site'

// "Request a free demo". Posts to the ERP's public endpoint — the website
// stores nothing itself. See DEMO_REQUEST_URL in lib/site.ts.
//
// Validation is repeated here only to save a round trip; the ERP validates
// again and is the rule. The messages shown are this site's own, in the
// visitor's language, keyed by the field the server names.

type Props = {
  locale: Locale
  dict: Dictionary['demo']
}

type Field = 'companyName' | 'whatsapp' | 'email'
type Status = 'idle' | 'sending' | 'sent'

const PHONE = /^\+?[0-9\s()-]{7,20}$/
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export default function DemoForm({ locale, dict }: Props) {
  const [status, setStatus] = useState<Status>('idle')
  const [invalid, setInvalid] = useState<Partial<Record<Field, boolean>>>({})
  const [notice, setNotice] = useState('')

  const check = (data: Record<string, string>) => {
    const next: Partial<Record<Field, boolean>> = {}
    if (!data.companyName.trim()) next.companyName = true
    if (!PHONE.test(data.whatsapp.trim())) next.whatsapp = true
    if (!EMAIL.test(data.email.trim())) next.email = true
    return next
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'sending') return
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>

    const problems = check(data)
    setInvalid(problems)
    setNotice('')
    if (Object.keys(problems).length) {
      const first = Object.keys(problems)[0]
      ;(form.elements.namedItem(first) as HTMLElement | null)?.focus()
      return
    }

    setStatus('sending')
    try {
      const response = await fetch(DEMO_REQUEST_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, language: locale })
      })
      if (response.ok) {
        setStatus('sent')
        form.reset()
        return
      }
      setStatus('idle')
      if (response.status === 429) return setNotice(dict.errors.rateLimited)
      const body = await response.json().catch(() => null)
      const fields = (body?.errors || []).map((error: { field?: string }) => error.field)
      const named: Partial<Record<Field, boolean>> = {}
      for (const field of ['companyName', 'whatsapp', 'email'] as Field[]) if (fields.includes(field)) named[field] = true
      if (Object.keys(named).length) setInvalid(named)
      else setNotice(dict.errors.network)
    } catch {
      setStatus('idle')
      setNotice(dict.errors.network)
    }
  }

  if (status === 'sent') {
    return (
      <div className="flex flex-col items-center px-2 py-8 text-center" role="status" aria-live="polite">
        <span className="pop-in relative flex h-20 w-20 items-center justify-center rounded-full bg-ok-wash">
          <span aria-hidden="true" className="marker-halo absolute inset-0 rounded-full bg-ok/20" />
          <svg viewBox="0 0 24 24" className="relative h-10 w-10 text-ok" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path className="draw-check" d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </span>
        <h3 className="rise mt-6 text-2xl font-extrabold text-text-1 rtl:font-bold" style={{ fontFamily: 'var(--font-display)', '--delay': '150ms' } as CSSProperties}>
          {dict.thanks.title}
        </h3>
        <p className="rise mt-3 max-w-sm leading-relaxed text-text-2 rtl:leading-[2.1]" style={{ '--delay': '250ms' } as CSSProperties}>
          {dict.thanks.body}
        </p>
        <button type="button" onClick={() => setStatus('idle')} className="rise mt-6 text-sm font-semibold text-accent-deep hover:text-text-1" style={{ '--delay': '350ms' } as CSSProperties}>
          {dict.thanks.again}
        </button>
      </div>
    )
  }

  const label = (text: string, optional = false) => (
    <span className="mb-1.5 block text-sm font-semibold text-text-2">
      {text}
      {optional ? <span className="ms-1.5 text-xs font-normal text-text-3">({dict.form.optional})</span> : <span className="ms-0.5 text-accent-deep">*</span>}
    </span>
  )
  const error = (field: Field) =>
    invalid[field] ? (
      <span id={`${field}-error`} className="mt-1.5 block text-xs text-bad rtl:text-sm">
        {dict.errors[field]}
      </span>
    ) : null

  return (
    <form noValidate onSubmit={onSubmit} className="relative grid gap-4 sm:grid-cols-2" aria-busy={status === 'sending'}>
      <label className="sm:col-span-2">
        {label(dict.form.companyName)}
        <input name="companyName" autoComplete="organization" maxLength={150} className="field" placeholder={dict.form.companyPlaceholder}
          aria-invalid={!!invalid.companyName} aria-describedby={invalid.companyName ? 'companyName-error' : undefined} />
        {error('companyName')}
      </label>

      <label>
        {label(dict.form.contactName, true)}
        <input name="contactName" autoComplete="name" maxLength={120} className="field" placeholder={dict.form.contactPlaceholder} />
      </label>

      <label>
        {label(dict.form.whatsapp)}
        <input name="whatsapp" type="tel" inputMode="tel" autoComplete="tel" maxLength={20} dir="ltr" className="field rtl:text-right" placeholder={dict.form.whatsappPlaceholder}
          aria-invalid={!!invalid.whatsapp} aria-describedby={invalid.whatsapp ? 'whatsapp-error' : undefined} />
        {error('whatsapp')}
      </label>

      <label className="sm:col-span-2">
        {label(dict.form.email)}
        <input name="email" type="email" inputMode="email" autoComplete="email" maxLength={191} dir="ltr" className="field rtl:text-right" placeholder={dict.form.emailPlaceholder}
          aria-invalid={!!invalid.email} aria-describedby={invalid.email ? 'email-error' : undefined} />
        {error('email')}
      </label>

      <label className="sm:col-span-2">
        {label(dict.form.message, true)}
        <textarea name="message" rows={3} maxLength={2000} className="field resize-y" placeholder={dict.form.messagePlaceholder} />
      </label>

      {/* A field people never see and bots fill in. */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="pointer-events-none absolute start-0 top-0 h-px w-px overflow-hidden opacity-0 [clip-path:inset(50%)]" />

      {notice && (
        <p role="alert" className="rounded-xl bg-[#fdecea] px-4 py-3 text-sm text-bad sm:col-span-2">
          {notice}
        </p>
      )}

      <div className="flex flex-col gap-3 sm:col-span-2">
        <button type="submit" disabled={status === 'sending'} className="btn btn-accent w-full whitespace-nowrap disabled:cursor-wait disabled:opacity-70 sm:w-auto sm:self-start">
          {status === 'sending' ? (
            <>
              <span aria-hidden="true" className="h-4 w-4 animate-spin rounded-full border-2 border-accent-ink/30 border-t-accent-ink" />
              {dict.form.sending}
            </>
          ) : (
            <>
              {dict.form.submit}
              <span aria-hidden="true" className="rtl:rotate-180">→</span>
            </>
          )}
        </button>
        <p className="text-xs text-text-3 rtl:text-sm">{dict.form.privacy}</p>
      </div>
    </form>
  )
}
