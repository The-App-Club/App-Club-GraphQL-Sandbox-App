import {gql, useMutation} from '@apollo/client';

const MUTATION = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      success
    }
  }
`;
// const FILE_UPLOAD = gql`
//   input BrandCreateInput {
//     name: String!
//     logo: Upload!
//   }

//   mutation ($input: BrandCreateInput!) {
//     brandCreate(input: $input) {
//       id
//       name
//       logo
//     }
//   }
// `;

// type Brand = {
//   id: string;
//   name: string;
//   logo: File;
// };

const useFileUpload = () => {
  const [mutate] = useMutation(MUTATION);

  const createBrand = async (name: string, logo: File) => {
    console.log(`name,logo`, name, logo);
    const a = await mutate({variables: {file: logo}});
    console.log(a);
  };
  return {
    createBrand,
  };
};

export default useFileUpload;
