# Open Resume

Open Resume importa dados do LinkedIn, normaliza o perfil em um schema interno e gera um curriculo profissional otimizado para ATS.

## Stack

- Next.js 16 com App Router
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- PostgreSQL com `jsonb`
- `@florydev/linkedin-api-voyager`
- `@react-pdf/renderer`

## Variaveis de ambiente

Use o arquivo `.env.example` como base:

```bash
cp .env.example .env.local
```

Variaveis usadas:

- `DATABASE_URL`
- `LINKEDIN_JSESSIONID`
- `LINKEDIN_LI_AT`

## Rodando localmente

```bash
pnpm install
pnpm dev
```

Abra `http://localhost:3000`.

## Banco de dados

As migrations do projeto estao em `database/migrations`.

Arquivos atuais:

- `database/migrations/20261018_create_resumes.sql`
- `database/migrations/20261018_create_public_resume_links.sql`

## Fluxo atual

1. Landing page para importar URL publica ou `publicIdentifier` do LinkedIn.
2. Preview de curriculo ATS em `/resume`.
3. Salvamento no workspace do navegador atual via cookie de viewer.
4. Edicao basica do curriculo em `/dashboard`.
5. Publicacao de link e exportacao em PDF por rota server-side.

## Observacoes

- A Voyager API roda somente no servidor.
- O fluxo atual nao usa OAuth oficial do LinkedIn.
- A conta do LinkedIn usada pelos cookies pode expirar ou sofrer rate limit.

## Qualidade

Comandos validados nesta implementacao:

```bash
pnpm lint
pnpm build
```
