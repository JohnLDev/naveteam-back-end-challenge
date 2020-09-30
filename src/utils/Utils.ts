function convertData(data: Date): string {
  const date = new Date(data)
  const mnth = ('0' + (date.getMonth() + 1)).slice(-2)
  const day = ('0' + (date.getDate() + 1)).slice(-2)

  return [date.getFullYear(), mnth, day].join('-')
}
export default convertData
