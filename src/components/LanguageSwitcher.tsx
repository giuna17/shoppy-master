import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

type Language = {
  code: string;
  name: string;
  displayCode: string;
};

const languages: Language[] = [
  {
    code: 'ru',
    name: 'Русский',
    displayCode: 'RU',
  },
  {
    code: 'en',
    name: 'English',
    displayCode: 'EN',
  },
  {
    code: 'ge',
    name: 'ქართული',
    displayCode: 'GE',
  },
];

interface LanguageSwitcherProps {
  currentLanguage: string;
  onLanguageChange: (code: string) => void;
}

const LanguageSwitcher = ({
  currentLanguage,
  onLanguageChange,
}: LanguageSwitcherProps) => {
  const current = languages.find((lang) => lang.code === currentLanguage) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-9 w-9 p-0 hover:bg-transparent"
        >
          <div className="flex items-center justify-center w-8 h-8 border border-crimson/50 hover:border-crimson">
            <span className="text-sm font-medium text-crimson">
              {current.displayCode}
            </span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="bg-black/95 border border-crimson/20 p-1 min-w-[60px]"
      >
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            className={`flex justify-center p-2 text-sm cursor-pointer ${
              currentLanguage === language.code ? 'text-crimson' : 'text-gray-200 hover:text-white'
            }`}
            onClick={() => onLanguageChange(language.code)}
          >
            {language.displayCode}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
