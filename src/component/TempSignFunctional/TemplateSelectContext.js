import { createContext, useContext, useState } from 'react';

const TemplateContext = createContext();

export function useTemplateContext() {
  return useContext(TemplateContext);
}

export function TemplateProvider({ children }) {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const setTemplate = (template) => {
    setSelectedTemplate(template);
  };

  return (
    <TemplateContext.Provider value={{ selectedTemplate, setTemplate }}>
      {children}
    </TemplateContext.Provider>
  );
}
