import { OButton } from '@/components/Globals/OButton';
import { OModal } from '@/components/Globals/OModal';
import { useModel } from '@umijs/max';
import { Select, Space } from 'antd';
import React, { useState } from 'react';
import POExportSettingsModal from './POExportSettings';

interface IExportPOModal {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  handleConfigureSettings: (value: any) => void;
}

const ExportPOModal: React.FC<IExportPOModal> = ({ isOpen, onClose, onSave }) => {
  const [showModal, setShowModal] = useState(false);
  const { poExportSettings } = useModel('poExportSettings');

  return (
    <OModal
      title="Export Selected Purchase Orders"
      helpLink=""
      width={500}
      isOpen={isOpen}
      handleCancel={onClose}
      buttons={[
        {
          key: 'back',
          type: 'default',
          btnLabel: 'Close',
          onClick: onClose,
        },
        {
          key: 'submit',
          type: 'primary',
          btnLabel: 'Export Purchase Orders',
          onClick: onSave,
        },
      ]}
    >
      <>
        <p>Skubana allows you to export any of the available P.O information in CSV, Excel, or plain text format.</p>
        <p>
          {`To export the selected purchase orders, select one of your pre-configured export settings and click the 'Export Purchase Orders' button. If you haven't created any export settings yet, click on the 'Configure Settings' button to set up which order data to export, the arrangement of columns and the file formt.`}
        </p>
        <div style={{ textAlign: 'right', marginTop: 40 }}>
          <Space size={5}>
            <span>Export Settings: </span>
            <Select
              placeholder="Select..."
              size="small"
              style={{ width: 200, textAlign: 'left' }}
              options={poExportSettings.map((_item) => ({
                value: _item.id,
                label: _item.settingName,
              }))}
            />
            <OButton btnText="Configure Settings" onClick={() => setShowModal(true)} />
          </Space>
        </div>

        <POExportSettingsModal isOpen={showModal} onClose={() => setShowModal(false)} />
      </>
    </OModal>
  );
};

export default ExportPOModal;
