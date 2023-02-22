import Icon, { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

const NewPasswordSvg = () => (
  <svg viewBox="0 0 24 22" width="15" height="15">
    <path d="m24 11a11 11 0 0 1 -22 .4l-.3.3a.967.967 0 0 1 -1.4 0 .967.967 0 0 1 0-1.4l2-2a.967.967 0 0 1 1.4 0l2 2a.967.967 0 0 1 0 1.4.908.908 0 0 1 -.7.3.908.908 0 0 1 -.7-.3l-.3-.3a9 9 0 1 0 9-9.4.945.945 0 0 1 -1-1 .945.945 0 0 1 1-1 10.968 10.968 0 0 1 11 11zm-16 5v-5a.945.945 0 0 1 1-1v-1a4 4 0 0 1 8 0v1a.945.945 0 0 1 1 1v5a.945.945 0 0 1 -1 1h-8a.945.945 0 0 1 -1-1zm8-4h-6v3h6zm-5-2h4v-1a2 2 0 0 0 -4 0z" />
  </svg>
);

const NewPasswordIcon = (props: Partial<CustomIconComponentProps>) => <Icon component={NewPasswordSvg} {...props} />;

export default NewPasswordIcon;
