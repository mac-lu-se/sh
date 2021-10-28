
const formatter = new Intl.DateTimeFormat('sv-SE', {dateStyle: 'short', timeStyle: 'medium'}).format

export function formatDate(d) {
  return formatter(d)
}