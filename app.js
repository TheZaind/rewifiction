const qs = (s) => document.querySelector(s);
const qsa = (s) => Array.from(document.querySelectorAll(s));

// Inline stories so the app works from file:// without a server
const STORIES = [
  {
    url: 'https://www.wattpad.com/159694502-its-okay-to-be-gay-zu-viel-alkohol-letzte-nacht',
    answer: 'real',
    text: `Oh Mann! Ich hoffte, ich hatte diese Nacht nichts Falsches gemacht.
Ich wurde aus meinen Gedanken gerissen, weil Rewi, der immer noch auf mir lag, einen leisen Schrei ausstieß.
Er lief rot an und ging von mir runter. Erst jetzt bemerkte er, dass er nur noch eine Boxershort anhatte.
„Palle“, flüsterte er entsetzt.
„Ich habe keine Ahnung, was gestern Nacht los war. Und ehrlich gesagt will ich es auch gar nicht wissen.
Und was immer ich da gemacht habe, lag höchstwahrscheinlich daran, dass ich zu viel Alkohol hatte.
Lass uns die Sache ganz schnell vergessen und nicht mehr davon reden.“
Ich war geflasht davon, wie schnell er redete, und nickte nur.
Rewi stand auf, sammelte seine Sachen und verschwand in Felix’ Bad –
allerdings nur, um eine Sekunde später schreiend wieder rauszukommen.`
  },
  {
    url: 'https://www.fanfiktion.de/s/56118a1f0004ea383b5b6b3c/1/Rewinside-in-Love-OneShot',
    answer: 'real',
    text: `Wieder legte ich (Rewi) meinen Arm um sie.
Sie sah zu mir hoch. „Danke.“
„Für was?“
„Dass du immer für mich da bist.“
„Das ist doch selbstverständlich.“
„Bei dir fühle ich mich immer so wohl.“
Komm schon, Rewi, sag die drei Worte, die alles leichter machen werden… die alles zerstören werden, dachte ich mir immer wieder.
Ich war so in Gedanken versunken, dass ich nicht mitbekam, dass sie etwas zu mir sagte.
„Was? Entschuldigung.“
Sie lächelte nur leicht, aber ich konnte in ihren Augen Enttäuschung sehen.
„War es wichtig?“
Sie schüttelte den Kopf und legte sich in das weiche Gras.
„Kannst du es vielleicht trotzdem wiederholen?“, wollte ich wissen.
„Ich hab dich lieb.“
Sie packte mich liebevoll am Handgelenk und zog mich zu ihr runter.
Ich legte mich neben sie und wir schauten uns gemeinsam die Sterne an.
„Meinst du nicht, wir sind mehr als beste Freunde?“, fing sie auf einmal an zu sprechen.
Meine Hände fingen an zu zittern.
„Ja, allerbeste Freunde“, sagte ich mit leiser Stimme.
„Vielleicht sogar mehr als das.“`
  },
  {
    // KI/ausgedacht – soll als drittes kommen
    answer: 'fake',
    text: `„Du bist viel zu laut,“ murmelte Felix, fast ein Flüstern.

Sebastian lachte nervös. „Bruder, du kannst nicht einfach so dramatisch tun—“

„Doch.“ Felix’ Stimme war ruhig, fast zu ruhig.

Und dann war da dieser Moment, der zu lange dauerte, um noch zufällig zu sein.
Felix beugte sich ein Stück vor, als wollte er testen, wie weit er gehen konnte.

Sebastian spürte sein Herz hämmern. Sag was. Beweg dich. Irgendwas.
Aber er blieb einfach sitzen.

Felix grinste schief, so, als hätte er genau das gewusst. „Du wartest drauf.“

„Halt’s Maul,“ flüsterte Sebastian, und bevor sein Gehirn nachkam, hatte Felix sich runtergebeugt.

Der Kuss war nicht perfekt – zu hastig, zu plötzlich, fast so, als hätte keiner von ihnen wirklich geplant, das durchzuziehen. Aber er passierte.
Und Sebastian zog nicht weg.

Als Felix sich wieder aufrichtete, grinste er nur noch breiter.
„Das bleibt zwischen uns.“

Sebastian wischte sich über den Mund, als könnte er so den Herzschlag dämpfen. „Ja, safe. Chat erfährt nichts.“`
  },
  {
    url: 'https://www.wattpad.com/1534597709-von-spa%C3%9F-zu-ernst-rezo-x-julia-4-zwischen-sorge',
    answer: 'real',
    text: `POV REZO:
„Sag einfach das nächste Mal bitte Bescheid, wenn du was brauchst. Ich tu alles für dich“, sagte Julia schließlich.
Ich nickte.
„Ich finde sie aber schön, um ehrlich zu sein. Genauso wie den Rest von dir.“
Sie streicht meinen Arm hinunter.
Das meint sie gerade nicht ernst, oder? Ich träume gerade, oder? Da geht auf jeden Fall was zwischen uns. Jetzt oder nie.
Ich lege meine Hände an ihre Wangen.
„Ich würde dich irgendwie gerade gerne küssen“, lächelte ich sie an.
„Dann tu es doch einfach“, sagte sie zurück, und ich legte meine Lippen auf ihre.
Sie sind so weich und schmecken gut. Ein warmes Gefühl macht sich in meinem Bauch breit.
Sie macht mich so verrückt.
Nach einer kleinen Weile lösen wir uns, holen Luft und setzen erneut an.
Und der zweite Kuss ist noch schöner.
Ich möchte aber gerne noch weiter gehen, also stupse ich mit meiner Zunge gegen ihre Lippen und sie lässt mich rein.
Ein wunderschöner Zungenkuss entfaltet sich, während sie ihre Arme um meinen Nacken legt.
Alles kribbelt, aber so langsam geht mir auch die Luft aus. Also löse ich den Kuss.
„Wow, das war …“ beginnt sie.
„Unfassbar schön?“, ergänze ich.
„Ja, aber was ist das jetzt mit uns?“, lacht sie.`
  }
];

