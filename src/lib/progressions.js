const symbolStrings = {
  aug: '\ue872',
  dim: '\ue870',
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
    chordSymbol: `${symbolStrings.dim}`,
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

const convertChordsToFrequencies = (chords, root, octave) => chords.map((chord) => {
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
  newChord.chordSymbol = chord.chordSymbol;
  newChord.semitones = [...chord.semitones];
  const minorThirdIndex = 1;
  const rootIndex = 0;
  const minorThirdInSemitones = 3;
  newChord.semitones[minorThirdIndex] = newChord.semitones[rootIndex] + minorThirdInSemitones;

  return newChord;
};

const makeMajor = (chord) => {
  // make copy so as to not modify the original chord object
  const newChord = {};
  newChord.root = chord.root.toUpperCase();
  newChord.chordSymbol = chord.chordSymbol;
  newChord.semitones = [...chord.semitones];
  const majorThirdIndex = 1;
  const rootIndex = 0;
  const majorThirdInSemitones = 4;
  newChord.semitones[majorThirdIndex] = newChord.semitones[rootIndex] + majorThirdInSemitones;

  return newChord;
};

export {
  symbolStrings,
  makeMinor,
  makeMajor,
  getDiatonicChords,
  randomProgression,
  randomDiatonicTriadGenerator,
  Scale,
  convertChordsToFrequencies,
};
