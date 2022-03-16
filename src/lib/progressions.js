const majorDiatonicTriads = [
  {
    root: 'I',
    chordSymbol: '',
  }, {
    root: 'ii',
    chordSymbol: '',
  }, {
    root: 'iii',
    chordSymbol: '',
  }, {
    root: 'IV',
    chordSymbol: '',
  }, {
    root: 'V',
    chordSymbol: '',
  }, {
    root: 'vi',
    chordSymbol: '',
  }, {
    root: 'vii',
    chordSymbol: '\ue870',
  }];

const Scale = {
  MAJOR: 'major',
  MINOR: 'minor',
};
const setUpChordsData = () => {
  const chords = {};

  chords[Scale.MAJOR] = {
    diatonicTriads: majorDiatonicTriads,
  };

  return chords;
};

const chords = setUpChordsData();

const getDiatonicChords = (scale) => chords[scale].diatonicTriads;

// returns string representing one of the seven diatonic triads from either major or minor scale
// scale: 'major'|'minor'
const randomDiatonicTriad = (scale) => {
  const selection = Math.floor((Math.random() * 7));
  const chord = getDiatonicChords(scale)[selection];
  return chord;
};

// returns array of strings where each string is the result of calling the chord creater
// callback provided
// chords: number of chords in the progression
// cordGenerator: function used to randomly select a chord
const randomProgression = (chords, cordGenerator) => {
  const progression = [];
  for (let i = 0; i < chords; i++) {
    progression.push(cordGenerator());
  }
  return progression;
};

export {
  getDiatonicChords, randomProgression, randomDiatonicTriad, Scale, chords,
};
