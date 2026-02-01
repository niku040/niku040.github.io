alert("何もなくする")

function showBlockedMessage(x, y) {
    let blockedMessage = document.createElement("div");
    blockedMessage.textContent = "Blocked";
    blockedMessage.style.position = "fixed";
    blockedMessage.style.left = `${x}px`;
    blockedMessage.style.top = `${y}px`;
    blockedMessage.style.transform = "translate(-50%, -50%) scale(0.6)";
    blockedMessage.style.backgroundColor = "rgba(255, 0, 0, 0.9)";
    blockedMessage.style.color = "white";
    blockedMessage.style.padding = "10px 20px";
    blockedMessage.style.borderRadius = "5px";
    blockedMessage.style.fontSize = "20px";
    blockedMessage.style.zIndex = "9999";
    blockedMessage.style.boxShadow = "0 2px 10px rgba(0,0,0,0.3)";
    blockedMessage.style.opacity = "0";
    blockedMessage.style.transition =
        "transform 0.2s ease-out, opacity 0.2s ease-out";

    document.body.appendChild(blockedMessage);

    requestAnimationFrame(() => {
        blockedMessage.style.opacity = "1";
        blockedMessage.style.transform = "translate(-50%, -50%) scale(1)";
    });

    setTimeout(() => {
        blockedMessage.style.opacity = "0";
        blockedMessage.style.transform = "translate(-50%, -50%) scale(1.3)";
    }, 1000);

    setTimeout(() => {
        blockedMessage.remove();
    }, 1400);
}

document.addEventListener("DOMContentLoaded", () => {
    const nextLink = document.getElementById("nextLink");

    const deletionOrder = [
        "#step1",
        "#step2",
        "#step3",
        "#step4",
        "#step5",
        "#step6",
        "#step7",
        "#step8",
        "#step9",
        "#step10",
        "#step11",
        "#step12",
        ".content",
    ];

    let currentIndex = 0;
    let clickCount = 0;
    let timer = null;
    let allGone = false;
    const requiredClicks = 5;
    const timeLimit = 7000;

    document.addEventListener("click", function (event) {
        const el = event.target;

        if (
            el === nextLink ||
            el === document.body ||
            el === document.documentElement
        )
            return;

        // 現在の削除対象
        const selector = deletionOrder[currentIndex];
        const expected = document.querySelector(selector);

        if (!expected || el !== expected) {
            showBlockedMessage(event.clientX, event.clientY);
            return;
        }


        // 正しい要素だったので削除
        expected.remove();
        currentIndex++;

        // 全て削除済みチェック
        if (currentIndex >= deletionOrder.length) {
            allGone = true;
            document.body.style.minHeight = "100vh";
            document.querySelector(".main").remove();
            document.body.addEventListener(
                "click",
                () => {
                    clickCount++;
                    console.log(`クリック ${clickCount} 回`);

                    if (timer === null) {
                        timer = setTimeout(() => {
                            clickCount = 0;
                            timer = null;
                        }, timeLimit);
                    }

                    if (clickCount >= requiredClicks) {
                        document.body.style.cursor = "none";
                        nextLink.style.display = "block";
                        clearTimeout(timer);
                        clickCount = 0;
                        timer = null;
                    }
                },
                { once: false }
            );
        }
    });
});
