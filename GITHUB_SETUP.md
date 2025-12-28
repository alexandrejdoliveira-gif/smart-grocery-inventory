# 🚀 Guia Passo a Passo: Push para GitHub

## ✅ Pré-requisitos Verificados

- [x] Git instalado
- [x] GitHub CLI instalado
- [x] Repositório local criado (3 commits)

---

## 📝 Passo 1: Login no GitHub CLI

Abra o terminal e execute:

```bash
gh auth login
```

**Você verá as seguintes perguntas:**

### 1.1 Escolha o tipo de conta
```
? What account do you want to log into?
> GitHub.com
  GitHub Enterprise Server
```
**Resposta:** Pressione `Enter` (GitHub.com já está selecionado)

### 1.2 Escolha o protocolo
```
? What is your preferred protocol for Git operations?
  HTTPS
> SSH
```
**Resposta:** Use as setas ↑↓ para selecionar `HTTPS` e pressione `Enter`

### 1.3 Autenticar credenciais Git
```
? Authenticate Git with your GitHub credentials?
> Yes
  No
```
**Resposta:** Pressione `Enter` (Yes)

### 1.4 Como você quer fazer login?
```
? How would you like to authenticate GitHub CLI?
> Login with a web browser
  Paste an authentication token
```
**Resposta:** Pressione `Enter` (Login with a web browser)

### 1.5 Copie o código
```
! First copy your one-time code: XXXX-XXXX
Press Enter to open github.com in your browser...
```
**Ação:**
1. Copie o código exibido (ex: `ABCD-1234`)
2. Pressione `Enter`
3. Seu navegador abrirá automaticamente
4. Cole o código na página do GitHub
5. Clique em "Authorize"
6. Volte ao terminal

**Sucesso:** Você verá:
```
✓ Authentication complete.
✓ Logged in as YOUR_USERNAME
```

---

## 📦 Passo 2: Criar Repositório no GitHub

Agora que está autenticado, execute:

```bash
gh repo create smart-grocery-inventory --public --source=. --remote=origin --push
```

**O que este comando faz:**
- `smart-grocery-inventory` = Nome do repositório
- `--public` = Repositório público (use `--private` se preferir privado)
- `--source=.` = Usa o diretório atual
- `--remote=origin` = Adiciona como remote "origin"
- `--push` = Faz push automático dos commits

**Você verá:**
```
✓ Created repository YOUR_USERNAME/smart-grocery-inventory on GitHub
✓ Added remote https://github.com/YOUR_USERNAME/smart-grocery-inventory.git
✓ Pushed commits to https://github.com/YOUR_USERNAME/smart-grocery-inventory.git
```

---

## 🎉 Passo 3: Verificar no GitHub

1. Abra seu navegador
2. Vá para: `https://github.com/YOUR_USERNAME/smart-grocery-inventory`
3. Você verá seu código lá! ✨

---

## 🔄 Comandos para Uso Diário

### Fazer mudanças e enviar para GitHub:

```bash
# 1. Fazer alterações nos arquivos
# ... editar código ...

# 2. Ver o que mudou
git status

# 3. Adicionar arquivos modificados
git add .

# 4. Criar commit
git commit -m "feat: adicionar nova funcionalidade"

# 5. Enviar para GitHub
git push
```

### Ver histórico de commits:

```bash
git log --oneline
```

### Ver status do repositório:

```bash
git status
```

### Ver diferenças:

```bash
git diff
```

---

## ⚠️ Solução de Problemas

### Erro: "gh: command not found" (depois de instalar)

**Solução:** Feche e abra o terminal novamente para recarregar as variáveis de ambiente.

### Erro: "authentication failed"

**Solução:** Execute novamente:
```bash
gh auth login
```

### Erro: "repository already exists"

**Solução:** O repositório já foi criado. Apenas adicione o remote:
```bash
git remote add origin https://github.com/YOUR_USERNAME/smart-grocery-inventory.git
git push -u origin main
```

### Erro: "failed to push"

**Solução:** Verifique se está na branch correta:
```bash
git branch
# Se não estiver em 'main', mude:
git checkout -b main
git push -u origin main
```

---

## 🎯 Resumo Rápido

**Comandos na ordem:**

```bash
# 1. Login (uma vez)
gh auth login

# 2. Criar repo e fazer push (uma vez)
gh repo create smart-grocery-inventory --public --source=. --remote=origin --push

# 3. Verificar
gh repo view --web
```

**Pronto! Seu código está no GitHub! 🎊**

---

## 📱 Próximo Passo: Deploy no Vercel

Depois que o código estiver no GitHub, siga para o deploy no Vercel:

1. Acesse: https://vercel.com/new
2. Clique em "Import Git Repository"
3. Selecione `smart-grocery-inventory`
4. Clique em "Deploy"
5. Aguarde 2-3 minutos
6. Seu app estará online! 🚀

URL do app: `https://smart-grocery-inventory.vercel.app`

---

**Dúvidas?** Execute os comandos passo a passo e me avise se encontrar algum erro!
