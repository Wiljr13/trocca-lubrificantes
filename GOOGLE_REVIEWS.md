# Sincronizar avaliações do Google

Este projeto nao deve colocar o `client_secret` no HTML. O fluxo correto e rodar o sincronizador localmente, gerar um arquivo publico sem segredo e deixar o site carregar esse arquivo.

## 1. Configure o OAuth no Google Cloud

No cliente OAuth, adicione este URI em **URIs de redirecionamento autorizados**:

```txt
http://localhost:5177/oauth2callback
```

Confirme tambem que a conta administradora da Trocca esta cadastrada como usuario de teste na tela de consentimento, caso o app ainda esteja em modo de teste.

## 2. Rode a sincronizacao

No terminal, dentro da pasta do site:

```powershell
node tools/sync-google-reviews.js "C:\Users\wilso\OneDrive\Área de Trabalho\client_secret_2_465875416891-admlkbcq7qn8jdpaf2p9vlmbssuvp4so.apps.googleusercontent.com.json"
```

O script vai mostrar um link de login. Abra o link, autorize com a conta que administra o Perfil da Empresa da Trocca e aguarde a mensagem de sucesso.

Depois disso, ele vai criar/atualizar:

```txt
assets/google-reviews.js
```

Esse arquivo contem apenas os dados publicos das avaliacoes que aparecem no site.

## Observacoes

- O token local fica em `.google-review-token.json` e esta no `.gitignore`.
- O JSON `client_secret*.json` tambem esta no `.gitignore`.
- Se o Google retornar `redirect_uri_mismatch`, o URI do passo 1 ainda nao foi salvo corretamente no OAuth.
- Se nao encontrar conta/localizacao, defina manualmente:

```powershell
$env:GBP_ACCOUNT_ID="SEU_ACCOUNT_ID"
$env:GBP_LOCATION_ID="SEU_LOCATION_ID"
node tools/sync-google-reviews.js "C:\Users\wilso\OneDrive\Área de Trabalho\client_secret_2_465875416891-admlkbcq7qn8jdpaf2p9vlmbssuvp4so.apps.googleusercontent.com.json"
```
