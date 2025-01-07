'use client';

import { use, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';

import {
  Alert,
  Link,
  LinkVariant,
  // Select,
  Upload,
} from '@/components';
import { Profile } from '@/types';
import wording from '@/wording';

export default function Televersement({
  params: initialParams,
}: {
  params: Promise<{ profile: string }>;
}) {
  const params = use(initialParams);
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [fileUploadedError, setFileUploadedError] = useState<string | null>(
    null
  );
  // const [selectedOption, setSelectedOption] = useState<string>('');

  const handleFileUpload = useCallback(
    (uploadedFile: File) => {
      setFile(uploadedFile);
      setFileUploadedError(null);
      setProfile(params.profile as Profile);
    },
    [params.profile]
  );

  // const handleSelectChange = (value: string) => {
  //   setSelectedOption(value);
  // };

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!file) {
        setFileUploadedError('Please upload a file.');
        return;
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('profile', profile as Profile);

      try {
        const response = await fetch('/api/quote_checks', {
          method: 'POST',
          headers: {
            accept: 'application/json',
            Authorization: `Basic ${process.env.NEXT_PUBLIC_API_AUTH}`,
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Error while creating the quote.');
        }

        const data = await response.json();

        if (!data.id) {
          throw new Error("The API didn't return an ID.");
        }

        router.push(`/${params.profile}/televersement/${data.id}`);
      } catch (error) {
        console.error('Error during upload:', error);
        setFileUploadedError('An error occurred. Please try again.');
      }
    },
    [file, profile, router, params.profile]
  );

  return (
    <section className='fr-container-fluid fr-py-10w'>
      <div className='fr-container'>
        <div className='fr-grid-row fr-grid-row--center'>
          <div className='fr-col-12 fr-col-md-10 fr-col-lg-8'>
            <h1>{wording.upload.section_upload.title}</h1>
            <Upload
              maxFileSize={50}
              onFileUpload={handleFileUpload}
              setError={setFileUploadedError}
            />
            <Alert
              className='fr-mb-8w fr-mt-4w'
              description={wording.upload.section_upload.alert.description}
              moreDescription={wording.upload.section_upload.alert.more_info}
            />
            {/*<h2>Votre projet</h2>
            <Select
              label={wording.upload.section_upload.select.label}
              onChange={handleSelectChange}
              options={[
                { value: '1', label: 'Option 1' },
                { value: '2', label: 'Option 2' },
              ]}
              selectedValue={selectedOption}
            />*/}
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
