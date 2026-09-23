import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";

export default function TimesInscritos() {
  const [teams, setTeams] = useState([]);
  const [status, setStatus] = useState("loading");
  useEffect(() => {
    async function loadTeams() {
      try {
        const response = await fetch("/api/volleyball-teams");
        const data = await response.json();
        if (!response.ok) throw new Error("Falha ao carregar os times.");
        setTeams(data.teams);
        setStatus("ready");
      } catch {
        setStatus("error");
      }
    }
    loadTeams();
  }, []);
  return (
    <>
      <Head>
        <title>Times inscritos | Galerinha do Vôlei</title>
      </Head>
      <main>
        <header>
          <Link href="/campeonato-galerinha-do-volei">
            ← Voltar para inscrição
          </Link>
          <p>GALERINHA DO VÔLEI</p>
          <h1>Times inscritos</h1>
          <span>🏐</span>
        </header>
        <section aria-live="polite">
          {status === "loading" && (
            <p className="message">Carregando as duplas...</p>
          )}
          {status === "error" && (
            <p className="message">Não foi possível carregar os times agora.</p>
          )}
          {status === "ready" && teams.length === 0 && (
            <p className="message">
              Ainda não há duplas inscritas. Que tal ser a primeira?
            </p>
          )}
          {teams.length > 0 && (
            <ol>
              {teams.map((team, index) => (
                <li key={`${team.teamName}-${index}`}>
                  <span className="number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2>{team.teamName}</h2>
                    <p>
                      {team.playerOneName} <span aria-hidden="true">&amp;</span>{" "}
                      {team.playerTwoName}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </section>
      </main>
      <style jsx>{`
        :global(*) {
          box-sizing: border-box;
        }
        :global(body) {
          margin: 0;
          color: #163250;
          background: #fff4db;
          font-family: Arial, sans-serif;
        }
        main {
          min-height: 100vh;
        }
        header {
          position: relative;
          overflow: hidden;
          padding: 34px max(24px, calc((100% - 900px) / 2)) 62px;
          color: #fff9e9;
          background: linear-gradient(135deg, #143d6d, #2e9d8f);
        }
        header a {
          color: #fff9e9;
          font-size: 0.9rem;
          font-weight: 700;
          text-decoration: none;
        }
        header p {
          margin: 46px 0 10px;
          color: #ffd166;
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.15em;
        }
        h1 {
          margin: 0;
          font-size: clamp(3rem, 8vw, 5.5rem);
          line-height: 0.92;
          letter-spacing: -0.07em;
        }
        header span {
          position: absolute;
          right: 9%;
          bottom: 22px;
          font-size: 4rem;
          transform: rotate(14deg);
        }
        section {
          max-width: 900px;
          margin: -28px auto 0;
          padding: 0 24px 60px;
          position: relative;
        }
        .message {
          margin: 0;
          padding: 26px;
          border-radius: 18px;
          background: #fffdf7;
          box-shadow: 0 12px 36px rgba(22, 50, 80, 0.12);
          text-align: center;
        }
        ol {
          display: grid;
          gap: 14px;
          margin: 0;
          padding: 0;
          list-style: none;
        }
        li {
          display: flex;
          gap: 20px;
          align-items: center;
          padding: 22px;
          border-radius: 18px;
          background: #fffdf7;
          box-shadow: 0 10px 28px rgba(22, 50, 80, 0.1);
        }
        .number {
          color: #d65d34;
          font-size: 1.1rem;
          font-weight: 800;
        }
        h2 {
          margin: 0;
          font-size: 1.25rem;
        }
        li p {
          margin: 5px 0 0;
          color: #547087;
        }
        li p span {
          color: #e58142;
          font-weight: 800;
        }
        @media (max-width: 550px) {
          header {
            padding-bottom: 46px;
          }
          header p {
            margin-top: 38px;
          }
          header span {
            opacity: 0.45;
          }
        }
      `}</style>
    </>
  );
}
