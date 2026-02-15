"use client"; // This makes it a Client Component
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQAccordion({ question, answer }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-white">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-6 py-5 flex items-center justify-between hover:bg-slate-50 transition-colors text-left group"
            >
                <span className={`font-semibold text-lg ${isOpen ? 'text-brand' : 'text-slate-800'} group-hover:text-secondary transition-colors`}>
                    {question}
                </span>
                <div className={`p-1 rounded-full transition-all duration-300 ${isOpen ? 'bg-brand/10 rotate-180' : 'bg-slate-100'}`}>
                    {isOpen ? (
                        <ChevronUp className="text-brand" size={20} />
                    ) : (
                        <ChevronDown className="text-slate-400" size={20} />
                    )}
                </div>
            </button>
            
            <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="px-6 pb-6 pt-0 text-slate-600 leading-relaxed border-l-4 border-brand ml-6 mb-4">
                    {answer}
                </div>
            </div>
        </div>
    );
}