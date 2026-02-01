document.addEventListener("DOMContentLoaded", function () {
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
            const canUnlock = localStorage.getItem("canUnlockLink2") === "true";
            setTimeout(() => {
                if (canUnlock) {
                    localStorage.setItem("unlockedLink2", "true");
                    alert("よくみつけたね。");
                    location.href = "../何もないサイトuuuoa7/index.html";
                }
                else {
                    localStorage.setItem("unlockedLink2", "false");
                    alert("なにもないよ");
                    location.href = "../何もないサイトpemu3/index.html";
                }
            }, 50);
            resetInput();
        } else if (input.length >= sequence.length) {
            setTimeout(() => {
                alert("ざんねん");
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

window.onload = function () {
    const params = new URLSearchParams(location.search);
    const message = params.get("msg");
    if (message) {
        alert(message);
    }
};

const toggleText = document.getElementById("toggleText");
const statusText = document.getElementById("status");

function updateStatusLabel() {
    const current = localStorage.getItem("unlockedLink2");
    if (current === "true") {
        statusText.textContent = "現在の状態：表示中";
    } else if (current === "false") {
        statusText.textContent = "現在の状態：非表示中";
    } else {
        statusText.textContent = "現在の状態：未設定（初期状態）";
    }
}

toggleText.addEventListener("click", () => {
    // 「このあと5秒以内なら成功を許可」フラグを立てる
    localStorage.setItem("canUnlockLink2", "true");

    // テキストを5秒非表示
    toggleText.style.visibility = "hidden";

    setTimeout(() => {
        // 再表示
        toggleText.style.visibility = "visible";
        // 許可フラグを戻す（5秒超えたら無効にする）
        localStorage.setItem("canUnlockLink2", "false");
    }, 5000);

});
alert("正しい順番をみつける")
// 初期状態表示
updateStatusLabel();
