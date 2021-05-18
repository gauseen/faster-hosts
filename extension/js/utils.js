const hostsToJson = hosts => {
  const lines = hosts.split('\n')
  const validLines = lines.filter(line => !line.trim().startsWith('#'))

  return validLines.reduce((acc, curr) => {
    // console.log('curr ', curr.split(' ').filter(Boolean));
    const [target, ...rest] = curr.split(' ').filter(Boolean)
    for (let item of rest) {
      acc[item] = target
    }
    return acc
  }, {})
}
