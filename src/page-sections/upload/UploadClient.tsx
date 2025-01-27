'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import {
  Alert,
  Link,
  LinkVariant,
  MultiSelectCheckbox,
  Notice,
  NoticeType,
  Upload,
} from '@/components';
import { quoteService } from '@/lib/api';
import { Metadata, Profile } from '@/types';
import wording from '@/wording';

export const FILE_ERROR = 'file_error';

export default function UploadClient({
  metadata,
  profile,
}: {
  metadata: Metadata;
  profile: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [fileUploadedError, setFileUploadedError] = useState<string | null>(
    null
  );
  const [selectedAides, setSelectedAides] = useState<string[]>([]);
  const [selectedGestes, setSelectedGestes] = useState<string[]>([]);

  const handleFileUpload = useCallback((uploadedFile: File) => {
    setFile(uploadedFile);
    setFileError(null);
  }, []);

  const handleAidesChange = (values: string[]) => {
    setSelectedAides(values);
  };

  const handleGestesChange = (values: string[]) => {
    setSelectedGestes(values);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!file) {
      setFileError('Please upload a file.');
      return;
    }

    try {
      const data = await quoteService.uploadQuote(
        file,
        { aides: selectedAides, gestes: selectedGestes },
        profile as Profile
      );

      router.push(`/${profile}/televersement/${data.id}`);
    } catch (error) {
      console.error('Error during upload:', error);
      setFileError('An error occurred. Please try again.');
    }
  };

  useEffect(() => {
    const error = searchParams.get('error');
    if (error === FILE_ERROR) {
      setFileUploadedError(wording.upload.error.notice.description);
      router.replace(`/${profile}/televersement`);
    }
  }, [router, profile, searchParams]);

  useEffect(() => {
    if (fileUploadedError) {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 0);
    }
  }, [fileUploadedError]);

  return (
    <>
      {fileUploadedError && (
        <div className='absolute top-[186px] left-0 right-0 z-50'>
          <Notice
            buttonClose={true}
            description={fileUploadedError}
            title={wording.upload.error.notice.title}
            type={NoticeType.ALERT}
          />
        </div>
      )}
      <>
        <Upload
          maxFileSize={50}
          onFileUpload={handleFileUpload}
          setError={setFileError}
        />
        <Alert
          className='fr-mb-8w fr-mt-4w'
          description={wording.upload.alert.description}
          moreDescription={wording.upload.alert.more_info}
        />
        <h2>{wording.upload.subtitle}</h2>
        {metadata.gestes && (
          <MultiSelectCheckbox
            label={wording.upload.select_gestes}
            onChange={handleGestesChange}
            optionnal={true}
            options={metadata.gestes.flatMap((group) =>
              group.values.map((value) => ({
                id: value,
                label: value,
                group: group.group,
              }))
            )}
          />
        )}
        {metadata.aides && (
          <MultiSelectCheckbox
            label={wording.upload.select_aides}
            onChange={handleAidesChange}
            optionnal={true}
            options={metadata.aides}
          />
        )}
        <div className='fr-mt-8w flex justify-center'>
          <ul className='fr-btns-group fr-btns-group--inline-sm'>
            <li>
              <Link
                href={wording.upload.link_back.href}
                label={wording.upload.link_back.label}
                variant={LinkVariant.SECONDARY}
              />
            </li>
            <li>
              <Link
                href={wording.upload.link_check_quote.href}
                label={wording.upload.link_check_quote.label}
                onSubmit={handleSubmit}
                variant={
                  file && !fileError && !fileUploadedError
                    ? LinkVariant.PRIMARY
                    : LinkVariant.DISABLED
                }
              />
            </li>
          </ul>
        </div>
      </>
    </>
  );
}
