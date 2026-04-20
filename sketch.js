let capture;

function setup() {
  // 建立全螢幕畫布
  createCanvas(windowWidth, windowHeight);
  
  // 擷取攝影機影像
  capture = createCapture(VIDEO);
  capture.hide(); // 隱藏預設的 DOM 元素，確保影像只會被畫在我們設定的畫布上
}

function draw() {
  // 設定畫布背景顏色為 e7c6ff
  background('#e7c6ff');
  
  // 將圖片繪製模式設定為中心點 (CENTER)
  imageMode(CENTER);
  
  // 計算影像寬高 (全螢幕寬高各 60%)
  let imgW = windowWidth * 0.6;
  let imgH = windowHeight * 0.6;
  
  // 將攝影機影像畫在視窗正中間
  image(capture, windowWidth / 2, windowHeight / 2, imgW, imgH);
}

// (選擇性) 加上這個函式可以確保視窗縮放時，畫布大小也會跟著動態調整
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
