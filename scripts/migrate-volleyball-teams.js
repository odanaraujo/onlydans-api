const { Client } = require("pg");

async function migrate() {
  const connectionString = process.env.DATABASE_URL;
  const config = connectionString
    ? {
        connectionString,
        ssl:
          process.env.NODE_ENV === "production"
            ? { rejectUnauthorized: true }
            : false,
      }
    : {
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
        user: process.env.POSTGRES_USER,
        database: process.env.POSTGRES_DB,
        password: process.env.POSTGRES_PASSWORD,
        ssl:
          process.env.NODE_ENV === "production"
            ? { rejectUnauthorized: true }
            : false,
      };
  const client = new Client(config);

  try {
    await client.connect();
    await client.query(`
      CREATE TABLE IF NOT EXISTS volleyball_teams (
        id BIGSERIAL PRIMARY KEY,
        team_name VARCHAR(60) NOT NULL,
        player_one_name VARCHAR(80) NOT NULL,
        player_two_name VARCHAR(80) NOT NULL,
        jersey_size VARCHAR(3) NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        CONSTRAINT volleyball_teams_jersey_size_check CHECK (jersey_size IN ('PP', 'P', 'M', 'G', 'GG', 'XGG')),
        CONSTRAINT volleyball_teams_different_players_check CHECK (LOWER(player_one_name) <> LOWER(player_two_name))
      );
    `);
    await client.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS volleyball_teams_unique_team_name
      ON volleyball_teams (LOWER(team_name));
    `);
    console.log("volleyball-teams-migration-complete");
  } finally {
    await client.end();
  }
}

migrate().catch(() => {
  console.error("volleyball-teams-migration-failed");
  process.exitCode = 1;
});
