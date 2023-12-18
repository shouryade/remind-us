// HelloWorld.jsx
import {h, Component} from 'preact'
import axios from 'axios'

class HelloWorld extends Component {
  constructor() {
    super()
    this.state = {
      height: null,
      width: null,
      url: null,
      token: null,
      owner: 'Guest',
      events: [],
      time: null,
    }
  }

  sortEvents() {
    let calEvents = []
    this.state.events.map(event => {
      let ev
      if (event.conferenceData) {
        ev = {
          meeting: {
            type: event.conferenceData.conferenceSolution.name,
            link: event.conferenceData.entryPoints[0].uri,
          },
          ...event,
        }
      } else if (event.location !== undefined) {
        if (event.location.includes('zoom')) {
          ev = {
            meeting: {
              type: 'Zoom Meeting',
              link: event.location,
            },
            ...event,
          }
        }
      } else {
        ev = {
          meeting: {
            type: undefined,
            link: undefined,
          },
          ...event,
        }
      }
      calEvents.push(ev)
    })
    return calEvents
  }

  eventTime(time) {
    return new Date(time).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  tick() {
    this.setState({
      time: new Date().toLocaleTimeString(),
    })
  }

  authenticate() {
    window.location.href = this.state.url
  }

  geturlparams(name) {
    const match = RegExp(`[?&]${name}=([^&]*)`).exec(window.location.search)
    return match && decodeURIComponent(match[1].replace(/\+/g, ''))
  }

  getCalendarEvents() {
    const start = new Date()
    start.setHours(0, 0, 0, 0)
    const end = new Date()
    end.setHours(23, 59, 59, 999)

    axios
      .get(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events?singleEvents=true&timeMax=${end.toISOString()}&timeMin=${start.toISOString()}&orderBy=startTime`,
        {
          headers: {
            Authorization: `Bearer ${this.state.token}`,
          },
        },
      )
      .then(res => {
        const calEvents = res.data.items
        const owner = res.data.summary.split('@')[0]
        this.setState({
          owner,
          events: calEvents,
        })
      })
  }

  componentDidMount() {
    this.setState({
      time: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    })
    setInterval(() => this.tick(), 1000)

    if (window.location.search.indexOf('token') > -1) {
      this.setState({
        token: this.geturlparams('token'),
      })
      this.getCalendarEvents()
    } else {
      axios.get('/.netlify/functions/google-auth').then(res => {
        this.setState({
          url: res.data.redirectURL,
        })
      })
    }
  }

  render() {
    return (
      <>
        <div class="header">
          <h1>Welcome {this.state.owner}</h1>
          <p>{this.state.time}</p>
        </div>
        <div class="events-meta-wrapper">
          {!this.state.token && (
            <div>
              <button onClick={() => this.authenticate()}>Sign me in</button>
            </div>
          )}
          {this.state.events.length > 0 && (
            <div class="events-list">
              <ul>
                {this.sortEvents().map(event => (
                  <li key={event.id}>
                    <p>{this.eventTime(event.start.dateTime)}</p>
                    <h3>{event.summary}</h3>
                    {event.meeting.type === 'Zoom Meeting' && (
                      <a href={event.meeting.link} class="events-location">
                        <img src="../../public/zoom-logo.jpg" alt="" />
                      </a>
                    )}
                    {event.meeting.type === 'Hangouts Meet' && (
                      <a href={event.meeting.link} class="events-location">
                        <img src="../../public/meet-logo.png" alt="" />
                      </a>
                    )}
                    {event.meeting.type !== 'Zoom Meeting' && event.meeting.type !== 'Hangouts Meet' && (
                      <a href="#" class="events-location">
                        <img src="../../public/question-logo.png" alt="" />
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </>
    )
  }
}

export default HelloWorld
