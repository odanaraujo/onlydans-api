import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';

const VIDEO_ID = 'WsxfiFTcDlI';

function SamaraTeAmo() {
  const petalsRef = useRef(null);
  const playerRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const container = petalsRef.current;
    if (!container) return;
    const symbols = ['♥', '✿', '❀', '♡'];
    const count = 18;
    const created = [];
    for (let i = 0; i < count; i++) {
      const p = document.createElement('span');
      p.className = 'petal';
      p.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      p.style.left = Math.random() * 100 + 'vw';
      p.style.animationDuration = 10 + Math.random() * 14 + 's';
      p.style.animationDelay = -Math.random() * 14 + 's';
      p.style.fontSize = 0.8 + Math.random() * 1.6 + 'rem';
      p.style.opacity = (0.25 + Math.random() * 0.5).toFixed(2);
      container.appendChild(p);
      created.push(p);
    }
    return () => {
      created.forEach((el) => el.remove());
    };
  }, []);

  useEffect(() => {
    window.onYouTubeIframeAPIReady = function () {
      playerRef.current = new window.YT.Player('yt-player', {
        height: '180',
        width: '320',
        videoId: VIDEO_ID,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          origin: window.location.origin,
        },
        events: {
          onReady: () => {
            if (playerRef.current.setVolume) playerRef.current.setVolume(80);
          },
          onStateChange: (e) => {
            if (e.data === window.YT.PlayerState.ENDED && playerRef.current) {
              playerRef.current.playVideo();
            }
          },
          onError: (e) => {
            console.warn('YT player error:', e.data);
          },
        },
      });
    };

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);

    return () => {
      window.onYouTubeIframeAPIReady = null;
    };
  }, []);

  const startExperience = () => {
    setStarted(true);
    const player = playerRef.current;
    if (player && typeof player.playVideo === 'function') {
      player.playVideo();
    } else {
      const wait = setInterval(() => {
        const p = playerRef.current;
        if (p && typeof p.playVideo === 'function') {
          p.playVideo();
          clearInterval(wait);
        }
      }, 200);
    }
  };

  const handleOverlayKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      startExperience();
    }
  };

  const toggleMute = () => {
    const player = playerRef.current;
    if (!player) return;
    if (isMuted) {
      player.unMute();
    } else {
      player.mute();
    }
    setIsMuted(!isMuted);
  };

  return (
    <>
      <Head>
        <title>Pra Samara, com amor</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Dancing+Script:wght@500;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="petals" aria-hidden="true" ref={petalsRef}></div>

      <div
        className={`start-overlay${started ? ' hidden' : ''}`}
        role="button"
        tabIndex={0}
        aria-label="Iniciar"
        onClick={startExperience}
        onKeyDown={handleOverlayKey}
      >
        <h1>Pra Samara</h1>
        <button className="play-button" aria-label="Tocar">▶</button>
        <p>Toque para começar, com som</p>
      </div>

      <main>
        <p className="opening">&ldquo;Hoje eu acordei mais feliz…&rdquo;</p>

        <div className="photo-frame">
          <img src="/images/logos/dan-samara.jpeg" alt="Eu e a Samara" />
        </div>

        <div className="declaration">
          <p>
            Tem músicas que parecem ter sido escritas pra gente. Quando o Zeca
            canta que acordou <em>mais feliz</em>, eu entendo cada palavra,
            porque você chegou, e desde então o meu peito tem batido no compasso
            do samba.
          </p>
          <p>
            Tem coisas na vida que a gente não consegue explicar direito. Só
            sente. Você é uma dessas coisas. Desde o dia <em>7 de junho</em>,
            quando tudo começou, eu venho tentando colocar em palavras o que
            acontece comigo quando estou perto de você. E a única resposta que
            faz sentido é que a gente foi feito um pro outro.
          </p>
          <p>
            Gostamos das mesmas músicas, dos mesmos passeios, do mesmo Recife que
            a gente ama tanto, aquele Recife do mar, do vento quente, da vida
            que pulsa de um jeito que só quem é daqui entende. E até a Brahma
            Chopp, a sua cerveja preferida, eu aprendi a gostar com você. Tem
            algo muito bonito nisso: você foi chegando e foi me fazendo querer
            as coisas que você gosta.
          </p>
          <p className="quote">
            &ldquo;No temporal, você é meu farol de milha.
            <br />
            Meu sol não brilha sem a luz dos olhos teus.&rdquo;
          </p>
          <p>
            Eu me belisco de vez em quando pra ver se é verdade. É. É muito
            real, Samara. Cada viagem que a gente planeja, cada momento que a
            gente vive junto vai me convencendo mais de que isso aqui não é só
            amor, é destino. E é <em>raiz</em>: daquelas que ficam fundas, que
            sustentam a árvore quando o vento bate, e que enchem de fruto cada
            estação que vier.
          </p>
          <p>
            Eu não quero um amor passageiro. Quero o <em>último romance</em>,
            aquele que a gente leva pro resto da vida sem cansar, que a gente
            vai contar um dia com um sorriso enorme no rosto. E eu quero que
            esse romance seja com você.
          </p>

          <div className="photo-frame photo-frame-inline">
            <img
              src="/images/logos/samara-dan-sport.jpeg"
              alt="Eu e a Samara"
            />
          </div>

          <p>
            Aqui está o começo. Aqui está a promessa de uma vida escrita a dois,
            com a calma de quem sabe que tem tempo, e a pressa boa de quem não
            quer perder um minuto ao seu lado. No nosso Recife, com a nossa
            Brahma Chopp, na nossa vida. Eu escolho você pra viver.
          </p>

          <p className="signature">
            Te amo, Samara. Completamente.
            <br />
            E hoje, mais feliz.
            <br />
            Dan.
          </p>
        </div>

        <p className="song-credit">Mais Feliz, de Zeca Pagodinho</p>
      </main>

      <button
        className={`audio-toggle${started ? ' visible' : ''}`}
        aria-label="Silenciar/ativar som"
        onClick={toggleMute}
      >
        {isMuted ? '🔇' : '🔊'}
      </button>

      <div id="yt-player"></div>

      <style jsx global>{`
        :root {
          --bg-1: #1a0d12;
          --bg-2: #2b1620;
          --bg-3: #3d1f2c;
          --accent: #e7c08a;
          --accent-soft: #f3d9b1;
          --rose: #d98ca0;
          --text: #f7ecd9;
          --text-soft: rgba(247, 236, 217, 0.78);
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html,
        body {
          height: 100%;
        }

        body {
          font-family: 'Cormorant Garamond', Georgia, serif;
          color: var(--text);
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
          background:
            radial-gradient(
              ellipse at top left,
              rgba(217, 140, 160, 0.18),
              transparent 60%
            ),
            radial-gradient(
              ellipse at bottom right,
              rgba(231, 192, 138, 0.12),
              transparent 60%
            ),
            linear-gradient(
              160deg,
              var(--bg-1) 0%,
              var(--bg-2) 50%,
              var(--bg-3) 100%
            );
          min-height: 100vh;
          overflow-x: hidden;
          line-height: 1.6;
          position: relative;
        }

        .petals {
          position: fixed;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 0;
        }
        .petal {
          position: absolute;
          top: -10%;
          font-size: 1.2rem;
          color: var(--rose);
          opacity: 0.55;
          animation: fall linear infinite;
          filter: drop-shadow(0 0 6px rgba(217, 140, 160, 0.35));
        }
        @keyframes fall {
          0% {
            transform: translateY(-10vh) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.7;
          }
          90% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(110vh) translateX(80px) rotate(360deg);
            opacity: 0;
          }
        }

        main {
          position: relative;
          z-index: 1;
          max-width: 780px;
          margin: 0 auto;
          padding: 4rem 1.5rem 6rem;
          text-align: center;
        }

        .opening {
          font-family: 'Dancing Script', cursive;
          font-size: clamp(2rem, 5vw, 3rem);
          color: var(--accent-soft);
          margin-bottom: 2rem;
          opacity: 0;
          animation: fadeUp 1.6s ease-out 0.3s forwards;
        }

        .photo-frame {
          position: relative;
          display: inline-block;
          padding: 14px;
          background: linear-gradient(
            135deg,
            rgba(231, 192, 138, 0.55),
            rgba(217, 140, 160, 0.35)
          );
          border-radius: 14px;
          box-shadow:
            0 30px 60px rgba(0, 0, 0, 0.45),
            0 0 0 1px rgba(247, 236, 217, 0.08) inset;
          opacity: 0;
          transform: translateY(20px);
          animation: fadeUp 1.6s ease-out 0.9s forwards;
          margin-bottom: 3rem;
        }
        .photo-frame::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 16px;
          background: linear-gradient(
            135deg,
            var(--accent),
            var(--rose),
            var(--accent)
          );
          z-index: -1;
          filter: blur(14px);
          opacity: 0.6;
        }
        .photo-frame img {
          display: block;
          max-width: 100%;
          width: min(420px, 80vw);
          height: auto;
          border-radius: 8px;
        }

        .declaration {
          font-size: clamp(1.2rem, 1.8vw, 1.4rem);
          color: var(--text);
          max-width: 620px;
          margin: 0 auto;
        }
        .declaration p {
          margin-bottom: 1.4rem;
          font-weight: 500;
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.45);
          opacity: 0;
          transform: translateY(14px);
          animation: fadeUp 1.4s ease-out forwards;
        }
        .declaration p:nth-of-type(1) {
          animation-delay: 1.6s;
        }
        .declaration p:nth-of-type(2) {
          animation-delay: 2s;
        }
        .declaration p:nth-of-type(3) {
          animation-delay: 2.4s;
        }
        .declaration p:nth-of-type(4) {
          animation-delay: 2.8s;
        }
        .declaration p:nth-of-type(5) {
          animation-delay: 3.2s;
        }
        .declaration p:nth-of-type(6) {
          animation-delay: 3.6s;
        }
        .declaration p:nth-of-type(7) {
          animation-delay: 4.4s;
        }

        .photo-frame-inline {
          margin-top: 1rem;
          margin-bottom: 1rem;
          animation-delay: 4s;
        }
        .photo-frame-inline img {
          width: min(360px, 75vw);
        }

        .declaration em {
          color: var(--accent-soft);
          font-style: italic;
        }

        .declaration .quote {
          font-family: 'Dancing Script', cursive;
          font-style: italic;
          font-weight: 600;
          font-size: clamp(1.45rem, 2.4vw, 1.85rem);
          color: var(--accent-soft);
          line-height: 1.5;
          padding: 1.2rem 0;
          margin: 0.6rem auto 1.8rem;
          border-top: 1px solid rgba(231, 192, 138, 0.25);
          border-bottom: 1px solid rgba(231, 192, 138, 0.25);
          max-width: 90%;
          text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
        }

        .signature {
          margin-top: 2.5rem;
          font-family: 'Dancing Script', cursive;
          font-size: clamp(1.6rem, 3.5vw, 2.4rem);
          color: var(--accent);
          line-height: 1.3;
          opacity: 0;
          animation: fadeUp 1.6s ease-out 4.8s forwards;
        }

        .song-credit {
          margin-top: 3rem;
          font-size: 0.95rem;
          color: var(--text-soft);
          letter-spacing: 0.04em;
          opacity: 0;
          animation: fadeUp 1.4s ease-out 5.2s forwards;
        }
        .song-credit::before {
          content: '♪  ';
          color: var(--accent);
        }

        @keyframes fadeUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .start-overlay {
          position: fixed;
          inset: 0;
          background: radial-gradient(
            circle at center,
            rgba(26, 13, 18, 0.85),
            rgba(0, 0, 0, 0.95)
          );
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 1.5rem;
          z-index: 100;
          cursor: pointer;
          transition: opacity 0.8s ease;
          text-align: center;
          padding: 2rem;
        }
        .start-overlay.hidden {
          opacity: 0;
          pointer-events: none;
        }
        .start-overlay h1 {
          font-family: 'Dancing Script', cursive;
          font-size: clamp(2.4rem, 6vw, 4rem);
          color: var(--accent-soft);
          font-weight: 500;
        }
        .start-overlay p {
          color: var(--text-soft);
          font-size: 1.1rem;
          max-width: 28ch;
        }
        .play-button {
          width: 84px;
          height: 84px;
          border-radius: 50%;
          border: 2px solid var(--accent);
          background: rgba(231, 192, 138, 0.12);
          color: var(--accent);
          font-size: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition:
            transform 0.3s ease,
            background 0.3s ease;
          animation: pulse 2.4s ease-in-out infinite;
        }
        .play-button:hover {
          transform: scale(1.08);
          background: rgba(231, 192, 138, 0.22);
        }
        @keyframes pulse {
          0%,
          100% {
            box-shadow: 0 0 0 0 rgba(231, 192, 138, 0.4);
          }
          50% {
            box-shadow: 0 0 0 18px rgba(231, 192, 138, 0);
          }
        }

        #yt-player {
          position: fixed;
          bottom: 0;
          right: 0;
          width: 320px;
          height: 180px;
          opacity: 0.001;
          pointer-events: none;
          z-index: -1;
        }

        .audio-toggle {
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(26, 13, 18, 0.7);
          border: 1px solid rgba(231, 192, 138, 0.35);
          color: var(--accent-soft);
          cursor: pointer;
          display: none;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          z-index: 50;
          backdrop-filter: blur(6px);
          transition: transform 0.2s ease;
        }
        .audio-toggle:hover {
          transform: scale(1.1);
        }
        .audio-toggle.visible {
          display: flex;
        }

        @media (max-width: 640px) {
          main {
            padding: 3rem 1.25rem 5rem;
          }
          .declaration {
            font-size: 1.25rem;
            line-height: 1.7;
          }
          .declaration p {
            font-weight: 600;
            text-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);
          }
          .declaration .quote {
            font-size: 1.5rem;
            font-weight: 700;
          }
          .opening {
            font-weight: 700;
          }
          .signature {
            font-weight: 700;
          }
        }
      `}</style>
    </>
  );
}

export default SamaraTeAmo;
