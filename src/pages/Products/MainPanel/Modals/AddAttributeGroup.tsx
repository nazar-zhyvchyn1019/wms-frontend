import { OButton } from '@/components/Globals/OButton';
import { OModal } from '@/components/Globals/OModal';
import { CloseOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { Collapse, Input, List, Space } from 'antd';
import { useState } from 'react';
import AddAttributeModal from './AddAttribute';
const { Panel } = Collapse;

interface IAddAttributeGroupModal {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  attributeGroups: any[];
  setAttributeGroups: (groups: any[]) => void;
}

const AddAttributeGroupModal: React.FC<IAddAttributeGroupModal> = ({ isOpen, onClose, onSave }) => {
  const [showModal, setShowModal] = useState(false);
  const [groupName, setGroupName] = useState<string>('');
  const [selectedGroupId, setSelectedGroupId] = useState<number>(null);
  const [selectedPanel, setSelectedPanel] = useState(null);
  const { attributeGroups, setAttributeGroups, createAttributeGroup, createAttribute } = useModel('attributeGroups');

  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
  };

  const handleAddGroup = () => {
    createAttributeGroup(groupName).then(() => {
      setGroupName('');
    });
  };

  const handleRemoveGroup = (event, name) => {
    event.stopPropagation();
    setAttributeGroups(attributeGroups.filter((_item) => _item.name !== name));
  };

  const handleAddAttribute = (event, key) => {
    event.stopPropagation();
    setShowModal(true);
    setSelectedPanel(key);
    setSelectedGroupId(key);
  };

  return (
    <OModal
      title="New Attribute Groupings"
      helpLink="/help/products/create/productvariations"
      width={600}
      centered
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
          btnLabel: 'Save',
          onClick: onSave,
        },
      ]}
    >
      <>
        <div style={{ padding: '1rem' }}>
          <h2>
            Enter your attribute group names to begin adding attributes for use in product creation. (blank attributes will not be
            saved)
          </h2>
          <Input
            placeholder="Enter a valid attribute group name"
            addonAfter={<OButton btnText="Add" onClick={handleAddGroup} style={{ height: 30 }} />}
            value={groupName}
            onChange={handleGroupNameChange}
            required
          />
          <Collapse
            onChange={(key) => setSelectedPanel(key)}
            expandIconPosition="end"
            expandIcon={({ isActive }) => (isActive ? <MinusOutlined /> : <PlusOutlined />)}
            style={{ marginTop: '5px', overflowY: 'scroll', overflowX: 'hidden', height: '200px' }}
            activeKey={selectedPanel}
            accordion
            ghost
          >
            {attributeGroups.map((attributeGroup) => (
              <Panel
                header={<h3>{attributeGroup.name}</h3>}
                key={attributeGroup.id}
                extra={
                  <Space size={50}>
                    <OButton btnText="" icon={<CloseOutlined />} onClick={(e) => handleRemoveGroup(e, attributeGroup.name)} />
                    <OButton btnText="" icon={<PlusOutlined />} onClick={(e) => handleAddAttribute(e, attributeGroup.id)} />
                  </Space>
                }
                className="custom"
              >
                <List
                  bordered={false}
                  dataSource={attributeGroup.items}
                  renderItem={(item) => (
                    <List.Item style={{ marginLeft: '30px' }}>
                      <h3>{item.name}</h3>
                    </List.Item>
                  )}
                />
              </Panel>
            ))}
          </Collapse>
        </div>

        <AddAttributeModal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
          }}
          onSave={(value) => {
            createAttribute(value, selectedGroupId).then(() => {
              setShowModal(false);
            });
          }}
        />
      </>
    </OModal>
  );
};

export default AddAttributeGroupModal;
