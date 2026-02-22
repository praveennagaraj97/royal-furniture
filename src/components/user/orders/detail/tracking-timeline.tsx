import { FC } from 'react';
import { FiCheck } from 'react-icons/fi';

export type TrackingStatus = 'completed' | 'current' | 'upcoming';

export type TrackingStep = {
  title: string;
  date: string;
  status: TrackingStatus;
};

const trackingIndicatorStyles: Record<TrackingStatus, string> = {
  current: 'bg-[#f8c6c8] text-deep-maroon border-[#f3aeb3]',
  completed: 'bg-deep-maroon text-white border-deep-maroon',
  upcoming: 'bg-white text-gray-400 border-[#d7d8e0]',
};

const trackingLabelStyles: Record<TrackingStatus, string> = {
  current: 'text-deep-maroon',
  completed: 'text-deep-maroon',
  upcoming: 'text-gray-400',
};

interface TrackingTimelineProps {
  steps: TrackingStep[];
}

const TrackingTimeline: FC<TrackingTimelineProps> = ({ steps }) => {
  const currentIndex = steps.findIndex((step) => step.status === 'current');

  const progressPercent = (() => {
    const totalSteps = steps.length;
    if (totalSteps <= 1) return 100;
    const minimumPercent = 100 / (totalSteps * 2);
    if (currentIndex <= 0) return minimumPercent;
    return (currentIndex / (totalSteps - 1)) * 100;
  })();

  return (
    <section className="bg-white rounded-sm">
      <h2 className="mb-3 text-sm font-semibold text-gray-900">
        Tracking details
      </h2>
      <div className="relative pt-1 pb-1">
        {/* Base vertical track (grey) running behind icons */}
        <div className="pointer-events-none absolute left-4 -translate-x-1/2 top-3 bottom-3 w-1 rounded-full bg-[#d6d7df]" />

        {/* Active progress track (soft pink, matches cart) */}
        <div
          className="pointer-events-none absolute left-4 -translate-x-1/2 top-3 w-1 rounded-full bg-[#f8c6c8]"
          style={{ height: `${progressPercent}%` }}
        />

        <div className="space-y-5">
          {steps.map((item) => (
            <div key={item.title} className="relative flex gap-3">
              {/* Icon column */}
              <div className="w-8 flex justify-center">
                <div className="relative flex items-center justify-center">
                  {/* Outer deep-maroon ring */}
                  <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-deep-maroon bg-white z-10">
                    {/* Inner status circle */}
                    <div
                      className={`relative flex h-5 w-5 items-center justify-center rounded-full border transition-colors duration-300 ${trackingIndicatorStyles[item.status]}`}
                    >
                      {item.status === 'completed' && (
                        <FiCheck className="h-3 w-3" />
                      )}
                      {item.status === 'current' && (
                        <span className="h-1.5 w-1.5 rounded-full bg-deep-maroon" />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Text column */}
              <div className="flex flex-col text-xs sm:text-sm">
                <span
                  className={`font-semibold ${trackingLabelStyles[item.status]}`}
                >
                  {item.title}
                </span>
                <span className="text-[11px] text-gray-500">{item.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrackingTimeline;
