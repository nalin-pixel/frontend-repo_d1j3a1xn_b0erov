import { useEffect, useRef, useState } from 'react'
import Spline from '@splinetool/react-spline'

function Icon({ name, className = '' }) {
  // Simple placeholder fantasy-style icons as inline SVG
  const common = `w-6 h-6 ${className}`
  switch (name) {
    case 'dm':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2l7 4v6c0 5-3.5 8-7 10-3.5-2-7-5-7-10V6l7-4z" />
          <path d="M9 11l3 2 3-2" />
        </svg>
      )
    case 'players':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="8" cy="8" r="3" />
          <circle cx="16" cy="8" r="3" />
          <path d="M2 20c1.5-3 4-5 6-5s4.5 2 6 5" />
          <path d="M14 20c.8-1.6 1.9-2.8 3-3.6 1.1-.8 2.3-1.2 3-1.4" />
        </svg>
      )
    case 'dice':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polygon points="12 2 21 8 17 20 7 20 3 8" />
          <circle cx="12" cy="12" r="1.2" />
          <circle cx="9" cy="10" r="1" />
          <circle cx="15" cy="10" r="1" />
        </svg>
      )
    case 'group':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="7" r="3" />
          <path d="M4 20c2-3.5 6-5 8-5s6 1.5 8 5" />
        </svg>
      )
    case 'story':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 5h10a4 4 0 014 4v10H8a4 4 0 01-4-4V5z" />
          <path d="M8 5v10a4 4 0 004 4" />
        </svg>
      )
    case 'roll':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3v9l6 6" />
        </svg>
      )
    case 'spark':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2l1.5 4 4 1.5-4 1.5L12 14l-1.5-4L6 7.5 10.5 6 12 2z" />
          <path d="M18 14l.8 2.2L21 17l-2.2.8L18 20l-.8-2.2L15 17l2.2-.8L18 14z" />
        </svg>
      )
    default:
      return null
  }
}

