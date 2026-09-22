# Reparos Geniais — site (PT + EN)

Site de duas páginas — português e inglês — pronto para publicar no GitHub +
Vercel. Sem build, sem framework, sem `npm install`.

```
reparos-geniais-site/
├── index.html       ← página em português (a URL raiz, ex: seusite.com/)
├── en/
│   └── index.html   ← página em inglês (ex: seusite.com/en/)
├── styles.css        ← visual das duas páginas (edite uma vez, vale pras duas)
├── config.js         ← telefone, WhatsApp, e-mail e horário (edite uma vez, vale pras duas)
└── README.md
```

## Como o inglês aparece para estrangeiros

1. **URL própria** (`/en/`) — o Google indexa a página em inglês
   separadamente da página em português, então ela pode aparecer em buscas
   feitas em inglês por gente da sua região (ex.: "handyman near [sua
   cidade]").
2. **Tags `hreflang`** no `<head>` das duas páginas — dizem ao Google que as
   duas são a mesma página em idiomas diferentes, para ele mostrar a versão
   certa pra cada pessoa.
3. **Seletor "PT / EN"** no topo do site — qualquer visitante troca de idioma
   com um clique, em qualquer página.
4. **Aviso automático**: se alguém abrir a página em português com o
   navegador configurado em inglês (ou vice-versa), aparece uma barrinha
   discreta no topo sugerindo trocar de idioma — sem redirecionar
   automaticamente, então não atrapalha quem já está no idioma certo nem
   prejudica a indexação do Google.

## Editar seus dados de contato (vale para as duas línguas)

Abra `config.js` e edite:

```js
const CONFIG = {
  whatsappNumber: "5511999999999",   // DDI + DDD + número, só dígitos
  whatsappMessage: {
    pt: "Olá! Vim pelo site e gostaria de um orçamento.",
    en: "Hi! I found your site and I'd like a quote."
  },
  phoneDisplay: "(11) 99999-9999",
  phoneDial: "+5511999999999",
  email: "contato@reparosgeniais.com.br",
  hours: {
    pt: "Segunda a sábado, 8h às 18h",
    en: "Monday to Saturday, 8am–6pm"
  },
  city: {
    pt: "Atendemos toda a região — consulte disponibilidade",
    en: "Serving the whole area — ask about availability"
  }
};
```

Isso atualiza automaticamente todos os botões de WhatsApp, telefone e e-mail
nas duas páginas — cabeçalho, seção principal, seção de contato, rodapé e o
botão flutuante.

## Depois de publicar: atualize as URLs de SEO

Em `index.html` e em `en/index.html`, no `<head>`, troque
`https://SEU-DOMINIO` pela URL real do seu site na Vercel (ex.:
`https://reparos-geniais.vercel.app`) nestas linhas:

```html
<link rel="alternate" hreflang="pt-BR" href="https://SEU-DOMINIO/">
<link rel="alternate" hreflang="en" href="https://SEU-DOMINIO/en/">
<link rel="alternate" hreflang="x-default" href="https://SEU-DOMINIO/">
<link rel="canonical" href="https://SEU-DOMINIO/">
```

## Quer mais idiomas no futuro?

Copie a pasta `en/` para, por exemplo, `es/`, traduza os textos do HTML,
adicione as tags `hreflang` correspondentes nas três páginas e um novo item
no `whatsappMessage`/`hours`/`city` do `config.js`. A estrutura já está
pronta para crescer assim.

## Publicar no GitHub

```bash
cd reparos-geniais-site
git init
git add .
git commit -m "Site Reparos Geniais (PT + EN)"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/reparos-geniais.git
git push -u origin main
```

## Publicar na Vercel

1. Acesse [vercel.com](https://vercel.com) e faça login com sua conta GitHub.
2. Clique em **Add New → Project**.
3. Selecione o repositório `reparos-geniais`.
4. É um site estático — a Vercel detecta sozinha, não precisa configurar
   build command nem output directory.
5. Clique em **Deploy**. Em cerca de 30 segundos o site estará no ar, com uma
   URL do tipo `reparos-geniais.vercel.app` e a versão em inglês acessível em
   `reparos-geniais.vercel.app/en`.
6. Volte e atualize as tags `hreflang`/`canonical` (passo acima) com essa URL
   real, faça commit e push — a Vercel republica automaticamente.
7. Para usar seu próprio domínio, vá em **Settings → Domains** no projeto da
   Vercel.
