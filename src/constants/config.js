const status = [
  {
    key: 'pending',
    value: 'Pending Review',
  },
  { key: 'progress', value: 'In Progress' },
  { key: 'completed', value: 'Completed' },
]

const checkDays = [
  { key: 30, value: 'Last 30 days' },
  { key: 10, value: 'Last 10 days' },
  { key: 1, value: 'Last day' },
]

const calendarViews = [
  { key: 'today', value: 'Today' },
  { key: 'week', value: 'Week' },
  { key: 'month', value: 'Month' },
  { key: 'year', value: 'Year' },
]

const requestStatus = {
  pending: { key: 'pending', value: 'Pending Review' },
  progress: { key: 'progress', value: 'In Progress' },
  complete: { key: 'complete', value: 'Completed' },
}

export { status, checkDays, requestStatus, calendarViews }
