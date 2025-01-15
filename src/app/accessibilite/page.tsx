import { richTextParser } from '@/utils';
import wording from '@/wording';

export default function Accessibilite() {
  return (
    <section className='fr-container-fluid fr-py-10w'>
      <div className='fr-container'>
        <h1 className='fr-mb-6w text-[var(--text-title-grey)]'>
          {wording.accessibilty.title}
        </h1>
        <p>{richTextParser(wording.accessibilty.first_paragraph)}</p>
        <p>{richTextParser(wording.accessibilty.second_paragraph)}</p>
        <p>{wording.accessibilty.third_paragraph}</p>
        <p>{richTextParser(wording.accessibilty.fourth_paragraph)}</p>
      </div>
    </section>
  );
}
