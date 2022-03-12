import { chords, getDiatonicChords, Scale } from './progressions';

test('chords major property has correct diatonic chords', () => {
  const expectedDiatonics = ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'viidim'];
  const actualDiatonics = chords[Scale.MAJOR].diatonicTriads;
  expect(actualDiatonics).toEqual(expectedDiatonics);
});

test('getDiatonicChords', () => {
  const expectedDiatonics = ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'viidim'];
  const actualDiatonics = getDiatonicChords(Scale.MAJOR);
  expect(actualDiatonics).toEqual(expectedDiatonics);
});
