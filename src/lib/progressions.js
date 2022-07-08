const SymbolStrings = {
  aug: '\ue872',
  dim: '\ue870',
  halfDim: 'ø',
  flat: '\ue260',
  sharp: '\ue262',
};

const noteFreqs = [];
for (let octave = 0; octave < 9; octave++) {
  noteFreqs[octave] = [];
  // 0 is C
  const kFactor = 2 ** (1 / 12);
  for (let note = 0; note < 12; note++) {
    noteFreqs[octave][note] = 27.5;
    if (!(octave === 0 && note < 9)) {
      const prevNote = note === 0
        ? noteFreqs[octave - 1][11]
        : noteFreqs[octave][note - 1];
      noteFreqs[octave][note] = prevNote * kFactor;
    }
  }
}

const majorDiatonicTriads = [
  {
    root: 'I',
    chordSymbol: '',
    // first inner array represents root position, second is first inversion, etc.
    semitones: [0, 4, 7],
    inversion: 0,
  }, {
    root: 'ii',
    chordSymbol: '',
    semitones: [2, 5, 9],
    inversion: 0,
  }, {
    root: 'iii',
    chordSymbol: '',
    semitones: [4, 7, 11],
    inversion: 0,
  }, {
    root: 'IV',
    chordSymbol: '',
    semitones: [5, 9, 12],
    inversion: 0,
  }, {
    root: 'V',
    chordSymbol: '',
    semitones: [7, 11, 14],
    inversion: 0,
  }, {
    root: 'vi',
    chordSymbol: '',
    semitones: [9, 12, 16],
    inversion: 0,
  }, {
    root: 'vii',
    chordSymbol: `${SymbolStrings.dim}`,
    semitones: [11, 14, 17],
    inversion: 0,
  }];

const Scale = {
  MAJOR: 'major',
  MINOR: 'minor',
};

const recursivelyFreeze = (obj) => {
  Object.freeze(obj);

  const values = Object.values(obj);
  // eslint-disable-next-line no-restricted-syntax
  for (const property of values) {
    if (typeof property === 'object') {
      recursivelyFreeze(property);
    }
  }
};

const setUpChordsData = () => {
  const chords = {};

  // Freeze objects and their child objects to prevent them from being modified
  recursivelyFreeze(majorDiatonicTriads);

  chords[Scale.MAJOR] = {
    diatonicTriads: majorDiatonicTriads,
  };

  return chords;
};

const chords = setUpChordsData();

const getDiatonicChords = (scale) => chords[scale].diatonicTriads;

// returns string representing one of the seven diatonic triads from either major or minor scale
// scale: 'major'|'minor'
const randomDiatonicTriadGenerator = (scale) => {
  const selection = Math.floor((Math.random() * 7));
  const chord = getDiatonicChords(scale)[selection];
  return chord;
};

// returns array of strings where each string is the result of calling the chord creater
// callback provided
// chords: number of chords in the progression
// cordGenerator: function used to randomly select a chord
const randomProgression = (chords, chordGenerator) => {
  const progression = [];
  for (let i = 0; i < chords; i++) {
    progression.push(chordGenerator());
  }
  return progression;
};

const convertToFrequencies = (chords, root, octave) => chords.map((chord) => {
  const chordFreqs = [];
  // TODO: take inversions into account
  chord.semitones.forEach((semitone, index) => {
    const semitoneRelToC = semitone + root;
    const additionalOctave = Math.floor(semitoneRelToC / 12);
    const note = semitoneRelToC % 12;

    chordFreqs[index] = noteFreqs[octave + additionalOctave][note];
  });
  return chordFreqs;
});

/**
 *
 *@param {Object} chord
 * @param {string} chord.root
 * @param {string} chord.chordSymbol
 *@param {number[]} chord.semitones
 */
const makeMinor = (chord) => {
  // make copy so as to not modify the original chord object
  const newChord = {};
  newChord.root = chord.root.toLowerCase();

  const regex = new RegExp(`${SymbolStrings.dim}|${SymbolStrings.halfDim}|${SymbolStrings.aug}`);
  newChord.chordSymbol = chord.chordSymbol.replace(regex, '');

  newChord.semitones = [...chord.semitones];
  const rootIndex = 0;
  const minorThirdIndex = 1;
  const fifthIndex = 2;
  const minorThirdInSemitones = 3;
  const fifthInSemitones = 7;
  newChord.semitones[minorThirdIndex] = newChord.semitones[rootIndex] + minorThirdInSemitones;
  newChord.semitones[fifthIndex] = newChord.semitones[rootIndex] + fifthInSemitones;

  return newChord;
};

