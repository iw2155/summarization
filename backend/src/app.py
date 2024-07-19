from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
from transformers import RagTokenizer, RagRetriever
from transformers import BartForConditionalGeneration, BartTokenizer, pipeline

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# Initialize RAG model components
# tokenizer = RagTokenizer.from_pretrained("facebook/rag-token-nq")
# retriever = RagRetriever.from_pretrained(
#     "facebook/rag-token-nq",
#     index_name="custom",
#     passages_path="wiki_knowledge_database",
#     index_path="wiki_knowledge_index"
# )
# model = RagTokenForGeneration.from_pretrained("facebook/rag-token-nq", retriever=retriever)

# model = BartForConditionalGeneration.from_pretrained("facebook/bart-large-cnn", force_bos_token_to_be_generated=True) 

# tokenizer = BartTokenizer.from_pretrained("facebook/bart-large-cnn") 

summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

@app.route('/api/summarize', methods=['GET', 'POST', 'OPTIONS'])
def summarize():
    if request.method == 'OPTIONS':
        return _build_cors_prelight_response()
    
    if request.method == 'POST':
        try:
            data = request.get_json()
            text = data['text']
            # print(text)
            
            # # Tokenize the input text
            # inputs = tokenizer(text, return_tensors="pt")
            
            # # Generate the summary using RAG
            # generated_ids = model.generate(inputs['input_ids'])
            # generated_text = tokenizer.batch_decode(generated_ids, skip_special_tokens=True)[0]
            generated_text = summarizer(text)
            # print(generated_text)
            
            return jsonify({"summary": generated_text[0]["summary_text"]})
        except Exception as e:
            return jsonify({"error": str(e)}), 500
    
    return jsonify({"error": "Invalid request method"}), 400

def _build_cors_prelight_response():
    response = jsonify({"status": "success"})
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")
    response.headers.add("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS")
    return response

if __name__ == '__main__':
    print("Backend Running")
    app.run(debug=True)
