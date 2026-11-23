/* ===== Keys — Keystone Realty's chatbot (loaded on every page) =====
   Rule-based assistant that runs entirely in the browser, so it works on GitHub Pages
   with no API key or server.

   Want to use your Lab 3 bot instead? Paste its embed snippet (e.g. a Chatbase / Botpress /
   Voiceflow <script> or <iframe>) into BOTH index.html and about.html where it says
   "LAB 3 CHATBOT EMBED", and delete the <script src="chatbot.js"> line.
*/
(function () {
  const BOT_NAME = "Keys";

  const intents = [
    { keys: ["hi", "hello", "hey", "yo", "sup"],
      reply: "Hi there! 🔑 I'm Keys, Keystone Realty's assistant. Ask me about buying, renting, selling, mortgages, or investing." },
    { keys: ["buy", "buying", "first", "first-time", "purchase", "own"],
      reply: "Buying your first home? Here's the path:\n1. Get pre-approved for a mortgage\n2. Set your budget & must-haves\n3. Tour homes with your agent\n4. Make an offer & get an inspection\n5. Close and get your keys 🏡\nOur First-Home program walks you through each step." },
    { keys: ["rent", "renting", "apartment", "lease", "roommate", "student"],
      reply: "We help renters for free — landlords pay our fee. Tell us your budget, move-in date, and neighborhood, and we'll send matching apartments within 24 hours." },
    { keys: ["sell", "selling", "list", "listing", "worth", "value", "valuation"],
      reply: "Thinking of selling? We offer a free home valuation and a 1.5% listing fee (most agents charge 2.5–3%). Want us to schedule a walkthrough?" },
    { keys: ["mortgage", "loan", "rate", "rates", "interest", "monthly", "payment", "afford"],
      reply: "A quick rule of thumb: keep your total housing payment under ~28% of your gross monthly income. Try the mortgage calculator on our home page to see your estimated payment instantly 📊" },
    { keys: ["down payment", "how much down", "down", "downpayment", "deposit", "fha", "save", "saving"],
      reply: "You don't always need 20% down! FHA loans can start at 3.5%, and many conventional loans at 3–5%. Below 20% you'll usually pay PMI (mortgage insurance) until you build equity." },
    { keys: ["pre-approval", "preapproval", "preapproved", "approved", "credit", "score"],
      reply: "Pre-approval shows sellers you're serious. You'll typically need ID, recent pay stubs, 2 years of tax returns, and bank statements. A credit score of 620+ opens most loan options." },
    { keys: ["invest", "investing", "investment", "rental", "property", "cash", "flow", "roi"],
      reply: "For rental investing, we look at three numbers: cash flow (rent minus all costs), cap rate (net income ÷ price), and cash-on-cash return. Our investor team can run the numbers on any property for free 💼" },
    { keys: ["fee", "fees", "cost", "commission", "price", "charge"],
      reply: "Our fees: renters pay $0, buyers' agent fees are usually covered in the deal, and sellers pay a flat 1.5% listing fee. No hidden charges." },
    { keys: ["closing", "close", "costs", "escrow", "inspection"],
      reply: "Closing costs usually run 2–5% of the purchase price and cover things like the appraisal, title insurance, and lender fees. Always get an inspection before closing — it can save you thousands." },
    { keys: ["listings", "homes", "house", "houses", "condo", "available", "show"],
      reply: "Check out our Featured Listings on the \"Our Services\" page! You can also tell me your budget and I'll point you to the right agent 🏠" },
    { keys: ["agent", "contact", "call", "email", "talk", "human", "tour", "schedule"],
      reply: "You can reach a licensed agent at hello@keystonerealty.example or (555) 014-2026. We usually reply within 2 hours on business days." },
    { keys: ["thanks", "thank", "thx", "ty", "awesome", "cool", "great"],
      reply: "Anytime! Happy house hunting 🔑" },
    { keys: ["bye", "goodbye", "see ya"],
      reply: "Bye for now! Your future home is out there 👋" }
  ];

  const fallback = "Hmm, I'm not sure about that one 🤔 Try asking about buying, renting, selling, mortgages, down payments, or investing.";
  const quickReplies = ["Buying my first home", "Renting", "Down payment?", "Investing"];

  function findReply(text) {
    const t = " " + text.toLowerCase().replace(/[^a-z0-9\s-]/g, " ") + " ";
    let best = null, bestScore = 0;
    for (const intent of intents) {
      let score = 0;
      for (const k of intent.keys) if (t.includes(" " + k + " ")) score += k.includes(" ") ? 2 : 1;
      if (score > bestScore) { bestScore = score; best = intent; }
    }
    return best ? best.reply : fallback;
  }

  // ---- Build the widget ----
  const toggle = document.createElement("button");
  toggle.className = "chat-toggle";
  toggle.setAttribute("aria-label", "Open chat");
  toggle.innerHTML = '💬<span class="dot"></span>';

  const panel = document.createElement("div");
  panel.className = "chat-panel";
  panel.innerHTML = `
    <div class="chat-head">
      <div class="avatar">🔑</div>
      <div><strong>${BOT_NAME}</strong><small>Keystone Realty assistant · online</small></div>
      <button aria-label="Close chat">×</button>
    </div>
    <div class="chat-body"></div>
    <div class="chips"></div>
    <form class="chat-input">
      <input type="text" placeholder="Ask Keys anything…" aria-label="Message" />
      <button type="submit" aria-label="Send">➤</button>
    </form>`;

  document.body.append(toggle, panel);
  const body = panel.querySelector(".chat-body");
  const form = panel.querySelector("form");
  const input = form.querySelector("input");
  const chips = panel.querySelector(".chips");

  function addMsg(text, who) {
    const m = document.createElement("div");
    m.className = "msg " + who;
    m.textContent = text;
    body.appendChild(m);
    body.scrollTop = body.scrollHeight;
  }

  function botSay(text) {
    const typing = document.createElement("div");
    typing.className = "msg bot typing";
    typing.innerHTML = "<span></span><span></span><span></span>";
    body.appendChild(typing);
    body.scrollTop = body.scrollHeight;
    setTimeout(() => { typing.remove(); addMsg(text, "bot"); }, 600 + Math.min(text.length * 6, 900));
  }

  function send(text) {
    text = text.trim();
    if (!text) return;
    addMsg(text, "user");
    botSay(findReply(text));
  }

  quickReplies.forEach(q => {
    const c = document.createElement("button");
    c.className = "chip"; c.type = "button"; c.textContent = q;
    c.onclick = () => send(q);
    chips.appendChild(c);
  });

  let greeted = false;
  function openChat() {
    panel.classList.add("open");
    toggle.querySelector(".dot")?.remove();
    input.focus();
    if (!greeted) { greeted = true; addMsg("Hi! I'm Keys 🔑 Looking to buy, rent, sell, or invest?", "bot"); }
  }
  toggle.onclick = () => panel.classList.contains("open") ? panel.classList.remove("open") : openChat();
  panel.querySelector(".chat-head button").onclick = () => panel.classList.remove("open");
  form.onsubmit = e => { e.preventDefault(); send(input.value); input.value = ""; };

  // Shared scroll-reveal animation for both pages
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
  }), { threshold: 0.15 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));
})();
