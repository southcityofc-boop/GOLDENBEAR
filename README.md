
# Golden Bear Store — com Mercado Pago (produção)

## Como usar (local)
1. Copie `.env.local.example` para `.env.local` e preencha as chaves de produção:
   - `MP_PUBLIC_KEY`
   - `MP_ACCESS_TOKEN`
   - `MP_BACK_URL` (ex: https://seusite.com/success)
2. Instale dependências:
   ```bash
   npm install
   ```
3. Rode em desenvolvimento:
   ```bash
   npm run dev
   ```
4. Teste compras (atenção: em produção as transações são reais). Use em ambiente de produção somente com suas chaves.

## Deploy (Vercel)
- Suba no GitHub e importe no Vercel.
- No Vercel Project Settings → Environment Variables, adicione `MP_PUBLIC_KEY`, `MP_ACCESS_TOKEN`, `MP_BACK_URL` (valores de produção).
