// import { toHaveDescription } from '@testing-library/jest-dom/dist/matchers';
import {
  Chord, SymbolStrings,
} from './progressions';

// test('chords major property has correct diatonic chords', () => {
//   const expectedDiatonics = ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'viidim'];
//   const actualDiatonics = chords[Scale.MAJOR].diatonicTriads;
//   expect(actualDiatonics).toEqual(expectedDiatonics);
// });

// test('getDiatonicChords', () => {
//   const expectedDiatonics = ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'viidim'];
//   const actualDiatonics = getDiatonicChords(Scale.MAJOR);
//   expect(actualDiatonics).toEqual(expectedDiatonics);
// });

describe('Chord converting triad semitones', () => {
  test('Major Triads', () => {
    const semitones = [
      [0, 4, 7],
      [1, 5, 8],
      [2, 6, 9],
      [3, 7, 10],
      [4, 8, 11],
      [5, 9, 12],
      [6, 10, 13],
      [7, 11, 14],
      [8, 12, 15],
      [9, 13, 16],
      [10, 14, 17],
      [11, 15, 18],
    ];

    const strings = [
      'I',
      `${SymbolStrings.flat}II`,
      'II',
      `${SymbolStrings.flat}III`,
      'III',
      'IV',
      `${SymbolStrings.flat}V`,
      'V',
      `${SymbolStrings.flat}VI`,
      'VI',
      `${SymbolStrings.flat}VII`,
      'VII',
    ];

    semitones.forEach((s, i) => {
      const chord = new Chord(s);
      expect(chord.chordString).toBe(strings[i]);
    });
  });

  test('Minor Triads', () => {
    const semitones = [
      [0, 3, 7],
      [1, 4, 8],
      [2, 5, 9],
      [3, 6, 10],
      [4, 7, 11],
      [5, 8, 12],
      [6, 9, 13],
      [7, 10, 14],
      [8, 11, 15],
      [9, 12, 16],
      [10, 13, 17],
      [11, 14, 18],
    ];

    const strings = [
      'i',
      `${SymbolStrings.flat}ii`,
      'ii',
      `${SymbolStrings.flat}iii`,
      'iii',
      'iv',
      `${SymbolStrings.flat}v`,
      'v',
      `${SymbolStrings.flat}vi`,
      'vi',
      `${SymbolStrings.flat}vii`,
      'vii',
    ];

    semitones.forEach((s, i) => {
      const chord = new Chord(s);
      expect(chord.chordString).toBe(strings[i]);
    });
  });

  test('Diminished Triads', () => {
    const semitones = [0, 3, 6];
    const chord = new Chord(semitones);
    expect(chord.chordString).toBe(`i${SymbolStrings.dim}`);
  });

  test('Augmented Triads', () => {
    const semitones = [0, 4, 8];
    const chord = new Chord(semitones);
    expect(chord.chordString).toBe(`I${SymbolStrings.aug}`);
  });
});

describe.only('Converting semitones to seventh chords using Chord constructor', () => {
  test('Major Seventh', () => {
    const semitones = [0, 4, 7, 11];
    const chord = new Chord(semitones);
    console.log(chord.chordString);
  });

  test('Minor Seventh', () => {
    const semitones = [0, 3, 7, 10];
    const chord = new Chord(semitones);
    console.log(chord.chordString);
  });

  test('Dominant Seventh', () => {
    const semitones = [0, 4, 7, 10];
    const chord = new Chord(semitones);
    console.log(chord.chordString);
  });

  test('Diminished Seventh', () => {
    const semitones = [0, 3, 6, 9];
    const chord = new Chord(semitones);
    console.log(chord.chordString);
  });

  test('Half-diminished Seventh', () => {
    const semitones = [0, 3, 6, 10];
    const chord = new Chord(semitones);
    console.log(chord.chordString);
  });

  test('Minor-major Seventh', () => {
    const semitones = [0, 3, 7, 11];
    const chord = new Chord(semitones);
    console.log(chord.chordString);
  });

  test('Augmented Major Seventh', () => {
    const semitones = [0, 4, 8, 11];
    const chord = new Chord(semitones);
    console.log(chord.chordString);
  });

  test('Dominant Seventh Flat Five', () => {
    const semitones = [0, 4, 6, 10];
    const chord = new Chord(semitones);
    console.log(chord.chordString);
  });

  test('Augmented Seventh', () => {
    const semitones = [0, 4, 8, 10];
    const chord = new Chord(semitones);
    console.log(chord.chordString);
  });

  test('Diminished Major Seventh', () => {
    const semitones = [0, 3, 6, 11];
    const chord = new Chord(semitones);
    console.log(chord.chordString);
  });

  test('Major Seventh Flat Five', () => {
    const semitones = [0, 4, 6, 11];
    const chord = new Chord(semitones);
    console.log(chord.chordString);
  });
});
