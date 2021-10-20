import { Select, Spin,Button } from 'antd';
import debounce from 'lodash/debounce';
import React from 'react';
import {SearchOutlined} from '@ant-design/icons'

function DebounceSelect({ fetchOptions, debounceTimeout = 500, ...props }) {
  const [fetching, setFetching] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const fetchRef = React.useRef(0);
  const debounceFetcher = React.useMemo(() => {
    const loadOptions = (value) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);
      fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }

        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);
  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
      options={options}
    />
  );
} // Usage of DebounceSelect

async function fetchUserList(username) {
  console.log('fetching user', username);
  return fetch('https://randomuser.me/api/?results=5')
    .then((response) => response.json())
    .then((body) =>
      body.results.map((user) => ({
        label: `${user.name.first} ${user.name.last}`,
        value: user.login.username,
      })),
    );
}

const DebounceSearch = () => {
  const [value, setValue] = React.useState([]);
  return (
      <div className = "nav__search">
        <DebounceSelect
            mode="multiple"
            value={value}
            placeholder="Tìm kiếm"
            fetchOptions={fetchUserList}
            onChange={(newValue) => {
                setValue(newValue);
            }}
            className = "nav__search__select"
        />
        <Button type = "link" className = "nav__search__button" onClick = {()=>console.log(`searching value = ${value}`)}>
        <SearchOutlined/>
        </Button>
      </div>
    
  );
};

export default DebounceSearch;
