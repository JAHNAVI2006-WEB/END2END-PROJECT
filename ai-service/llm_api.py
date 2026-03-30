import requests

# We use the open-source Hugging Face model flan-t5-large or a similar free open-weights endpoint
API_URL = "https://api-inference.huggingface.co/models/google/flan-t5-large"

def ask_llm(question, expected_answer, user_answer):
    if not question:
        return "Please provide an answer to a specific question for AI evaluation."
        
    prompt = (
        f"You are an expert technical interviewer. Evaluate the candidate's answer.\n"
        f"Question: {question}\n"
        f"Expected Concept: {expected_answer}\n"
        f"Candidate Answer: {user_answer}\n\n"
        f"Provide short, constructive feedback (2-3 sentences max) evaluating if their answer is correct and what they missed, followed by a score out of 10. Start with 'Feedback: '."
    )
    
    payload = {
        "inputs": prompt,
        "parameters": {
            "max_new_tokens": 150,
            "temperature": 0.3
        }
    }
    
    try:
        r = requests.post(API_URL, json=payload, timeout=8)
        
        # If the free API endpoint is overloaded, it might return a 503 error
        if r.status_code != 200:
            return "Good attempt! Make sure you cover all the key topics relevant to the domain. (Detailed AI response is temporarily unavailable from open-source provider)."
            
        generated = r.json()[0]["generated_text"]
        return generated
    except Exception as e:
        return "Nice answer! (AI evaluation service connection failed)."
