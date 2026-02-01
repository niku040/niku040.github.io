const link = document.getElementById("delayedLink");

let hoverTimer;

link.addEventListener("mouseenter", () => {
    hoverTimer = setTimeout(() => {
        link.style.pointerEvents = "auto";  // クリック有効化
        link.style.cursor = "pointer";      // マウスカーソル変更で分かりやすく
        link.addEventListener("click", handleClick);  // ✅ イベント追加
    }, 2500);
});

link.addEventListener("mouseleave", () => {
    clearTimeout(hoverTimer);
    link.style.cursor = "wait";         // カーソルも戻す
    link.removeEventListener("click", handleClick);  // ✅ イベント削除
});

function handleClick() {
    alert("おめでとう。");
    location.href = "../何もないサイトumuo6/index.html";
}

alert("カーソルをホバーする")
