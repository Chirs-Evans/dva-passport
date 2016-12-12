import React, { Component, PropTypes } from 'react';
import { Form, Row, Col, Input, Button, Icon } from 'antd';

const FormItem = Form.Item;

const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';
const plainOptions = ['等待中', '运行中', '完成', '失败', '未知'];

const UserSearch = ({
  keyword,
  expand,
  onExpand,
  onSearch,
  onReset,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    resetFields,
  },
}) => {
  function handleSubmit(e) {
    e.preventDefault();
    validateFields((errors) => {
      if (!!errors) {
        return;
      }
      onSearch(getFieldsValue());
    });
  }

  function handleReset() {
    resetFields();
    onReset();
  }

  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  };

  const children = [
    <Row key={1}>
      <Col span={8}>
        <FormItem {...formItemLayout} label="关键字">
          {getFieldDecorator('keyword', {
            initialValue: keyword || '',
          })(
            <Input placeholder="请输入关键字查询" maxLength={20} />
          )}
        </FormItem>
      </Col>
    </Row>
  ];

  const showCount = expand ? children.length : 1;

  return (
    <Form
      horizontal
      className="ant-advanced-search-form"
      onSubmit={handleSubmit}
    >
      {children.slice(0, showCount)}
      <Row>
        <Col span={8} style={{ textAlign: '' }}>
          <Col span={19} offset={5}>
            <Button type="primary" htmlType="submit">搜索</Button>
            <Button style={{ marginLeft: 8 }} onClick={handleReset}>
              清空
            </Button>
            {/*<a style={{ marginLeft: 8, fontSize: 12 }} onClick={onExpand}>
              高级搜索 <Icon type={expand ? 'up' : 'down'} />
            </a>*/}
          </Col>
        </Col>
      </Row>
    </Form>
  );
}

UserSearch.propTypes = {
  keyword: PropTypes.string,
  expand: PropTypes.bool,
  onExpand: PropTypes.func,
  onSearch: PropTypes.func,
  onReset: PropTypes.func,
}

export default Form.create()(UserSearch);