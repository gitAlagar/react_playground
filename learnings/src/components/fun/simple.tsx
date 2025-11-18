import { useState, type ChangeEvent, type FormEvent } from 'react';

// SimpleContactForm.tsx
// TypeScript version of the form component.
// Uses Tailwind for styling. Replace className values if you’re not using Tailwind.

type FormData = {
  name: string;
  email: string;
  role: string;
  message: string;
  subscribe: boolean;
};

type Result =
  | { success: true; payload: FormData }
  | { success: false; error: string }
  | null;

export default function SimpleContactForm() {
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    role: 'user',
    message: '',
    subscribe: false,
  });

  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<Result>(null);

  // basic validators
  const validators: Record<string, (v: string) => true | string> = {
    name: (v) => v.trim().length >= 2 || 'Name must be at least 2 characters',
    email: (v) => /^(?:[\w.%+-]+)@(?:[\w-]+\.)+[a-zA-Z]{2,}$/.test(v) || 'Enter a valid email',
    message: (v) => v.trim().length >= 10 || 'Message must be at least 10 characters',
  };

  const errors: Partial<Record<keyof FormData, string>> = Object.keys(validators).reduce(
    (acc, key) => {
      const res = validators[key](form[key as keyof FormData] as string);
      if (res !== true) acc[key as keyof FormData] = res;
      return acc;
    },
    {} as Partial<Record<keyof FormData, string>>
  );

  const isValid = Object.keys(errors).length === 0;

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    setForm((s) => ({
      ...s,
      [name]: type === 'checkbox'
        ? (e.target as HTMLInputElement).checked
        : value
    }));
  }

  function handleBlur(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });

    if (!isValid) return;

    setSubmitting(true);
    setResult(null);

    try {
      // Simulate an API call. Replace with real fetch/axios call.
      await new Promise((r) => setTimeout(r, 900));
      setResult({ success: true, payload: form });
      // reset form if you want
      setForm({ name: '', email: '', role: 'user', message: '', subscribe: false });
      setTouched({});
    } catch (err) {
      setResult({ success: false, error: 'Something went wrong. Try again.' });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white/80 dark:bg-gray-900/70 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Contact us</h2>

      <form onSubmit={handleSubmit} noValidate>
        <label className="block mb-3">
          <span className="text-sm font-medium">Full name</span>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Your full name"
            className="mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-offset-1"
          />
          {touched.name && errors.name && (
            <p className="text-xs text-red-600 mt-1">{errors.name}</p>
          )}
        </label>

        <label className="block mb-3">
          <span className="text-sm font-medium">Email</span>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="name@example.com"
            type="email"
            className="mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-offset-1"
          />
          {touched.email && errors.email && (
            <p className="text-xs text-red-600 mt-1">{errors.email}</p>
          )}
        </label>

        <label className="block mb-3">
          <span className="text-sm font-medium">Role</span>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border px-3 py-2"
          >
            <option value="user">User</option>
            <option value="developer">Developer</option>
            <option value="designer">Designer</option>
            <option value="other">Other</option>
          </select>
        </label>

        <label className="block mb-3">
          <span className="text-sm font-medium">Message</span>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="How can we help?"
            rows={5}
            className="mt-1 block w-full rounded-md border px-3 py-2"
          />
          {touched.message && errors.message && (
            <p className="text-xs text-red-600 mt-1">{errors.message}</p>
          )}
        </label>

        <label className="inline-flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            name="subscribe"
            checked={form.subscribe}
            onChange={handleChange}
            className="rounded border p-2"
          />
          <span className="text-sm">Subscribe to our newsletter</span>
        </label>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={!isValid || submitting}
            className={`px-4 py-2 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {submitting ? 'Sending…' : 'Send message'}
          </button>

          <button
            type="button"
            onClick={() => {
              setForm({ name: '', email: '', role: 'user', message: '', subscribe: false });
              setTouched({});
              setResult(null);
            }}
            className="px-3 py-2 rounded-lg border"
          >
            Reset
          </button>
        </div>
      </form>

      {result && (
        <div
          className={`mt-4 p-3 rounded-md ${result.success ? 'bg-green-50' : 'bg-red-50'}`}
        >
          {result.success ? (
            <>
              <strong className="block">Submitted successfully</strong>
              <pre className="mt-2 text-xs overflow-auto">{JSON.stringify(result.payload, null, 2)}</pre>
            </>
          ) : (
            <p>{result.error}</p>
          )}
        </div>
      )}

      <p className="mt-4 text-xs text-gray-500">This is a client-side example. Hook up your API in handleSubmit.</p>
    </div>
  );
}
