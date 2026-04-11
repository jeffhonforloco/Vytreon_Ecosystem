import React, { useState, useCallback } from 'react';
import WelcomeScreen from './steps/WelcomeScreen';
import SystemInit from './steps/SystemInit';
import GoalInput from './steps/GoalInput';
import AIPlanningStream from './steps/AIPlanningStream';
import AgentDeployment from './steps/AgentDeployment';
import LiveExecution from './steps/LiveExecution';
import AutonomousPrompt from './steps/AutonomousPrompt';
import DashboardTransition from './steps/DashboardTransition';

interface OnboardingFlowProps {
  onComplete: () => void;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [userGoal, setUserGoal] = useState('');
  const [autonomousMode, setAutonomousMode] = useState(true);

  const nextStep = useCallback(() => {
    setStep(prev => prev + 1);
  }, []);

  const handleGoalSubmit = useCallback((goal: string) => {
    setUserGoal(goal);
    nextStep();
  }, [nextStep]);

  const handleAutonomousChoice = useCallback((choice: boolean) => {
    setAutonomousMode(choice);
    nextStep();
  }, [nextStep]);

  const steps = [
    <WelcomeScreen key="welcome" onNext={nextStep} />,
    <SystemInit key="init" onComplete={nextStep} />,
    <GoalInput key="goal" onSubmit={handleGoalSubmit} />,
    <AIPlanningStream key="planning" goal={userGoal} onComplete={nextStep} />,
    <AgentDeployment key="deploy" onComplete={nextStep} />,
    <LiveExecution key="execution" onComplete={nextStep} />,
    <AutonomousPrompt key="autonomous" onChoice={handleAutonomousChoice} />,
    <DashboardTransition key="transition" onComplete={onComplete} />,
  ];

  return (
    <div className="fixed inset-0 z-50 bg-background">
      {steps[step]}
    </div>
  );
};

export default OnboardingFlow;
