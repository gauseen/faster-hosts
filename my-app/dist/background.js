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

let hostsJson = {}
// 一小时
const POLLING_TIME = 60 * 60 * 1000

const url = `https://cdn.jsdelivr.net/gh/521xueweihan/GitHub520@main/hosts`

const onBeforeRequestListener =  (details) =>  {
  let url = details.url.replace('http://', 'https://')
  const host = new URL(url).host
  const matched = hostsJson[host]
  if (matched) {
    url = url.replace(hostsJson[host], host)
  }
  return { redirectUrl: url }
}

chrome.runtime.onInstalled.addListener(function() {
  const start = () => {
    fetch(url)
    .then(res => res.text())
    .then(data => {
      hostsJson = hostsToJson(data)
      const filterUrls = Object.keys(hostsJson).map(hostItem => `*://${hostItem}/*`)

      chrome.webRequest.onBeforeRequest.removeListener(onBeforeRequestListener)
      chrome.webRequest.onBeforeRequest.addListener(onBeforeRequestListener, { urls: filterUrls, }, ['blocking'] )
    })
  }

  start()
  setInterval(start, POLLING_TIME)
})

chrome.storage.sync.get(['ACTIVE_HOSTS_ID'], function (result) {
  console.log('Value get is ' + result.testKey1);
})

chrome.storage.sync.get("__HOSTS", function (items) {
  console.log('__HOSTS ' + JSON.stringify(items));
})