export default function App() {
  const [simplify, setSimplify] = useState(false)
  const [glossaryOpen, setGlossaryOpen] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) e.target.classList.add('reveal-in')
        })
      },
      { threshold: 0.15 }
    )
    containerRef.current?.querySelectorAll('.reveal').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div className={`site ${simplify ? 'simplify' : ''}`}>
      <style>{`
        /* ====== Base Theme ====== */
        :root {
          --bg: #0b1020; /* deep blue charcoal */
          --card: #121933;
          --muted: #9fb0d6;
          --text: #e6ecff;
          --accent: #e7a43a; /* warm gold */
          --accent-2: #eb5a46; /* ember */
          --ring: rgba(231,164,58,0.45);
          --shadow: 0 10px 30px rgba(0,0,0,.45), 0 0 40px rgba(231,164,58,.08);
        }
        * { box-sizing: border-box; }
        html, body, #root { height: 100%; }
        body { margin: 0; background: var(--bg); color: var(--text); font-family: 'Inter', system-ui, -apple-system, Segoe UI, Roboto, sans-serif; }
        .site { position: relative; min-height: 100%; overflow-x: hidden; }
        a { color: var(--accent); text-decoration: none; }
        a:hover { text-decoration: underline; }

        /* Typography */
        h1, h2, h3 { font-family: 'Manrope', ui-sans-serif, system-ui, sans-serif; letter-spacing: -0.01em; }
        h1 { font-weight: 800; }
        h2 { font-weight: 700; }
        h3 { font-weight: 600; }
        .eyebrow { text-transform: uppercase; letter-spacing: .18em; color: var(--muted); font-size: .78rem; }

        /* Layout */
        header.site-header { position: sticky; top: 0; z-index: 30; backdrop-filter: blur(8px); background: linear-gradient(to bottom, rgba(11,16,32,.9), rgba(11,16,32,.45)); border-bottom: 1px solid rgba(231,164,58,.15); }
        .nav { max-width: 1200px; margin: 0 auto; padding: .75rem 1rem; display: flex; align-items: center; justify-content: space-between; }
        .brand { display: flex; align-items: center; gap: .65rem; font-weight: 800; }
        .brand .spark { color: var(--accent); filter: drop-shadow(0 0 12px rgba(231,164,58,.45)); }
        .nav a { color: var(--text); opacity: .9; }
        .nav-links { display: none; gap: 1rem; align-items: center; }
        .actions { display: flex; align-items: center; gap: .5rem; }

        @media (min-width: 900px) {
          .nav-links { display: flex; }
        }

        .btn { display: inline-flex; align-items: center; gap: .5rem; padding: .6rem .95rem; border-radius: 10px; border: 1px solid rgba(231,164,58,.25); background: linear-gradient(180deg, rgba(231,164,58,.16), rgba(231,164,58,.1)); color: var(--text); box-shadow: var(--shadow); transition: transform .2s ease, box-shadow .2s ease, background .2s ease; }
        .btn:hover { transform: translateY(-1px); box-shadow: 0 10px 25px rgba(231,164,58,.18); background: linear-gradient(180deg, rgba(231,164,58,.22), rgba(231,164,58,.1)); }
        .btn.primary { background: linear-gradient(180deg, rgba(235,90,70,.22), rgba(235,90,70,.12)); border-color: rgba(235,90,70,.35); }

        /* Hero */
        .hero { position: relative; min-height: 92vh; display: grid; place-items: center; overflow: hidden; }
        .hero .overlay { position: absolute; inset: 0; background: radial-gradient(1200px 500px at 70% 10%, rgba(231,164,58,.12), transparent 40%), radial-gradient(700px 500px at 30% 90%, rgba(88,111,255,.14), transparent 35%); pointer-events: none; }
        .hero .content { position: relative; z-index: 2; max-width: 1100px; padding: 3rem 1rem; text-align: center; }
        .badge { display: inline-flex; align-items: center; gap: .4rem; padding: .35rem .6rem; border-radius: 999px; border: 1px solid rgba(231,164,58,.35); background: rgba(231,164,58,.12); color: var(--text); font-size: .8rem; }
        .hero h1 { font-size: clamp(2rem, 6vw, 4rem); margin: .8rem 0; line-height: 1.05; }
        .hero p { max-width: 760px; margin: 0 auto 1.25rem; color: #d8e0ff; opacity: .9; font-size: clamp(1rem, 2.2vw, 1.25rem); }
        .hero-cta { display: inline-flex; align-items: center; gap: .6rem; margin-top: .5rem; }
        .spline-wrap { position: absolute; inset: 0; }
        .spline-wrap canvas, .spline-wrap div { width: 100% !important; height: 100% !important; }

        /* Sections */
        main { position: relative; z-index: 1; }
        section { padding: 72px 1rem; }
        .container { max-width: 1100px; margin: 0 auto; }
        .section-title { margin-bottom: 1rem; }
        .lede { color: #cbd6ff; opacity: .9; max-width: 800px; }

        /* Cards and surfaces */
        .cards { display: grid; grid-template-columns: 1fr; gap: 16px; }
        @media (min-width: 700px) { .cards { grid-template-columns: repeat(3, 1fr); gap: 18px; } }
        .card { background: linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.01)); border: 1px solid rgba(231,164,58,.17); border-radius: 16px; padding: 18px; box-shadow: var(--shadow); position: relative; overflow: hidden; }
        .card::before { content: ''; position: absolute; inset: -2px; border-radius: 16px; padding: 1px; background: linear-gradient(180deg, rgba(231,164,58,.35), transparent 45%); -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite: xor; mask-composite: exclude; pointer-events: none; }
        .card h3 { margin: .4rem 0 .25rem; }
        .card p { color: #cdd7ff; opacity: .9; }
        .icon { width: 42px; height: 42px; border-radius: 12px; display: grid; place-items: center; color: var(--accent); background: rgba(231,164,58,.12); border: 1px solid rgba(231,164,58,.25); box-shadow: inset 0 0 20px rgba(231,164,58,.06); }

        /* Timeline / Steps */
        .steps { display: grid; gap: 16px; grid-template-columns: 1fr; }
        @media (min-width: 900px) { .steps { grid-template-columns: repeat(3, 1fr); } }
        .step { position: relative; }
        .step .badge-num { position: absolute; top: -8px; left: -8px; width: 28px; height: 28px; border-radius: 999px; background: rgba(235,90,70,.15); color: #fff; display: grid; place-items: center; border: 1px solid rgba(235,90,70,.35); font-weight: 700; }

        /* Dialogue */
        .dialogue { display: grid; gap: 10px; margin-top: 18px; }
        .speech { padding: 12px 14px; border-radius: 12px; background: #0e1530; border: 1px solid rgba(255,255,255,.06); }
        .speech.dm { border-color: rgba(231,164,58,.35); box-shadow: inset 0 0 20px rgba(231,164,58,.05); }
        .speech.pl { border-color: rgba(88,111,255,.35); box-shadow: inset 0 0 20px rgba(88,111,255,.08); }

        /* Character creation */
        .progress { display: grid; grid-auto-flow: column; gap: 12px; overflow-x: auto; padding-bottom: 6px; }
        .panel { min-width: 240px; }
        .panel footer { margin-top: .5rem; }
        details.accordion { margin-top: .5rem; border-top: 1px dashed rgba(231,164,58,.25); padding-top: .5rem; }
        details[open] summary .caret { transform: rotate(90deg); }
        summary { list-style: none; display: flex; align-items: center; gap: .5rem; cursor: pointer; }
        summary::-webkit-details-marker { display: none; }
        .caret { transition: transform .2s ease; }
        .info { margin-top: 16px; padding: 14px; border: 1px solid rgba(88,111,255,.35); background: rgba(88,111,255,.08); border-radius: 12px; }

        /* Dice system */
        .dice-area { position: relative; display: grid; place-items: center; padding: 26px; }
        .d20 { width: clamp(160px, 40vw, 260px); height: clamp(160px, 40vw, 260px); background: radial-gradient(circle at 30% 30%, rgba(231,164,58,.35), rgba(231,164,58,.12)); border: 1px solid rgba(231,164,58,.35); clip-path: polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%); display: grid; place-items: center; border-radius: 12px; box-shadow: 0 0 80px rgba(231,164,58,.12) inset, 0 30px 80px rgba(0,0,0,.45); position: relative; }
        .d20::after { content: '20'; font-weight: 800; font-size: clamp(2.5rem, 6vw, 4rem); color: var(--accent); filter: drop-shadow(0 0 12px rgba(231,164,58,.35)); }
        .die-ring { position: absolute; width: 92%; height: 92%; border-radius: 999px; border: 1px dashed rgba(231,164,58,.3); animation: slowspin 40s linear infinite; }
        .small-die { position: absolute; width: 48px; height: 48px; display: grid; place-items: center; color: var(--muted); background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.08); border-radius: 10px; box-shadow: var(--shadow); }
        .die-d4 { top: 0; left: 50%; transform: translate(-50%, -50%); }
        .die-d6 { right: 0; top: 50%; transform: translate(50%, -50%); }
        .die-d8 { bottom: 0; left: 50%; transform: translate(-50%, 50%); }
        .die-d10 { left: 0; top: 50%; transform: translate(-50%, -50%); }
        .die-d12 { left: 12%; top: 18%; }
        @keyframes slowspin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        .example { margin-top: 18px; display: grid; gap: 10px; grid-template-columns: 1fr; }
        @media (min-width: 860px) { .example { grid-template-columns: 1.3fr 1fr; align-items: center; } }
        .scene { border: 1px solid rgba(255,255,255,.08); background: #0e1530; border-radius: 14px; padding: 14px; box-shadow: var(--shadow); }

        /* Rules grid */
        .rules { display: grid; gap: 12px; grid-template-columns: 1fr; }
        @media (min-width: 800px) { .rules { grid-template-columns: repeat(3, 1fr); } }

        /* Checklist */
        .checklist { display: grid; gap: 10px; grid-template-columns: 1fr; }
        @media (min-width: 700px) { .checklist { grid-template-columns: repeat(2, 1fr); } }
        .item { display: flex; align-items: center; gap: .65rem; padding: .65rem .8rem; border: 1px solid rgba(231,164,58,.22); border-radius: 12px; background: rgba(231,164,58,.06); }
        .item .dot { width: 10px; height: 10px; border-radius: 999px; background: var(--accent); box-shadow: 0 0 0 4px rgba(231,164,58,.18); }

        /* Tooltip */
        .tip { position: relative; border-bottom: 1px dotted rgba(231,164,58,.6); cursor: help; }
        .tip:hover::after, .tip:focus-visible::after { content: attr(data-tip); position: absolute; left: 0; top: 120%; background: #0f1736; border: 1px solid rgba(231,164,58,.35); padding: .45rem .6rem; border-radius: 10px; color: #fff; width: max-content; max-width: 280px; box-shadow: var(--shadow); z-index: 20; }

        /* Modal */
        .modal { position: fixed; inset: 0; display: grid; place-items: center; background: rgba(3,6,14,.6); backdrop-filter: blur(6px); z-index: 50; }
        .modal-inner { width: min(720px, 92vw); background: #0f1736; border: 1px solid rgba(231,164,58,.25); border-radius: 16px; padding: 18px; box-shadow: var(--shadow); }

        /* Simplify mode */
        .simple { display: none; }
        .simplify .verbose { display: none !important; }
        .simplify .simple { display: contents; }

        /* Reveal on scroll */
        .reveal { opacity: 0; transform: translateY(12px); transition: opacity .6s ease, transform .6s ease; }
        .reveal-in { opacity: 1; transform: translateY(0); }

        /* Footer */
        footer { border-top: 1px solid rgba(231,164,58,.15); background: linear-gradient(to top, rgba(11,16,32,1), rgba(11,16,32,.75)); color: var(--muted); }
      `}</style>

      {/* Header / Nav */}
      <header className="site-header" aria-label="Site Header">
        <nav className="nav">
          <div className="brand">
            <span className="spark" aria-hidden>
              <Icon name="spark" className="w-5 h-5" />
            </span>
            <span>Adventurer's Primer</span>
          </div>
          <div className="nav-links" role="navigation" aria-label="Primary">
            <a href="#what" aria-label="What is Dungeons & Dragons">What</a>
            <a href="#how" aria-label="How a session works">How</a>
            <a href="#create" aria-label="Character creation">Create</a>
            <a href="#dice" aria-label="Dice system">Dice</a>
            <a href="#rules" aria-label="Core rules">Rules</a>
            <a href="#start" aria-label="Start your first session">Start</a>
          </div>
          <div className="actions">
            <label className="btn" htmlFor="simplify-toggle">
              <input id="simplify-toggle" type="checkbox" onChange={e => setSimplify(e.target.checked)} aria-label="Toggle Simplify Mode" />
              <span>Simplify mode</span>
            </label>
            <button className="btn" onClick={() => setGlossaryOpen(true)} aria-haspopup="dialog" aria-controls="glossary-modal">Glossary</button>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="hero" aria-label="Hero">
        <div className="spline-wrap" aria-hidden>
          <Spline scene="https://prod.spline.design/atN3lqky4IzF-KEP/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        </div>
        <div className="overlay" aria-hidden />
        <div className="content">
          <span className="badge" role="note">A beginner-friendly rule overview</span>
          <h1>Choices shape the story. Dungeons & Dragons turns imagination into adventure.</h1>
          <p>Learn the essentials in minutes and step into a cooperative fantasy where you and your friends become the heroes. This guide keeps things clear, visual and welcoming for first-time players.</p>
          <div className="hero-cta">
            <a href="#how" className="btn primary" aria-label="Jump to How to Play">Start with How to Play</a>
            <a href="#start" className="btn" aria-label="Jump to Start your first session">Ready to Begin</a>
          </div>
        </div>
      </section>

      <main ref={containerRef}>
        {/* What is D&D */}
        <section id="what" aria-labelledby="what-title">
          <div className="container">
            <p className="eyebrow">Introduction</p>
            <h2 id="what-title" className="section-title">What is Dungeons & Dragons?</h2>
            <p className="lede reveal">Dungeons & Dragons (D&D) is a cooperative fantasy roleplaying game. One person guides the world and challenges; everyone else plays the heroes who explore that world. Together you create a story you can’t predict.</p>
            <p className="lede reveal">You describe what your character attempts. The group talks, makes plans and reacts to surprises. When the outcome is uncertain, you roll dice—fate answers, and the tale moves forward.</p>
            <div className="cards reveal" role="list">
              <article className="card" role="listitem">
                <div className="icon" aria-hidden><Icon name="dm" /></div>
                <h3>Dungeon Master</h3>
                <p>The DM is the storyteller and director. They describe scenes, play the world’s characters and set challenges with fairness and fun in mind.</p>
                <p className="verbose">They don’t compete against players—the goal is to make the adventure exciting, coherent and full of meaningful choices.</p>
              </article>
              <article className="card" role="listitem">
                <div className="icon" aria-hidden><Icon name="players" /></div>
                <h3>Players</h3>
                <p>You play the heroes. You explore, investigate and make decisions that shape what happens next.</p>
                <p className="verbose">Your character has strengths and flaws. You’ll work as a team, lean on each other’s talents and grow through the journey.</p>
              </article>
              <article className="card" role="listitem">
                <div className="icon" aria-hidden><Icon name="dice" /></div>
                <h3>Dice</h3>
                <p>Dice add uncertainty and drama. A roll can open doors, spring traps or turn the tide of a battle.</p>
                <p className="verbose">You’ll mostly roll a twenty-sided die (d20) and add a modifier. Higher is better—your chances improve with expertise or advantages.</p>
              </article>
            </div>
          </div>
        </section>

        {/* How a session works */}
        <section id="how" aria-labelledby="how-title">
          <div className="container">
            <p className="eyebrow">How to Play</p>
            <h2 id="how-title" className="section-title">How a session works</h2>
            <div className="steps reveal" role="list">
              <article className="card step" role="listitem">
                <span className="badge-num">1</span>
                <div className="icon" aria-hidden><Icon name="group" /></div>
                <h3>Gather a group and set roles</h3>
                <p>Pick a Dungeon Master and 3–5 players. Choose a short starter adventure and find a comfortable place to play—table or online.</p>
                <p className="verbose">Decide session length (2–3 hours is perfect) and agree on table rules: kindness, patience and taking turns.</p>
              </article>
              <article className="card step" role="listitem">
                <span className="badge-num">2</span>
                <div className="icon" aria-hidden><Icon name="story" /></div>
                <h3>Play the adventure</h3>
                <p>The DM describes what you see and hear. You declare what your characters attempt; the group collaborates and imagines the scene.</p>
                <p className="verbose">The world reacts to your choices, not a script. Explore, negotiate, sneak or charge in—there’s always another path.</p>
              </article>
              <article className="card step" role="listitem">
                <span className="badge-num">3</span>
                <div className="icon" aria-hidden><Icon name="roll" /></div>
                <h3>Roll to resolve uncertainty</h3>
                <p>When the outcome isn’t certain, roll dice. Add your character’s modifier and compare the total to the difficulty number.</p>
                <p className="verbose">Combat adds order with the concept of <span className="tip" tabIndex={0} data-tip="Initiative determines turn order in combat—everyone rolls a d20 and adds their initiative modifier.">initiative</span> and may require a <span className="tip" tabIndex={0} data-tip="A saving throw is a reactive roll to resist danger—like dodging a fireball or shaking off poison.">saving throw</span>.</p>
              </article>
            </div>
            <div className="dialogue reveal" aria-label="Example dialogue">
              <div className="speech dm"><strong>DM:</strong> The corridor smells of smoke. A flicker of orange leaks under the wooden door ahead. What do you do?</div>
              <div className="speech pl"><strong>Player:</strong> I press my ear to the door and listen. If I hear movement, I quietly try the handle.</div>
              <div className="speech dm"><strong>DM:</strong> Roll Perception. The difficulty is 12.</div>
              <div className="speech pl"><strong>Player:</strong> d20 shows 9, plus 4 is 13—I hear a low growl. I signal the party to prepare.</div>
            </div>
          </div>
        </section>

        {/* Character creation */}
        <section id="create" aria-labelledby="create-title">
          <div className="container">
            <p className="eyebrow">Your Hero</p>
            <h2 id="create-title" className="section-title">Character creation</h2>
            <div className="progress reveal" role="list">
              <article className="card panel" role="listitem">
                <h3>Idea</h3>
                <p>Who do you want to be? A brave knight, a clever rogue, a kindly healer or a curious wizard?</p>
                <footer>
                  <details className="accordion">
                    <summary><span className="caret">▶</span> Learn more</summary>
                    <p>Start with a vibe or a story hook—"exiled scholar seeking redemption" or "smith’s apprentice with a dragonmark." Personality leads the numbers.</p>
                  </details>
                </footer>
              </article>
              <article className="card panel" role="listitem">
                <h3>Choose race and class</h3>
                <p>Pick a heritage (like human, elf or dwarf) and a class (fighter, cleric, wizard and more). These shape your abilities.</p>
                <footer>
                  <details className="accordion">
                    <summary><span className="caret">▶</span> Learn more</summary>
                    <p>Race grants traits; class defines your role. New to the game? Fighter or cleric are straightforward and rewarding from level one.</p>
                  </details>
                </footer>
              </article>
              <article className="card panel" role="listitem">
                <h3>Distribute ability scores</h3>
                <p>Assign numbers to Strength, Dexterity, Constitution, Intelligence, Wisdom and Charisma.</p>
                <footer>
                  <details className="accordion">
                    <summary><span className="caret">▶</span> Learn more</summary>
                    <p>Use standard array (15, 14, 13, 12, 10, 8). Put your highest score where your class needs it most—for example, Strength for fighters.</p>
                  </details>
                </footer>
              </article>
              <article className="card panel" role="listitem">
                <h3>Equipment and personality</h3>
                <p>Choose starting gear and note ideals, bonds and flaws. These details bring your hero to life.</p>
                <footer>
                  <details className="accordion">
                    <summary><span className="caret">▶</span> Learn more</summary>
                    <p>Let gear reflect your story—engraved shield from a mentor, tattered journal of maps. Personality prompts guide roleplay without pressure.</p>
                  </details>
                </footer>
              </article>
            </div>
            <aside className="info reveal" role="note">
              New here? You can start in minutes with prebuilt characters. Focus on playing; customize later as you learn.
            </aside>
          </div>
        </section>

        {/* Dice system */}
        <section id="dice" aria-labelledby="dice-title">
          <div className="container">
            <p className="eyebrow">Mechanics</p>
            <h2 id="dice-title" className="section-title">Dice system</h2>
            <div className="dice-area reveal" aria-label="Dice system graphic">
              <div className="d20" aria-hidden></div>
              <div className="die-ring" aria-hidden></div>
              <div className="small-die die-d4" aria-label="d4">D4</div>
              <div className="small-die die-d6" aria-label="d6">D6</div>
              <div className="small-die die-d8" aria-label="d8">D8</div>
              <div className="small-die die-d10" aria-label="d10">D10</div>
              <div className="small-die die-d12" aria-label="d12">D12</div>
            </div>
            <div className="example reveal">
              <div>
                <h3>Clear, simple rules</h3>
                <p>Most checks use a d20 plus a character modifier. High numbers indicate success; low numbers indicate failure.</p>
                <p className="verbose">Your modifier comes from ability scores and proficiency. Advantage lets you roll twice and keep the higher—disadvantage keeps the lower.</p>
              </div>
              <div className="scene" aria-label="Illustrated number example">
                <p><strong>Example:</strong> You try to pick a lock (Difficulty Class 12).</p>
                <p>You roll a 9 on the d20 and add +4 from Dexterity and proficiency. Total 13—success! The chest clicks open.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Core rules */}
        <section id="rules" aria-labelledby="rules-title">
          <div className="container">
            <p className="eyebrow">At a Glance</p>
            <h2 id="rules-title" className="section-title">Core rules at a glance</h2>
            <div className="rules reveal" role="list">
              {[ 
                { t: 'The group tells the story together', d1: 'Everyone contributes to the narrative and tone.', d2: 'Ask questions, build on ideas and share the spotlight.' },
                { t: 'The DM describes the world', d1: 'They present scenes, challenges and consequences.', d2: 'They also play non‑player characters and track rules.' },
                { t: 'You declare what your character does', d1: 'Speak in first person or third—either works.', d2: 'Clarity beats perfection; the DM helps interpret.' },
                { t: 'When uncertainty exists, you roll', d1: 'Roll a d20 and add a relevant modifier.', d2: 'Beat the difficulty number to succeed.' },
                { t: 'Rules ensure fairness', d1: 'Shared procedures keep tension fun and respectful.', d2: 'Use them to support, not to restrict creativity.' },
                { t: 'Everything is negotiable', d1: 'Table consent and fun come first.', d2: 'If the group agrees, adjust, skip or simplify.' }
              ].map((r, i) => (
                <article key={i} className="card" role="listitem">
                  <h3>{r.t}</h3>
                  <p>{r.d1}</p>
                  <p className="verbose">{r.d2}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Start your first session */}
        <section id="start" aria-labelledby="start-title">
          <div className="container">
            <p className="eyebrow">Get Ready</p>
            <h2 id="start-title" className="section-title">Start your first session</h2>
            <div className="checklist reveal" role="list">
              {[ 'Three to five friends', 'An adventure or starter book', 'Dice set', 'Character sheets', 'Pencils and time' ].map((t, i) => (
                <div key={i} className="item" role="listitem"><span className="dot" aria-hidden></span><span>{t}</span></div>
              ))}
            </div>
            <div style={{ marginTop: 16 }}>
              <a className="btn primary" href="#" onClick={(e)=> e.preventDefault()} aria-label="Download the beginner guide">Download the beginner guide</a>
            </div>
          </div>
        </section>

        {/* Final section */}
        <section aria-labelledby="final-title">
          <div className="container">
            <h2 id="final-title">You’re ready—no perfect prep needed</h2>
            <p className="lede reveal">Start small, learn by doing and celebrate the unexpected. The best sessions are about the story you share and the laughs along the way. Bring curiosity; the rest you’ll learn together.</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer aria-label="Footer">
        <section className="container" style={{ padding: '20px 1rem' }}>
          <small>Made with care for new adventurers • Modern, accessible and beginner‑friendly</small>
        </section>
      </footer>

      {/* Glossary Modal */}
      {glossaryOpen && (
        <div className="modal" role="dialog" aria-modal="true" aria-labelledby="glossary-title" id="glossary-modal">
          <div className="modal-inner">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
              <h3 id="glossary-title">Glossary</h3>
              <button className="btn" onClick={() => setGlossaryOpen(false)} aria-label="Close glossary">Close</button>
            </div>
            <div style={{ display: 'grid', gap: 10, marginTop: 12 }}>
              <div className="card"><strong>Initiative:</strong> Determines turn order in combat. Everyone rolls a d20 and adds their initiative modifier.</div>
              <div className="card"><strong>Saving throw:</strong> A reactive roll to resist danger—dodging a blast, shaking off poison, standing firm against fear.</div>
              <div className="card"><strong>Advantage/Disadvantage:</strong> Roll two d20s and keep the higher/lower. A simple way to reflect favorable or risky circumstances.</div>
              <div className="card"><strong>DC (Difficulty Class):</strong> The target number you must meet or beat to succeed at a task.</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
