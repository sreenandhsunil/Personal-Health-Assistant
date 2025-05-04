
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Activity, Heart, Thermometer, AlertCircle, ChevronRight } from 'lucide-react';

const DiseasePrediction = () => {
  const navigate = useNavigate();
  
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Disease Prediction</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Use our AI-powered prediction models to assess your risk for various health conditions.
        </p>
      </div>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="diabetes">Diabetes</TabsTrigger>
          <TabsTrigger value="heart" disabled>Heart Disease</TabsTrigger>
          <TabsTrigger value="lung" disabled>Lung Disease</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="health-card border-none transition-transform hover:scale-105">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-t-xl">
                <CardTitle className="flex items-center">
                  <Activity className="mr-2 h-5 w-5" /> Diabetes Prediction
                </CardTitle>
                <CardDescription className="text-blue-100">
                  Assess your risk of Type 2 Diabetes
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-gray-600 dark:text-gray-400">
                  Our diabetes prediction model analyzes factors like BMI, glucose levels, family history, and lifestyle to estimate your risk.
                </p>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => navigate('/predict/diabetes')} 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Start Assessment <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="health-card border-none transition-transform hover:scale-105">
              <CardHeader className="bg-gradient-to-r from-red-600 to-red-400 text-white rounded-t-xl">
                <CardTitle className="flex items-center">
                  <Heart className="mr-2 h-5 w-5" /> Heart Disease Prediction
                </CardTitle>
                <CardDescription className="text-red-100">
                  Evaluate your cardiac health risk
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-gray-600 dark:text-gray-400">
                  This model analyzes risk factors including blood pressure, cholesterol levels, age, and family history to estimate your risk.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" disabled>
                  Coming Soon
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="health-card border-none transition-transform hover:scale-105">
              <CardHeader className="bg-gradient-to-r from-green-600 to-green-400 text-white rounded-t-xl">
                <CardTitle className="flex items-center">
                  <Thermometer className="mr-2 h-5 w-5" /> Lung Disease Prediction
                </CardTitle>
                <CardDescription className="text-green-100">
                  Assess respiratory health risks
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-gray-600 dark:text-gray-400">
                  Evaluates risk based on factors including smoking history, environmental exposure, family history, and symptoms.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" disabled>
                  Coming Soon
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="mt-12 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6">
            <div className="flex items-start">
              <AlertCircle className="h-6 w-6 text-amber-600 dark:text-amber-500 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-medium text-amber-800 dark:text-amber-400">Disclaimer</h3>
                <p className="mt-2 text-amber-700 dark:text-amber-300">
                  These prediction tools are for informational purposes only and are not a substitute for professional medical advice, 
                  diagnosis, or treatment. The predictions are based on statistical models and may not be accurate for all individuals. 
                  Always consult with a healthcare professional for proper diagnosis and treatment recommendations.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="diabetes">
          <Card className="mt-6 border-none shadow-lg">
            <CardHeader>
              <CardTitle>Diabetes Risk Assessment</CardTitle>
              <CardDescription>
                Enter your information to receive a diabetes risk prediction
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DiabetesPredictionForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface DiabetesPredictionFormProps {}

