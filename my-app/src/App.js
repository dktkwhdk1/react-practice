import './styles.css';
import { useState } from 'react';

const cache = {
  name: '김코딩',
  age: 20,
};

function Modal({ ok, setModal, setName, setAge }) {
  return (
    <div className="modal">
      <form>
        이름 <br />
        <input type="name" onBlur={(e) => setName(e.target.value)}></input>
        <br />
        나이 <br />
        <input type="age" onBlur={(e) => setAge(e.target.value)}></input>
        <div>
          <button className="btn" onClick={() => ok()}>
            ok
          </button>
          <button
            className="btn"
            onClick={() => {
              setModal(false);
              setAge(cache.age);
              setName(cache.name);
            }}
          >
            cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default function App() {
  const [name, setName] = useState(cache.name);
  const [age, setAge] = useState(cache.age);
  const [modal, setModal] = useState(false);

  const ok = () => {
    cache.name = name;
    cache.age = age;
    setModal(false);
  };

  return (
    <div className="App">
      <div>이름 : {name}</div>
      <div>나이 : {age}</div>
      <button className="btn" onClick={() => setModal(true)}>
        모달 열기
      </button>
      {modal ? (
        <Modal ok={ok} setModal={setModal} setName={setName} setAge={setAge} />
      ) : (
        ''
      )}
    </div>
  );
}
