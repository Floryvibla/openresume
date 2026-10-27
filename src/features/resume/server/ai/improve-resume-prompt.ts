import type { ResumeDocument } from "@/features/resume/types/resume-document";

const languageNames: Record<ResumeDocument["language"], string> = {
  "pt-BR": "portugues do Brasil",
  en: "ingles",
  fr: "frances",
};

type PromptInput = {
  jobContext: string;
  resume: ResumeDocument;
};

export function buildResumeAiSystemPrompt(resume: ResumeDocument) {
  return [
    "Voce e especialista em recrutamento e em curriculos otimizados para sistemas ATS.",
    `Escreva todo o conteudo em ${languageNames[resume.language]}.`,
    "Metodo XYZ do Google: cada bullet de experiencia deve seguir 'Alcancei [X] medido por [Y] fazendo [Z]'.",
    "Toda descricao de experiencia deve ser uma lista de bullet points: uma conquista por linha, cada linha comecando com '- ' e separadas por quebra de linha (\\n).",
    "Comece cada bullet com um verbo de acao no passado e inclua um resultado mensuravel.",
    "Quando uma experiencia nao tiver descricao, crie de 3 a 4 bullets plausiveis com base no cargo, na empresa, nas skills e no contexto da vaga informada.",
    "Normalize o nome das certificacoes para a forma oficial, mantendo a mesma quantidade e a mesma ordem. Nunca crie certificacoes novas.",
    "Nao invente empresas, cargos, datas, formacoes ou certificacoes.",
    "Mantenha exatamente a mesma quantidade e a mesma ordem das experiencias recebidas.",
    "Nao repita a mesma informacao no resumo e nas experiencias.",
  ].join("\n");
}

export function buildResumeAiPrompt({ jobContext, resume }: PromptInput) {
  const promptSections = [
    "<curriculo>",
    JSON.stringify(resume),
    "</curriculo>",
  ];

  if (jobContext.trim()) {
    promptSections.push("<vaga>", jobContext.trim(), "</vaga>");
    promptSections.push(
      "Adapte o curriculo para essa vaga: use as palavras-chave, tecnologias e resultados que ela valoriza, sempre com base no contexto real do curriculo.",
    );
  } else {
    promptSections.push(
      "Nao ha uma vaga especifica. Aplique boas praticas de curriculo para ATS com o metodo XYZ.",
    );
  }

  promptSections.push(
    "Responda mantendo a mesma quantidade e ordem das experiencias e descreva cada uma com bullet points separados por quebra de linha.",
  );

  return promptSections.join("\n");
}
