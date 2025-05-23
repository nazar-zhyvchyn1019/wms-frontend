import { OModal } from '@/components/Globals/OModal';
import { useModel } from '@umijs/max';
import { Card, Form, Select } from 'antd';
import React, { useEffect, useMemo } from 'react';
interface ISelectVendorModal {
  isOpen: boolean;
  onSave: () => void;
  onClose: () => void;
}

const SelectVendorModal: React.FC<ISelectVendorModal> = ({ isOpen, onSave, onClose }) => {
  const [form] = Form.useForm();
  const { vendorList, setSelectedVendor } = useModel('vendor');

  const selectVendorOptions = useMemo(
    () =>
      vendorList.map((item) => ({
        value: item.id,
        label: item.name,
      })),
    [vendorList],
  );

  useEffect(() => {
    form.resetFields();
  }, [isOpen, form]);

  const handleSave = () => {
    form.validateFields().then((values) => {
      setSelectedVendor(vendorList.find((item) => item.id === values.vendor));
      onSave();
    });
  };

  return (
    <OModal
      title="Choose P.O. Vendor"
      width={400}
      isOpen={isOpen}
      handleCancel={onClose}
      buttons={[
        {
          key: 'back',
          type: 'default',
          btnLabel: 'Cancel',
          onClick: onClose,
        },
        {
          key: 'submit',
          type: 'primary',
          btnLabel: 'Next',
          onClick: handleSave,
        },
      ]}
    >
      <Card title="Vendor">
        <Form form={form}>
          <Form.Item name="vendor" rules={[{ required: true, message: 'Please select the vendor!' }]}>
            <Select placeholder="Select..." options={selectVendorOptions} />
          </Form.Item>
        </Form>
      </Card>
    </OModal>
  );
};

export default SelectVendorModal;
