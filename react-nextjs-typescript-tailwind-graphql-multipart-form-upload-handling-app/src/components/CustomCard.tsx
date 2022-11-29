import {Box, Tag} from '@chakra-ui/react';
import {forwardRef, ForwardedRef} from 'react';

type ObjectLiteral = Record<any, any>;

type Props = {
  children: React.ReactNode;
  rest?: ObjectLiteral[];
};

const CustomCard = (
  {children, ...rest}: Props,
  ref: ForwardedRef<HTMLSpanElement>
) => {
  return (
    <Box p="1">
      <Tag ref={ref} {...rest}>
        {children}
      </Tag>
    </Box>
  );
};

export default forwardRef(CustomCard);
