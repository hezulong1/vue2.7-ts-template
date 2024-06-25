export default function openWindow(url: string, title: string, width: number, height: number) {
  interface IFFScreen {
    left: number;
    top: number;
  }

  // Fixes dual-screen position                            Most browsers       Firefox
  const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : (<IFFScreen><any>screen).left;
  const dualScreenTop = window.screenTop !== undefined ? window.screenTop : (<IFFScreen><any>screen).top;

  const iWidth = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
  const iHeight = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

  const left = ((iWidth / 2) - (width / 2)) + dualScreenLeft;
  const top = ((iHeight / 2) - (height / 2)) + dualScreenTop;
  const features = 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left;
  const newWindow = window.open(url, title, features);

  // Puts focus on the newWindow
  if (newWindow && newWindow.focus) {
    newWindow.focus();
  }
}
