import {
  AboutUs,
  ExplanationCards,
  HeroSection,
  WhoAreYou,
} from '@/page-sections';

export default function Home() {
  return (
    <div className='[&_h2]:text-center'>
      <HeroSection />
      <ExplanationCards />
      <AboutUs />
      <WhoAreYou />
    </div>
  );
}
