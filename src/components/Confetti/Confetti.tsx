const Confetti = () => {
  const confettiArray = Array.from({ length: 50 });

  const colors = [
    'bg-red-500',
    'bg-blue-500',
    'bg-yellow-400',
    'bg-green-400',
    'bg-pink-500',
    'bg-purple-500',
  ];

  const shapes = [
    'w-2 h-4',
    'w-3 h-3 rounded-full',
    'w-4 h-2 rotate-45',
    'w-2 h-2 rounded',
  ];

  return (
    <div className='fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-50'>
      {confettiArray.map((_, index) => {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];

        return (
          <div
            className={`absolute animate-confetti-fall ${color} ${shape}`}
            key={index}
            role='presentation'
            style={{
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
              left: `${Math.random() * 100}vw`,
            }}
          ></div>
        );
      })}
    </div>
  );
};

export default Confetti;
