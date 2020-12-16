import React, { useEffect } from 'react';
import './styles.css';
import { useState, useRef } from 'react';

function MyInput({ value, handleChange }) {
  const inputEl = useRef(null);
  const [isEditMode, setEditMode] = useState(false);
  const [newValue, setNewValue] = useState(value);

  useEffect(() => {
    if (isEditMode) {
      inputEl.current.focus();
    }
  }, [isEditMode]);

  useEffect(() => {
    setNewValue(value);
  }, [value]);

  const handleClick = () => {
    setEditMode(!isEditMode);
  };

  const handleBlur = () => {
    setEditMode(false);
    handleChange(newValue);
  };

  const handleInputChange = (e) => {
    setNewValue(e.target.value);
  };

  return (
    <div className="myinput">
      {isEditMode ? (
        <input
          type="text"
          value={newValue}
          ref={inputEl}
          onBlur={handleBlur}
          onChange={handleInputChange}
        />
      ) : (
        <span onClick={handleClick}>{newValue}</span>
      )}
    </div>
  );
}

function Modal({ isShow, children, handleOk, handleClose }) {
  return (
    <div className="modal" style={{ display: isShow ? 'block' : 'none' }}>
      <div>{children}</div>

      <button onClick={handleOk}>ok</button>
      <button onClick={handleClose}>x</button>
    </div>
  );
}

const cache = {
  name: '김코딩',
  age: 20,
};

export default function App() {
  const [name, setName] = useState(cache.name);
  const [age, setAge] = useState(cache.age);
  const [isModalShow, setIsModalShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setName(cache.name);
    setAge(cache.age);
    setIsModalShow(false);
  };

  const handleOk = () => {
    setIsLoading(true);
    // ajax call
    setTimeout(() => {
      console.log('저장중');
      cache.name = name;
      cache.age = age;

      setIsModalShow(false);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div>
      <Modal isShow={isModalShow} handleOk={handleOk} handleClose={handleClose}>
        <div>
          이름
          <MyInput
            value={name}
            handleChange={(newValue) => setName(newValue)}
          />
        </div>
        <div>
          나이
          <MyInput value={age} handleChange={(newValue) => setAge(newValue)} />
        </div>
        {isLoading ? '저장중...' : ''}
      </Modal>

      <div>이름 {name}</div>
      <div>나이 {age}</div>

      <button onClick={() => setIsModalShow(true)}>모달열기</button>
    </div>
  );
}
