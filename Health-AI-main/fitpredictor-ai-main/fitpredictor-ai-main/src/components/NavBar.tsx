
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, User, Home, MessageSquare, Clipboard, Activity, LogIn, LogOut } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const { user, isAuthenticated, signOut } = useAuth();
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    await signOut();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    toggleMenu();
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user) return 'U';
    
    const firstName = user.user_metadata?.first_name || '';
    const lastName = user.user_metadata?.last_name || '';
    
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U';
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div className="h-8 w-8 rounded-full health-gradient flex items-center justify-center">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <span className="ml-2 text-xl font-semibold text-gray-900 dark:text-white">HealthAI</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-health-primary px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            <Link to="/chat" className="text-gray-700 dark:text-gray-300 hover:text-health-primary px-3 py-2 rounded-md text-sm font-medium">
              AI Chat
            </Link>
            <Link to="/predict" className="text-gray-700 dark:text-gray-300 hover:text-health-primary px-3 py-2 rounded-md text-sm font-medium">
              Disease Prediction
            </Link>
            <Link to="/symptom" className="text-gray-700 dark:text-gray-300 hover:text-health-primary px-3 py-2 rounded-md text-sm font-medium">
              Symptom Checker
            </Link>
          </div>

          <div className="hidden md:flex md:items-center">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Avatar className="h-8 w-8 border border-gray-200">
                  <AvatarFallback className="bg-health-primary text-white">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
                <Button 
                  onClick={handleLogout} 
                  variant="outline"
                  className="ml-4 flex items-center"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <Link to="/auth">
                <Button 
                  className="ml-4 flex items-center bg-health-primary hover:bg-blue-600 text-white border-none"
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-health-primary hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className="text-gray-700 dark:text-gray-300 hover:text-health-primary block px-3 py-2 rounded-md text-base font-medium"
              onClick={toggleMenu}
            >
              <div className="flex items-center">
                <Home className="mr-2 h-4 w-4" />
                Home
              </div>
            </Link>
            <Link 
              to="/chat" 
              className="text-gray-700 dark:text-gray-300 hover:text-health-primary block px-3 py-2 rounded-md text-base font-medium"
              onClick={toggleMenu}
            >
              <div className="flex items-center">
                <MessageSquare className="mr-2 h-4 w-4" />
                AI Chat
              </div>
            </Link>
            <Link 
              to="/predict" 
              className="text-gray-700 dark:text-gray-300 hover:text-health-primary block px-3 py-2 rounded-md text-base font-medium"
              onClick={toggleMenu}
            >
              <div className="flex items-center">
                <Activity className="mr-2 h-4 w-4" />
                Disease Prediction
              </div>
            </Link>
            <Link 
              to="/symptom" 
              className="text-gray-700 dark:text-gray-300 hover:text-health-primary block px-3 py-2 rounded-md text-base font-medium"
              onClick={toggleMenu}
            >
              <div className="flex items-center">
                <Clipboard className="mr-2 h-4 w-4" />
                Symptom Checker
              </div>
            </Link>
            {isAuthenticated ? (
              <div className="flex flex-col">
                <div className="flex items-center px-3 py-2">
                  <Avatar className="h-8 w-8 mr-2 border border-gray-200">
                    <AvatarFallback className="bg-health-primary text-white">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-gray-700 dark:text-gray-300 text-sm">
                    {user?.email}
                  </span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="text-gray-700 dark:text-gray-300 hover:text-health-primary block px-3 py-2 rounded-md text-base font-medium text-left"
                >
                  <div className="flex items-center">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </div>
                </button>
              </div>
            ) : (
              <Link 
                to="/auth" 
                className="text-gray-700 dark:text-gray-300 hover:text-health-primary block px-3 py-2 rounded-md text-base font-medium"
                onClick={toggleMenu}
              >
                <div className="flex items-center">
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </div>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
