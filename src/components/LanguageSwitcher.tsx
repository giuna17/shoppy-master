import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';

type Language = {
  code: string;
  name: string;
  flag: string;
};

const languages: Language[] = [
  {
    code: 'ru',
    name: 'Русский',
    flag: '🇷🇺',
  },
  {
    code: 'en',
    name: 'English',
    flag: '🇬🇧',
  },
  {
    code: 'ge',
    name: 'ქართული',
    flag: '🇬🇪',
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
  const current =
    languages.find((lang) => lang.code === currentLanguage) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-9 px-3 flex items-center gap-1.5 text-sm"
        >
          <span className="text-sm">{current.flag}</span>
          <span className="text-sm font-medium">{current.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-background border-border">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onLanguageChange(language.code)}
          >
            <span className="text-base">{language.flag}</span>
            <span>{language.name}</span>
            <span className="ml-auto text-xs opacity-70">
              {language.code.toUpperCase()}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
