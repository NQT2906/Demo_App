/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { tableColumnTextFilterConfig } from "./tableUtils";

const TableAnnotation = ({
  location = "",
  title = "",
}: {
  location: string;
  title: string;
}) => {
  const [data, setData] = useState<any[]>([]);

  const columns = [
    {
      title: "Index",
      dataIndex: "index",
    },
    {
      title: "Object",
      dataIndex: "object",
      filters: [
        {
          text: "Figure",
          value: "Figure",
        },
        {
          text: "Caption",
          value: "Caption",
        },
        {
          text: "Table",
          value: "Table",
        },
      ],
      filterSearch: true,
      onFilter: (value: any, record: any) => {
        return record.object === value;
      },
    },
    {
      title: "Annotation",
      dataIndex: "annotation",
    },
    {
      title: "Caption",
      dataIndex: "caption",
      render: (text: string) => text,
      ...tableColumnTextFilterConfig<{ title: string; dataIndex: string }>(),
      onFilter: (value: any, record: any) => {
        return record.caption.toLowerCase().includes(value.toLowerCase());
      },
      onreset: (value: any, record: any) => {
        console.log(value);
        console.log(record.caption);
        return record.caption.includes("");
      },
    },
    {
      title: "Score",
      dataIndex: "score",
      sorter: (a: { score: number }, b: { score: number }) => a.score - b.score,
      // sortDirections: ["ascend", "descend"],
      // showSorterTooltip: true,
      // sortOrder: false,
    },
  ];

  useEffect(() => {
    const locationTemp = JSON.parse(location)[title];
    let dataTemp: any[] = [];
    if (locationTemp) {
      for (let i = 0; i < locationTemp.length; i++) {
        dataTemp = [
          ...dataTemp,
          {
            index: i,
            object:
              locationTemp[i][0].charAt(0).toUpperCase() +
              locationTemp[i][0].slice(1, locationTemp[i][0].length + 1),
            annotation: "(" + locationTemp[i].slice(1, 5).join(", ") + ")",
            caption:
              locationTemp[i].length > 6 ? locationTemp[i][6].trim() : "",
            score: locationTemp[i][5],
          },
        ];
      }
    }
    setData(dataTemp);
  }, []);

  function onChange(pagination: any, filters: any, sorter: any, extra: any) {
    console.log("params", pagination, filters, sorter, extra);
  }

  return (
    <>
      {data ? (
        <Table
          rowKey={"index"}
          columns={columns}
          dataSource={data}
          pagination={false}
          bordered
        />
      ) : // <Table columns={columns} dataSource={data} onChange={onChange} />
      null}
    </>
  );
};

export default TableAnnotation;
