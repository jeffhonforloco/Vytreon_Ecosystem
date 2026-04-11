import React from 'react';
import { Users, MessageCircle, Heart, RefreshCw, BarChart3, Cpu, Layers } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const GovernanceSection = () => {
  return (
    <section id="governance" className="py-24 relative">
      <div className="absolute inset-0 hex-grid z-0 opacity-30"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="section-heading">Governance & Community</h2>
          <p className="text-gray-300 text-lg">
            Vytreon is built on a foundation of decentralized governance, empowering our community 
            to guide the ecosystem's evolution through transparent decision-making processes.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="font-heading text-2xl font-bold text-white mb-6">DAO Implementation</h3>
            <p className="text-gray-300 mb-6">
              Our token-based governance system enables stakeholders to propose, vote on, and implement changes
              across the ecosystem, ensuring that power remains distributed and decisions reflect the collective will.
            </p>
            
            <div className="space-y-6">
              <div className="bg-vytreon-dark-blue/50 border border-vytreon-cyan/20 rounded-lg p-6">
                <h4 className="font-medium text-white mb-4">Active Proposals</h4>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-300 text-sm">VIP-42: Layer 2 Integration</span>
                      <span className="text-vytreon-cyan text-xs">Voting</span>
                    </div>
                    <Progress value={76} className="h-2 bg-gray-700">
                      <div className="h-full bg-gradient-to-r from-vytreon-cyan to-vytreon-blue"></div>
                    </Progress>
                    <div className="flex justify-between mt-1">
                      <span className="text-gray-400 text-xs">76% Approval</span>
                      <span className="text-gray-400 text-xs">3 days left</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-300 text-sm">VIP-43: Treasury Allocation</span>
                      <span className="text-vytreon-cyan text-xs">Voting</span>
                    </div>
                    <Progress value={62} className="h-2 bg-gray-700">
                      <div className="h-full bg-gradient-to-r from-vytreon-cyan to-vytreon-blue"></div>
                    </Progress>
                    <div className="flex justify-between mt-1">
                      <span className="text-gray-400 text-xs">62% Approval</span>
                      <span className="text-gray-400 text-xs">5 days left</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-300 text-sm">VIP-44: Protocol Upgrade</span>
                      <span className="text-vytreon-blue text-xs">Discussion</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full"></div>
                    <div className="flex justify-between mt-1">
                      <span className="text-gray-400 text-xs">Draft Stage</span>
                      <span className="text-gray-400 text-xs">12 days left</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex-1 bg-vytreon-dark-blue/50 border border-vytreon-cyan/20 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <Users size={24} className="text-vytreon-cyan" />
                    <div>
                      <div className="text-white font-bold text-xl">18.5K+</div>
                      <div className="text-gray-400 text-sm">DAO Members</div>
                    </div>
                  </div>
                </div>
                <div className="flex-1 bg-vytreon-dark-blue/50 border border-vytreon-cyan/20 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <MessageCircle size={24} className="text-vytreon-cyan" />
                    <div>
                      <div className="text-white font-bold text-xl">450+</div>
                      <div className="text-gray-400 text-sm">Proposals</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-vytreon-dark-blue/50 border border-vytreon-cyan/20 rounded-xl p-8">
            <h4 className="font-heading text-xl font-bold text-white mb-4">Community Tools</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-vytreon-dark p-4 rounded-lg border border-vytreon-blue/20">
                <h5 className="text-white font-medium mb-2">WhisApp</h5>
                <p className="text-gray-400 text-sm mb-3">Secure community communications with integrated voting</p>
                <div className="flex items-center justify-between">
                  <span className="text-vytreon-cyan text-xs">25.4K active users</span>
                  <MessageCircle size={16} className="text-vytreon-blue" />
                </div>
              </div>
              
              <div className="bg-vytreon-dark p-4 rounded-lg border border-vytreon-blue/20">
                <h5 className="text-white font-medium mb-2">Escazo</h5>
                <p className="text-gray-400 text-sm mb-3">Reputation-based contribution tracking and rewards</p>
                <div className="flex items-center justify-between">
                  <span className="text-vytreon-cyan text-xs">12.1K contributions</span>
                  <Heart size={16} className="text-vytreon-blue" />
                </div>
              </div>
            </div>
            
            <h4 className="font-heading text-lg font-bold text-white mb-3">Governance Cycle</h4>
            <div className="bg-vytreon-dark rounded-lg p-4 mb-6">
              <div className="flex justify-around">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-vytreon-cyan/10 flex items-center justify-center mb-2 mx-auto">
                    <span className="text-vytreon-cyan text-sm">01</span>
                  </div>
                  <p className="text-xs text-gray-400">Ideation</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-vytreon-blue/10 flex items-center justify-center mb-2 mx-auto">
                    <span className="text-vytreon-blue text-sm">02</span>
                  </div>
                  <p className="text-xs text-gray-400">Proposal</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-vytreon-cyan/10 flex items-center justify-center mb-2 mx-auto">
                    <span className="text-vytreon-cyan text-sm">03</span>
                  </div>
                  <p className="text-xs text-gray-400">Voting</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-vytreon-blue/10 flex items-center justify-center mb-2 mx-auto">
                    <span className="text-vytreon-blue text-sm">04</span>
                  </div>
                  <p className="text-xs text-gray-400">Implementation</p>
                </div>
              </div>
              
              <div className="mt-4 flex justify-center">
                <span className="text-white bg-vytreon-cyan/20 px-3 py-1 rounded-full text-xs flex items-center gap-1">
                  <RefreshCw size={12} /> Continuous Cycle
                </span>
              </div>
            </div>
            
            <div className="bg-vytreon-dark-blue p-4 rounded-lg border border-vytreon-cyan/20">
              <h5 className="text-white font-medium mb-2">User Engagement</h5>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-vytreon-dark p-2 rounded flex flex-col items-center">
                  <span className="text-white text-lg font-bold">94%</span>
                  <span className="text-gray-400 text-xs">Retention</span>
                </div>
                <div className="bg-vytreon-dark p-2 rounded flex flex-col items-center">
                  <span className="text-white text-lg font-bold">82%</span>
                  <span className="text-gray-400 text-xs">Participation</span>
                </div>
                <div className="bg-vytreon-dark p-2 rounded flex flex-col items-center">
                  <span className="text-white text-lg font-bold">76%</span>
                  <span className="text-gray-400 text-xs">Contribution</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="glass-card neon-border p-6">
            <h4 className="font-heading text-xl font-bold text-white mb-4">Launch Strategy</h4>
            <div className="relative">
              <div className="border-l-2 border-dashed border-vytreon-cyan/30 h-full absolute left-2 top-0"></div>
              <div className="space-y-4 relative">
                <div className="ml-8 relative">
                  <div className="w-4 h-4 rounded-full bg-vytreon-cyan absolute -left-9 top-0"></div>
                  <h5 className="text-white text-sm font-medium">Q2 2026: Beta Testing</h5>
                  <p className="text-gray-400 text-xs">Closed beta for core modules</p>
                </div>
                <div className="ml-8 relative">
                  <div className="w-4 h-4 rounded-full bg-vytreon-cyan absolute -left-9 top-0"></div>
                  <h5 className="text-white text-sm font-medium">Q3 2026: Community Onboarding</h5>
                  <p className="text-gray-400 text-xs">Public beta with early adopters</p>
                </div>
                <div className="ml-8 relative">
                  <div className="w-4 h-4 rounded-full bg-vytreon-cyan absolute -left-9 top-0"></div>
                  <h5 className="text-white text-sm font-medium">Q4 2026: Full Platform Launch</h5>
                  <p className="text-gray-400 text-xs">Complete ecosystem rollout</p>
                </div>
                <div className="ml-8 relative">
                  <div className="w-4 h-4 rounded-full bg-vytreon-cyan absolute -left-9 top-0"></div>
                  <h5 className="text-white text-sm font-medium">Q1 2026: Partner Integration</h5>
                  <p className="text-gray-400 text-xs">Third-party service expansion</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="glass-card neon-border p-6">
            <h4 className="font-heading text-xl font-bold text-white mb-4">Continuous Improvement</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <div className="min-w-4 h-4 rounded-full bg-vytreon-cyan/10 flex items-center justify-center mt-1">
                  <div className="h-2 w-2 bg-vytreon-cyan rounded-full"></div>
                </div>
                <span className="text-gray-300">AI-powered system monitoring with real-time optimization</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="min-w-4 h-4 rounded-full bg-vytreon-cyan/10 flex items-center justify-center mt-1">
                  <div className="h-2 w-2 bg-vytreon-cyan rounded-full"></div>
                </div>
                <span className="text-gray-300">Community-driven feedback loops through Escazo</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="min-w-4 h-4 rounded-full bg-vytreon-cyan/10 flex items-center justify-center mt-1">
                  <div className="h-2 w-2 bg-vytreon-cyan rounded-full"></div>
                </div>
                <span className="text-gray-300">Quarterly major releases based on DAO governance</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="min-w-4 h-4 rounded-full bg-vytreon-cyan/10 flex items-center justify-center mt-1">
                  <div className="h-2 w-2 bg-vytreon-cyan rounded-full"></div>
                </div>
                <span className="text-gray-300">Predictive analytics to anticipate user needs</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="min-w-4 h-4 rounded-full bg-vytreon-cyan/10 flex items-center justify-center mt-1">
                  <div className="h-2 w-2 bg-vytreon-cyan rounded-full"></div>
                </div>
                <span className="text-gray-300">Dedicated security team with ongoing penetration testing</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GovernanceSection;
