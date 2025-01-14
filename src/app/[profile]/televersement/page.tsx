'use client';

import { use, useCallback, useEffect, useState } from 'react';
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
import { Profile } from '@/types';
import wording from '@/wording';

interface GestesGroup {
  group: string;
  values: string[];
}

interface Metadata {
  aides: string[];
  gestes: GestesGroup[];
}

export default function Televersement({
  params: initialParams,
}: {
  params: Promise<{ profile: string; quoteCheckId: string }>;
}) {
  const params = use(initialParams);
  const searchParams = useSearchParams();
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [fileUploadedError, setFileUploadedError] = useState<string | null>(
    null
  );

  const [metadata, setMetadata] = useState<Metadata | null>(null);
  const [selectedAides, setSelectedAides] = useState<string[]>([]);
  const [selectedGestes, setSelectedGestes] = useState<string[]>([]);

  const handleFileUpload = useCallback(
    (uploadedFile: File) => {
      setFile(uploadedFile);
      setFileUploadedError(null);
      setProfile(params.profile as Profile);
    },
    [params.profile]
  );
  const handleAidesChange = (values: string[]) => {
    setSelectedAides(values);
  };

  const handleGestesChange = (values: string[]) => {
    setSelectedGestes(values);
  };

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const data = await quoteService.getQuoteMetadata();
        setMetadata(data);
      } catch (error) {
        console.error('Error fetching metadata:', error);
      }
    };

    fetchMetadata();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!file) {
      setFileUploadedError('Please upload a file.');
      return;
    }

    try {
      const data = await quoteService.uploadQuote(file, profile as Profile);

      // if (selectedAides.length > 0 || selectedGestes.length > 0) {
      //   await quoteService.sendQuoteMetadata({
      //     aides: selectedAides,
      //     gestes: selectedGestes,
      //   });
      // }

      router.push(`/${params.profile}/televersement/${data.id}`);
    } catch (error) {
      console.error('Error during upload:', error);
      setFileUploadedError('An error occurred. Please try again.');
    }
  };

  useEffect(() => {
    const error = searchParams.get('error');
    if (error === 'file_error') {
      setFileUploadedError(wording.upload.error.notice.description);
      router.replace(`/${params.profile}/televersement`);
    }
  }, [router, params.profile, searchParams]);

  return (
    <>
      {fileUploadedError && (
        <Notice
          buttonClose={true}
          description={fileUploadedError}
          title={wording.upload.error.notice.title}
          type={NoticeType.ALERT}
        />
      )}
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
              <h2>Votre projet</h2>
              {metadata && metadata.gestes && (
                <MultiSelectCheckbox
                  label='Geste(s) technique(s) concerné(s) par le devis'
                  options={metadata.gestes.flatMap((group: GestesGroup) =>
                    group.values.map((value) => ({
                      id: value,
                      label: value,
                      group: group.group,
                    }))
                  )}
                  onChange={handleGestesChange}
                />
              )}
              {metadata && metadata.aides && (
                <MultiSelectCheckbox
                  label='Aide(s) visée(s) avec le devis'
                  options={metadata.aides}
                  onChange={handleAidesChange}
                />
              )}
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
                      !file ||
                      fileUploadedError ||
                      !selectedAides.length ||
                      !selectedGestes.length
                        ? 'cursor-not-allowed'
                        : undefined
                    }
                  >
                    <Link
                      href={wording.upload.section_upload.link_check_quote.href}
                      label={
                        wording.upload.section_upload.link_check_quote.label
                      }
                      onSubmit={handleSubmit}
                      variant={
                        file &&
                        !fileUploadedError &&
                        selectedAides.length > 0 &&
                        selectedGestes.length > 0
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
    </>
  );
}
