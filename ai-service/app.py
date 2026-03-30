
from flask import Flask,request,jsonify
from sentiment import analyze_sentiment
from llm_api import ask_llm

app = Flask(__name__)

@app.route("/analyze",methods=["POST"])
def analyze():

 text = request.json["text"]

 sentiment = analyze_sentiment(text)
 response = ask_llm(text)

 return jsonify({
   "sentiment": sentiment,
   "ai_response": response
 })

if __name__ == "__main__":
 app.run(port=8000)
