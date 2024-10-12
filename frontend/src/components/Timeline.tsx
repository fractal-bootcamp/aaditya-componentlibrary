import React, { useState, useEffect, useRef } from 'react';

interface TimelineEvent {
  title: string;
  description: string;
  date: string;
  icon?: React.ReactNode;
  image?: string;
}

interface TimelineProps {
  events: TimelineEvent[];
  orientation?: 'vertical' | 'horizontal';
  collapsible?: boolean;
}

const Timeline: React.FC<TimelineProps> = ({
  events,
  orientation = 'vertical',
  collapsible = false,
}) => {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [visibleEvents, setVisibleEvents] = useState<boolean[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          setVisibleEvents((prev) => events.map(() => true));
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check visibility initially
    return () => window.removeEventListener('scroll', handleScroll);
  }, [events]);

  const toggleExpand = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

  const timelineStyles = {
    container: {
      display: 'flex',
      flexDirection: orientation === 'vertical' ? 'column' : 'row',
      gap: '1rem',
      padding: '1rem',
    } as React.CSSProperties,
    event: (isVisible: boolean) => ({
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
      transition: 'opacity 0.5s ease, transform 0.5s ease',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
    }) as React.CSSProperties,
    marker: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '40px',
      height: '40px',
      backgroundColor: '#4caf50',
      borderRadius: '50%',
      color: 'white',
      fontSize: '16px',
    } as React.CSSProperties,
    content: {
      display: 'flex',
      flexDirection: 'column',
    } as React.CSSProperties,
    description: (isExpanded: boolean) => ({
      maxHeight: isExpanded ? '100px' : '0',
      overflow: 'hidden',
      transition: 'max-height 0.3s ease',
    }) as React.CSSProperties,
    image: {
      width: '80px',
      height: '80px',
      objectFit: 'cover',
      borderRadius: '8px',
    } as React.CSSProperties,
  };

  return (
    <div ref={containerRef} style={timelineStyles.container}>
      {events.map((event, index) => (
        <div
          key={index}
          style={timelineStyles.event(visibleEvents[index])}
          onClick={() => collapsible && toggleExpand(index)}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = '#e0f2f1')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = 'transparent')
          }
        >
          <div style={timelineStyles.marker}>
            {event.icon || <span>⏳</span>}
          </div>
          <div style={timelineStyles.content}>
            <h3>{event.title}</h3>
            <p>{event.date}</p>
            {event.image && (
              <img src={event.image} alt={event.title} style={timelineStyles.image} />
            )}
            <div style={timelineStyles.description(expanded === index)}>
              <p>{event.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
