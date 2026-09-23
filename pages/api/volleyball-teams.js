import { query } from "../../lib/database";
import {
  getRegistrationValidationError,
  normalizeRegistration,
} from "../../lib/volleyball-registration";

const MAX_TEAMS_TO_LIST = 500;
const MAX_REQUESTS_PER_WINDOW = 8;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const requestsByIp = new Map();

function isRateLimited(request) {
  const now = Date.now();
  const ip = request.socket?.remoteAddress || "unknown";
  const current = requestsByIp.get(ip);

  if (!current || now - current.startedAt >= RATE_LIMIT_WINDOW_MS) {
    requestsByIp.set(ip, { startedAt: now, count: 1 });
    return false;
  }

  current.count += 1;
  return current.count > MAX_REQUESTS_PER_WINDOW;
}

function hasTrustedOrigin(request) {
  if (!request.headers.origin) return true;

  try {
    return new URL(request.headers.origin).host === request.headers.host;
  } catch {
    return false;
  }
}

export default async function handler(request, response) {
  if (request.method === "GET") {
    try {
      const result = await query(
        `SELECT team_name, player_one_name, player_two_name
         FROM volleyball_teams
         ORDER BY created_at ASC
         LIMIT $1`,
        [MAX_TEAMS_TO_LIST],
      );
      return response.status(200).json({
        teams: result.rows.map((team) => ({
          teamName: team.team_name,
          playerOneName: team.player_one_name,
          playerTwoName: team.player_two_name,
        })),
      });
    } catch {
      console.error("volleyball-team-list-failed");
      return response
        .status(500)
        .json({ error: "Não foi possível carregar os times." });
    }
  }

  if (request.method !== "POST") {
    response.setHeader("Allow", ["GET", "POST"]);
    return response.status(405).json({ error: "Método não permitido." });
  }

  if (!hasTrustedOrigin(request)) {
    return response
      .status(403)
      .json({ error: "Origem da solicitação não permitida." });
  }

  if (isRateLimited(request)) {
    return response.status(429).json({
      error: "Muitas tentativas. Aguarde alguns minutos e tente novamente.",
    });
  }

  const registration = normalizeRegistration(request.body);
  const validationError = getRegistrationValidationError(registration);

  if (validationError) {
    return response.status(422).json({ error: validationError });
  }

  try {
    const result = await query(
      `INSERT INTO volleyball_teams (team_name, player_one_name, player_two_name, jersey_size)
       VALUES ($1, $2, $3, $4)
       RETURNING id`,
      [
        registration.teamName,
        registration.playerOneName,
        registration.playerTwoName,
        registration.jerseySize,
      ],
    );
    return response.status(201).json({ id: result.rows[0].id });
  } catch (error) {
    if (error?.code === "23505") {
      return response
        .status(409)
        .json({ error: "Este nome de time já foi cadastrado." });
    }

    console.error("volleyball-team-registration-failed");
    return response
      .status(500)
      .json({ error: "Não foi possível concluir a inscrição." });
  }
}
