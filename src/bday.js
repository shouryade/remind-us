export function getNextBirthday(month, day) {
  const today = new Date()

  const currentYear = today.getFullYear()
  let nextBirthday = new Date(currentYear, month - 1, day)

  if (today > nextBirthday) {
    nextBirthday.setFullYear(currentYear + 1)
  }

  // Set time zone to 'Asia/Kolkata' (Indian Standard Time)
  nextBirthday.toLocaleString('en-US', {timeZone: 'Asia/Kolkata'})

  const timeDiff = nextBirthday.getTime() - today.getTime()
  const daysUntilNextBirthday = Math.ceil(timeDiff / (1000 * 60 * 60 * 24))

  // Format the date using toLocaleString with Indian time zone
  const nextBirthdayDate = nextBirthday.toLocaleString('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })

  return {
    nextBirthdayDate,
    daysUntilNextBirthday,
  }
}
