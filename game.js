// 猜数字小游戏（网页版）
// 逻辑与 Python 版一致：随机 1~100，提示大了/小了，统计次数
(function () {
    var answer;        // 要猜的答案
    var count;         // 已猜次数
    var over;          // 游戏是否结束
    var best = null;   // 最佳纪录（本页会话内）

    var input = document.getElementById('guess-input');
    var guessBtn = document.getElementById('guess-btn');
    var restartBtn = document.getElementById('restart-btn');
    var msg = document.getElementById('game-msg');
    var countEl = document.getElementById('game-count');
    var bestEl = document.getElementById('game-best');

    // 开始新的一局
    function start() {
        answer = Math.floor(Math.random() * 100) + 1;
        count = 0;
        over = false;
        countEl.textContent = '0';
        msg.textContent = '点击"猜！"开始挑战～';
        msg.className = 'game-msg';
        input.value = '';
        input.disabled = false;
        guessBtn.hidden = false;
        restartBtn.hidden = true;
    }

    // 每次猜测
    function guess() {
        if (over) return;
        var v = Number(input.value);
        if (!v || v < 1 || v > 100 || v !== Math.floor(v)) {
            msg.textContent = '请输入 1 ~ 100 之间的整数哦！';
            msg.className = 'game-msg warn';
            return;
        }
        count++;
        countEl.textContent = count;
        if (v > answer) {
            msg.textContent = '大了！再试一次～';
            msg.className = 'game-msg warn';
        } else if (v < answer) {
            msg.textContent = '小了！再试一次～';
            msg.className = 'game-msg warn';
        } else {
            over = true;
            msg.textContent = '🎉 猜中了！答案就是 ' + answer + '，你用了 ' + count + ' 次。';
            msg.className = 'game-msg win';
            if (best === null || count < best) {
                best = count;
                bestEl.textContent = best;
            }
            input.disabled = true;
            guessBtn.hidden = true;
            restartBtn.hidden = false;
        }
        input.value = '';
        input.focus();
    }

    guessBtn.addEventListener('click', guess);
    restartBtn.addEventListener('click', start);
    input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') guess();
    });

    start();
})();
