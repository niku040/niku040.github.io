alert("正しい順番をみつける")

document.addEventListener("DOMContentLoaded", function () {
    // ページ読み込み時に表示/非表示を決める
    const unlocked = localStorage.getItem("unlockedLink2") === "true";
    const link2 = document.getElementById("link2");

    if (link2) {
        link2.style.visibility = unlocked ? "visible" : "hidden";
    }

    // === 正しいリンク入力シーケンス処理 ===

    const sequence = ["link1", "link1", "link3", "link2"];
    let input = [];
    const resetTime = 3000;
    let timeout;

    function resetInput() {
        input = [];
    }

    function checkSequence() {
        if (input.length !== sequence.length) return false;
        return input.every((val, idx) => val === sequence[idx]);
    }

    function registerClick(id) {
        clearTimeout(timeout);
        input.push(id);

        const link = document.getElementById(id);
        addDot(link);

        if (checkSequence()) {
            setTimeout(() => {
                alert("ご苦労様、なにもないよ");

                // 成功したらフラグを消して非表示に戻す
                localStorage.setItem("canUnlockLink2", "false");

                if (link2) {
                    link2.style.visibility = "hidden";
                }

                location.href = "../何もないサイトvoooaa8/index.html";
            }, 50);

            resetInput();
        } else if (input.length >= sequence.length) {
            setTimeout(() => {
                alert("なにやってるの？");
            }, 50);
            clearAllDots();
            resetInput();
        }

        timeout = setTimeout(() => {
            clearAllDots();
            resetInput();
        }, resetTime);
    }

    function addDot(linkElement) {
        if (!linkElement.classList.contains("position-relative")) {
            linkElement.classList.add("position-relative");
        }

        let container = linkElement.querySelector(".dot-container");
        if (!container) {
            container = document.createElement("div");
            container.className = "dot-container";
            linkElement.appendChild(container);
        }

        const dot = document.createElement("span");
        dot.textContent = "・";
        dot.className = "dot-indicator-static";
        container.appendChild(dot);
    }

    function clearAllDots() {
        const containers = document.querySelectorAll(".dot-container");
        containers.forEach((container) => container.remove());
    }

    document.getElementById("link1").addEventListener("click", (e) => {
        e.preventDefault();
        registerClick("link1");
    });

    document.getElementById("link2").addEventListener("click", (e) => {
        e.preventDefault();
        registerClick("link2");
    });

    document.getElementById("link3").addEventListener("click", (e) => {
        e.preventDefault();
        registerClick("link3");
    });
});
