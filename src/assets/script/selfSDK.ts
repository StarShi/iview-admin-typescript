
/**
 * @return {Object} obj.isWeiXin obj.isDingTalk  obj.isApp  微信 钉钉 其他浏览器
 * @description 判断应用开启环境
 */
function userAgentObj() {
  const ua: string = navigator.userAgent.toLowerCase();
  let isWeiXin = false;
  let isDingTalk = false;
  let isApp = false;
  let isIOS = false;
  let isAndroid = false;
  let obj: any = {};
  let dingMatch = ua.match(/dingtalk/g);
  let wxMatch = ua.match(/micromessenger/g);
  let iosMatch = ua.match(/(iphone|ipad|ipod|ios)/g);
  let androidMatch = ua.match(/android/g);
  if (iosMatch && (iosMatch[0] === 'iphone' ||
    iosMatch[0] === 'ipad' ||
    iosMatch[0] === 'ipod' ||
    iosMatch[0] === 'ios')) {

    isIOS = true;
  }
  if (androidMatch && androidMatch[0] === 'android') {
    isAndroid = true;
  }
  if (dingMatch && dingMatch[0] === "dingtalk") {//用钉钉打开
    isDingTalk = true;
  } else if (wxMatch && wxMatch[0] === "micromessenger") {//用微信打开
    isWeiXin = true;
  } else {//用其他浏览器打开
    isApp = true;
  }
  obj.isWeiXin = isWeiXin;
  obj.isDingTalk = isDingTalk;
  obj.isApp = isApp;
  obj.isIOS = isIOS;
  obj.isAndroid = isAndroid;
  if (obj) return obj;
  else return false;
}

const userAgent = userAgentObj();//获取应用开启环境


export default {
  setPageTitle(title: string) {//设置页面标题
    if (userAgent && userAgent.isDingTalk) {//钉钉内
      return
    } else {//微信或其他浏览器
      document.title = title;//修改标题
      let oIframe = document.createElement('iframe');
      oIframe.style.display = 'none';
      oIframe.addEventListener('load', function () {
        setTimeout(function () {
          oIframe && oIframe.removeEventListener('load', function () {
          });
          document.body.removeChild(oIframe);
        }, 0);
      });
      document.body.appendChild(oIframe);
    }
  },
}
