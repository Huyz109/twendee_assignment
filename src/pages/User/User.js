import React, { useEffect, useState } from 'react';
import { Avatar, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, loadStatus, resetLoadDataStatus } from '../../redux/userSlice';

const columns = [
  {
    title: 'Thumbnail Icon',
    dataIndex: 'picture',
    key: 'picture',
    render: (picture) => <Avatar src={<img src={picture.thumbnail} alt="avatar"/>} size={'large'} />,
    width: '20%',
    align: 'center'
  },
  {
    title: 'Full Name',
    dataIndex: 'name',
    key: 'name',
    render: (name) => `${name.title} ${name.first} ${name.last}`,
    width: '20%',
  },
  {
    title: 'Username',
    dataIndex: 'login',
    key: 'username',
    render: (login) => `${login.username}`,
  },
];

const UserTable = () => {
  const [data, setData] = useState();
  const [tableParams, setTableParams] = useState({
    current: 1,
    pageSize: 10,
  });

  const dispatch = useDispatch();
  const dataState = useSelector((state) => state.user);

  useEffect(() => {
    const queryParams = {
        page: tableParams.current,
        results: tableParams.pageSize
    }
    dispatch(getUser(queryParams));
  }, [tableParams]);

  useEffect(() => {
    if (dataState.loadDataStatus === loadStatus.Success) {
        const rawData = dataState.data;
        setData(rawData);
        resetLoadDataStatus();
    };
  }, [dataState.loadDataStatus]);

  const handleTableChange = (pagination, filters) => {
    setTableParams({
      current: pagination.current,
      pageSize: pagination.pageSize,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams?.pageSize) {
      setData([]);
    }
  };

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{
        defaultPageSize: 10, 
        showSizeChanger: true, 
        pageSizeOptions: ['10', '20', '50', '100'],
        total: 200,
        ...tableParams
      }}
      loading={dataState.loadDataStatus === loadStatus.Loading}
      onChange={handleTableChange}
    />
  );
};

export default UserTable;