import { useState, useRef, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

// 🎨 PALETAS DE CORES COMPLETAS E LOGÓTIPOS POR LINGUAGEM (TODAS MANTIDAS!)
const languageThemes = {
  python: { 
    primary: '#3776AB',       // Azul Python
    accent: '#ffd343',        // Amarelo Python
    siteBg: '#0e1726',        // Fundo azul escuro
    chatBg: '#1e293b',        // Caixa do chat azulada
    text: '#f1f5f9',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg'
  },
  javascript: { 
    primary: '#f7df1e',       // Amarelo JS
    accent: '#ffffff',        
    siteBg: '#111111',        
    chatBg: '#181818',        
    text: '#ffffff',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'
  },
  typescript: { 
    primary: '#3178c6',       // Azul TS
    accent: '#ffffff',        
    siteBg: '#0f172a',        
    chatBg: '#1e293b',        
    text: '#f1f5f9',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg'
  },
  html: { 
    primary: '#e34c26',       // Laranja HTML
    accent: '#f06529',        
    siteBg: '#1a0f0a',        
    chatBg: '#2d1910',        
    text: '#ffebe6',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg'
  },
  css: { 
    primary: '#264de4',       // Azul CSS
    accent: '#2965f1',        
    siteBg: '#0a101f',        
    chatBg: '#111b33',        
    text: '#e6f0ff',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg'
  },
  java: { 
    primary: '#ea2d2e',       // Vermelho Java
    accent: '#5382a1',        
    siteBg: '#1a0b0b',        
    chatBg: '#2d1414',        
    text: '#ffe6e6',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg'
  },
  csharp: { 
    primary: '#239120',       // Verde C#
    accent: '#178600',        
    siteBg: '#0b1a0b',        
    chatBg: '#142d14',        
    text: '#e6ffe6',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg'
  },
  php: { 
    primary: '#777bb4',       // Roxo PHP
    accent: '#8892bf',        
    siteBg: '#0f0f1a',        
    chatBg: '#191933',        
    text: '#f0f0ff',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg'
  },
  rust: { 
    primary: '#ce412b',       // Laranja Rust
    accent: '#dea584',        
    siteBg: '#140d0b',        
    chatBg: '#241714',        
    text: '#faebd7',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg'
  },
  sql: { 
    primary: '#0064a5',       // Azul SQL
    accent: '#33ccff', 
    siteBg: '#05111a', 
    chatBg: '#0c1e2b', 
    text: '#e6f7ff',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg'
  },
  cpp: { 
    primary: '#659ad2',       // Azul C++
    accent: '#00599c',        
    siteBg: '#0f172a',        
    chatBg: '#1e293b',        
    text: '#ffffff',          
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg'
  }
}

// 🛠️ COMPONENTE CORRIGIDO (Sem erros de token/sintaxe com props)
function CodeBlockWithCopy({ language, codeString, ...props }) {
  const [copied, setCopied] = useState(false)
  const langKey = language?.toLowerCase()
  const theme = languageThemes[langKey] || languageThemes.javascript

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeString)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Falha ao copiar:', err)
    }
  }

  return (
    <div style={{ 
      position: 'relative', 
      margin: '18px 0', 
      width: '100%',
      borderRadius: '8px',
      overflow: 'hidden',
      border: `1px solid ${theme.primary}`,
      transition: 'all 0.3s ease'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#0f0f16',
        padding: '8px 16px',
        borderBottom: `1px solid ${theme.primary}44`,
        userSelect: 'none'
      }}>
        <span style={{ fontSize: '12px', fontWeight: '700', color: theme.accent, textTransform: 'uppercase', letterSpacing: '1px' }}>
          {language}
        </span>
        <button
          onClick={handleCopy}
          style={{
            backgroundColor: copied ? '#065f46' : '#12121a',
            color: copied ? '#34d399' : '#cbd5e1',
            border: `1px solid ${copied ? '#059669' : '#334155'}`,
            padding: '4px 12px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          {copied ? '✓ Copiado!' : '📋 Copiar'}
        </button>
      </div>

      <SyntaxHighlighter
        style={vscDarkPlus}
        language={language}
        PreTag="div"
        codeTagProps={{
          style: {
            whiteSpace: 'pre',
            display: 'block',
            fontFamily: 'Consolas, monospace',
            fontSize: '14px',
            lineHeight: '1.5'
          }
        }}
        customStyle={{
          padding: '16px',
          margin: 0,
          backgroundColor: '#0a0a0f',
          overflowX: 'auto',
          textAlign: 'left'
        }}
        {...props}
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  )
}

function App() {
  // 💡 FIX DO BUG DO ESPAÇO: O input usa o estado de texto puro.
  const [code, setCode] = useState('')
  const [selectedImage, setSelectedImage] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const fileInputRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const [language, setLanguage] = useState('python')
  const [action, setAction] = useState('analyze') 
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Olá Paulo! Sou o CodeGuard AI. Seleciona o modo desejado abaixo e coloca o teu código ou envia uma foto para começarmos!' }
  ])
  
  const [timer, setTimer] = useState(0)
  const [showTimer, setShowTimer] = useState(false)
  
  const timerRef = useRef(null)
  const tempoDecorridoRef = useRef(0)
  const chatEndRef = useRef(null)

  const activeTheme = languageThemes[language] || languageThemes.javascript

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (loading) {
      setTimer(0)
      tempoDecorridoRef.current = 0
      setShowTimer(true)
      timerRef.current = setInterval(() => {
        tempoDecorridoRef.current += 1
        setTimer(tempoDecorridoRef.current)
      }, 1000)
    } else {
      clearInterval(timerRef.current)
    }
    return () => clearInterval(timerRef.current)
  }, [loading])

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedImage(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const clearImage = () => {
    setSelectedImage(null)
    setPreviewUrl(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleAnalyze = async () => {
    const textSnapshot = code

    if (!textSnapshot.trim() && !selectedImage) {
      return alert('Por favor, digite algo ou envie uma foto!')
    }
  
    const userMessage = { 
      role: 'user', 
      text: `[Modo: ${action.toUpperCase()}] ${selectedImage ? '📸 (Foto anexada)' : ''}\n\n${textSnapshot}`, 
      lang: language 
    }
    setMessages(prev => [...prev, userMessage])
  
    setLoading(true)
    const currentImage = selectedImage
    
    setCode('') 
    clearImage() 
  
    try {
      const formData = new FormData()
      formData.append('code', textSnapshot)
      formData.append('language', language)
      formData.append('action', action)
      if (currentImage) {
        formData.append('image', currentImage)
      }

      const response = await fetch('http://localhost:5000/api/analyze', {
        method: 'POST',
        body: formData 
      })
    
      const data = await response.json()
      if (response.ok) {
        setMessages(prev => [...prev, { role: 'assistant', text: data.analysis }])
      } else {
        setMessages(prev => [...prev, { role: 'assistant', text: `❌ Erro no Servidor: ${data.error}` }])
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', text: `❌ Erro na conexão com o servidor Python.` }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      fontFamily: 'system-ui, sans-serif',
      backgroundColor: activeTheme.siteBg, 
      color: activeTheme.text, 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      textAlign: 'left',
      transition: 'background-color 0.4s ease' 
    }}>
      <header style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '2.4rem', color: activeTheme.primary, margin: '0 0 5px 0', fontWeight: '800', letterSpacing: '1px', transition: 'color 0.4s ease' }}>
          🛡️ CODEGUARD <span style={{ color: activeTheme.accent }}>AI</span>
        </h1>
        <p style={{ color: activeTheme.accent, margin: 0, fontWeight: '600', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.8 }}>
          Painel Temático Dinâmico
        </p>
      </header>

      {/* ÁREA DO CHAT CORES DINÂMICAS */}
      <div style={{
        width: '100%',
        maxWidth: '850px',
        height: '45vh', 
        backgroundColor: activeTheme.chatBg, 
        borderRadius: '14px',
        border: `1px solid ${activeTheme.primary}66`, 
        padding: '20px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
        boxSizing: 'border-box',
        boxShadow: `0 10px 30px -10px ${activeTheme.primary}33`,
        transition: 'all 0.4s ease'
      }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', width: '100%' }}>
            <div style={{
              maxWidth: '85%',
              padding: '14px 20px',
              borderRadius: '12px',
              border: `1px solid ${activeTheme.primary}44`,
              backgroundColor: msg.role === 'user' ? activeTheme.primary : '#11121a',
              color: '#ffffff', 
              boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
              lineHeight: '1.6',
              fontSize: '15px',
              textAlign: 'left'
            }}>
              <span style={{ 
                fontSize: '11px', 
                fontWeight: 'bold', 
                color: msg.role === 'user' ? '#ffffff' : activeTheme.primary, 
                display: 'block',
                marginBottom: '6px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                {msg.role === 'user' ? '👤 Paulo' : '🤖 CODEGUARD SYSTEM'}
              </span>
              
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '')
                    return !inline && match ? (
                      <CodeBlockWithCopy 
                        language={match[1]} 
                        codeString={String(children).replace(/\n$/, '')} 
                        {...props} 
                      />
                    ) : (
                      <code style={{ backgroundColor: '#2d3748', padding: '2px 6px', borderRadius: '4px', color: '#f43f5e', fontFamily: 'monospace', fontSize: '14px' }} {...props}>
                        {children}
                      </code>
                    )
                  },
                  ol: ({children}) => <ol style={{ textAlign: 'left', paddingLeft: '22px', margin: '0 0 12px 0', listStyleType: 'decimal' }}>{children}</ol>,
                  ul: ({children}) => <ul style={{ textAlign: 'left', paddingLeft: '22px', margin: '0 0 12px 0', listStyleType: 'disc' }}>{children}</ul >,
                  li: ({children}) => <li style={{ textAlign: 'left', marginBottom: '6px' }}>{children}</li>,
                  p: ({children}) => <p style={{ textAlign: 'left', margin: '0 0 12px 0', whiteSpace: 'pre-wrap' }}>{children}</p>
                }}
              >
                {msg.text}
              </ReactMarkdown>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* ÁREA DE CONTROLO, INPUT E SELETORES */}
      <main style={{ width: '100%', maxWidth: '850px', marginTop: '15px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        
        {/* FILA DO SELETOR DE IDIOMA, UPLOAD DE FOTO E TIMER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <img 
              src={activeTheme.logo} 
              alt={language} 
              style={{ width: '28px', height: '28px', objectFit: 'contain', transition: 'all 0.3s ease' }} 
            />
            <label style={{ fontWeight: 'bold', color: activeTheme.primary, transition: 'color 0.3s ease' }}>Linguagem:</label>
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)} 
              style={{ 
                padding: '8px 14px', 
                borderRadius: '6px', 
                border: `1px solid ${activeTheme.primary}`, 
                backgroundColor: '#0a0a0f', 
                color: '#ffffff', 
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'border-color 0.3s ease'
              }}
            >
              <option value="python">Python</option>
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="html">HTML</option>
              <option value="css">CSS</option>
              <option value="java">Java</option>
              <option value="csharp">C#</option>
              <option value="php">PHP</option>
              <option value="rust">Rust</option>
              <option value="sql">SQL</option>
              <option value="cpp">C++</option>
            </select>

            <input 
              type="file" 
              accept="image/*" 
              ref={fileInputRef} 
              onChange={handleImageChange} 
              style={{ display: 'none' }} 
            />
            <button 
              onClick={() => fileInputRef.current.click()} 
              style={{ 
                padding: '8px 16px', 
                borderRadius: '6px', 
                border: `1px solid ${activeTheme.primary}`, 
                backgroundColor: activeTheme.primary, 
                color: '#ffffff', 
                cursor: 'pointer', 
                fontWeight: 'bold',
                fontSize: '13px',
                transition: 'all 0.2s ease'
              }}
            >
              📷 Enviar Foto
            </button>
          </div>

          {showTimer && (
            <div style={{ color: '#f59e0b', fontWeight: 'bold', fontSize: '13px', backgroundColor: '#451a03', padding: '6px 12px', borderRadius: '6px', border: '1px solid #78350f' }}>
              ⚡ PROCESSANDO COM MODO {action.toUpperCase()}: {timer}s
            </div>
          )}
        </div>

        {/* 🖼️ MINIATURA DE PREVIEW DA IMAGEM SELECIONADA */}
        {previewUrl && (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px', 
            backgroundColor: '#0a0a0f', 
            padding: '10px', 
            borderRadius: '8px', 
            border: `1px solid ${activeTheme.primary}44`,
            width: 'fit-content' 
          }}>
            <div style={{ position: 'relative', width: '80px', height: '80px', border: `2px solid ${activeTheme.primary}`, borderRadius: '6px', overflow: 'hidden' }}>
              <img src={previewUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="preview" />
            </div>
            <button 
              onClick={clearImage} 
              style={{ backgroundColor: '#ef4444', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' }}
            >
              Remover Foto
            </button>
          </div>
        )}

        {/* 🛠️ SISTEMA DE ABAS/BOTÕES DE MODOS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', width: '100%' }}>
          <button 
            onClick={() => setAction('analyze')}
            style={{
              padding: '10px', borderRadius: '6px', border: action === 'analyze' ? `2px solid ${activeTheme.primary}` : '1px solid #334155',
              backgroundColor: action === 'analyze' ? '#1e293b' : '#0a0a0f', color: '#ffffff', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', transition: 'all 0.2s'
            }}
          >
            🔍 Análise Geral
          </button>
          <button 
            onClick={() => setAction('security')}
            style={{
              padding: '10px', borderRadius: '6px', border: action === 'security' ? '2px solid #ef4444' : '1px solid #334155',
              backgroundColor: action === 'security' ? '#7f1d1d' : '#0a0a0f', color: '#ffffff', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', transition: 'all 0.2s'
            }}
          >
            🛡️ Auditoria de Segurança
          </button>
          <button 
            onClick={() => setAction('tests')}
            style={{
              padding: '10px', borderRadius: '6px', border: action === 'tests' ? '2px solid #22c55e' : '1px solid #334155',
              backgroundColor: action === 'tests' ? '#064e3b' : '#0a0a0f', color: '#ffffff', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', transition: 'all 0.2s'
            }}
          >
            🧪 Gerar Testes Unitários
          </button>
          <button 
            onClick={() => setAction('education')}
            style={{
              padding: '10px', borderRadius: '6px', border: action === 'education' ? '2px solid #a855f7' : '1px solid #334155',
              backgroundColor: action === 'education' ? '#581c87' : '#0a0a0f', color: '#ffffff', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', transition: 'all 0.2s'
            }}
          >
            🎓 Modo Educativo
          </button>
        </div>

        {/* 💡 TEXTAREA COM VALOR PURO */}
        <textarea 
          rows="4" 
          value={code} 
          onChange={(e) => setCode(e.target.value)} 
          placeholder={`Cole o seu código ou peça algo em ${language.toUpperCase()}...`} 
          style={{ 
            width: '100%', 
            padding: '15px', 
            borderRadius: '10px', 
            border: `1px solid ${activeTheme.primary}88`, 
            backgroundColor: '#0a0a0f', 
            color: '#ffffff', 
            fontFamily: 'monospace', 
            fontSize: '14px', 
            boxSizing: 'border-box', 
            resize: 'none', 
            outline: 'none',
            transition: 'all 0.3s ease',
          }} 
          onFocus={(e) => e.target.style.border = `1px solid ${activeTheme.primary}`}
          onBlur={(e) => e.target.style.border = `1px solid ${activeTheme.primary}88`}
        />

        <button 
          onClick={handleAnalyze} 
          disabled={loading} 
          style={{ 
            padding: '14px', 
            borderRadius: '10px', 
            border: 'none', 
            backgroundColor: loading ? '#334155' : activeTheme.primary, 
            color: '#ffffff', 
            fontWeight: 'bold', 
            fontSize: '16px', 
            cursor: loading ? 'not-allowed' : 'pointer', 
            transition: 'all 0.3s ease', 
            boxShadow: `0 4px 12px ${activeTheme.primary}44`,
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}
        >
          {loading ? '⚡ PROCESSANDO REQUISIÇÃO...' : '🛡️ EXECUTAR CODEGUARD'}
        </button>
      </main>
    </div>
  )
}

export default App