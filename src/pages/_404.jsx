export function NotFound() {
  return (
    <section>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 class="text-7xl tracking-tight font-extrabold text-primary">404</h1>
            <p className="py-6">
              <div className="mockup-phone border-error">
                <div className="camera"></div>
                <div className="display">
                  <div className="artboard artboard-demo phone-1 justify-left text-left">
                    <div className="chat chat-start text-sm">
                      <div className="chat-header">
                        Darth Vader
                        <br />
                        <time className="text-xs opacity-50">A long time ago, in a galaxy far, far away...</time>
                      </div>
                      <div className="chat-bubble">I find your lack of navigation disturbing.</div>
                      <div className="chat-footer opacity-50 py-2">Seen</div>
                      <div className="chat-bubble">
                        <span className="text-danger">
                          Return to the{' '}
                          <a href="/" className="text-error underline">
                            dark side
                          </a>{' '}
                          immediately!
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
