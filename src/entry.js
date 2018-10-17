const ServiceWorker = require(
    'file-loader?name=sw.[hash:hex:3].[ext]!./serviceworker.js');

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register(ServiceWorker).
      then(() => navigator.serviceWorker.ready).
      then(reg => reg.active.postMessage({type: 'ping'})).
      catch(console.error).
      then(() =>
          import('./index'),
      ).catch(() => {
    document.querySelector('#loader-text').innerHTML = '脚本下载失败了T^T 刷新试试？';
  }).then(() => {
    navigator.serviceWorker.addEventListener('message', event => {
      if (event.data.updated !== undefined) {
        window.postMessage({
          type: 'notice',
          payload: {
            source: 'Service Worker',
            content: event.data.updated
                ? '在后台准备好了页面的更新喵~'
                : '页面下载完成，没有新任务~',
            type: event.data.updated
                ? 'success'
                : 'notice'
          },
        }, '*');
      } else if (event.data.error !== undefined) {
        window.postMessage({
          type: 'notice',
          payload: {
            source: 'Service Worker',
            content: '网络连接失败，错误：' + event.data.error,
            type: 'error'
          },
        }, '*');
      }
    });
    document.querySelector('#page-loader').remove();
    navigator.serviceWorker.controller.postMessage({type: 'ready'});
  });
} else {
  import('./index');
}
