(function () {
  // この教材ブロック内だけを操作する
  const scripts = document.currentScript;
  const root = scripts && scripts.previousElementSibling;
  // WordPressがstyleを移動する場合に備え、
  // スクリプトの直前から教材ブロックを探す
  const demo = root && root.classList.contains("energy-demo")
    ? root
    : scripts && scripts.parentElement.querySelector(".energy-demo");

  if (!demo || demo.dataset.initialized === "true") return;
  demo.dataset.initialized = "true";

  const lengthSlider = demo.querySelector(".length-slider");
  const gapSlider = demo.querySelector(".gap-slider");
  const lengthValue = demo.querySelector(".length-value");
  const gapValue = demo.querySelector(".gap-value");
  const caption = demo.querySelector(".energy-caption");

  const high = demo.querySelector(".level-high");
  const low = demo.querySelector(".level-low");
  const highLabel = demo.querySelector(".label-high");
  const lowLabel = demo.querySelector(".label-low");
  const gapLine = demo.querySelector(".gap-line");
  const gapLabel = demo.querySelector(".gap-label");

  function updateDiagram() {
    const length = Number(lengthSlider.value);
    const gap = Number(gapSlider.value);

    // 線の長さを変更
    const x2 = 100 + length;
    high.setAttribute("x2", x2);
    low.setAttribute("x2", x2);

    // 準位の間隔を変更。中央の高さは120 px
    const yHigh = 120 - gap / 2;
    const yLow = 120 + gap / 2;

    high.setAttribute("y1", yHigh);
    high.setAttribute("y2", yHigh);
    low.setAttribute("y1", yLow);
    low.setAttribute("y2", yLow);

    highLabel.setAttribute("y", yHigh - 12);
    lowLabel.setAttribute("y", yLow + 20);

    // ΔEを示す両矢印も連動
    gapLine.setAttribute("y1", yHigh);
    gapLine.setAttribute("y2", yLow);
    gapLabel.setAttribute("y", 124);

    // 数値表示を更新
    lengthValue.textContent = length;
    gapValue.textContent = gap;
    caption.textContent =
      "現在の間隔：" + gap +
      " px（図上の距離。実際のエネルギー単位ではありません）";
  }

  lengthSlider.addEventListener("input", updateDiagram);
  gapSlider.addEventListener("input", updateDiagram);
  updateDiagram();
})();