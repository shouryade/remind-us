import {useLocation} from 'preact-iso'

export function Header() {
  const {url} = useLocation()
  return (
    <div class="navbar bg-base-100">
      <div class="navbar-start">
        <div class="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <a>Get Started</a>
            </li>
            <li>
              <a>Stuck?</a>
              <ul class="p-2">
                <li>
                  <a>See the How-To</a>
                </li>
                <li>
                  <a href="https://github.com/shouryade/remind-us/issues/new" target="_blank" rel="noopener noreferrer">
                    Raise an issue
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <a href="/" class="btn btn-ghost text-xl text-primary">
          {' '}
          remind-us
        </a>
      </div>
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
          <li>
            <a>Get Started</a>
          </li>
          <li>
            <details>
              <summary>Stuck?</summary>
              <ul class="p-2">
                <li>
                  <a>See the How-To</a>
                </li>
                <li>
                  <a href="https://github.com/shouryade/remind-us/issues/new" target="_blank" rel="noopener noreferrer">
                    Raise an Issue
                  </a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
      <div class="navbar-end">
        <a class="btn" href="https://github.com/shouryade/remind-us" target="_blank" rel="noopener noreferrer">
          <span className="remind-us-gh">⭐ remind-us</span>
          <svg viewBox="0 0 16 16" className="w-5 h-5" fill="currentColor" aria-hidden="true">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
          </svg>
        </a>
      </div>
    </div>
    // <header>
    // 	<nav>
    // 		<a href="/" class={url == '/' && 'active'}>
    // 			Home
    // 		</a>
    // 		<a href="/404" class={url == '/404' && 'active'}>
    // 			404
    // 		</a>
    // 	</nav>
    // </header>
  )
}
