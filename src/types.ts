// Type definitions for the AI Marketplace

export interface AI {
  id: string;
  name: string;
  description: string;
  category: string;
  features: string[];
  pricing: string;
  rating: number;
  useCases: string[];
  website: string;
  strengths?: string[];
  weaknesses?: string[];
}

export interface ScenarioAnalysis {
  scenario: string;
  recommendedAIs: AI[];
  explanation: string;
}

export interface FormData {
  scenario: string;
  useCase?: string;
  budget?: string;
  features?: string[];
}
