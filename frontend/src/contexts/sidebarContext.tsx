import { createContext, useContext, useState, Dispatch, SetStateAction, ReactNode } from 'react';

interface SidebarContextType {
  isCollapsed: boolean;
  setIsCollapsed: Dispatch<SetStateAction<boolean>>;
}

const SidebarContext = createContext<SidebarContextType>({
  isCollapsed: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setIsCollapsed: () => {}, // Suppress ESLint warning
});

export function useSidebar() {
  return useContext(SidebarContext);
}

export const SidebarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed }}>
      {children}
    </SidebarContext.Provider>
  );
};