const DiabetesPredictionForm: React.FC<DiabetesPredictionFormProps> = () => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [bmi, setBmi] = useState('');
  const [glucoseLevel, setGlucoseLevel] = useState('');
  const [familyHistory, setFamilyHistory] = useState('');
  const [physicalActivity, setPhysicalActivity] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    risk: 'low' | 'moderate' | 'high';
    percentage: number;
    explanation: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate prediction calculation
    setTimeout(() => {
      // Simple mock prediction logic - would be replaced with actual model
      const ageNum = parseInt(age);
      const bmiNum = parseFloat(bmi);
      const glucoseNum = parseInt(glucoseLevel);
      const hasFamily = familyHistory === 'yes';
      const isActive = physicalActivity === 'active';
      
      let riskScore = 0;
      
      // Age factor
      if (ageNum > 45) riskScore += 20;
      else if (ageNum > 35) riskScore += 10;
      
      // BMI factor
      if (bmiNum >= 30) riskScore += 25;
      else if (bmiNum >= 25) riskScore += 15;
      
      // Glucose factor
      if (glucoseNum >= 140) riskScore += 30;
      else if (glucoseNum >= 100) riskScore += 15;
      
      // Family history
      if (hasFamily) riskScore += 15;
      
      // Physical activity
      if (!isActive) riskScore += 10;
      
      let risk: 'low' | 'moderate' | 'high';
      let explanation = '';
      
      if (riskScore >= 60) {
        risk = 'high';
        explanation = 'Based on the information provided, you have several risk factors for developing type 2 diabetes. We recommend consulting with a healthcare provider for proper screening and advice.';
      } else if (riskScore >= 30) {
        risk = 'moderate';
        explanation = 'You have some risk factors for type 2 diabetes. Consider making lifestyle changes and discussing with your doctor during your next visit.';
      } else {
        risk = 'low';
        explanation = 'Your risk factors for type 2 diabetes appear to be low based on the information provided. Maintaining a healthy lifestyle is still recommended.';
      }
      
      setResult({
        risk,
        percentage: Math.min(riskScore, 100),
        explanation
      });
      
      setLoading(false);
    }, 1500);
  };
  
  const resetForm = () => {
    setResult(null);
    setAge('');
    setGender('');
    setBmi('');
    setGlucoseLevel('');
    setFamilyHistory('');
    setPhysicalActivity('');
  };

  return (
    <div>
      {result ? (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">Your Diabetes Risk Assessment</h3>
            <div className={`inline-flex items-center px-4 py-2 rounded-full text-white ${
              result.risk === 'high' ? 'bg-red-500' :
              result.risk === 'moderate' ? 'bg-yellow-500' : 'bg-green-500'
            }`}>
              <span className="font-medium capitalize">{result.risk} Risk</span>
            </div>
          </div>
          
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-gray-600 bg-gray-100">
                  Risk Score
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-gray-600">
                  {result.percentage}%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
              <div 
                style={{ width: `${result.percentage}%` }} 
                className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                  result.risk === 'high' ? 'bg-red-500' :
                  result.risk === 'moderate' ? 'bg-yellow-500' : 'bg-green-500'
                }`}
              ></div>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Assessment Explanation:</h4>
            <p className="text-gray-700 dark:text-gray-300">
              {result.explanation}
            </p>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h4 className="font-medium text-blue-800 dark:text-blue-400 mb-2">Recommendations:</h4>
            <ul className="list-disc list-inside text-blue-700 dark:text-blue-300 space-y-1">
              <li>Maintain a healthy diet low in refined carbohydrates and sugars</li>
              <li>Engage in regular physical activity (at least 150 minutes per week)</li>
              <li>Maintain a healthy weight (BMI between 18.5 and 24.9)</li>
              <li>Regular health check-ups, including blood glucose monitoring</li>
              {result.risk !== 'low' && (
                <li className="font-medium">Consult with a healthcare provider for professional advice</li>
              )}
            </ul>
          </div>
          
          <div className="flex justify-center">
            <Button onClick={resetForm} variant="outline" className="mt-4">
              Start New Assessment
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="age" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Age
              </label>
              <input
                id="age"
                type="number"
                min="18"
                max="100"
                required
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="health-input w-full"
                placeholder="e.g., 45"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Gender
              </label>
              <select
                id="gender"
                required
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="health-input w-full"
              >
                <option value="" disabled>Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="bmi" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                BMI (Body Mass Index)
              </label>
              <input
                id="bmi"
                type="number"
                step="0.1"
                min="10"
                max="50"
                required
                value={bmi}
                onChange={(e) => setBmi(e.target.value)}
                className="health-input w-full"
                placeholder="e.g., 24.5"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Calculate BMI: Weight (kg) / Height² (m)
              </p>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="glucose" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Fasting Blood Glucose (mg/dL)
              </label>
              <input
                id="glucose"
                type="number"
                min="70"
                max="300"
                required
                value={glucoseLevel}
                onChange={(e) => setGlucoseLevel(e.target.value)}
                className="health-input w-full"
                placeholder="e.g., 95"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="family" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Family History of Diabetes
              </label>
              <select
                id="family"
                required
                value={familyHistory}
                onChange={(e) => setFamilyHistory(e.target.value)}
                className="health-input w-full"
              >
                <option value="" disabled>Select option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="unknown">Unknown</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="activity" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Physical Activity Level
              </label>
              <select
                id="activity"
                required
                value={physicalActivity}
                onChange={(e) => setPhysicalActivity(e.target.value)}
                className="health-input w-full"
              >
                <option value="" disabled>Select level</option>
                <option value="sedentary">Sedentary (little or no exercise)</option>
                <option value="light">Light (1-3 times/week)</option>
                <option value="active">Active (4+ times/week)</option>
              </select>
            </div>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              <span className="font-medium">Note:</span> This assessment is for informational purposes only and does not substitute medical advice. 
              For accurate diabetes diagnosis, please consult a healthcare professional.
            </p>
          </div>
          
          <div className="flex justify-center">
            <Button 
              type="submit" 
              disabled={loading}
              className="bg-health-primary hover:bg-blue-600 text-white px-6"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                'Get Prediction'
              )}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default DiseasePrediction;
