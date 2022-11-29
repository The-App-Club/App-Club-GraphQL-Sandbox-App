import Button from '@mui/joy/Button';
import {Box} from '@chakra-ui/react';
import React, {useEffect, useState} from 'react';
import {FileUploader} from 'react-drag-drop-files';
import {useGraphql} from '@/hooks/useGraphql';

import {request} from 'graphql-request';
import useSWR from 'swr';

// https://stackoverflow.com/a/65562706/15972569
const fetcher = (
  query: string,
  variables: {file: File | null; name: string | null}
) => {
  if (!variables.name) {
    return;
  }
  if (!variables.file) {
    return;
  }
  return request(`/api/graphql`, query, variables);
};

const fileTypes = ['JPG', 'PNG', 'GIF'];

const NiceFileUploader = () => {
  const [variables, setVariables] = useState<{
    file: File | null;
    name: string | null;
  }>({
    file: null,
    name: null,
  });
  const {data, error} = useSWR(
    [
      `mutation ($file: File!, $name: String!) { readTextFile(file: $file,name: $name) }`,
      variables,
    ],
    fetcher
  );

  const [modelURL, setModalURL] = useState<
    string | ArrayBuffer | null | undefined
  >(null);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const handleLoad = (reader: ProgressEvent<FileReader>) => {
      const imageBlobData = reader.target?.result;
      setModalURL(imageBlobData);
    };
    const reader = new FileReader();
    reader.addEventListener('load', handleLoad);
    if (file) {
      reader.readAsDataURL(file);
    }
    return () => {
      reader.removeEventListener('load', handleLoad);
    };
  }, [file]);

  const handleChange = async (file: File) => {
    console.log(file);
    setVariables({
      file,
      name: `prefix-${file.name}`,
    });
    setFile(file);
  };

  const handleReUpload = (e: React.MouseEvent) => {
    setModalURL(null);
  };

  console.log(`data, error`, data, error);

  return (
    <Box>
      {modelURL ? (
        <Box>
          <picture>
            <source
              srcSet={modelURL.toString() || `/assets/logo.png`}
              type={file?.type || `image/png`}
            />
            <img
              src={modelURL.toString() || `/assets/logo.png`}
              alt={file?.name || `logo`}
              width={320}
              height={320}
            />
          </picture>
          <Button onClick={handleReUpload}>Upload</Button>
        </Box>
      ) : (
        <FileUploader
          handleChange={handleChange}
          name="file"
          types={fileTypes}
        />
      )}
    </Box>
  );
};

export default NiceFileUploader;
