/**
 * 2019/3/1 下午12:54
 * 初始化Valine评论系统 文档 https://valine.js.org/configuration.html
 */

function loadScript(src: string) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = src
    script.onload = () => {
      resolve(true)
      remove()
    }
    script.onerror = () => {
      reject()
      remove()
    }
    document.body.appendChild(script)

    function remove() {
      script.parentNode?.removeChild(script)
    }
  })
}

function getReady() {
  const avUrl = `//code.bdstatic.com/npm/leancloud-storage@4.12.0/dist/av-min.js`
  const valineUrl = `//unpkg.com/valine/dist/Valine.min.js`

  return Promise.all([loadScript(avUrl), loadScript(valineUrl)]).then((res) => {
    isLoading = false
  })
}

function start() {
  // @ts-expect-error
  new Valine({
    el: '#vcomments',
    appId: 'J9BV8j1TlKO7MHkO6r1awhCA-gzGzoHsz',
    appKey: 'm06FfscybDkLncEygOdxU2gb',
    placeholder: '说点什么吧...',
    avatar: '',
    path: window.location.pathname,
  })
}

let isLoading = false
let isReady = false
let timer: any

export function initComment() {
  // 只在浏览器中加载
  if (typeof window === 'undefined')
    return

  clearTimeout(timer)
  timer = setTimeout(() => {
    if (!isReady) {
      getReady().then((res) => {
        isReady = true
        start()
      })
    }
    else {
      start()
    }
  })
}