const makeMajor = (chord) => {
  // make copy so as to not modify the original chord object
  const newChord = {};
  newChord.root = chord.root.toUpperCase();

  const regex = new RegExp(`${SymbolStrings.dim}|${SymbolStrings.halfDim}|${SymbolStrings.aug}`);
  newChord.chordSymbol = chord.chordSymbol.replace(regex, '');

  newChord.semitones = [...chord.semitones];
  const rootIndex = 0;
  const majorThirdIndex = 1;
  const fifthIndex = 2;
  const majorThirdInSemitones = 4;
  const fifthInSemitones = 7;
  newChord.semitones[majorThirdIndex] = newChord.semitones[rootIndex] + majorThirdInSemitones;
  newChord.semitones[fifthIndex] = newChord.semitones[rootIndex] + fifthInSemitones;

  return newChord;
};

/**
 *
 * @param {Object} chord
 * @param {string} chord.chordSymbol
 */
const makeAugmented = (chord) => {
  const newChord = makeMajor(chord);
  const fifthIndex = 2;
  newChord.chordSymbol = `${SymbolStrings.aug}${newChord.chordSymbol}`;
  newChord.semitones[fifthIndex]++;

  return newChord;
};

const makeDiminished = (chord) => {
  const newChord = makeMinor(chord);
  const fifthIndex = 2;
  newChord.chordSymbol = `${SymbolStrings.dim}${newChord.chordSymbol}`;
  newChord.semitones[fifthIndex]--;

  return newChord;
};

const addMajorSeventh = (chord) => {
  const newChord = {};
  newChord.root = chord.root;
  newChord.chordSymbol = chord.chordSymbol;
  newChord.semitones = [...chord.semitones];
};

const addSeventh = (chord) => {
  const newChord = { ...chord };

  return newChord;
};

const addDiminishedSeventh = (chord) => {
  const newChord = { ...chord };

  return newChord;
};

const ROOTS = {
  0: 'I',
  1: `${SymbolStrings.flat}II`,
  2: 'II',
  3: `${SymbolStrings.flat}III`,
  4: 'III',
  5: 'IV',
  6: `${SymbolStrings.flat}V`,
  7: 'V',
  8: `${SymbolStrings.flat}VI`,
  9: 'VI',
  10: `${SymbolStrings.flat}VII`,
  11: 'VII',
};

const Intervals = {
  MINOR_THIRD: 3,
  MAJOR_THIRD: 4,
  FOURTH: 5,
  DIM_FIFTH: 6,
  FIFTH: 7,
  AUG_FIFTH: 8,
  DIM_SEVENTH: 9,
  MINOR_SEVENTH: 10,
  MAJOR_SEVENTH: 11,
};

function convertSemitonesToChordString(semitones) {
  const n = semitones.length;
  const root = semitones[0];
  const third = semitones[1];

  let chordString = ROOTS[root];

  if (third - root === Intervals.MINOR_THIRD) {
    chordString = chordString.toLowerCase();
  }

  if (n === 3) { // triad
    const fifth = semitones[2];
    if (fifth - root === Intervals.DIM_FIFTH) chordString += SymbolStrings.dim;
    else if (fifth - root === Intervals.AUG_FIFTH) chordString += SymbolStrings.aug;
  } else if (n === 4) { // seventh chord
    const fifth = semitones[2];
    const seventh = semitones[3];
    // perfect fifth
    if (fifth - root === Intervals.AUG_FIFTH) {
      chordString += 'aug';
    }
    switch (seventh - root) {
      case Intervals.MAJOR_SEVENTH:
        chordString += 'M7';
        break;
      case Intervals.MINOR_SEVENTH:
        chordString += '7';
        break;

      case Intervals.DIM_SEVENTH:
        chordString += 'dim7';
        break;
      default:
    }

    if (fifth - root === Intervals.DIM_FIFTH && seventh - root !== Intervals.DIM_SEVENTH) {
      chordString += 'b5';
    }
  } else if (n === 5) { // ninth chord
    console.log('nothing');
  } else if (n === 6) { // 13th chord
    console.log('nothing');
  }

  return chordString;
}

function Chord(semitones) {
  this.chord = []; // in semitones
  this.convertSemitonesToChordString = convertSemitonesToChordString;
  this.chordString = this.convertSemitonesToChordString(semitones);
}

export {
  chords,
  makeAugmented,
  makeDiminished,
  addDiminishedSeventh,
  addSeventh,
  addMajorSeventh,
  SymbolStrings,
  makeMinor,
  makeMajor,
  getDiatonicChords,
  randomProgression,
  randomDiatonicTriadGenerator,
  Scale,
  convertToFrequencies,
  Chord,
};
