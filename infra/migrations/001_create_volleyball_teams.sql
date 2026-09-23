CREATE TABLE volleyball_teams (
  id BIGSERIAL PRIMARY KEY,
  team_name VARCHAR(60) NOT NULL,
  player_one_name VARCHAR(80) NOT NULL,
  player_two_name VARCHAR(80) NOT NULL,
  jersey_size VARCHAR(3) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT volleyball_teams_jersey_size_check CHECK (jersey_size IN ('PP', 'P', 'M', 'G', 'GG', 'XGG')),
  CONSTRAINT volleyball_teams_different_players_check CHECK (LOWER(player_one_name) <> LOWER(player_two_name))
);

CREATE UNIQUE INDEX volleyball_teams_unique_team_name
  ON volleyball_teams (LOWER(team_name));
