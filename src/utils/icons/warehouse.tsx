import Icon, { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

const WarehouseSvg = () => (
  <svg viewBox="0 0 640 512">
    <path d="m504 352h-367.6c-4.4 0-8 3.6-8 8l-.1 48c0 4.4 3.6 8 8 8h367.7c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zm0 96h-367.9c-4.4 0-8 3.6-8 8l-.1 48c0 4.4 3.6 8 8 8h368c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zm0-192h-367.4c-4.4 0-8 3.6-8 8l-.1 48c0 4.4 3.6 8 8 8h367.5c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zm106.5-139-272.1-113.3a48.15 48.15 0 0 0 -36.9 0l-272 113.3c-17.8 7.5-29.5 24.9-29.5 44.3v342.7c0 4.4 3.6 8 8 8h80c4.4 0 8-3.6 8-8v-248c0-17.6 14.6-32 32.6-32h382.8c18 0 32.6 14.4 32.6 32v248c0 4.4 3.6 8 8 8h80c4.4 0 8-3.6 8-8v-342.7c0-19.4-11.7-36.8-29.5-44.3z" />
  </svg>
);

const WarehouseIcon = (props: Partial<CustomIconComponentProps>) => <Icon component={WarehouseSvg} {...props} />;

export default WarehouseIcon;
