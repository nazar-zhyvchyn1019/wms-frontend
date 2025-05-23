import { useRef, useState, useMemo } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Dropdown, Row, Col } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { Column } from '@ant-design/charts';

interface IWarehouseTotalGraph {
  minLevel: number;
  stockValue: number;
}

const WarehouseTotalGraph: React.FC<IWarehouseTotalGraph> = ({ minLevel, stockValue }) => {
  const [warehouseTotalChartInstance, setWarehouseTotalChartInstance] = useState(null);
  const warehouseTotalChartRef = useRef(null);

  const warehouseTotalData = useMemo(
    () => [
      {
        type: 'Above Min',
        stock: 'Stock',
        value: minLevel,
      },
      {
        type: 'Min Level',
        stock: 'Stock',
        value: stockValue,
      },
    ],
    [minLevel, stockValue],
  );

  const handleTrendingChartPrint = useReactToPrint({
    content: () => warehouseTotalChartRef.current,
  });

  return (
    <>
      <Row justify="end">
        <Col>
          <Dropdown.Button
            menu={{
              items: [
                {
                  key: 'print_chart',
                  label: 'Print Chart',
                  disabled: !warehouseTotalChartInstance,
                  onClick: () => handleTrendingChartPrint(),
                },
                {
                  type: 'divider',
                },
                {
                  key: 'download_png',
                  label: 'Download PNG image',
                  disabled: !warehouseTotalChartInstance,
                  onClick: () => warehouseTotalChartInstance.downloadImage('trending-inventory', 'image/png'),
                },
                {
                  key: 'download_jpeg',
                  label: 'Download JPEG image',
                  disabled: !warehouseTotalChartInstance,
                  onClick: () => warehouseTotalChartInstance.downloadImage('trending-inventory', 'image/jpeg'),
                },
                {
                  key: 'download_pdf',
                  label: 'Download PDF document',
                  disabled: true,
                },
                {
                  key: 'download_svg',
                  label: 'Download SVG Vector image',
                  disabled: true,
                },
              ],
            }}
            placement="bottomRight"
            icon={<MenuOutlined />}
          />
        </Col>
      </Row>
      <div ref={warehouseTotalChartRef} style={{ height: 180 }}>
        <Column
          data={warehouseTotalData}
          xField="stock"
          yField="value"
          seriesField="type"
          yAxis={{
            tickCount: 4,
            title: {
              text: 'Units',
              position: 'center',
            },
          }}
          legend={{
            position: 'bottom',
          }}
          label={{
            // 可手动配置 label 数据标签位置
            position: 'middle',
            // 'top', 'bottom', 'middle',
            // 配置样式
            style: {
              fill: '#000000',
              opacity: 0.6,
            },
          }}
          onReady={(chartInstance) => setWarehouseTotalChartInstance(chartInstance)}
        />
      </div>
    </>
  );
};

export default WarehouseTotalGraph;
