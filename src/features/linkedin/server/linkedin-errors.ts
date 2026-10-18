export class LinkedinImportInputError extends Error {
  constructor(message = "Informe uma URL publica ou publicIdentifier do LinkedIn.") {
    super(message);
    this.name = "LinkedinImportInputError";
  }
}

export class LinkedinImportSessionError extends Error {
  constructor(message = "A sessao do LinkedIn expirou ou nao esta configurada.") {
    super(message);
    this.name = "LinkedinImportSessionError";
  }
}

export class LinkedinImportRateLimitError extends Error {
  constructor(message = "O LinkedIn limitou temporariamente a importacao.") {
    super(message);
    this.name = "LinkedinImportRateLimitError";
  }
}
