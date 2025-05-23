import { useEffect, useMemo } from 'react';
import { OModal } from '@/components/Globals/OModal';
import { Form, Input, InputNumber, Space, Select, DatePicker } from 'antd';
import { CloseOutlined, QuestionCircleTwoTone } from '@ant-design/icons';
import { OButton } from '@/components/Globals/OButton';
import { FormattedMessage, useModel } from '@umijs/max';
import { uuidv4 } from '@antv/xflow-core';

interface INewOrderbotModal {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

const filterOptions = [
  {
    value: 'address1',
    label: 'Address Line 1',
  },
  {
    value: 'address2',
    label: 'Address Line 2',
  },
  {
    value: 'address3',
    label: 'Address Line 3',
  },
  {
    value: 'addressVerified',
    label: 'Address Verified',
  },
  {
    value: 'assignedPickingStock',
    label: 'Assigned Picking stock',
  },
  {
    value: 'assignedUser',
    label: 'Assigned User',
  },
  {
    value: 'availableStockForMasterSKU',
    label: 'Available Stock For Master SKU',
  },
  {
    value: 'availableStockForOrder',
    label: 'Available Stock For Order',
  },
  {
    value: 'buyerEmail',
    label: 'Buyer Email',
  },
  {
    value: 'buyerId',
    label: 'Buyer ID',
  },
  {
    value: 'buyerName',
    label: 'Buyer Name',
  },
  {
    value: 'carrier',
    label: 'Carrier',
  },
  {
    value: 'city',
    label: 'City',
  },
  {
    value: 'country',
    label: 'Country',
  },
  {
    value: 'customField1',
    label: 'Custom Field1',
  },
  {
    value: 'customField2',
    label: 'Custom Field2',
  },
  {
    value: 'customField3',
    label: 'Custom Field3',
  },
  {
    value: 'datePaid',
    label: 'Date Paid',
  },
  {
    value: 'fbaSKU',
    label: 'FBA SKU',
  },
  {
    value: 'giftOrder',
    label: 'Gift Order',
  },
  {
    value: 'internalNotes',
    label: 'Internal Notes',
  },
  {
    value: 'itemName',
    label: 'Item Name',
  },
  {
    value: 'itemSKU',
    label: 'Item SKU',
  },
  {
    value: 'masterSKU',
    label: 'Master SKU',
  },
  {
    value: 'orderDate',
    label: 'Order Date',
  },
  {
    value: 'orderItemNotes',
    label: 'Order Item Notes',
  },
  {
    value: 'orderLabels',
    label: 'Order Labels',
  },
  {
    value: 'orderTotal',
    label: 'Order Total',
  },
  {
    value: 'package',
    label: 'Package',
  },
  {
    value: 'postalCode',
    label: 'Postal Code',
  },
  {
    value: 'postalZone',
    label: 'Postal Zone',
  },
  {
    value: 'recipientCompany',
    label: 'Recipient Company',
  },
  {
    value: 'recipientName',
    label: 'Recipient Name',
  },
  {
    value: 'recipientPhone',
    label: 'Recipient Phone',
  },
  {
    value: 'requestedService',
    label: 'Requested Service',
  },
  {
    value: 'state',
    label: 'State',
  },
  {
    value: 'totalQuantity',
    label: 'Total Quantity',
  },
  {
    value: 'totalWeight',
    label: 'Total Weight',
  },
  {
    value: 'warehouse',
    label: 'Warehouse',
  },
];

const operatorOptions = [
  {
    value: 'small',
    label: 'Is less than...',
  },
  {
    value: 'equal',
    label: 'Is equal to...',
  },
  {
    value: 'big',
    label: 'Is greater than...',
  },
];

const dateOperatorOptions = [
  {
    value: 'small',
    label: 'Is less than...',
  },
  {
    value: 'equal',
    label: 'Equals the current date',
  },
  {
    value: 'big',
    label: 'Is greater than...',
  },
];

const actionOptions = [
  {
    value: 'addLabel',
    label: 'Add a Label',
  },
  {
    value: 'addInternalNote',
    label: 'Add an internal note',
  },
  {
    value: 'addOrderItemtoOrder',
    label: 'Add Order Item to Order',
  },
  {
    value: 'addNoteToTheBuyer',
    label: 'Add note to the buyer',
  },
  {
    value: 'adjustOrderWeight',
    label: 'Add the order weight',
  },
  {
    value: 'allowShipperRelease',
    label: 'Allow shipper release',
  },
  {
    value: 'appendReturnLabel',
    label: 'Append return label to outbound label',
  },
  {
    value: 'applyBestRate',
    label: 'Apply Best Rate',
  },
  {
    value: 'applyCheapestRate',
    label: 'Apply Cheapest Rate',
  },
  {
    value: 'applySplitOrderByAvailableStock',
    label: 'Apply split order by available stock',
  },
  {
    value: 'applySplitOrderByProductLabel',
    label: 'Apply split order by product label',
  },
  {
    value: 'assignDomesticBackupWarehouse',
    label: 'Assign domestic backup warehouse',
  },
  {
    value: 'assignToUser',
    label: 'Assign to a user',
  },
  {
    value: 'billDutiesAndTaxes',
    label: 'Bill duties and taxes to payor of shipping charges',
  },
  {
    value: 'billShippingToThirdParty',
    label: 'Bill shipping to third party',
  },
  {
    value: 'breakDownBundles',
    label: 'Break down bundles to core components',
  },
  {
    value: 'doNotNotifyMarketPlace',
    label: 'Do not notify marketplace of shipment',
  },
  {
    value: 'doNotPrepayPostage',
    label: 'Do not prepay postage (Endicia)',
  },
  {
    value: 'holdTheOrderFor',
    label: 'Hold the order for ...',
  },
  {
    value: 'holdUntilShipByDate',
    label: 'Hold until ship by date',
  },
  {
    value: 'holdUntil',
    label: 'Hold until',
  },
  {
    value: 'insurePackage',
    label: 'Insure the Package',
  },
  {
    value: 'markOrderAsGift',
    label: 'Mark order as gift',
  },
  {
    value: 'markOrderAsShipped',
    label: 'Mark order as shipped',
  },
  {
    value: 'markShipmentAsNonMachinable',
    label: 'Mark shipment as non machinable',
  },
  {
    value: 'putShopifyAdditionalDetailInOrderField',
    label: 'Put Shopify additional detail in order field',
  },
  {
    value: 'putAllShopifyAdditionalDetailsInOrderField',
    label: 'Put All Shopify additional details in order field',
  },
  {
    value: 'replaceAddressField',
    label: 'Replace Address Field',
  },
  {
    value: 'requestConfirmation',
    label: 'Request Confirmation',
  },
  {
    value: 'setAmazonFBASKU',
    label: 'Set Amazon FBA SKU',
  },
  {
    value: 'setAmazonFulfillmentMethod',
    label: 'Set Amazon Fulfillment Method',
  },
  {
    value: 'setCarrierServicePackage',
    label: 'Set Carrier/Service/Package',
  },
  {
    value: 'setCustomField1',
    label: 'Set custom field 1',
  },
  {
    value: 'setCustomField12',
    label: 'Set custom field 2',
  },
  {
    value: 'setCustomField3',
    label: 'Set custom field 3',
  },
  {
    value: 'setCustomsContentType',
    label: 'Set customs content type',
  },
  {
    value: 'setCustomsDocumentOnOrder',
    label: 'Set customs document on order (international only)',
  },
  {
    value: 'setDeliverByDate',
    label: 'Set deliver by date',
  },
  {
    value: 'setDropshipVendor',
    label: 'Set dropship vendor...',
  },
  {
    value: 'setInsuredValue',
    label: 'Set Insured Value',
  },
  {
    value: 'setInternationalNonDelivery',
    label: 'Set international non-delivery',
  },
  {
    value: 'setMultichannelFulfillment',
    label: 'Set multichannel fulfillment',
  },
  {
    value: 'setOrdersGiftMessage',
    label: 'Set orders gift message',
  },
  {
    value: 'setPackageDimensions',
    label: 'Set package dimensions',
  },
  {
    value: 'setPaymentType',
    label: 'Set payment type',
  },
  {
    value: 'setProviderServicePackage',
    label: 'Set Provider/Service/Package',
  },
  {
    value: 'setTheDryIceWeight',
    label: 'Set the dry ice weight (UPS/FedEx)',
  },
  {
    value: 'setTheOrderAsContainingAlchol',
    label: 'Set the order as containing alcohol (FedEx)',
  },
  {
    value: 'setTheOrderAsContainingDryIce',
    label: 'Set the order as containing dry ice (UPS/FedEx)',
  },
  {
    value: 'setTheTotalOrderWeight',
    label: 'Set the total order weight',
  },
  {
    value: 'setWarehouse',
    label: 'Set Warehouse',
  },
  {
    value: 'showPostagePaidOnTheLabel',
    label: 'Show postage paid on the label',
  },
  {
    value: 'stopProcessingRulesForTheOrder',
    label: 'Stop processing rules for the order',
  },
  {
    value: 'useSpecificEmailTemplate',
    label: 'Use a specific email template',
  },
  {
    value: 'useSpecificPackingSlip',
    label: 'Use a specific packing slip',
  },
];

const NewOrderbotModal: React.FC<INewOrderbotModal> = ({ isOpen, onClose, onSave }) => {
  const [form] = Form.useForm();
  const { warehouseList } = useModel('warehouse');
  const { productList } = useModel('product');
  const { setOrderbotList, selectedOrderbot } = useModel('orderbots');

  const warehouseOptions = useMemo(
    () => warehouseList.map((warehouse) => ({ value: warehouse.id, label: warehouse.name })),
    [warehouseList],
  );

  const handleSave = () => {
    form.validateFields().then((values) => {
      console.log('values: ', values);
      setOrderbotList((prev) => [...prev, { id: uuidv4(), ...values, status: true }]);
      onSave();
    });
  };

  useEffect(() => {
    if (!!selectedOrderbot) {
      form.setFieldsValue(selectedOrderbot);
    } else {
      form.resetFields();
    }
  }, [selectedOrderbot, form]);

  return (
    <OModal
      forceRender
      title={
        !selectedOrderbot ? <FormattedMessage id="pages.settings.orderbots.neworderbot.title" /> : `Edit ${selectedOrderbot.name}`
      }
      helpLink=""
      width={1000}
      isOpen={isOpen}
      handleCancel={onClose}
      buttons={[
        {
          key: 'cancel',
          type: 'default',
          btnLabel: <FormattedMessage id="component.button.cancel" />,
          onClick: onClose,
        },
        {
          key: 'submit',
          type: 'primary',
          btnLabel: <FormattedMessage id="component.button.save" />,
          onClick: handleSave,
        },
      ]}
    >
      <>
        <Form layout="inline" form={form}>
          <Form.Item label={<FormattedMessage id="component.form.label.name" />} name="name">
            <Input style={{ width: 700 }} />
          </Form.Item>
          <Form.Item label={<FormattedMessage id="component.form.label.rank" />}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Form.Item name="rank" style={{ flex: 1 }}>
                <InputNumber />
              </Form.Item>
              <QuestionCircleTwoTone style={{ fontSize: 20 }} />
            </div>
          </Form.Item>

          <Form.List name="filters">
            {(fields, { add, remove }) => (
              <>
                <div
                  style={{
                    width: '100%',
                    marginTop: 50,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'end',
                  }}
                >
                  <div style={{ fontSize: 14 }}>
                    <b>Filter Orders By...</b>
                  </div>
                  <OButton btnText="Add Filter" onClick={() => add()} />
                </div>
                <hr style={{ width: '100%' }} />

                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <CloseOutlined style={{ color: 'blue' }} onClick={() => remove(name)} />
                    <Form.Item
                      noStyle
                      shouldUpdate={(prevValues, currentValues) => prevValues.filters[name] !== currentValues.filters[name]}
                    >
                      {({ setFieldValue }) => (
                        <Form.Item
                          {...restField}
                          name={[name, 'filter']}
                          rules={[{ required: true, message: 'Please select the filter' }]}
                        >
                          <Select
                            options={filterOptions}
                            style={{ width: 300 }}
                            onChange={() => setFieldValue(['filters', name, 'value'], null)}
                          />
                        </Form.Item>
                      )}
                    </Form.Item>
                    <Form.Item
                      noStyle
                      shouldUpdate={(prevValues, currentValues) => prevValues.filters[name] !== currentValues.filters[name]}
                    >
                      {({ getFieldValue }) => (
                        <Form.Item
                          {...restField}
                          name={[name, 'operator']}
                          rules={[{ required: true, message: 'Please select the options' }]}
                        >
                          {getFieldValue(['filters', name, 'filter']) === 'datePaid' ||
                          getFieldValue(['filters', name, 'filter']) === 'orderDate' ? (
                            <Select options={dateOperatorOptions} style={{ width: 200 }} />
                          ) : getFieldValue(['filters', name, 'filter']) === 'address1' ||
                            getFieldValue(['filters', name, 'filter']) === 'address2' ||
                            getFieldValue(['filters', name, 'filter']) === 'address3' ? (
                            <Select options={[{ value: 'isBlank', label: 'Is blank' }]} style={{ width: 200 }} />
                          ) : (
                            <Select options={operatorOptions} style={{ width: 200 }} />
                          )}
                        </Form.Item>
                      )}
                    </Form.Item>
                    <Form.Item
                      noStyle
                      shouldUpdate={(prevValues, currentValues) => prevValues.filters[name] !== currentValues.filters[name]}
                    >
                      {({ getFieldValue }) => (
                        <Form.Item
                          {...restField}
                          name={[name, 'value']}
                          rules={[{ required: true, message: 'Please input value' }]}
                        >
                          {getFieldValue(['filters', name, 'filter']) === 'warehouse' ? (
                            <Select options={warehouseOptions} style={{ width: 200 }} />
                          ) : getFieldValue(['filters', name, 'filter']) === 'datePaid' ||
                            getFieldValue(['filters', name, 'filter']) === 'orderDate' ? (
                            getFieldValue(['filters', name, 'operator']) === 'equal' ? (
                              <></>
                            ) : (
                              <DatePicker />
                            )
                          ) : getFieldValue(['filters', name, 'filter']) === 'address1' ||
                            getFieldValue(['filters', name, 'filter']) === 'address2' ||
                            getFieldValue(['filters', name, 'filter']) === 'address3' ? (
                            <></>
                          ) : (
                            <InputNumber />
                          )}
                        </Form.Item>
                      )}
                    </Form.Item>
                  </Space>
                ))}
              </>
            )}
          </Form.List>

          <Form.List name="actions">
            {(fields, { add, remove }) => (
              <>
                <div
                  style={{
                    width: '100%',
                    marginTop: 50,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'end',
                  }}
                >
                  <div style={{ fontSize: 14 }}>
                    <b>Apply Automatic Actions:</b>
                  </div>
                  <OButton btnText="Add Action" onClick={() => add()} />
                </div>
                <hr style={{ width: '100%' }} />

                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <CloseOutlined style={{ color: 'blue' }} onClick={() => remove(name)} />
                    <Form.Item
                      noStyle
                      shouldUpdate={(prevValues, currentValues) => prevValues.actions[name] !== currentValues.actions[name]}
                    >
                      {({ setFieldValue }) => (
                        <Form.Item
                          {...restField}
                          name={[name, 'action']}
                          rules={[{ required: true, message: 'Please select the Action' }]}
                        >
                          <Select
                            options={actionOptions}
                            style={{ width: 300 }}
                            onChange={() => setFieldValue(['actions', name, 'value'], null)}
                          />
                        </Form.Item>
                      )}
                    </Form.Item>
                    <Form.Item
                      noStyle
                      shouldUpdate={(prevValues, currentValues) => prevValues.actions[name] !== currentValues.actions[name]}
                    >
                      {({ getFieldValue }) => (
                        <Form.Item {...restField} name={[name, 'operator']}>
                          {getFieldValue(['actions', name, 'action']) === 'replaceAddressField' ? (
                            <Select
                              options={[
                                { value: 'address1', label: 'Address Line 1' },
                                { value: 'address2', label: 'Address Line 2' },
                                { value: 'address3', label: 'Address Line 3' },
                              ]}
                              style={{ width: 200 }}
                            />
                          ) : (
                            <></>
                          )}
                        </Form.Item>
                      )}
                    </Form.Item>
                    <Form.Item
                      noStyle
                      shouldUpdate={(prevValues, currentValues) => prevValues.actions[name] !== currentValues.actions[name]}
                    >
                      {({ getFieldValue }) => (
                        <Form.Item
                          {...restField}
                          name={[name, 'value']}
                          rules={[{ required: true, message: 'Please input value' }]}
                        >
                          {getFieldValue(['actions', name, 'action']) === 'insurePackage' ? (
                            <Select
                              options={[{ value: 'carrierInsurance', label: 'Carrier Insurance' }]}
                              style={{ width: 200 }}
                            />
                          ) : getFieldValue(['actions', name, 'action']) === 'setProviderServicePackage' ? (
                            <Select
                              options={[{ value: 'carrierInsurance', label: 'Carrier Insurance' }]}
                              style={{ width: 200 }}
                            />
                          ) : getFieldValue(['actions', name, 'action']) === 'setWarehouse' ? (
                            <Select options={warehouseOptions} style={{ width: 200 }} />
                          ) : getFieldValue(['actions', name, 'action']) === 'applySplitOrderByAvailableStock' ? (
                            <Select
                              options={[{ value: 'sku', label: 'Split by item then split by sku' }]}
                              style={{ width: 400 }}
                            />
                          ) : getFieldValue(['actions', name, 'action']) === 'setDropshipVendor' ? (
                            <Select options={[{ value: 'cellhelmet', label: 'Cellhelmet' }]} style={{ width: 400 }} />
                          ) : getFieldValue(['actions', name, 'action']) === 'applySplitOrderByProductLabel' ? (
                            <Select
                              options={productList.map((item) => ({ value: item.id, label: item.name }))}
                              style={{ width: 400 }}
                            />
                          ) : getFieldValue(['actions', name, 'action']) === 'holdTheOrderFor' ? (
                            <>
                              <InputNumber /> days and <InputNumber /> hours
                            </>
                          ) : getFieldValue(['actions', name, 'action']) === 'markOrderAsShipped' ? (
                            <>
                              <Input.Group compact>
                                <Form.Item label="Tracking Number">
                                  <Input />
                                </Form.Item>
                                <Form.Item label="Carrier">
                                  <Select options={[{ value: 'other', label: 'Other' }]} style={{ width: 200 }} />
                                </Form.Item>
                                <Form.Item label="Carrier Fee">
                                  <InputNumber />
                                </Form.Item>
                                <Form.Item label="Notify Customer">
                                  <Select
                                    options={[
                                      { value: true, label: 'Yes' },
                                      { value: false, label: 'No' },
                                    ]}
                                    style={{ width: 50 }}
                                  />
                                </Form.Item>
                                <Form.Item label="Update Channel">
                                  <Select
                                    options={[
                                      { value: true, label: 'Yes' },
                                      { value: false, label: 'No' },
                                    ]}
                                    style={{ width: 50 }}
                                  />
                                </Form.Item>
                                <Form.Item label="Ship Date">
                                  <Select
                                    options={[
                                      { value: 'today', label: 'Today' },
                                      { value: 'a day ago', label: '1 Day ago' },
                                      { value: 'a week ago', label: '1 Week ago' },
                                      { value: 'a month ago', label: '1 Month ago' },
                                    ]}
                                    style={{ width: 200 }}
                                  />
                                </Form.Item>
                              </Input.Group>
                            </>
                          ) : getFieldValue(['actions', name, 'action']) === 'holdUntilShipByDate' ||
                            getFieldValue(['actions', name, 'action']) === 'setDeliverByDate' ? (
                            <>
                              <DatePicker />
                            </>
                          ) : (
                            <Input />
                          )}
                          {/* <Select options={warehouseOptions} style={{ width: 200 }} /> */}
                        </Form.Item>
                      )}
                    </Form.Item>
                  </Space>
                ))}
              </>
            )}
          </Form.List>
        </Form>
      </>
    </OModal>
  );
};

export default NewOrderbotModal;
