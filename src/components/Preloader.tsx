import { useEffect, useState } from 'react';

const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Анимация прогресс-бара
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 10) + 5;
      });
    }, 100);

    // Автоматическое скрытие прелоадера
    const timer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = 'auto';
    }, 3000);

    // Блокировка скролла при загрузке
    document.body.style.overflow = 'hidden';

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
      <div className="relative w-64 h-64 mb-8 flex items-center justify-center">
        {/* Логотип */}
        <div className="relative w-full h-full flex items-center justify-center">
          <img 
            src="/lovable-uploads/nekos-logo.jpeg" 
            alt="NEKOS SHOP Logo"
            className="w-3/4 h-3/4 object-contain rounded-full border-2 border-crimson/30 p-2"
          />
          
          {/* Анимированное кольцо */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-crimson/70 border-r-crimson/70 animate-spin-slow"></div>
          <div className="absolute inset-4 rounded-full border-4 border-transparent border-b-crimson/50 border-l-crimson/50 animate-spin-slow-reverse"></div>
          
          {/* Эффект свечения */}
          <div className="absolute inset-0 rounded-full bg-crimson/5 animate-pulse"></div>
        </div>
      </div>
      
      {/* Название бренда */}
      <h2 className="text-3xl font-bold text-white mb-6 font-medieval tracking-wider text-center">
        <span className="text-crimson">NEKOS</span> 
        <span className="text-white">SHOP</span>
      </h2>
      
      {/* Прогресс-бар */}
      <div className="w-72 h-1.5 bg-gray-800/70 rounded-full overflow-hidden mt-2">
        <div 
          className="h-full bg-gradient-to-r from-crimson to-pink-500 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <p className="text-gray-400 mt-4 text-sm font-mono tracking-wider">
        LOADING {progress}%
      </p>
    </div>
  );
};

export default Preloader;