const state = {
  stories: STORIES,
  index: 0,
  score: 0
};

function show(id){
  // Smooth fade transition between screens
  const currentScreen = document.querySelector('.screen:not(.hidden)');
  const nextScreen = qs('#'+id);
  
  if(currentScreen && currentScreen !== nextScreen){
    currentScreen.classList.add('hidden');
  }
  
  // Small delay to let fade start, then show new screen
  setTimeout(() => {
    qsa('.screen').forEach(el => {
      if(el.id !== id) el.classList.add('hidden');
    });
    nextScreen.classList.remove('hidden');
  }, currentScreen ? 100 : 0);
}

function toggleTopbar(showBar){
  const tb = qs('#topbar');
  tb.classList.toggle('hidden', !showBar);
}

function setScore(){
  qs('#score').textContent = `Punkte: ${state.score}`;
}

// No parsing or fetching needed

function renderStory(){
  const cur = state.stories[state.index];
  cancelTyping();
  const textEl = qs('#story-text');
  const paperInner = qs('#story-card .paper-inner');
  // Reset typing state and pre-measure final height to avoid layout growth
  textEl.classList.remove('typing');
  // reset any previous minHeight before measuring
  paperInner.style.minHeight = '';
  textEl.style.visibility = 'hidden';
  textEl.textContent = cur.text;
  // force reflow to get accurate height
  const targetHeight = paperInner.offsetHeight;
  paperInner.style.minHeight = targetHeight + 'px';
  // prepare for typing
  textEl.textContent = '';
  textEl.style.visibility = '';
  typeText(textEl, cur.text);
  const srcEl = qs('#story-source');
  // Source is hidden until answer is given
  srcEl.classList.add('hidden');
  srcEl.textContent = cur.url ? `Quelle: ${cur.url}` : '';
}

function feedback(ok){
  const card = qs('#story-card .paper-inner');
  card.classList.remove('flash','ok','bad');
  void card.offsetWidth; // reflow to restart animation
  card.classList.add('flash', ok ? 'ok' : 'bad');
}

function next(){
  cancelTyping();
  state.index++;
  if(state.index >= state.stories.length){
    qs('#result-text').textContent = `Dein Ergebnis: ${state.score} von ${state.stories.length} Punkten.`;
    show('screen-result');
    toggleTopbar(true);
    setScore();
    return;
  }
  // Smooth transition to next story
  const storyCard = qs('#story-card');
  storyCard.style.opacity = '0';
  storyCard.style.transform = 'translateY(20px)';
  
  setTimeout(() => {
    cancelTyping();
    renderStory();
    storyCard.style.opacity = '1';
    storyCard.style.transform = 'translateY(0)';
  }, 300);
}

// Typewriter effect with robust cancellation and skip-on-click
let typingState = { timerId: null, el: null, skipHandler: null };

function cancelTyping(){
  if(typingState.timerId){
    clearTimeout(typingState.timerId);
  }
  if(typingState.el && typingState.skipHandler){
    typingState.el.removeEventListener('click', typingState.skipHandler);
    typingState.el.classList.remove('typing');
  }
  typingState = { timerId: null, el: null, skipHandler: null };
}

