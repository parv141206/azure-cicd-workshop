from flask import Flask, render_template, request

app = Flask(__name__)

def get_mock_message(total):
    if total >= 85:
        return "🎉 Bro tu GTU mein legend hai! 85+ score matlab tu actually padha hai! 🚀"
    elif total >= 75:
        return "👏 GTU mein 75+ matlab tu serious student hai, respect! 🔥"
    elif total >= 65:
        return "😊 GTU ka classic 'pass ho gaye, khush hai' zone! 📚"
    elif total >= 55:
        return "😅 GTU survival mode - zinda hai bas, kaam chal raha! 💪"
    elif total >= 45:
        return "😌 GTU mein 45+ matlab chill zone - pass toh ho hi jayega bro! ✅"
    elif total >= 40:
        return "😊 GTU mein 40+ matlab safe hai tu, tension mat le! 🎯"
    elif total >= 35:
        return "😭 GTU mein ye score matlab serious trouble mein hai tu! 💔"
    else:
        return "💀 GTU mein isse kam matlab 'engineering chhod de bro'! ⚰"

def calculate_grade(total):
    if 85 <= total <= 100:
        return "85-100", "AA", 10
    elif 75 <= total <= 84:
        return "75-84", "AB", 9
    elif 65 <= total <= 74:
        return "65-74", "BB", 8
    elif 55 <= total <= 64:
        return "55-64", "BC", 7
    elif 45 <= total <= 54:
        return "45-54", "CC", 6
    elif 40 <= total <= 44:
        return "40-44", "CD", 5
    elif 35 <= total <= 39:
        return "35-39", "DD", 4
    else:
        return "<35", "FF", 0

@app.route("/", methods=["GET", "POST"])
def gtu_grade_predictor():
    if request.method == "POST":
        mid_sem_marks = request.form.get("midSemMarks", "")
        end_sem_marks = request.form.get("endSemMarks", "")

        if mid_sem_marks and end_sem_marks:
            try:
                mid = int(mid_sem_marks)
                end = int(end_sem_marks)

                if 0 <= mid <= 30 and 0 <= end <= 70:
                    total = mid + end
                    predicted_grade, predicted_letter, predicted_points = calculate_grade(total)
                    mock_message = get_mock_message(total)
                    return render_template(
                        "index.html",
                        totalMarks=total,
                        predictedGrade=predicted_grade,
                        predictedLetter=predicted_letter,
                        predictedPoints=predicted_points,
                        mockMessage=mock_message,
                        midSemMarks=mid,
                        endSemMarks=end,
                        show_results=True
                    )
            except (ValueError, TypeError):
                pass 

    return render_template("index.html", show_results=False)

if __name__ == "__main__":
    app.run(debug=True)