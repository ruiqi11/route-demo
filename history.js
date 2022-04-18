// 页面加载完不会触发 hashchange，这里主动触发一次 hashchange 事件
window.addEventListener('DOMContentLoaded', onLoad)
  // 监听路由变化
window.addEventListener('popstate', onPopState)

// 路由视图
var routerView = null

function onLoad() {
  routerView = document.getElementsByClassName('routeView')[1]
  onPopState()

  // 拦截 <a> 标签点击事件默认行为， 点击时使用 pushState 修改 URL并更新手动 UI，从而实现点击链接更新 URL 和 UI 的效果。
  var linkList = document.querySelectorAll('.history a[href]')
  linkList.forEach(el => el.addEventListener('click', function(e) {
    e.preventDefault()
    history.pushState(null, null, el.getAttribute('href'))
    onPopState()
  }))
}

// 路由变化时，根据路由渲染对应 UI
// 本地地址修改了原有路径内容会报错，这里使用？拼接上去
function onPopState() {
  switch (location.search) {
    case '?route=home':
      routerView.innerHTML = '<h2>Home</h2>'
      return
    case '?route=about':
      routerView.innerHTML = '<h2>About</h2>'
      return
    default:
      return
  }
}