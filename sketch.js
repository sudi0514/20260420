let capture;
let graphics;

function setup() {
  // 建立全螢幕畫布
  createCanvas(windowWidth, windowHeight);
  
  // 擷取攝影機影像
  capture = createCapture(VIDEO);
  capture.hide(); // 隱藏預設的 DOM 元素，確保影像只會被畫在我們設定的畫布上

  // 根據視訊畫面大小建立 graphics buffer
  let imgW = windowWidth * 0.6;
  let imgH = windowHeight * 0.6;
  graphics = createGraphics(imgW, imgH);
}

function draw() {
  // 設定畫布背景顏色為 e7c6ff
  background('#e7c6ff');
  
  // 將圖片繪製模式設定為中心點 (CENTER)
  imageMode(CENTER);
  
  // 計算影像寬高 (全螢幕寬高各 60%)
  let imgW = windowWidth * 0.6;
  let imgH = windowHeight * 0.6;
  
  // --- 在 graphics buffer 上繪圖與分析 ---
  // 1. 先清除並畫上原始圖形 (範例：紅色圓形)，這是我們分析的來源
  graphics.clear();
  graphics.noStroke();
  graphics.fill(255, 0, 0, 150);
  graphics.circle(50, 50, 80);

  // 2. 載入 graphics buffer 的像素資料以進行分析
  graphics.loadPixels();

  const unitSize = 20;
  graphics.textAlign(CENTER, CENTER);
  graphics.textSize(8);

  // 3. 以 20x20 為單位遍歷 graphics buffer
  for (let y = 0; y < graphics.height; y += unitSize) {
    for (let x = 0; x < graphics.width; x += unitSize) {
      // 計算該單位左上角像素在 pixels 陣列中的索引
      const index = (x + y * graphics.width) * 4;
      // 取得該像素的 RGB 值
      const r = graphics.pixels[index];
      const g = graphics.pixels[index + 1];
      const b = graphics.pixels[index + 2];

      // 4. 計算平均亮度
      const brightness = (r + g + b) / 3;

      // 5. 在該單位上顯示亮度值 (為了清晰，文字顏色會根據亮度自動變換)
      graphics.fill(brightness > 127 ? 0 : 255); // 亮度高於127用黑色字，否則用白色
      graphics.text(floor(brightness), x + unitSize / 2, y + unitSize / 2);
    }
  }
  // ------------------------------------

  // 使用 push 和 pop 來確保翻轉效果只套用在攝影機畫面上
  push();
  // 將畫布的座標原點移到視窗的最右邊
  translate(windowWidth, 0);
  // 將 X 軸以 -1 的比例縮放，達成水平鏡像翻轉
  scale(-1, 1);
  
  // 將攝影機影像畫在視窗正中間 (在翻轉後的座標系中，置中的座標點依然相同)
  image(capture, windowWidth / 2, windowHeight / 2, imgW, imgH);
  pop();

  // 在視訊畫面上方繪製 graphics buffer 的內容
  image(graphics, windowWidth / 2, windowHeight / 2);
}

// (選擇性) 加上這個函式可以確保視窗縮放時，畫布大小也會跟著動態調整
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // 同步更新 graphics buffer 的大小
  graphics = createGraphics(windowWidth * 0.6, windowHeight * 0.6);
}
