import {
  StaggerContainer,
  StaggerItem,
  ViewOnce,
} from '@/components/shared/animations';
import Image from 'next/image';
import LegalAccordion from '../shared/accordion';
import SectionHeading from '../shared/section-heading';

import craftsmanshipImage from '@/assets/legal-pages/warranty/craftsmanship.jpg';
import heroImage from '@/assets/legal-pages/warranty/hero.jpg';

const coverageHighlights = [
  {
    value: '10 years',
    label: 'Structural coverage',
    description:
      'Protection for frames, joinery, and load-bearing construction under normal residential use.',
  },
  {
    value: '2 years',
    label: 'Upholstery coverage',
    description:
      'Coverage for manufacturing defects in upholstery materials and tailoring workmanship.',
  },
  {
    value: 'Lifetime',
    label: 'Selected heritage pieces',
    description:
      'Extended protection on specific heritage joinery where provenance and craftsmanship qualify.',
  },
];

const faqItems = [
  {
    id: 'duration',
    title: 'What is the duration of the Royal Warranty?',
    content:
      'All signature collections are covered by a 10-year structural warranty and a 2-year upholstery warranty. Heritage pieces may carry extended lifetime protection on selected joinery.',
    defaultOpen: true,
  },
  {
    id: 'coverage',
    title: 'What exactly is covered?',
    content:
      'The warranty covers manufacturing defects in materials and workmanship, including frame structural integrity, spring failure, and significant joint separation during normal residential use.',
  },
  {
    id: 'claim',
    title: 'How do I initiate a warranty claim?',
    content:
      'Contact your dedicated curator or our boutique concierge with your original order number, a short description of the issue, and high-resolution photographs.',
  },
  {
    id: 'exclusions',
    title: 'Are there any specific exclusions?',
    content:
      'The warranty does not cover natural variations in wood grain or leather scarring, damage from improper cleaning, environmental exposure such as excess humidity or sunlight, or third-party modifications.',
  },
  {
    id: 'transfer',
    title: 'Is the protection transferable?',
    content:
      'Coverage is tied to the original purchaser and delivery address. Heritage Registry members may transfer warranty coverage during a certified antique resale through the boutique.',
  },
];

const WarrantyPage = () => {
  return (
    <div className=" pb-12 sm:pb-16">
      <section className="section-container pt-3 sm:pt-4 lg:pt-6">
        <ViewOnce
          type="scaleUp"
          distance={24}
          initialScale={1.03}
          duration={0.8}
          className="relative overflow-hidden rounded-4xl border border-slate-200 bg-indigo-slate text-white shadow-[0_30px_80px_rgba(15,28,44,0.22)]"
        >
          <div className="absolute inset-0">
            <Image
              src={heroImage}
              alt="Luxury living room interior"
              fill
              priority
              className="object-cover opacity-45"
            />
          </div>
          <div className="absolute inset-0 bg-linear-to-r from-indigo-slate via-indigo-slate/80 to-transparent" />
          <div className="relative px-6 py-12 sm:px-10 sm:py-16 lg:px-14 lg:py-20">
            <div className="max-w-3xl">
              <p className="mb-4 text-[0.7rem] font-medium uppercase tracking-[0.32em] text-pale-blush/85 sm:text-xs">
                Our commitment
              </p>
              <h1 className="font-montserrat text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
                Warranty
              </h1>
              <p className="mt-6 max-w-2xl text-sm leading-8 text-white/80 sm:text-base lg:text-lg">
                Investing in Royal Manor is an investment in generations of
                craftsmanship. Our warranty exists to protect that standard with
                clear coverage, careful support, and lasting confidence.
              </p>
            </div>
          </div>
        </ViewOnce>
      </section>

      <section className="section-container py-8 sm:py-10 lg:py-12">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="max-w-2xl">
            <SectionHeading
              eyebrow="Coverage"
              title="Built for longevity"
              description={
                <>
                  Every Royal Manor piece is reviewed against rigorous quality
                  standards. We use sustainably sourced hardwoods, premium
                  textiles, and artisanal hardware so the warranty protects
                  against real manufacturing defects.
                </>
              }
            />

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full border border-deep-maroon/15 bg-white px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-deep-maroon shadow-sm">
                Authentic wood
              </span>
              <span className="rounded-full border border-deep-maroon/15 bg-white px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-deep-maroon shadow-sm">
                Designer series
              </span>
              <span className="rounded-full border border-deep-maroon/15 bg-white px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-deep-maroon shadow-sm">
                Residential use
              </span>
            </div>
          </div>

          <ViewOnce
            type="slideUp"
            distance={24}
            duration={0.75}
            className="relative"
          >
            <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_24px_60px_rgba(15,28,44,0.08)]">
              <div className="relative aspect-4/5">
                <Image
                  src={craftsmanshipImage}
                  alt="Craftsmanship details"
                  fill
                  className="object-cover grayscale transition duration-700 hover:grayscale-0"
                />
              </div>
            </div>
          </ViewOnce>
        </div>

        <StaggerContainer
          staggerChildren={0.09}
          delayChildren={0.08}
          className="mt-8 grid gap-4 md:grid-cols-3"
        >
          {coverageHighlights.map((item) => (
            <StaggerItem
              key={item.label}
              type="slideUp"
              distance={16}
              duration={0.35}
              className="h-full rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-[0_14px_35px_rgba(15,28,44,0.05)]"
            >
              <p className="font-montserrat text-3xl font-semibold tracking-tight text-indigo-slate">
                {item.value}
              </p>
              <h3 className="mt-3 text-sm font-semibold uppercase tracking-[0.24em] text-deep-maroon/80">
                {item.label}
              </h3>
              <p className="mt-3 text-sm leading-7 text-gray-700">
                {item.description}
              </p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      <section
        id="care-guides"
        className="section-container py-8 sm:py-10 lg:py-12"
      >
        <div className="mx-auto max-w-4xl">
          <SectionHeading
            eyebrow="Frequently asked questions"
            title="Warranty support"
            align="center"
            description={
              <>
                The questions below cover eligibility, claims, exclusions, and
                transfer rules. If you need clarification beyond these points,
                our concierge team can review your order and advise on next
                steps.
              </>
            }
            className="mb-8"
          />

          <LegalAccordion items={faqItems} />
        </div>
      </section>

      <section className=" py-8 sm:py-10 lg:py-12 border-t border-gray-200">
        <div className="section-container">
          <ViewOnce
            type="slideUp"
            distance={18}
            duration={0.7}
            className="mx-auto w-full max-w-none px-0 py-0 text-center text-indigo-slate"
          >
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.32em] text-deep-maroon/80 sm:text-xs">
              Support
            </p>
            <h3 className="mt-4 font-montserrat text-3xl font-semibold tracking-tight sm:text-4xl">
              Need further assistance?
            </h3>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-700 sm:text-base">
              Our concierge team is available for personalised consultations
              regarding product care, claim reviews, and protection guidance.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="mailto:concierge@royalmanor.com"
                className="inline-flex min-w-44 items-center justify-center rounded-full bg-indigo-slate px-7 py-3.5 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 hover:opacity-90"
              >
                Contact boutique
              </a>
              <a
                href="#care-guides"
                className="inline-flex min-w-44 items-center justify-center rounded-full border border-slate-300 px-7 py-3.5 text-sm font-semibold text-indigo-slate transition-all duration-200 hover:border-deep-maroon/30 hover:bg-soft-pink"
              >
                Care guides
              </a>
            </div>
          </ViewOnce>
        </div>
      </section>
    </div>
  );
};

export default WarrantyPage;
