/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Table } from "antd";

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
    },
    {
      title: "Annotation",
      dataIndex: "annotation",
    },
    {
      title: "Caption",
      dataIndex: "caption",
    },
    {
      title: "Score",
      dataIndex: "score",
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
            object: locationTemp[i][0],
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
      ) : null}
    </>
  );
};

export default TableAnnotation;
