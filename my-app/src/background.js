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

const getStorage = (key) => {
  return new Promise((resolve, reject) => {
    chrome?.storage?.sync?.get([key], (val) => {
      resolve(val[key])
    })
  })
}

let hostsJson = {}
// 一小时
const POLLING_TIME = 60 * 60 * 1000

const url = `https://cdn.jsdelivr.net/gh/521xueweihan/GitHub520@main/hosts`

const onBeforeRequestListener =  (details) =>  {
  let url = details.url.replace('http://', 'https://')
  const host = new URL(url).host
  const ip = hostsJson[host]
  if (ip) {
    url = url.replace(host, ip)
  }
  return { redirectUrl: url }
}

const getUsingHostsJson = async () => {
  const usingHostsId = await getStorage('__USING_HOSTS_ID')
  const hosts = await getStorage('__HOSTS')
  const usingHostsContent = hosts?.[usingHostsId]?.content || ''
  hostsJson = hostsToJson(usingHostsContent)

  const filterUrls = Object.keys(hostsJson).map(hostItem => `*://${hostItem}/*`)

  chrome.webRequest.onBeforeRequest.removeListener(onBeforeRequestListener)
  chrome.webRequest.onBeforeRequest.addListener(onBeforeRequestListener, { urls: filterUrls, }, ['blocking'] )

  console.log('hostsJson: ', JSON.stringify(hostsJson));
}

chrome.runtime.onInstalled.addListener(async () => {
  await getUsingHostsJson()

  chrome?.storage?.onChanged?.removeListener(getUsingHostsJson);
  chrome?.storage?.onChanged?.addListener(getUsingHostsJson);
})

// chrome.storage.onChanged.addListener((changes, namespace) => {
//   for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
//     const isChange = oldValue !== newValue

//     if (key === '__USING_HOSTS_ID' && isChange) {
//       const filterUrls = Object.keys(hostsJson).map(hostItem => `*://${hostItem}/*`)
//       chrome.webRequest.onBeforeRequest.removeListener(onBeforeRequestListener)
//       chrome.webRequest.onBeforeRequest.addListener(onBeforeRequestListener, { urls: filterUrls, }, ['blocking'] )
//     }
//     // console.log(
//     //   `Storage key "${key}" in namespace "${namespace}" changed.`,
//     //   `Old value was "${oldValue}", new value is "${newValue}".`
//     // );
//   }
// });

// chrome.storage.sync.get(null, function (result) {
//   console.log('all get is ' + JSON.stringify(result));
// })





