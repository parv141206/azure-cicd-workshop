const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

function getMockMessage(total) {
  if (total >= 85) {
    return "🎉 Bro tu GTU mein legend hai! 85+ score matlab tu actually padha hai! 🚀";
  } else if (total >= 75) {
    return "👏 GTU mein 75+ matlab tu serious student hai, respect! 🔥";
  } else if (total >= 65) {
    return "😊 GTU ka classic 'pass ho gaye, khush hai' zone! 📚";
  } else if (total >= 55) {
    return "😅 GTU survival mode - zinda hai bas, kaam chal raha! 💪";
  } else if (total >= 45) {
    return "😌 GTU mein 45+ matlab chill zone - pass toh ho hi jayega bro! ✅";
  } else if (total >= 40) {
    return "😊 GTU mein 40+ matlab safe hai tu, tension mat le! 🎯";
  } else if (total >= 35) {
    return "😭 GTU mein ye score matlab serious trouble mein hai tu! 💔";
  } else {
    return "💀 GTU mein isse kam matlab 'engineering chhod de bro'! ⚰";
  }
}

function calculateGrade(total) {
  if (total >= 85 && total <= 100) {
    return { gradeRange: "85-100", letter: "AA", points: 10 };
  } else if (total >= 75 && total <= 84) {
    return { gradeRange: "75-84", letter: "AB", points: 9 };
  } else if (total >= 65 && total <= 74) {
    return { gradeRange: "65-74", letter: "BB", points: 8 };
  } else if (total >= 55 && total <= 64) {
    return { gradeRange: "55-64", letter: "BC", points: 7 };
  } else if (total >= 45 && total <= 54) {
    return { gradeRange: "45-54", letter: "CC", points: 6 };
  } else if (total >= 40 && total <= 44) {
    return { gradeRange: "40-44", letter: "CD", points: 5 };
  } else if (total >= 35 && total <= 39) {
    return { gradeRange: "35-39", letter: "DD", points: 4 };
  } else {
    return { gradeRange: "<35", letter: "FF", points: 0 };
  }
}

app.get("/", (req, res) => {
  res.render("index", { show_results: false });
});

app.post("/", (req, res) => {
  const { midSemMarks, endSemMarks } = req.body;
  const mid = parseInt(midSemMarks, 10);
  const end = parseInt(endSemMarks, 10);

  if (
    !isNaN(mid) &&
    !isNaN(end) &&
    mid >= 0 &&
    mid <= 30 &&
    end >= 0 &&
    end <= 70
  ) {
    const total = mid + end;
    const gradeInfo = calculateGrade(total);
    const mockMessage = getMockMessage(total);

    res.render("index", {
      show_results: true,
      totalMarks: total,
      predictedGrade: gradeInfo.gradeRange,
      predictedLetter: gradeInfo.letter,
      predictedPoints: gradeInfo.points,
      mockMessage: mockMessage,
      midSemMarks: mid,
      endSemMarks: end,
    });
  } else {
    res.render("index", { show_results: false });
  }
});
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
