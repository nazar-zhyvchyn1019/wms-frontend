import Icon, { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

const ArrowCircleUpSvg = () => (
  <svg viewBox="0 0 512 512" width="1em" height="1em">
    <path d="m8 256c0-137 111-248 248-248s248 111 248 248-111 248-248 248-248-111-248-248zm292 116v-116h70.9c10.7 0 16.1-13 8.5-20.5l-114.9-114.3c-4.7-4.7-12.2-4.7-16.9 0l-115 114.3c-7.6 7.6-2.2 20.5 8.5 20.5h70.9v116c0 6.6 5.4 12 12 12h64c6.6 0 12-5.4 12-12z" />
  </svg>
);

const ArrowCircleUpIcon = (props: Partial<CustomIconComponentProps>) => <Icon component={ArrowCircleUpSvg} {...props} />;

export default ArrowCircleUpIcon;
