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
    relativeSemitones: [[0, 4, 7]],
  }, {
    root: 'ii',
    chordSymbol: '',
    relativeSemitones: [[2, 5, 9]],
  }, {
    root: 'iii',
    chordSymbol: '',
    relativeSemitones: [[4, 7, 11]],
  }, {
    root: 'IV',
    chordSymbol: '',
    relativeSemitones: [[5, 9, 12]],
  }, {
    root: 'V',
    chordSymbol: '',
    relativeSemitones: [[7, 11, 14]],
  }, {
    root: 'vi',
    chordSymbol: '',
    relativeSemitones: [[9, 12, 16]],
  }, {
    root: 'vii',
    chordSymbol: '\ue870',
    relativeSemitones: [[11, 14, 17]],
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
  chord.relativeSemitones[0].forEach((semitone, index) => {
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
 *@param {Object[]} chord.relativeSemitones
 @param {number[]} chord.relativeSemitones[]
 */
const makeMinor = (chord) => {
  // make copy so as to not modify the original chord object
  const newChord = {};
  newChord.root = chord.root.toLowerCase();
  newChord.chordSymbol = chord.chordSymbol;
  let minorThirdIndex = 1;
  let rootIndex = 0;
  const minorThirdInSemitones = 4;
  const numberOfInversions = chord.relativeSemitones.length;
  newChord.relativeSemitones = chord.relativeSemitones.map((inversion) => {
    // don't want to modify original inversion array because it should be
    // read-only
    const newInversion = [...inversion];
    newInversion[minorThirdIndex] = newInversion[rootIndex] + minorThirdInSemitones;
    rootIndex = rootIndex === 0
      ? numberOfInversions - 1
      : --rootIndex;
    minorThirdIndex = minorThirdIndex === 0
      ? numberOfInversions - 1
      : --minorThirdIndex;

    return newInversion;
  });
  return newChord;
};

export {
  makeMinor, getDiatonicChords, randomProgression, randomDiatonicTriadGenerator, Scale,
  convertChordsToFrequencies,
};
