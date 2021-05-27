import React, { useEffect, useState } from 'react'

const useStorage = <T = any>(key: string) => {
  const [storage, setStorage] = useState<T>({} as any)

  useEffect(() => {
    const getAllStorage = () => {
      chrome.storage.sync.get([key], function (val) {
        setStorage(val[key])
      })
    }

    getAllStorage()
    // const handler = (changes: any, namespace: any) => {
      // for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
      //   console.log(
      //     `Storage key "${key}" in namespace "${namespace}" changed.`,
      //     `Old value was "${oldValue}", new value is "${newValue}".`
      //   );
      // }
    // }
    chrome.storage.onChanged.addListener(getAllStorage);

    return () => chrome.storage.onChanged.removeListener(getAllStorage)
  }, [])

  return {
    storage,
  }
}

export default useStorage
