
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare, Activity, Clipboard, User } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-health-primary/90 to-health-secondary/90 z-0"></div>
        <div 
          className="relative bg-cover bg-center h-[500px] flex items-center" 
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80')",
            backgroundBlendMode: "overlay"
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Your Personal AI Health Assistant
              </h1>
              <p className="text-lg md:text-xl text-white mb-8">
                Get AI-powered disease predictions, symptom analysis, and health recommendations in seconds.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button 
                  onClick={() => navigate('/chat')} 
                  className="bg-white text-health-primary hover:bg-gray-100 px-6 py-3 text-lg"
                >
                  Chat with AI
                </Button>
                <Button 
                  onClick={() => navigate('/predict')}
                  className="bg-transparent text-white border-2 border-white hover:bg-white/20 px-6 py-3 text-lg"
                >
                  Try Disease Prediction
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              AI-Powered Health Features
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our platform combines advanced AI with medical knowledge to provide reliable health insights and predictions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="health-card border-none">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-health-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">AI Health Chatbot</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Interact with our medical AI assistant to discuss your symptoms and get personalized advice.
                </p>
                <Button variant="link" onClick={() => navigate('/chat')} className="text-health-primary mt-4 p-0">
                  Try AI Chat →
                </Button>
              </CardContent>
            </Card>

            <Card className="health-card border-none">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4">
                  <Activity className="h-6 w-6 text-health-secondary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Disease Prediction</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Use our AI models to predict risk for various conditions using your health data.
                </p>
                <Button variant="link" onClick={() => navigate('/predict')} className="text-health-secondary mt-4 p-0">
                  Try Prediction →
                </Button>
              </CardContent>
            </Card>

            <Card className="health-card border-none">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center mb-4">
                  <Clipboard className="h-6 w-6 text-health-accent" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Symptom Checker</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Input your symptoms to receive potential causes and recommendations for next steps.
                </p>
                <Button variant="link" onClick={() => navigate('/symptom')} className="text-health-accent mt-4 p-0">
                  Check Symptoms →
                </Button>
              </CardContent>
            </Card>

            <Card className="health-card border-none">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-4">
                  <User className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Personal Dashboard</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Track your health history, predictions, and receive personalized health recommendations.
                </p>
                <Button variant="link" onClick={() => navigate('/dashboard')} className="text-purple-600 mt-4 p-0">
                  View Dashboard →
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              How HealthAI Works
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our AI-powered platform uses advanced algorithms trained on medical data to provide insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full health-gradient flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Input Your Data</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Enter your symptoms or health data through our user-friendly interfaces.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full health-gradient flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">AI Analysis</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our AI models analyze your information using patterns from medical databases.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full health-gradient flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Get Results</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Receive personalized predictions, insights, and recommendations for your health.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Ready to get started?
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                  Try our AI-powered health tools today and take control of your wellbeing.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <Button 
                    onClick={() => navigate('/chat')}
                    className="bg-health-primary hover:bg-blue-600 text-white"
                  >
                    Chat with AI
                  </Button>
                  <Button 
                    onClick={() => navigate('/predict')}
                    variant="outline"
                    className="border-health-primary text-health-primary hover:bg-health-primary/10"
                  >
                    Try Disease Prediction
                  </Button>
                </div>
              </div>
              <div 
                className="hidden lg:block bg-cover bg-center" 
                style={{ 
                  backgroundImage: "url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80')"
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="py-8 bg-red-50 dark:bg-red-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-red-700 dark:text-red-400">
              Medical Disclaimer
            </h3>
            <p className="mt-2 text-sm text-red-600 dark:text-red-300 max-w-3xl mx-auto">
              This platform is designed for informational purposes only and is not a substitute for professional medical advice,
              diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions
              you may have regarding a medical condition.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
