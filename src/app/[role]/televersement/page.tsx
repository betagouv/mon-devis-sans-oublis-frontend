'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';

import { Alert, Link, LinkVariant, Select, Upload } from '@/components';
import wording from '@/wording';

export default function Televersement() {
  const pathname = usePathname();
  const role = pathname.split('/')[1];

  const [fileUploaded, setFileUploaded] = useState<boolean>(false);
  const [fileUploadedError, setFileUploadedError] = useState<
    string | undefined
  >(undefined);
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleSelectChange = (value: string) => {
    setSelectedOption(value);
  };

  const handleFileUpload = () => {
    setFileUploaded(true);
  };

  const options = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
    { value: '4', label: 'Option 4' },
  ];

  return (
    <section className='fr-container-fluid fr-py-10w'>
      <div className='fr-container'>
        <div className='fr-grid-row fr-grid-row--center'>
          <div className='fr-col-12 fr-col-md-10 fr-col-lg-8'>
            <h1>
              {wording.upload.section_upload.title.replace('{role}', role)}
            </h1>
            <Upload
              description={wording.upload.section_upload.upload.description}
              errorMessage={wording.upload.section_upload.upload.error_message}
              label='Ajouter des fichiers'
              maxFileSize={1 * 1024 * 1024}
              onFileUpload={handleFileUpload}
              setError={setFileUploadedError}
            />
            <Alert
              className='fr-mb-8w fr-mt-4w'
              description={wording.upload.section_upload.alert.description}
              moreInfo={wording.upload.section_upload.alert.more_info}
            />
            <h2>Votre projet</h2>
            <Select
              label={wording.upload.section_upload.select.label}
              onChange={handleSelectChange}
              options={options}
              selectedValue={selectedOption}
            />
            <div className='fr-mt-8w flex justify-center'>
              <ul className='fr-btns-group fr-btns-group--inline-sm'>
                <li>
                  <Link
                    href={wording.upload.section_upload.link_back.href}
                    label={wording.upload.section_upload.link_back.label}
                    variant={LinkVariant.SECONDARY}
                  />
                </li>
                <li
                  className={
                    !fileUploaded || fileUploadedError || !selectedOption
                      ? 'cursor-not-allowed'
                      : undefined
                  }
                >
                  <Link
                    href={wording.upload.section_upload.link_check_quote.href}
                    label={wording.upload.section_upload.link_check_quote.label}
                    variant={
                      fileUploaded && !fileUploadedError && selectedOption
                        ? LinkVariant.PRIMARY
                        : LinkVariant.DISABLED
                    }
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