function typeText(el, fullText){
  cancelTyping();
  const speedBase = 27; // ms per char baseline (50% slower)
  const speedPunct = 135; // pause after punctuation (50% slower)
  let i = 0;
  el.classList.add('typing');

  const step = () => {
    if(i >= fullText.length){
      el.textContent = fullText;
      el.classList.remove('typing');
      cancelTyping();
      return;
    }
    el.textContent = fullText.slice(0, i+1);
    const ch = fullText[i];
    i++;
    const delay = /[\.!?\n]/.test(ch) ? speedPunct : speedBase;
    typingState.timerId = setTimeout(step, delay);
  };

  const skip = () => {
    if(typingState.timerId){ clearTimeout(typingState.timerId); }
    el.textContent = fullText;
    el.classList.remove('typing');
    cancelTyping();
  };

  typingState.el = el;
  typingState.skipHandler = skip;
  el.addEventListener('click', skip);
  step();
}

function handleAnswer(sel){
  const cur = state.stories[state.index];
  const ok = sel === cur.answer;
  if(ok) state.score++;
  setScore();
  
  // Disable buttons to prevent double click
  qs('#btn-real').disabled = true;
  qs('#btn-fake').disabled = true;
  
  // Reveal source in the card
  qs('#story-source').classList.remove('hidden');
  
  // Show result modal immediately
  const modal = qs('#result-modal');
  const msg = ok ? 'Richtig — es ist echt.' : 'Falsch — es ist ausgedacht.';
  qs('#modal-message').textContent = msg;
  if(cur.answer === 'real' && cur.url){
    qs('#modal-source').innerHTML = `Quelle: <a href="${cur.url}" target="_blank" rel="noopener noreferrer">${cur.url}</a>`;
  } else {
    qs('#modal-source').textContent = '';
  }
  // viewport glow
  document.body.classList.remove('result-ok','result-bad');
  document.body.classList.add(ok ? 'result-ok' : 'result-bad');
  // play sfx
  try{
    const audio = ok ? qs('#sfx-correct') : qs('#sfx-wrong');
    if(audio){
      audio.currentTime = 0;
      audio.volume = 0.9;
      audio.play().catch(()=>{});
    }
  }catch(_e){}
  modal.classList.remove('hidden');
}

function shuffle(arr){
  for(let i=arr.length-1;i>0;i--){
    const j = Math.floor(Math.random()* (i+1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function startGame(){
  state.index = 0; state.score = 0;
  setScore();
  // Keep original order to match the text file sequence
  renderStory();
  toggleTopbar(true);
  show('screen-game');
  qs('#btn-real').disabled = false;
  qs('#btn-fake').disabled = false;
}

function restart(){
  startGame();
}

window.addEventListener('DOMContentLoaded', () => {
  qs('#btn-start').addEventListener('click', () => startGame());
  qs('#btn-restart').addEventListener('click', () => restart());
  qs('#btn-real').addEventListener('click', () => handleAnswer('real'));
  qs('#btn-fake').addEventListener('click', () => handleAnswer('fake'));
  // Header controls
  const home = qs('#btn-home');
  if(home){ home.addEventListener('click', () => {
    // Close modal if open
    qs('#result-modal').classList.add('hidden');
    document.body.classList.remove('result-ok','result-bad');
    // Reset to start screen
    show('screen-start');
    toggleTopbar(false);
  }); }
  const back = qs('#btn-back');
  if(back){ back.addEventListener('click', () => {
    // Only if in game and not at first story
    if(qs('#screen-game').classList.contains('hidden')) return;
    if(state.index <= 0) return;
    // Close modal if open
    qs('#result-modal').classList.add('hidden');
  document.body.classList.remove('result-ok','result-bad');
    // Move back one and render with animation
    cancelTyping();
    state.index -= 1;
    const storyCard = qs('#story-card');
    storyCard.style.opacity = '0';
    storyCard.style.transform = 'translateY(20px)';
    setTimeout(() => {
      cancelTyping();
      renderStory();
      qs('#btn-real').disabled = false;
      qs('#btn-fake').disabled = false;
      storyCard.style.opacity = '1';
      storyCard.style.transform = 'translateY(0)';
    }, 200);
  }); }
  qs('#btn-next').addEventListener('click', () => {
    // Close modal first
    qs('#result-modal').classList.add('hidden');
    document.body.classList.remove('result-ok','result-bad');
    
    // Then advance to next story with animation
    setTimeout(() => {
      cancelTyping();
      next();
      // Re-enable buttons for the new question
      qs('#btn-real').disabled = false;
      qs('#btn-fake').disabled = false;
    }, 200);
  });
  // stories are already loaded from constant
});
