const express = require("express");

var finalTemplates = [
  function() { return "you are " + getDescriptor(); },
  function() { return "you have " + getAbstractProperty(); },
];

var templates = [
  function() { return "9 out of 10 recursors say " + getFinalTemplate(); },
  function() { return "i can tell " + getFinalTemplate(); },
  function() { return "i can't believe " + getFinalTemplate(); },
  function() { return "i must say: " + getFinalTemplate(); },
  function() { return "i reckon " + getFinalTemplate(); },
  function() { return "i think " + getFinalTemplate(); },
  function() { return "i've always thought " + getFinalTemplate(); },
  function() { return "i've heard " + getFinalTemplate(); },
  function() { return "it's true, " + getFinalTemplate(); },
  function() { return "people say " + getFinalTemplate(); },
  function() { return "they say " + getFinalTemplate(); },
].concat(finalTemplates);

var abstractProperties = [
  function() { return [makeSingularForm(getDescriptor()), getTangibleSingularProperty()].join(" "); },
  function() { return [getDescriptor(), getTangibleMultipleProperty()].join(" "); },
];

var tangibleSingularProperties = ["idea","imagination","suggestion","mind","spirit","vision","wisdom","advice","something","stuff","notion","soul","philosophy","message","knowledge","opinion","feedback","perspective","chance","impression","view","way","passion","conversation","belief","dream","sense","theory","discussion","excitement","fun","curiosity","kind","information","personality","conjecture","theme","sort","anything","desire","chatter","mood","opportunity","faith","zest","insight","thing","emotion","gossip","story","discourse","thread","enthusiasm","laugh","possibility","inspiration","attitude","everything","hypothesis","purpose","hope","pleasure","poetry","talk","dreamer","impulse","instinct","Talk","laughter","table","feeling","topic","interpretation","eagerness","joy","praise","synopsis","fantasy","content","exuberance","rhetoric","love","aim","wish","mentality","future","logic","impetus","natures","muse","humanity","criticism","religion","rumor","motivation","analogy","rationale","answer","commentary","tweet","potpourri","thinking","supposition","intention","perception","chuckle","visions","ambition","essay","weirdness","hyperbole","admonition","inclination","narrative","listener","debate","brighten","lyric","fervor","moments","worlds","dreamers","thought","share","minds","souls","friends","characters","talking","writing","try","things","might"];


var tangibleMultipleProperties = ["thoughts","ideas","suggestions","visions","experiences","notions","theories","things","dreams","memories","minds","feelings","stories","impressions","reflections","observations","views","recollections","words","emotions","ways","questions","possibilities","tips","tales","hints","strategies","senses","aspirations","guesses","opinions","facts","messages","wishes","myths","habits","imaginations","comments","secrets","speculations","details","conjectures","hypotheses","bits","aspects","qualities","sketches","voices","conclusions","conceptions","responses","inclinations","touches","traits","souls","imaginings","sentiments","daydreams","preferences","energies","glimpses","chances","realities","perceptions","fantasies","happenings","hopes","noises","friends","particulars","moods","impulses","influences","reminiscences","reasons","doubts","Things","brains","pursuits","explorations","greetings","illusions","beliefs","criticisms","options","moments","poems","traditions","images","folks","clues","explanations","guys","prejudices","worlds","laughs","reactions","considerations","issues","plans","intentions","threads","writings","approaches","narratives","characters","projections","concerns","situations","descriptions","paths","joys","interests","remarks","phantoms","intimations","scenarios","expectations","meanings","selections","ambitions","attitudes","hobbies","tendencies","rumors","phrases","discourses","horizons","articles","whisperings","intellects","instincts","positives","expressions","lessons","smiles","scraps","excuses","compliments","morsels","reviews","absurdities","surprises","tidings","allusions","curiosities","destinies","invitations","findings","videos"];

var adjectives = ["awesome","fantastic","incredible","great","nice","unbelievable","fabulous","terrific","wonderful","good","weird","impressive","marvelous","beautiful","awful","excellent","amazing","lovely","crazy","horrible","gorgeous","perfect","terrible","interesting","exciting","indescribable","tremendous","delicious","easy","glad","insane","cool","refreshing","okay","enjoyable","stupendous","happy","strange","huge","mad","brilliant","remarkable","funny","monstrous","stupid","odd","solid","big","exceptional","sweet","splendid","tasty","hideous","cute","spectacular","enormous","gigantic","unreal","important","immense","scary","bad","unique","tough","memorable","stellar","ultimate","infinite","pleasant","magical","decent","whole","uncanny","luscious","sad","hellish","ideal","glorious","intriguing","different","real","capable","proud","overwhelming","hard","absolute","shocking","astonishing","awkward","prodigious","sorry","ecstatic","obvious","unusual","primal","true","honest","elegant","strong","curious","endless","classic","intense","delightful","surprising","titanic","classy","crisp","dazzling","mellow","ready","wise","sure","mighty","able","sheer","fascinating","unfortunate","unforgettable","superb","impossible","appalling","powerful","comfortable","super","special","ugly","snappy","quick","satisfying","unimaginable","extraordinary","meaty","stylish","funky","speechless","dominant","lush","ethereal","fearsome","limitless","frightful","silky","formidable","entire","nauseous","sexy","alien","bizarre","equal"];


