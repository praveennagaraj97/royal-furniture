'use client';

import { FC, useEffect, useRef, useState } from 'react';
import { FiPause, FiPlay } from 'react-icons/fi';

interface VideoPlayerProps {
  src: string;
  className?: string;
  autoplay?: boolean;
  playing?: boolean;
  loop?: boolean;
  muted?: boolean;
  showControls?: boolean;
  linkUrl?: string;
}

const VideoPlayer: FC<VideoPlayerProps> = ({
  src,
  className = '',
  autoplay = false,
  playing,
  loop = false,
  muted = true,
  showControls = false,
  linkUrl,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [isHovered, setIsHovered] = useState(false);

  // Control video playback based on external `playing` prop
  useEffect(() => {
    if (videoRef.current && playing !== undefined) {
      if (playing) {
        videoRef.current.play().catch(() => {
          // Handle autoplay restrictions - state will be updated by onPause event
        });
      } else {
        videoRef.current.pause();
      }
      // State will be updated by video's onPlay/onPause events
    }
  }, [playing]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoClick = () => {
    if (linkUrl) {
      window.location.href = linkUrl;
    } else {
      togglePlay();
    }
  };

  const handlePlayButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    togglePlay();
  };

  return (
    <div
      className={`relative w-full h-full ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleVideoClick}
    >
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover"
        loop={loop}
        muted={muted}
        playsInline
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Big Play Button Overlay */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity duration-300">
          <button
            onClick={handlePlayButtonClick}
            className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-deep-maroon flex items-center justify-center shadow-lg hover:bg-[#6b0000] transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-deep-maroon/50"
            aria-label="Play video"
          >
            <FiPlay className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" />
          </button>
        </div>
      )}

      {/* Pause Button Overlay - Only show on hover when playing */}
      {isPlaying && isHovered && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity duration-300">
          <button
            onClick={handlePlayButtonClick}
            className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-deep-maroon flex items-center justify-center shadow-lg hover:bg-[#6b0000] transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-deep-maroon/50"
            aria-label="Pause video"
          >
            <FiPause className="w-8 h-8 md:w-10 md:h-10 text-white" />
          </button>
        </div>
      )}

      {/* Native Video Controls (optional) */}
      {showControls && (
        <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/60 to-transparent p-4">
          <div className="flex items-center gap-4">
            <button
              onClick={handlePlayButtonClick}
              className="text-white hover:text-deep-maroon transition-colors"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <FiPause className="w-6 h-6" />
              ) : (
                <FiPlay className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
