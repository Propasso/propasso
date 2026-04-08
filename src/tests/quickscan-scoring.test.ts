import { describe, it, expect } from 'vitest';
import { calculateScores, getScoreLevel, allQuestions, extractSnapshot, SNAPSHOT_COUNT, questionTips, getQuestionTip } from '../data/diagnoseData';

describe('Quickscan Scoring Pipeline', () => {

  it('should score 100% when all diagnostic answers are 6', () => {
    const answers: Record<number, string> = {};
    for (let id = 6; id <= 20; id++) {
      answers[id] = '6';
    }
    answers[1] = '€3–10 mln';
    answers[2] = 'Goed winstgevend met gezonde marges';
    answers[3] = '3–5 jaar';

    const scores = calculateScores(answers);
    expect(scores.attractiveness).toBe(100);
    expect(scores.readiness).toBe(100);
    expect(scores.owner).toBe(100);
    expect(scores.overall).toBe(100);
    expect(getScoreLevel(scores.overall)).toBe('ready');
  });

  it('should score ~17% when all diagnostic answers are 1', () => {
    const answers: Record<number, string> = {};
    for (let id = 6; id <= 20; id++) {
      answers[id] = '1';
    }
    answers[1] = '€3–10 mln';
    answers[2] = 'Rond break-even';
    answers[3] = 'Nog niet concreet';

    const scores = calculateScores(answers);
    expect(scores.attractiveness).toBe(17);
    expect(scores.readiness).toBe(17);
    expect(scores.owner).toBe(17);
    expect(scores.overall).toBe(17);
    expect(getScoreLevel(scores.overall)).toBe('orientation');
  });

  it('should score 50% when all diagnostic answers are 3', () => {
    const answers: Record<number, string> = {};
    for (let id = 6; id <= 20; id++) {
      answers[id] = '3';
    }
    answers[1] = '€3–10 mln';
    answers[2] = 'Redelijke winst maar weinig marge';
    answers[3] = '3–5 jaar';

    const scores = calculateScores(answers);
    expect(scores.attractiveness).toBe(50);
    expect(scores.readiness).toBe(50);
    expect(scores.owner).toBe(50);
    expect(scores.overall).toBe(50);
    expect(getScoreLevel(scores.overall)).toBe('foundation');
  });

  it('should calculate per-dimension scores correctly with mixed answers', () => {
    const answers: Record<number, string> = {
      6: '6', 7: '1', 8: '6', 9: '1', 10: '6',
      11: '2', 12: '2', 13: '2', 14: '2', 15: '2',
      16: '5', 17: '5', 18: '5', 19: '5', 20: '5',
      1: '€3–10 mln', 2: 'Goed winstgevend met gezonde marges', 3: '3–5 jaar',
    };

    const scores = calculateScores(answers);
    expect(scores.attractiveness).toBe(67);
    expect(scores.readiness).toBe(33);
    expect(scores.owner).toBe(83);
    expect(scores.overall).toBe(61);
    expect(getScoreLevel(scores.attractiveness)).toBe('good');
    expect(getScoreLevel(scores.readiness)).toBe('orientation');
    expect(getScoreLevel(scores.owner)).toBe('ready');
  });

  it('should have correct data structure and question counts', () => {
    const diagnostic = allQuestions.filter(q => q.category !== 'snapshot');
    const snapshots = allQuestions.filter(q => q.category === 'snapshot');

    expect(diagnostic.length).toBe(15);
    expect(snapshots.length).toBe(3);
    expect(SNAPSHOT_COUNT).toBe(3);

    const likert = diagnostic.filter(q => q.format === 'likert');
    const scenario = diagnostic.filter(q => q.format === 'scenario');
    expect(likert.length).toBe(9);
    expect(scenario.length).toBe(6);

    for (const q of scenario) {
      for (const opt of q.options) {
        expect(opt.value).toMatch(/^[1-6]$/);
        expect(opt.score).toBeGreaterThanOrEqual(1);
        expect(opt.score).toBeLessThanOrEqual(6);
      }
    }

    for (const q of likert) {
      const scores = q.options.map(o => o.score).sort();
      expect(scores).toEqual([1, 2, 3, 4, 5, 6]);
    }

    expect(allQuestions[0].category).not.toBe('snapshot');
    expect(allQuestions[allQuestions.length - 1].category).toBe('snapshot');

    for (let id = 6; id <= 20; id++) {
      expect(getQuestionTip(id, 1)).toBeTruthy();
      expect(getQuestionTip(id, 3)).toBeTruthy();
      expect(getQuestionTip(id, 6)).toBeTruthy();
    }

    const snap = extractSnapshot({ 1: 'test-rev', 2: 'test-profit', 3: 'test-horizon' });
    expect(snap.revenueBand).toBe('test-rev');
    expect(snap.profitability).toBe('test-profit');
    expect(snap.exitHorizon).toBe('test-horizon');
  });
});
