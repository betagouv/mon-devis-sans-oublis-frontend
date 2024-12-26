'use client';

import { use, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Alert, Link, LinkVariant, Select, Upload } from '@/components';
import { useDataContext } from '@/context';
import wording from '@/wording';

export default function Televersement({
  params: initialParams,
}: {
  params: Promise<{ role: string }>;
}) {
  const params = use(initialParams);
  const { setData } = useDataContext();
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [profile, setProfile] = useState<string>('');
  const [fileUploadedError, setFileUploadedError] = useState<string | null>(
    null
  );
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleFileUpload = useCallback(
    (uploadedFile: File) => {
      setFile(uploadedFile);
      setFileUploadedError(null);
      setProfile(params.role);

      localStorage.setItem('uploadedFileName', uploadedFile.name);
    },
    [params.role]
  );

  const handleSelectChange = (value: string) => {
    setSelectedOption(value);
  };

  const options = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
    { value: '4', label: 'Option 4' },
  ];

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!file) {
        setFileUploadedError('Please upload a file.');
        return;
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('profile', profile);

      try {
        const response = await fetch('/api/quote_checks', {
          method: 'POST',
          body: formData,
          headers: {
            accept: 'application/json',
            Authorization: `Basic ${process.env.NEXT_PUBLIC_API_AUTH}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setData(data);
        localStorage.setItem('quoteCheckData', JSON.stringify(data));

        if (data.id) {
          router.push(`/${params.role}/televersement/${data.id}/chargement`);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    },
    [file, profile, setData, router, params.role]
  );

  return (
    <section className='fr-container-fluid fr-py-10w'>
      <div className='fr-container'>
        <div className='fr-grid-row fr-grid-row--center'>
          <div className='fr-col-12 fr-col-md-10 fr-col-lg-8'>
            <h1>{wording.upload.section_upload.title}</h1>
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
              moreDescription={wording.upload.section_upload.alert.more_info}
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
                    // !fileUploaded || fileUploadedError || !selectedOption
                    !file || fileUploadedError
                      ? 'cursor-not-allowed'
                      : undefined
                  }
                >
                  <Link
                    href={wording.upload.section_upload.link_check_quote.href}
                    label={wording.upload.section_upload.link_check_quote.label}
                    onSubmit={handleSubmit}
                    variant={
                      // file && !fileUploadedError && selectedOption
                      file && !fileUploadedError
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
