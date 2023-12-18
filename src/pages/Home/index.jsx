export function Home() {
  return (
    <div
      className="hero min-h-screen"
      style={{backgroundImage: 'url(https://tailwindcss.com/_next/static/media/hero-dark@90.dba36cdf.jpg)'}}
    >
      <div class="hero-overlay bg-opacity-60"></div>
      <div class="hero-content text-center text-neutral-content">
        <div class="max-w-2xl">
          <h1 class="text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center dark:text-white">
            Never miss a birthday again.
          </h1>

          <p className="mt-6 text-lg text-slate-600 text-center max-w-3xl mx-auto dark:text-slate-400">
            <code className="font-mono font-medium text-sky-500 dark:text-primary">remind-us</code> helps you keep{' '}
            <code className="font-mono font-medium text-sky-500 dark:text-primary">track</code> of your friends'
            birthdays and sends you <code className="font-mono font-medium text-sky-500 dark:text-primary">timely</code>{' '}
            reminders. 🎂🎈
          </p>
          <div className="mt-6 sm:mt-10 flex justify-center space-x-6 text-sm">
            <a
              href="/dashboard"
              className="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-primary"
            >
              Get started
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
