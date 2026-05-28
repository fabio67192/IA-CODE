from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import base64

app = Flask(__name__)
# Configuração de CORS para permitir que o teu React fale com o Python sem bloqueios
CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)

# Instruções mestras para o Gemini saber o que fazer com a imagem ou texto
SYSTEM_INSTRUCTIONS = (
    "Tu és o CODEGUARD AI, um Engenheiro de Software Full-Stack Sénior de Elite.\n"
    "O utilizador (Paulo) vai enviar código ou uma imagem (como um rascunho de ecrã, print de erro ou diagrama) junto com instruções.\n\n"
    "REGRAS DE EXECUÇÃO:\n"
    "1. Se houver imagem, analisa-a visualmente com extremo cuidado (elementos de interface, textos, erros).\n"
    "2. Se o utilizador pedir para EDITAR a imagem (ex: 'apaga o texto', 'aumenta a flor'), simula o comportamento lógico e descreve a alteração ou gera o código corrigido.\n"
    "3. Responde sempre em Português de Portugal, de forma direta, técnica e limpa.\n"
    "4. Quando gerar código, use blocos de código formatados em Markdown."
)

@app.route('/api/analyze', methods=['POST', 'OPTIONS'])
def analyze_code():
    if request.method == 'OPTIONS':
        return jsonify({'status': 'ok'}), 200

    try:
        # 📂 Verifica se recebemos um arquivo (multipart/form-data) ou apenas texto (JSON)
        if request.content_type.startswith('multipart/form-data'):
            user_text = request.form.get('code', '')
            language = request.form.get('language', 'python')
            action = request.form.get('action', 'analyze')
            image_file = request.files.get('image')
        else:
            data = request.json or {}
            user_text = data.get('code', '')
            language = data.get('language', 'python')
            action = data.get('action', 'analyze')
            image_file = None

        if not user_text and not image_file:
            return jsonify({'error': 'Por favor, escreve alguma instrução ou envia uma foto.'}), 400

        # 🧠 Monta a estrutura de conteúdos para a API do Gemini (.upper() corrigido aqui!)
        action_upper = str(action).upper()
        parts = [{"text": f"{SYSTEM_INSTRUCTIONS}\n\n[Modo Ativo: {action_upper}]\n[Linguagem Alvo: {language}]\n\nInstruções do Paulo:\n{user_text}"}]
        
        if image_file:
            # 🖼️ Se houver imagem, converte para base64 para o Gemini conseguir "ver"
            image_bytes = image_file.read()
            image_base64 = base64.b64encode(image_bytes).decode('utf-8')
            mime_type = image_file.content_type
            
            parts.append({
                "inline_data": {
                    "mime_type": mime_type,
                    "data": image_base64
                }
            })

        payload = {
            "contents": [{"role": "user", "parts": parts}]
        }

        # 🚀 Faz a chamada à API oficial do Gemini usando a tua chave
        gemini_url = "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=AIzaSyAwsLeDCWb58GxuEfkWprlcqZOlJEPiXu4"
        response = requests.post(
            gemini_url,
            headers={"Content-Type": "application/json"},
            json=payload,
            timeout=60
        )

        if response.status_code == 200:
            response_data = response.json()
            ai_analysis = response_data['candidates'][0]['content']['parts'][0]['text']
            return jsonify({'analysis': ai_analysis})
        
        return jsonify({'error': f"Erro na API do Gemini: {response.text}"}), 500

    except Exception as e:
        return jsonify({'error': f'Erro interno no Servidor Python: {str(e)}'}), 500

if __name__ == '__main__':
    # Corre o servidor na porta 5000
    app.run(host='0.0.0.0', port=5000, debug=True)