"use client";

import {useTranslations, useLocale} from 'next-intl';
import Link from 'next/link';
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Menu, X, Calculator, BookOpen, BarChart3} from "lucide-react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher"; 

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations('navigation');
  const locale = useLocale();
  
  const navigation = [
    {name: t('home'), href: `/${locale}`, icon: null},
    {name: t('tools'), href: `/${locale}/tools`, icon: Calculator},
    {name: t('knowledge'), href: `/${locale}/knowledge`, icon: BookOpen},
    {name: t('cases'), href: `/${locale}/cases`, icon: BarChart3},
  ];

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto max-w-6xl px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href={`/${locale}`} className="font-bold text-xl mr-8">
            Financial Tools
          </Link>
          
          <nav className="hidden md:flex space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 flex items-center"
              >
                {item.icon && <item.icon className="w-4 h-4 mr-1" />}
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* 直接使用新的下拉框组件 */}
          <LanguageSwitcher />
          
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      
      {/* 移动端菜单 */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t p-4">
          <nav className="flex flex-col space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.icon && <item.icon className="w-4 h-4 mr-2" />}
                {item.name}
              </Link>
            ))}
            
          </nav>
        </div>
      )}
    </header>
  );
} 