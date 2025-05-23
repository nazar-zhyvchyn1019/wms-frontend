import Icon, { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

const SalesSvg = () => (
  <svg viewBox="0 0 512 512" width="1em" height="1em">
    <path d="m500 384c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-488c-6.6 0-12-5.4-12-12v-360c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v308zm-127.3-224.5-84.7 56.5-85.3-113.7c-5.1-6.8-15.5-6.3-19.9 1l-86.8 144.7v104h384l-89.9-187.8c-3.2-6.5-11.4-8.7-17.4-4.7z" />
  </svg>
);

const SalesIcon = (props: Partial<CustomIconComponentProps>) => <Icon component={SalesSvg} {...props} />;

export default SalesIcon;
