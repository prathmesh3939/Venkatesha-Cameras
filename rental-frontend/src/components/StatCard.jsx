import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatCard = ({ 
  title, 
  value, 
  change, 
  icon: Icon,
  color = 'primary',
  loading = false,
  delay = 0
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [prevValue, setPrevValue] = useState(value);
  const [isValueChanging, setIsValueChanging] = useState(false);

  const isPositive = change && change.startsWith('+');
  
  // Animation on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Animate value changes
  useEffect(() => {
    if (prevValue !== value) {
      setIsValueChanging(true);
      const timer = setTimeout(() => setIsValueChanging(false), 1000);
      return () => clearTimeout(timer);
    }
    setPrevValue(value);
  }, [value, prevValue]);

  const colorConfig = {
    primary: {
      bg: 'bg-blue-50',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      change: 'text-blue-600',
      gradient: 'from-blue-500 to-blue-600',
      light: 'blue'
    },
    success: {
      bg: 'bg-green-50',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      change: 'text-green-600',
      gradient: 'from-green-500 to-green-600',
      light: 'green'
    },
    warning: {
      bg: 'bg-amber-50',
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600',
      change: 'text-amber-600',
      gradient: 'from-amber-500 to-amber-600',
      light: 'amber'
    },
    danger: {
      bg: 'bg-red-50',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
      change: 'text-red-600',
      gradient: 'from-red-500 to-red-600',
      light: 'red'
    },
  };

  const config = colorConfig[color];

  if (loading) {
    return (
      <div 
        className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm animate-pulse"
        style={{
          animation: `fadeIn 0.5s ease-out ${delay}s both`
        }}
      >
        <div className="flex items-center justify-between">
          <div className="space-y-3 flex-1">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-8 bg-gray-200 rounded w-16"></div>
            <div className="h-3 bg-gray-200 rounded w-32"></div>
          </div>
          <div className="h-12 w-12 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative bg-white rounded-xl border border-gray-100 p-6 
        transition-all duration-500 ease-out
        hover:shadow-xl hover:scale-105 hover:-translate-y-1
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        cursor-default overflow-hidden group
      `}
      style={{
        animation: `slideInUp 0.6s ease-out ${delay}s both`,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      {/* Background gradient animation on hover */}
      <div 
        className={`
          absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-0 
          transition-opacity duration-500 group-hover:opacity-5
        `}
      ></div>

      {/* Animated corner accent */}
      <div 
        className={`
          absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${config.gradient} 
          rounded-bl-full opacity-0 group-hover:opacity-10 transition-all duration-500
          transform translate-x-10 -translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0
        `}
      ></div>

      <div className="flex items-center justify-between relative z-10">
        <div>
          {/* Title with hover effect */}
          <p className={`
            text-sm font-medium transition-all duration-300
            ${isHovered ? `text-${config.light}-600 translate-x-1` : 'text-gray-600'}
          `}>
            {title}
          </p>
          
          {/* Value with counter animation */}
          <div className="relative">
            <p className={`
              text-2xl font-bold text-gray-900 mt-2 transition-all duration-300
              ${isValueChanging ? 'scale-110' : ''}
            `}>
              {value}
            </p>
            
            {/* Sparkle effect on value change */}
            {isValueChanging && (
              <span className="absolute -top-1 -right-2 flex h-3 w-3">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-${config.light}-400 opacity-75`}></span>
                <span className={`relative inline-flex rounded-full h-3 w-3 bg-${config.light}-500`}></span>
              </span>
            )}
          </div>
          
          {/* Change indicator with animations */}
          {change && (
            <div className="flex items-center mt-2 group/change">
              <div className={`
                transform transition-all duration-300
                ${isHovered ? 'scale-110' : ''}
              `}>
                {isPositive ? (
                  <TrendingUp className={`h-4 w-4 text-green-500 mr-1 transition-transform duration-300 ${isHovered ? 'rotate-12' : ''}`} />
                ) : (
                  <TrendingDown className={`h-4 w-4 text-red-500 mr-1 transition-transform duration-300 ${isHovered ? '-rotate-12' : ''}`} />
                )}
              </div>
              <span className={`
                text-sm font-medium transition-all duration-300
                ${isPositive ? 'text-green-600' : 'text-red-600'}
                ${isHovered ? 'scale-105' : ''}
              `}>
                {change}
              </span>
              <span className="text-gray-500 text-sm ml-1 transition-all duration-300 group-hover/change:translate-x-1">
                from last month
              </span>
            </div>
          )}
          
          {!change && (
            <div className="text-gray-400 text-sm mt-2 flex items-center">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse mr-2"></span>
              <span className="hover:translate-x-1 transition-transform duration-300">Updated just now</span>
            </div>
          )}
        </div>
        
        {/* Icon with animations */}
        <div className={`
          relative p-3 rounded-lg transition-all duration-500
          ${config.iconBg}
          group/icon
        `}>
          {/* Ripple effect on hover */}
          <div className={`
            absolute inset-0 rounded-lg bg-gradient-to-r ${config.gradient} opacity-0 
            group-hover/icon:opacity-20 transition-opacity duration-300
          `}></div>
          
          <Icon className={`
            h-6 w-6 ${config.iconColor} transform transition-all duration-500
            group-hover/icon:scale-110 group-hover/icon:rotate-3
            ${isHovered ? 'scale-110 rotate-6' : ''}
          `} />
          
          {/* Floating dots animation */}
          <div className="absolute -top-1 -right-1 flex space-x-0.5">
            <span className={`w-1 h-1 rounded-full bg-${config.light}-400 animate-bounce`} style={{ animationDelay: '0s' }}></span>
            <span className={`w-1 h-1 rounded-full bg-${config.light}-500 animate-bounce`} style={{ animationDelay: '0.2s' }}></span>
            <span className={`w-1 h-1 rounded-full bg-${config.light}-600 animate-bounce`} style={{ animationDelay: '0.4s' }}></span>
          </div>
        </div>
      </div>

      {/* Progress bar animation */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-100 overflow-hidden">
        <div 
          className={`
            h-full bg-gradient-to-r ${config.gradient} transition-all duration-1000
            ${isHovered ? 'w-full' : 'w-0'}
          `}
        ></div>
      </div>
    </div>
  );
};

export default StatCard;