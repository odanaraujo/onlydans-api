import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import {
  getRegistrationValidationError,
  JERSEY_SIZES,
} from "../lib/volleyball-registration";

const INITIAL_FORM = {
  teamName: "",
  playerOneName: "",
  playerTwoName: "",
  jerseySize: "",
};
export default function GalerinhaDoVolei() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (status.type === "error") setStatus({ type: "idle", message: "" });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const validationError = getRegistrationValidationError(form);

    if (validationError) {
      setStatus({ type: "error", message: validationError });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: "idle", message: "" });
    try {
      const response = await fetch("/api/volleyball-teams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Não foi possível concluir a inscrição.");
      setForm(INITIAL_FORM);
      setStatus({
        type: "success",
        message: "Dupla inscrita com sucesso. Até a quadra!",
      });
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Head>
        <title>Galerinha do Vôlei | Inscrição de duplas</title>
        <meta
          name="description"
          content="Inscreva sua dupla no campeonato Galerinha do Vôlei."
        />
      </Head>
      <main className="page-shell">
        <section className="hero">
          <Link className="back-link" href="/">
            ← OnlyDans
          </Link>
          <p className="eyebrow">CAMPEONATO DE VÔLEI</p>
          <h1>Galerinha do Vôlei</h1>
          <p className="hero-copy">
            Junte a sua dupla, escolha o nome do time e venha fazer parte dessa
            resenha na quadra.
          </p>
          <div className="hero-decoration" aria-hidden="true">
            <span>🏐</span>
            <span>✦</span>
            <span>☀</span>
          </div>
        </section>
        <section className="content-grid">
          <div className="details-card">
            <p className="card-kicker">INSCRIÇÃO EM DUPLA</p>
            <h2>Dois jogadores. Um time.</h2>
            <ul>
              <li>Escolha um nome marcante para a dupla.</li>
              <li>Informe os dois jogadores do time.</li>
              <li>Selecione o tamanho das camisas da dupla.</li>
            </ul>
            <Link
              className="teams-link"
              href="/campeonato-galerinha-do-volei/times"
            >
              Ver times já inscritos <span aria-hidden="true">→</span>
            </Link>
          </div>
          <form className="registration-card" onSubmit={handleSubmit}>
            <div className="form-heading">
              <p className="card-kicker">SUA DUPLA</p>
              <h2>Garanta a vaga</h2>
            </div>
            <label htmlFor="teamName">Nome do time</label>
            <input
              id="teamName"
              name="teamName"
              value={form.teamName}
              onChange={updateField}
              autoComplete="off"
              maxLength="60"
              minLength="2"
              required
              placeholder="Ex.: Saque de Ouro"
            />
            <div className="player-fields">
              <div>
                <label htmlFor="playerOneName">Jogador 1</label>
                <input
                  id="playerOneName"
                  name="playerOneName"
                  value={form.playerOneName}
                  onChange={updateField}
                  autoComplete="name"
                  maxLength="80"
                  minLength="2"
                  required
                  placeholder="Nome completo"
                />
              </div>
              <div>
                <label htmlFor="playerTwoName">Jogador 2</label>
                <input
                  id="playerTwoName"
                  name="playerTwoName"
                  value={form.playerTwoName}
                  onChange={updateField}
                  autoComplete="name"
                  maxLength="80"
                  minLength="2"
                  required
                  placeholder="Nome completo"
                />
              </div>
            </div>
            <label htmlFor="jerseySize">Tamanho das camisas</label>
            <select
              id="jerseySize"
              name="jerseySize"
              value={form.jerseySize}
              onChange={updateField}
              required
            >
              <option value="" disabled>
                Selecione o tamanho
              </option>
              {JERSEY_SIZES.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            {status.type !== "idle" && (
              <p
                className={`form-status ${status.type}`}
                role={status.type === "error" ? "alert" : "status"}
              >
                {status.message}
              </p>
            )}
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Enviando inscrição..." : "Inscrever minha dupla"}
            </button>
          </form>
        </section>
      </main>
      <style jsx>{`
        :global(*) {
          box-sizing: border-box;
        }
        :global(body) {
          margin: 0;
          background: #fff4db;
          color: #172c4b;
          font-family: Arial, sans-serif;
        }
        .page-shell {
          min-height: 100vh;
          overflow: hidden;
        }
        .hero {
          position: relative;
          padding: 36px max(24px, calc((100% - 1100px) / 2)) 130px;
          color: #fff9e9;
          background:
            radial-gradient(
              circle at 78% 18%,
              #ffdf75 0 10%,
              transparent 10.5%
            ),
            radial-gradient(circle at 90% 12%, #f9844a 0 5%, transparent 5.5%),
            linear-gradient(135deg, #143d6d, #246a73 52%, #2e9d8f);
        }
        .back-link {
          display: inline-block;
          color: inherit;
          font-size: 0.9rem;
          font-weight: 700;
          text-decoration: none;
        }
        .eyebrow,
        .card-kicker {
          margin: 58px 0 12px;
          color: #ffd166;
          font-size: 0.74rem;
          font-weight: 800;
          letter-spacing: 0.14em;
        }
        h1 {
          max-width: 680px;
          margin: 0;
          font-size: clamp(3.4rem, 8vw, 6.5rem);
          line-height: 0.9;
          letter-spacing: -0.07em;
        }
        .hero-copy {
          max-width: 520px;
          margin: 22px 0 0;
          color: #e7f8ec;
          font-size: clamp(1rem, 2vw, 1.25rem);
          line-height: 1.55;
        }
        .hero-decoration {
          position: absolute;
          right: max(24px, calc((100% - 1100px) / 2));
          bottom: 38px;
          display: flex;
          align-items: center;
          gap: 24px;
          color: #ffd166;
          font-size: 3rem;
          transform: rotate(-8deg);
        }
        .hero-decoration span:nth-child(2) {
          font-size: 1.6rem;
          color: #ff9f68;
        }
        .hero-decoration span:nth-child(3) {
          color: #fff9e9;
        }
        .content-grid {
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          gap: 26px;
          max-width: 1100px;
          margin: -78px auto 0;
          padding: 0 24px 64px;
          position: relative;
        }
        .details-card,
        .registration-card {
          border-radius: 24px;
          box-shadow: 0 18px 50px rgba(22, 50, 80, 0.16);
        }
        .details-card {
          align-self: start;
          padding: 34px;
          color: #143d6d;
          background: #ffd166;
        }
        .registration-card {
          padding: 34px;
          background: #fffdf7;
        }
        .details-card .card-kicker,
        .registration-card .card-kicker {
          margin: 0 0 10px;
          color: #d65d34;
        }
        h2 {
          margin: 0;
          font-size: clamp(1.7rem, 3vw, 2.25rem);
          letter-spacing: -0.04em;
        }
        ul {
          margin: 24px 0 34px;
          padding-left: 20px;
          line-height: 1.65;
        }
        li + li {
          margin-top: 10px;
        }
        .teams-link {
          display: inline-flex;
          gap: 12px;
          align-items: center;
          padding: 13px 16px;
          border-radius: 12px;
          color: #fff9e9;
          background: #143d6d;
          font-weight: 700;
          text-decoration: none;
        }
        .teams-link span {
          font-size: 1.2rem;
        }
        .form-heading {
          margin-bottom: 26px;
        }
        label {
          display: block;
          margin: 18px 0 7px;
          color: #21466c;
          font-size: 0.9rem;
          font-weight: 700;
        }
        input,
        select {
          width: 100%;
          min-height: 48px;
          border: 1px solid #c5d1d9;
          border-radius: 10px;
          padding: 11px 13px;
          color: #172c4b;
          background: #fff;
          font: inherit;
        }
        input:focus,
        select:focus {
          outline: 3px solid rgba(46, 157, 143, 0.28);
          border-color: #2e9d8f;
        }
        .player-fields {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .form-status {
          margin: 18px 0 0;
          padding: 11px 13px;
          border-radius: 9px;
          font-size: 0.92rem;
        }
        .form-status.success {
          color: #145143;
          background: #d8f4e7;
        }
        .form-status.error {
          color: #992f23;
          background: #ffe1d9;
        }
        button {
          width: 100%;
          margin-top: 24px;
          min-height: 52px;
          border: 0;
          border-radius: 12px;
          color: #fff;
          background: #d65d34;
          cursor: pointer;
          font: inherit;
          font-weight: 800;
          transition:
            transform 0.15s ease,
            background 0.15s ease;
        }
        button:hover:not(:disabled) {
          background: #b94729;
          transform: translateY(-1px);
        }
        button:disabled {
          cursor: wait;
          opacity: 0.72;
        }
        @media (max-width: 720px) {
          .hero {
            padding-bottom: 105px;
          }
          .eyebrow {
            margin-top: 44px;
          }
          .content-grid {
            grid-template-columns: 1fr;
            margin-top: -45px;
          }
          .details-card,
          .registration-card {
            padding: 26px;
          }
          .player-fields {
            grid-template-columns: 1fr;
            gap: 0;
          }
          .hero-decoration {
            right: 20px;
            bottom: 24px;
            font-size: 2.3rem;
          }
        }
      `}</style>
    </>
  );
}
