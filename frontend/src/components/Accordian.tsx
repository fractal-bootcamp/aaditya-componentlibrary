import React, { useState, ReactNode } from 'react';

interface AccordionItem {
  title: string;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpenIndices?: number[];
}

const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  defaultOpenIndices = [],
}) => {
  const [openIndices, setOpenIndices] = useState<number[]>(defaultOpenIndices);

  const isOpen = (index: number) => openIndices.includes(index);

  const toggleItem = (index: number) => {
    if (allowMultiple) {
      setOpenIndices((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else {
      setOpenIndices((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  const accordionStyles = {
    container: {
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      overflow: 'hidden',
    } as React.CSSProperties,
    item: {
      borderBottom: '1px solid #e5e7eb',
    } as React.CSSProperties,
    title: {
      padding: '1rem',
      cursor: 'pointer',
      backgroundColor: '#f3f4f6',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontWeight: 'bold',
      transition: 'background-color 0.2s ease',
    } as React.CSSProperties,
    content: {
      maxHeight: 0,
      overflow: 'hidden',
      transition: 'max-height 0.3s ease',
      padding: '0 1rem',
    } as React.CSSProperties,
    openContent: {
      maxHeight: '100vh', // Large value to allow smooth animation
      padding: '1rem',
    } as React.CSSProperties,
    chevron: {
      transition: 'transform 0.3s ease',
    } as React.CSSProperties,
    chevronOpen: {
      transform: 'rotate(90deg)',
    } as React.CSSProperties,
  };

  return (
    <div style={accordionStyles.container}>
      {items.map((item, index) => (
        <div key={index} style={accordionStyles.item}>
          <div
            style={accordionStyles.title}
            onClick={() => toggleItem(index)}
          >
            {item.title}
            <span
              style={{
                ...accordionStyles.chevron,
                ...(isOpen(index) ? accordionStyles.chevronOpen : {}),
              }}
            >
              ▶
            </span>
          </div>
          <div
            style={{
              ...accordionStyles.content,
              ...(isOpen(index) ? accordionStyles.openContent : {}),
            }}
          >
            {item.content}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
