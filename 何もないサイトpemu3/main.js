function inputChange(event) {
    if (event.key === "Enter") {
        // 入力された値を取得
        let inputValue = event.target.value;

        if (inputValue === "なにもないってば") {
            alert("ほんとうになにもないよ。");
            location.href = "../何もないサイトtimu4/index.html";
        }
        else if (inputValue === "os")
        {
            alert("なにかあるかもね。")
            location.href="../何もないサイトtomue5/index.html"
        }
        else {
            alert("なにやってるの？");
            text.value = "";
        }
    }
}
alert("入力する")
let text = document.getElementById('nametext');
text.addEventListener('keydown', inputChange);

