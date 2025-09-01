import { formatEther } from 'viem';

export interface WalletMetrics {
  accountAge: number; // in months
  gasSpent: bigint; // in wei
  uniqueContracts: number;
  governanceVotes: number;
  proposalsCreated: number; // for governance scoring
  defiEngagement: number; // weighted DeFi actions
  airdropsClaimed: number;
}

export interface ScoreBreakdown {
  accountAge: number; // 0-10 points
  gasSpent: number; // 0-10 points
  uniqueContracts: number; // 0-20 points
  governanceVotes: number; // 0-20 points
  defiEngagement: number; // 0-20 points
  airdropsClaimed: number; // 0-20 points
  total: number; // 0-100 points
  canMint: boolean; // true if score >= 5
}

export type BadgeTier = 'BOT' | 'Android' | 'Cyborg' | 'Human';

export interface Badge {
  tier: BadgeTier;
  name: string;
  description: string;
  color: string;
  icon: string;
  minScore: number;
  maxScore: number;
}

export const badges: Badge[] = [
  {
    tier: 'BOT',
    name: 'BOT',
    description: 'Warning: Low Activity',
    color: 'from-bot-red to-red-600',
    icon: '🤖',
    minScore: 0,
    maxScore: 39,
  },
  {
    tier: 'Android',
    name: 'Android',
    description: 'Basic on-chain activity detected',
    color: 'from-android-silver to-gray-400',
    icon: '🤖',
    minScore: 40,
    maxScore: 59,
  },
  {
    tier: 'Cyborg',
    name: 'Cyborg',
    description: 'Advanced DeFi engagement',
    color: 'from-cyborg-gold to-yellow-500',
    icon: '🦾',
    minScore: 60,
    maxScore: 79,
  },
  {
    tier: 'Human',
    name: 'Human',
    description: '✨ Verified Human Status',
    color: 'from-human-diamond to-cyan-400',
    icon: '💎',
    minScore: 80,
    maxScore: 100,
  },
];

export function calculateScore(metrics: WalletMetrics): ScoreBreakdown {
  // 1. Wallet Age (Max 10 points)
  // Formula: S_age = min(10, 10 × (months_since_first_tx / 24))
  const accountAgeScore = Math.min(10, 10 * (metrics.accountAge / 24));
  
  // 2. Gas Spent (Max 10 points)
  // Formula: S_gas = min(10, 10 × ln(1 + gas_spent_usd) / ln(1 + 500))
  // Convert gas spent to USD (approximate using average gas price and ETH price)
  const gasInEth = parseFloat(formatEther(metrics.gasSpent));
  const gasSpentUSD = gasInEth * 2500; // Approximate ETH price
  const gasScore = Math.min(10, 10 * (Math.log(1 + gasSpentUSD) / Math.log(1 + 500)));
  
  // 3. Unique Contract Interactions (Max 20 points)
  // Formula: S_uniq = min(20, 20 × (distinct_contracts / 100))
  const contractsScore = Math.min(20, 20 * (metrics.uniqueContracts / 100));
  
  // 4. Governance Participation (Max 20 points)
  // Formula: S_gov = min(20, 2 × votes_cast + 5 × proposals_created)
  // Note: We currently only track votes, not proposals created
  const governanceScore = Math.min(20, 2 * metrics.governanceVotes);
  
  // 5. DeFi Engagement (Max 20 points)
  // Formula: S_defi = min(20, sum of weighted actions across DeFi protocols)
  // Weights: approve = 2, swap = 3, stake/lend/LP = 5
  const defiScore = Math.min(20, metrics.defiEngagement);
  
  // 6. Airdrops Claimed (Max 20 points)
  // Formula: S_drops = min(20, 4 × distinct_airdrops_claimed)
  const airdropScore = Math.min(20, 4 * metrics.airdropsClaimed);
  
  const total = Math.round(accountAgeScore + gasScore + contractsScore + governanceScore + defiScore + airdropScore);
  
  return {
    accountAge: Math.round(accountAgeScore * 10) / 10,
    gasSpent: Math.round(gasScore * 10) / 10,
    uniqueContracts: Math.round(contractsScore * 10) / 10,
    governanceVotes: Math.round(governanceScore * 10) / 10,
    defiEngagement: Math.round(defiScore * 10) / 10,
    airdropsClaimed: Math.round(airdropScore * 10) / 10,
    total,
    canMint: total >= 5,
  };
}

export function getBadgeForScore(score: number): Badge {
  return badges.find(badge => score >= badge.minScore && score <= badge.maxScore) || badges[0];
}

export function getRandomScore(): ScoreBreakdown {
  // Generate realistic random scores for demo purposes
  const accountAge = Math.floor(Math.random() * 11);
  const gasSpent = Math.floor(Math.random() * 11);
  const uniqueContracts = Math.floor(Math.random() * 21);
  const governanceVotes = Math.floor(Math.random() * 21);
  const defiEngagement = Math.floor(Math.random() * 21);
  const airdropsClaimed = Math.floor(Math.random() * 21);
  
  const total = accountAge + gasSpent + uniqueContracts + governanceVotes + defiEngagement + airdropsClaimed;
  
  return {
    accountAge,
    gasSpent,
    uniqueContracts,
    governanceVotes,
    defiEngagement,
    airdropsClaimed,
    total,
    canMint: total >= 5,
  };
}