var adverbs = [
  "absolutely",
  "awfully",
  "bloody",
  "completely",
  "decidedly",
  "deeply",
  "devilishly",
  "distinctly",
  "entirely",
  "especially",
  "ever so",
  "exceedingly",
  "exceptionally",
  "extraordinarily",
  "extremely",
  "fairly",
  "frightfully",
  "highly",
  "hugely",
  "immensely",
  "incredibly",
  "inordinately",
  "insanely",
  "intensely",
  "mightily",
  "oh-so",
  "outstandingly",
  "particularly",
  "perfectly",
  "positively",
  "practically",
  "pretty",
  "purely",
  "quite",
  "radiantly",
  "rather",
  "really",
  "remarkably",
  "seriously",
  "simply",
  "so",
  "somewhat",
  "sort of",
  "supremely",
  "terribly",
  "thoroughly",
  "totally",
  "totes",
  "tremendously",
  "truly",
  "unusually",
  "utterly",
  "very",
  "virtually","absolutely","utterly","really","totally","obviously","certainly","completely","truly","always","very","indeed","extremely","frankly","wholly","not","quite","almost","so","equally","incredibly","just","clearly","virtually","definitely","entirely","never","here","unbelievably","everywhere","especially","still","now","hardly","perfectly","pretty","plainly","therefore","evidently","particularly","doubly","probably","thoroughly","fantastically","profoundly","actually","exactly","terribly","hideously","seemingly","simply","practically","deeply","else","whatsoever","highly","tremendously","otherwise","undoubtedly","enormously","again","wonderfully","basically","ever","already","yet","fairly","anymore","horribly","even","fully","damned","singularly","infinitely","somehow","exceedingly","personally","however","essentially","anyhow","extraordinarily","surely","forever","hugely","only","anywhere","literally","nearly","sadly","immediately","too","exceptionally","overly","sometimes","hopelessly","firmly","anyway","suddenly","deliciously","positively","once","purely","strangely","fortunately","constantly","scarcely","afterward","mildly","unmistakably","amazingly","faintly","insanely","likewise","merely","somewhat","madly","shockingly","frightfully","Well","vaguely","apparently","precisely","maybe","necessarily","uniformly","greatly","strongly","forward","reasonably","grotesquely","badly","absurdly","nowhere","strictly","wildly","weirdly","awfully","technically","desperately","altogether","naturally","peculiarly","rightly","phenomenally","immensely","nevertheless","undeniably","vigorously","enough","repeatedly","patently"
];

var makeCompliment = module.exports = function makeCompliment() {
  return getTemplate();
};

var makeSingularForm = module.exports.makeSingularForm = function makeSingularForm(text) {
  if (text.match(/^[aeiou]/i)) {
    return "an " + text;
  } else {
    return "a " + text;
  }
}

var getTemplate = module.exports.getTemplate = function getTemplate() {
  return templates[Math.floor(Math.random() * templates.length)]();
}

var getFinalTemplate = module.exports.getFinalTemplate = function getFinalTemplate() {
  return finalTemplates[Math.floor(Math.random() * finalTemplates.length)]();
};

var getAbstractProperty = module.exports.getAbstractProperty = function getAbstractProperty() {
  return abstractProperties[Math.floor(Math.random() * abstractProperties.length)]();
}

var getTangibleSingularProperty = module.exports.getTangibleSingularProperty = function getTangibleSingularProperty() {
  return tangibleSingularProperties[Math.floor(Math.random() * tangibleSingularProperties.length)];
}

var getTangibleMultipleProperty = module.exports.getTangibleMultipleProperty = function getTangibleMultipleProperty() {
  return tangibleMultipleProperties[Math.floor(Math.random() * tangibleMultipleProperties.length)];
}

var getAdjective = module.exports.getAdjective = function getAdjective() {
  return adjectives[Math.floor(Math.random() * adjectives.length)];
}

var getAdverb = module.exports.getAdverb = function getAdverb() {
  return adverbs[Math.floor(Math.random() * adverbs.length)];
}

var getDescriptor = module.exports.getDescriptor = function getDescriptor() {
  return [getAdverb(), getAdjective()].join(" ");
}

const app = new express();

app.get("/", (req, res) => {
  res.json(makeCompliment());
});

app.listen(process.env.PORT || 5000, () => console.log('Running'));
