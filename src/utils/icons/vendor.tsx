import Icon, { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

const VendorSvg = () => (
  <svg viewBox="0 0 640 512">
    <path d="m488 192h-152v56c0 39.7-32.3 72-72 72s-72-32.3-72-72v-121.6l-64.9 39c-19.3 11.5-31.1 32.4-31.1 54.8v47.3l-80 46.2c-15.3 8.8-20.6 28.4-11.7 43.7l80 138.6c8.8 15.3 28.4 20.5 43.7 11.7l103.4-59.7h136.6c35.3 0 64-28.7 64-64h16c17.7 0 32-14.3 32-32v-64h8c13.3 0 24-10.7 24-24v-48c0-13.3-10.7-24-24-24zm147.7-37.4-80-138.6c-8.8-15.3-28.4-20.5-43.7-11.7l-103.4 59.7h-102.2c-12 0-23.7 3.4-33.9 9.7l-33.5 20.9c-9.4 5.8-15 16.1-15 27.1v126.3c0 22.1 17.9 40 40 40s40-17.9 40-40v-88h184c30.9 0 56 25.1 56 56v28.5l80-46.2c15.3-8.9 20.5-28.4 11.7-43.7z" />
  </svg>
);

const VendorIcon = (props: Partial<CustomIconComponentProps>) => <Icon component={VendorSvg} {...props} />;

export default VendorIcon;
