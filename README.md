# 🛡️ CodeGuard AI - Engenheiro de Software Full-Stack Sénior de Elite

O **CodeGuard AI** é uma aplicação Full-Stack inteligente que junta um ecossistema moderno em **React** (Frontend) a um servidor robusto em **Python Flask** (Backend). A aplicação comunica diretamente com as APIs de última geração da Google Gemini para analisar código, detetar erros em capturas de ecrã (prints) e fornecer correções lógicas em tempo real.

---

## 🚀 Funcionalidades Principais

- **Análise Multimodal:** Envia capturas de ecrã (prints de erro, rascunhos de interface ou diagramas) e recebe uma resposta contextualizada.
- **Deteção de Erros de Sintaxe:** Processamento inteligente de código escrito pelo utilizador.
- **Suporte Multilíngue:** Configurado nativamente para responder com precisão em Português de Portugal.
- **Processamento de Imagem Local (Bónus):** Inclui módulos experimentais com `OpenCV` e `NumPy` para técnicas de *Inpainting* e segmentação visual.

---

## 🛠️ Tecnologias Utilizadas

### **Frontend**
- **React.js** com Vite (Interface ágil, reativa e scannable)
- **Tailwind CSS** (Estilização moderna e componentes limpos)

### **Backend**
- **Python 3.14+**
- **Flask** & **Flask-CORS** (Servidor HTTP e gestão de rotas da API)
- **Requests** (Comunicação com os servidores da Google)
- **OpenCV (cv2)** & **NumPy** (Processamento e manipulação de matrizes de imagem)

### **Inteligência Artificial**
- **Google Gemini API** (`gemini-1.5-flash` / `gemini-1.5-pro`)

---

## 📦 Como Instalar e Executar Localmente

### 1. Clonar o Repositório
```bash
git clone [https://github.com/TEU_UTILIZADOR_GITHUB/code-guard-ai.git](https://github.com/TEU_UTILIZADOR_GITHUB/code-guard-ai.git)
cd code-guard-ai
