import { describe, it, expect } from 'vitest';
import { 
  calculatePmt, 
  calculateSp500EquivalentReturn, 
  calculateMoIC,
  calculateIRR 
} from './financeEngine';

describe('Finance Engine Core Math', () => {
  describe('calculatePmt', () => {
    it('calculates the correct monthly payment for a standard 30-year fixed mortgage', () => {
      // Loan: $400,000, 6% interest, 30 years (360 months)
      const principal = 400000;
      const ratePerPeriod = 0.06 / 12;
      const numPeriods = 360;
      
      const pmt = calculatePmt(ratePerPeriod, numPeriods, principal);
      
      // Expected PMT is approx $2398.20
      expect(pmt).toBeCloseTo(2398.20, 1);
    });

    it('handles zero interest rate correctly', () => {
      const pmt = calculatePmt(0, 360, 360000);
      expect(pmt).toBe(1000);
    });
  });

  describe('calculateSp500EquivalentReturn', () => {
    it('calculates standard compound interest with capital gains tax', () => {
      // Invest $100,000 for 10 years at 10% expected return, 15% cap gains tax
      const result = calculateSp500EquivalentReturn(10, 100000, 15, 10);
      
      // Final Pre-tax value = 100000 * (1.1^10) = 259,374.24
      // Profit = 159,374.24
      // Tax = 159,374.24 * 0.15 = 23,906.13
      // After-tax Profit = 135,468.11
      // Final Value = 235,468.11
      
      expect(result.finalValue).toBeCloseTo(235468.10, 0);
      expect(result.totalProfit).toBeCloseTo(135468.10, 0);
    });

    it('returns zeroes for invalid inputs', () => {
      const result = calculateSp500EquivalentReturn(0, 0, 15, 10);
      expect(result.finalValue).toBe(0);
      expect(result.totalProfit).toBe(0);
      expect(result.annualizedReturn).toBe(0);
    });
  });

  describe('calculateMoIC', () => {
    it('calculates the multiple on invested capital correctly', () => {
      // Total negative investments = 100 + 50 = 150
      // Total positive returns = 200 + 100 = 300
      // MoIC = 300 / 150 = 2.0
      const cashFlows = [-100, -50, 200, 100];
      const moic = calculateMoIC(cashFlows);
      expect(moic).toBe(2.0);
    });

    it('returns zero if there are no negative investments', () => {
      const moic = calculateMoIC([100, 200]);
      expect(moic).toBe(0);
    });
  });

  describe('calculateIRR', () => {
    it('calculates Internal Rate of Return accurately', () => {
      // Example CF: Invest $1000, get $300 for 4 years
      const cashFlows = [-1000, 300, 300, 300, 300];
      const irr = calculateIRR(cashFlows);
      // IRR should be roughly 7.7%
      expect(irr).toBeCloseTo(0.0771, 3);
    });

    it('returns 0 if no convergence is possible', () => {
      // 0 investment, 0 return
      const irr = calculateIRR([0, 0, 0]);
      expect(irr).toBe(0);
    });
  });
});
