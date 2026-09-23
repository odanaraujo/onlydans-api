export const JERSEY_SIZES = ["PP", "P", "M", "G", "GG", "XGG"];

const JERSEY_SIZE_SET = new Set(JERSEY_SIZES);
const NAME_PATTERN = /^[\p{L}\p{M}][\p{L}\p{M}' -]*$/u;
const TEAM_PATTERN = /^[\p{L}\p{M}0-9][\p{L}\p{M}0-9' .&()-]*$/u;

export function normalizeText(value) {
  return typeof value === "string" ? value.trim().replace(/\s+/g, " ") : "";
}

export function normalizeRegistration(registration) {
  return {
    teamName: normalizeText(registration?.teamName),
    playerOneName: normalizeText(registration?.playerOneName),
    playerTwoName: normalizeText(registration?.playerTwoName),
    jerseySize: normalizeText(registration?.jerseySize).toUpperCase(),
  };
}

export function getRegistrationValidationError(registration) {
  const { teamName, playerOneName, playerTwoName, jerseySize } =
    normalizeRegistration(registration);

  if (
    teamName.length < 2 ||
    teamName.length > 60 ||
    !TEAM_PATTERN.test(teamName)
  ) {
    return "Informe um nome de time com 2 a 60 caracteres.";
  }

  if (
    playerOneName.length < 2 ||
    playerOneName.length > 80 ||
    !NAME_PATTERN.test(playerOneName)
  ) {
    return "Informe o nome do Jogador 1 usando apenas letras, espaços, hífen ou apóstrofo.";
  }

  if (
    playerTwoName.length < 2 ||
    playerTwoName.length > 80 ||
    !NAME_PATTERN.test(playerTwoName)
  ) {
    return "Informe o nome do Jogador 2 usando apenas letras, espaços, hífen ou apóstrofo.";
  }

  if (!JERSEY_SIZE_SET.has(jerseySize)) {
    return "Selecione o tamanho das camisas.";
  }

  if (
    playerOneName.localeCompare(playerTwoName, "pt-BR", {
      sensitivity: "base",
    }) === 0
  ) {
    return "Os dois jogadores devem ser pessoas diferentes.";
  }

  return null;
}
