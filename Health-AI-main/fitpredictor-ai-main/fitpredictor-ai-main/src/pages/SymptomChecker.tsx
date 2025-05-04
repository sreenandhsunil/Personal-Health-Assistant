
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlertCircle, Info, CheckCircle2, XCircle, Search, ArrowRight } from 'lucide-react';

interface Symptom {
  id: string;
  name: string;
  category: string;
}

interface PossibleCondition {
  name: string;
  probability: number;
  symptoms: string[];
  urgency: 'low' | 'medium' | 'high';
  description: string;
}

const SymptomChecker = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<PossibleCondition[] | null>(null);
  const [loading, setLoading] = useState(false);
  
  const symptoms: Symptom[] = [
    // General symptoms
    { id: 'fever', name: 'Fever', category: 'general' },
    { id: 'fatigue', name: 'Fatigue', category: 'general' },
    { id: 'weakness', name: 'General weakness', category: 'general' },
    { id: 'weightLoss', name: 'Unexplained weight loss', category: 'general' },
    { id: 'weightGain', name: 'Unexplained weight gain', category: 'general' },
    { id: 'chills', name: 'Chills', category: 'general' },
    { id: 'nightSweats', name: 'Night sweats', category: 'general' },
    
    // Head and neurological symptoms
    { id: 'headache', name: 'Headache', category: 'head' },
    { id: 'dizziness', name: 'Dizziness', category: 'head' },
    { id: 'confusion', name: 'Confusion', category: 'head' },
    { id: 'memoryProblems', name: 'Memory problems', category: 'head' },
    { id: 'faintingSpells', name: 'Fainting spells', category: 'head' },
    
    // Respiratory symptoms
    { id: 'cough', name: 'Cough', category: 'respiratory' },
    { id: 'shortnessOfBreath', name: 'Shortness of breath', category: 'respiratory' },
    { id: 'wheezing', name: 'Wheezing', category: 'respiratory' },
    { id: 'chestPain', name: 'Chest pain', category: 'respiratory' },
    { id: 'rapidBreathing', name: 'Rapid breathing', category: 'respiratory' },
    
    // Digestive symptoms
    { id: 'nausea', name: 'Nausea', category: 'digestive' },
    { id: 'vomiting', name: 'Vomiting', category: 'digestive' },
    { id: 'diarrhea', name: 'Diarrhea', category: 'digestive' },
    { id: 'constipation', name: 'Constipation', category: 'digestive' },
    { id: 'abdominalPain', name: 'Abdominal pain', category: 'digestive' },
    { id: 'bloating', name: 'Bloating', category: 'digestive' },
    { id: 'lossOfAppetite', name: 'Loss of appetite', category: 'digestive' },
    
    // Musculoskeletal symptoms
    { id: 'jointPain', name: 'Joint pain', category: 'musculoskeletal' },
    { id: 'musclePain', name: 'Muscle pain', category: 'musculoskeletal' },
    { id: 'backPain', name: 'Back pain', category: 'musculoskeletal' },
    { id: 'stiffness', name: 'Stiffness', category: 'musculoskeletal' },
    { id: 'swelling', name: 'Swelling', category: 'musculoskeletal' },
    
    // Skin symptoms
    { id: 'rash', name: 'Rash', category: 'skin' },
    { id: 'itching', name: 'Itching', category: 'skin' },
    { id: 'hives', name: 'Hives', category: 'skin' },
    { id: 'bruising', name: 'Bruising easily', category: 'skin' },
    { id: 'dryness', name: 'Dry skin', category: 'skin' },
    
    // Eye and vision symptoms
    { id: 'blurredVision', name: 'Blurred vision', category: 'eyesEars' },
    { id: 'eyePain', name: 'Eye pain', category: 'eyesEars' },
    { id: 'lightsensitivity', name: 'Light sensitivity', category: 'eyesEars' },
    { id: 'earache', name: 'Earache', category: 'eyesEars' },
    { id: 'hearingLoss', name: 'Hearing loss', category: 'eyesEars' },
    { id: 'ringingInEars', name: 'Ringing in ears', category: 'eyesEars' },
  ];
  
  const filteredSymptoms = searchQuery 
    ? symptoms.filter(symptom => 
        symptom.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : symptoms;
  
  const handleSymptomToggle = (symptomId: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptomId)
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    );
  };
  
  const getSymptomsByCategory = (category: string) => {
    return filteredSymptoms.filter(symptom => symptom.category === category);
  };
  
  const handleAnalyzeSymptoms = () => {
    if (selectedSymptoms.length === 0) return;
    
    setLoading(true);
    
    // Simulate API call to medical analysis service
    setTimeout(() => {
      // This is a simplified mock of the result that would come from a real service
      const mockResults = generateMockResults(selectedSymptoms);
      setResults(mockResults);
      setLoading(false);
    }, 2000);
  };
  
  const generateMockResults = (selectedSymptomIds: string[]): PossibleCondition[] => {
    const selectedSymptomNames = selectedSymptomIds.map(
      id => symptoms.find(s => s.id === id)?.name || ''
    ).filter(name => name !== '');
    
    // Basic conditions database with associated symptoms (simplified for demo)
    const conditions: {[key: string]: Partial<PossibleCondition>} = {
      'Common Cold': {
        symptoms: ['Cough', 'Fever', 'Fatigue', 'Headache'],
        urgency: 'low',
        description: 'A viral infection causing inflammation of the mucous membranes in the nose and throat.'
      },
      'Flu (Influenza)': {
        symptoms: ['Fever', 'Cough', 'Fatigue', 'Chills', 'Headache', 'Muscle pain'],
        urgency: 'medium',
        description: 'A contagious respiratory illness caused by influenza viruses.'
      },
      'Migraine': {
        symptoms: ['Headache', 'Light sensitivity', 'Nausea', 'Blurred vision'],
        urgency: 'low',
        description: 'A neurological condition characterized by severe, debilitating headaches.'
      },
      'Gastroenteritis': {
        symptoms: ['Nausea', 'Vomiting', 'Diarrhea', 'Abdominal pain', 'Fever'],
        urgency: 'medium',
        description: 'An intestinal infection marked by diarrhea, abdominal cramps, nausea, and vomiting.'
      },
      'Anxiety': {
        symptoms: ['Dizziness', 'Rapid breathing', 'Chest pain', 'Fatigue', 'Memory problems'],
        urgency: 'medium',
        description: 'A mental health disorder characterized by feelings of worry, nervousness, or unease.'
      },
      'Allergic Reaction': {
        symptoms: ['Rash', 'Itching', 'Hives', 'Shortness of breath', 'Wheezing'],
        urgency: 'high',
        description: 'An immune system response to substances that the body mistakenly perceives as harmful.'
      },
      'Pneumonia': {
        symptoms: ['Cough', 'Fever', 'Shortness of breath', 'Chest pain', 'Fatigue', 'Chills'],
        urgency: 'high',
        description: 'An infection that inflames the air sacs in one or both lungs.'
      },
      'Arthritis': {
        symptoms: ['Joint pain', 'Stiffness', 'Swelling', 'Muscle pain'],
        urgency: 'low',
        description: 'Inflammation of one or more joints, causing pain and stiffness.'
      },
      'Irritable Bowel Syndrome': {
        symptoms: ['Abdominal pain', 'Bloating', 'Diarrhea', 'Constipation'],
        urgency: 'low',
        description: 'A common disorder affecting the large intestine with symptoms including cramping, abdominal pain, bloating, gas, and diarrhea or constipation.'
      }
    };
    
    // Calculate matches and probabilities
    const results: PossibleCondition[] = [];
    
    Object.keys(conditions).forEach(conditionName => {
      const condition = conditions[conditionName];
      if (!condition.symptoms) return;
      
      // Check for symptom matches
      const matchedSymptoms = selectedSymptomNames.filter(symptom => 
        condition.symptoms?.includes(symptom)
      );
      
      if (matchedSymptoms.length > 0) {
        // Calculate simple probability based on matched symptoms / condition symptoms
        const matchRatio = matchedSymptoms.length / condition.symptoms.length;
        const probability = Math.round(matchRatio * 100);
        
        // Only include if there's a reasonable match
        if (probability > 30) {
          results.push({
            name: conditionName,
            probability,
            symptoms: matchedSymptoms,
            urgency: condition.urgency as 'low' | 'medium' | 'high',
            description: condition.description || ''
          });
        }
      }
    });
    
    // Sort by probability
    return results.sort((a, b) => b.probability - a.probability);
  };
  
  const resetAnalysis = () => {
    setResults(null);
    setSelectedSymptoms([]);
    setSearchQuery('');
  };
  
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Symptom Checker</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Select your symptoms to get possible causes and recommendations.
        </p>
      </div>
      
      {results ? (
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Analysis Results</CardTitle>
            <CardDescription>
              Based on the {selectedSymptoms.length} symptoms you selected
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {results.length > 0 ? (
                <>
                  <p className="text-gray-700 dark:text-gray-300">
                    Here are potential conditions that might be associated with your symptoms, ordered by likelihood:
                  </p>
                  
                  <div className="space-y-4">
                    {results.map((condition, index) => (
                      <Card key={index} className={`border-l-4 ${
                        condition.urgency === 'high' ? 'border-l-red-500' :
                        condition.urgency === 'medium' ? 'border-l-yellow-500' :
                        'border-l-green-500'
                      }`}>
                        <CardContent className="p-6">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg font-semibold">{condition.name}</h3>
                            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                              condition.urgency === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                              condition.urgency === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                              'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            }`}>
                              {condition.urgency === 'high' ? 'Seek care soon' :
                               condition.urgency === 'medium' ? 'Talk to a doctor' :
                               'Self-care may be sufficient'}
                            </div>
                          </div>
                          
                          <div className="relative pt-1 mb-4">
                            <div className="flex mb-2 items-center justify-between">
                              <div>
                                <span className="text-xs font-semibold inline-block text-gray-600 dark:text-gray-400">
                                  Match probability
                                </span>
                              </div>
                              <div className="text-right">
                                <span className="text-xs font-semibold inline-block text-gray-600 dark:text-gray-400">
                                  {condition.probability}%
                                </span>
                              </div>
                            </div>
                            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200 dark:bg-gray-700">
                              <div 
                                style={{ width: `${condition.probability}%` }} 
                                className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                                  condition.probability > 70 ? 'bg-red-500' :
                                  condition.probability > 40 ? 'bg-yellow-500' : 'bg-green-500'
                                }`}
                              ></div>
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                            {condition.description}
                          </p>
                          
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Matched symptoms:</h4>
                            <div className="flex flex-wrap gap-2">
                              {condition.symptoms.map((symptom, i) => (
                                <span key={i} className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md text-xs text-gray-700 dark:text-gray-300">
                                  {symptom}
                                </span>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <div className="flex items-start">
                      <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-1">What to do next</h4>
                        <ul className="list-disc list-inside text-sm text-blue-700 dark:text-blue-300 space-y-1">
                          <li>Consider the urgency levels when deciding on next steps</li>
                          <li>For high urgency conditions, consult a healthcare provider soon</li>
                          <li>For low urgency conditions, monitor symptoms and practice self-care</li>
                          <li>These results are not a diagnosis – consult a medical professional</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="mx-auto h-16 w-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                    <Search className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No matches found</h3>
                  <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                    We couldn't find any strong matches for your combination of symptoms. Try selecting different or additional symptoms, or consult with a healthcare provider.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={resetAnalysis} className="w-full">
              Check Different Symptoms
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 order-2 lg:order-1">
            <Card className="border-none shadow-lg sticky top-6">
              <CardHeader>
                <CardTitle>Selected Symptoms</CardTitle>
                <CardDescription>
                  {selectedSymptoms.length === 0 
                    ? "You haven't selected any symptoms yet" 
                    : `${selectedSymptoms.length} symptom${selectedSymptoms.length > 1 ? 's' : ''} selected`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedSymptoms.length > 0 ? (
                  <ScrollArea className="h-[300px] lg:h-[400px]">
                    <ul className="space-y-3">
                      {selectedSymptoms.map(symptomId => {
                        const symptom = symptoms.find(s => s.id === symptomId);
                        return (
                          <li key={symptomId} className="flex justify-between items-center bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                            <span>{symptom?.name}</span>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleSymptomToggle(symptomId)}
                              className="h-8 w-8 text-gray-500 hover:text-red-500"
                            >
                              <XCircle className="h-5 w-5" />
                            </Button>
                          </li>
                        );
                      })}
                    </ul>
                  </ScrollArea>
                ) : (
                  <div className="text-center py-6">
                    <div className="mx-auto h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-3">
                      <CheckCircle2 className="h-6 w-6 text-gray-400" />
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Select symptoms from the categories on the right
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleAnalyzeSymptoms}
                  disabled={selectedSymptoms.length === 0 || loading}
                  className="w-full bg-health-primary hover:bg-blue-600"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      Analyze Symptoms
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="lg:col-span-2 order-1 lg:order-2">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle>Select Your Symptoms</CardTitle>
                <div className="relative mt-2">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="health-input w-full pl-10"
                    placeholder="Search symptoms..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="general">
                  <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="head">Head & Neuro</TabsTrigger>
                    <TabsTrigger value="respiratory">Respiratory</TabsTrigger>
                    <TabsTrigger value="digestive">Digestive</TabsTrigger>
                    <TabsTrigger value="musculoskeletal">Muscles & Joints</TabsTrigger>
                    <TabsTrigger value="skin">Skin</TabsTrigger>
                    <TabsTrigger value="eyesEars">Eyes & Ears</TabsTrigger>
                  </TabsList>
                  
                  {['general', 'head', 'respiratory', 'digestive', 'musculoskeletal', 'skin', 'eyesEars'].map(category => (
                    <TabsContent key={category} value={category}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {getSymptomsByCategory(category).map(symptom => (
                          <div key={symptom.id} className="flex items-center space-x-2">
                            <Checkbox 
                              id={symptom.id}
                              checked={selectedSymptoms.includes(symptom.id)}
                              onCheckedChange={() => handleSymptomToggle(symptom.id)}
                            />
                            <Label htmlFor={symptom.id} className="cursor-pointer">
                              {symptom.name}
                            </Label>
                          </div>
                        ))}
                        
                        {getSymptomsByCategory(category).length === 0 && (
                          <div className="col-span-2 text-center py-6 text-gray-500 dark:text-gray-400">
                            No matching symptoms found in this category.
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
              <CardFooter className="flex flex-col">
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 w-full mb-4">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-500 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-amber-800 dark:text-amber-400 text-sm">Important Notice</h4>
                      <p className="mt-1 text-xs text-amber-700 dark:text-amber-300">
                        This symptom checker is for informational purposes only and is not a qualified medical opinion. 
                        Do not use in emergencies. Always consult with a qualified healthcare provider for proper diagnosis.
                      </p>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  If you're experiencing severe symptoms such as difficulty breathing, severe chest pain, or sudden severe headache, 
                  please seek emergency medical care immediately.
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default SymptomChecker;
