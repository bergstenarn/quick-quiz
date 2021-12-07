const highScoreList = document.getElementById("highScoreList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

highScoreList.textContent = "";
highScores.forEach((score) => {
  const scoreEl = document.createElement("li");
  scoreEl.textContent = `${score.score} ${score.name}`;
  scoreEl.classList.add("high-score");
  highScoreList.append(scoreEl);
});
