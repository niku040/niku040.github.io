alert("待つ")

const messages = [
    "ここでいきどまり",
    "あきらめな",
    "まだいるの？",
    "もうなにもないよ",
    "",
    "しょうがないな",
    "<a href='../何もないサイトuuuoa7/index.html'>はい。どうぞ。</a>",
    "",
    "",
    "<a href='../何もないサイト/index.html'>疑いすぎ</a>",
];

const messageEl = document.getElementById("message");

let index = 0;
let opacity = 1;
let fadingOut = false;
let isVisible = false;
let isWaiting = true;
let lastTick = performance.now();
let isFinished = false;

// 初期表示
messageEl.innerHTML = messages[index];
messageEl.style.opacity = 1;

// IntersectionObserver で表示・非表示を監視
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            isVisible = entry.isIntersecting;
        });
    },
    { threshold: 0.1 }
);

observer.observe(messageEl);

// 時間ベースで処理を進める
setInterval(() => {
    const now = performance.now();
    const delta = now - lastTick;

    if (!isVisible || isFinished) return; // 非表示または終了時は何もしない

    lastTick = now;

    if (isWaiting) return; // 表示キープ中なら待つ

    opacity += fadingOut ? -0.05 : 0.05;
    opacity = Math.max(0, Math.min(1, opacity));
    messageEl.style.opacity = opacity;

    // フェードアウト完了 → 次のメッセージへ
    if (fadingOut && opacity <= 0) {
        index++;

        if (index >= messages.length) {
            isFinished = true;
            return;
        }

        messageEl.innerHTML = messages[index];
        fadingOut = false;
    }

    // フェードイン完了 → 一時停止 or 終了
    if (!fadingOut && opacity >= 1) {
        // 最後のメッセージならここで終わり（フェードアウトさせない）
        if (index === messages.length - 1) {
            isFinished = true;
            return;
        }

        isWaiting = true;
        setTimeout(() => {
            isWaiting = false;
            fadingOut = true;
        }, 10000);
    }
}, 50);

// 最初の2秒待機後にフェードアウト開始
setTimeout(() => {
    isWaiting = false;
    fadingOut = true;
}, 2000);
