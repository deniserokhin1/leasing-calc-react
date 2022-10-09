// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import ProgressBar from './components/ProgressBar/ProgressBar';
import Slider from './components/Slider/Slider';
import Prepay from './components/Prepay';
import InputPrepay from './components/InputPrepay/InputPrepay';
import Input from './components/Input/Input';
import InputTime from './components/InputTime/InputTime';

function App() {
  const valuePriceCar = { value: '3300000', key: Math.random() };
  const valuePrepay = { value: '13', key: Math.random() };
  const valueTime = { value: '60', key: Math.random() };
  const [valueSliderPriceCar, setValueSliderPriceCar] = useState({
    ...valuePriceCar,
  });
  const [valueInputPrepay, setValueInputPrepay] = useState({ ...valuePrepay });
  const [valueInputTime, setValueInputTime] = useState({ ...valueTime });
  const minValuePricaCar = '1000000';
  const maxValuePricaCar = '6000000';
  const minValuePrepay = '10';
  const maxValuePrepay = '60';
  const minValueTime = '10';
  const maxValueTime = '60';

  const setCorrectValue = (valueInput, minValue, maxValue, setValue, value) => {
    const targetValue = valueInput.split(' ').join('');
    if (Number(targetValue) < Number(minValue)) {
      setValue({ ...value, value: minValue });
    } else if (Number(targetValue) > Number(maxValue)) {
      setValue({ ...value, value: maxValue });
    } else {
      setValue({ ...value, value: targetValue });
    }
  };

  const arrMinValues = [
    Number(minValuePricaCar),
    Number(minValuePrepay),
    Number(minValueTime),
  ];

  const arrValues = [
    Number(valueSliderPriceCar.value),
    Number(valueInputPrepay.value),
    Number(valueInputTime.value),
  ];

  const [isFormValid, setIsFormValid] = useState(true);

  const checkInputValues = () => {
    let checkValidate = 0;
    for (let i = 0; i < arrMinValues.length; i++) {
      const minValue = arrMinValues[i];
      if (Number(minValue) > Number(arrValues[i])) {
        checkValidate += 1;
      }
    }
    if (checkValidate) {
      setIsFormValid(!isFormValid);
    }
  };

  const checkValidForm = (arrInputs) => {
    if (isFormValid) {
      const setResultValue = new Set();
      const arrResulValue = [];
      for (let i = 0; i < arrInputs.length - 1; i++) {
        const input = arrInputs[i];
        setResultValue.add(input.value.split('%').join('').split(' ').join(''));
      }
      setResultValue.forEach((value) => {
        arrResulValue.push(value);
      });
      // console.log(arrResulValue);
    } else {
      setIsFormValid(!isFormValid);
      // console.log('Косяк');
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        checkValidForm(e.target.elements);
      }}
    >
      <div className="container">
        <h1 className="title">Рассчитайте стоимость автомобиля в лизинг</h1>
        <div className="content">
          <div className="column-input">
            <div className="content__input price-car">
              <p className="text">Стоимость автомобиля</p>
              <div className="block-input">
                <Input
                  minValue={minValuePricaCar}
                  maxValue={maxValuePricaCar}
                  value={valueSliderPriceCar}
                  setValue={setValueSliderPriceCar}
                  setCorrectValue={setCorrectValue}
                />
                <span className="units">₽</span>
              </div>
              <ProgressBar
                value={valueSliderPriceCar}
                maxValue={maxValuePricaCar}
              />
              <Slider
                typeInput={'priceCar'}
                value={valueSliderPriceCar}
                maxValue={maxValuePricaCar}
                setValue={setValueSliderPriceCar}
              />
            </div>
            <div className="content__input price-car">
              <p className="text">Первоначальный взнос</p>
              <div className="block-input">
                <InputPrepay
                  valuePriceCar={valueSliderPriceCar}
                  valuePrepay={valueInputPrepay}
                  setValue={setValueSliderPriceCar}
                />
                <Prepay
                  minValue={minValuePrepay}
                  maxValue={maxValuePrepay}
                  value={valueInputPrepay}
                  setValue={setValueInputPrepay}
                  setCorrectValue={setCorrectValue}
                />
              </div>
              <ProgressBar value={valueInputPrepay} maxValue={maxValuePrepay} />
              <Slider
                typeInput={'prepay'}
                value={valueInputPrepay}
                maxValue={maxValuePrepay}
                setValue={setValueInputPrepay}
              />
            </div>
            <div className="content__input price-car">
              <p className="text">Срок лизинга</p>
              <div className="block-input">
                <InputTime
                  minValue={minValueTime}
                  maxValue={maxValueTime}
                  value={valueInputTime}
                  setValue={setValueInputTime}
                  setCorrectValue={setCorrectValue}
                />
                <span className="units">мес.</span>
              </div>
              <ProgressBar value={valueInputTime} maxValue={maxValueTime} />
              <Slider
                typeInput={'time'}
                value={valueInputTime}
                maxValue={maxValueTime}
                setValue={setValueInputTime}
              />
            </div>
          </div>
          <div className="column-info">
            <div className="block-info">
              <p className="info__text">Сумма договора лизинга</p>
              <div className="info__money">
                44673133&nbsp;<span className="info-units">₽</span>
              </div>
            </div>
            <div className="block-info">
              <p className="info__text">Ежемесячный платеж от</p>
              <div className="info__money">
                4467313&nbsp;<span className="info-units">₽</span>
              </div>
            </div>
            <button
              onMouseDown={() => {
                checkInputValues();
              }}
              type="submit"
              className="btn"
            >
              Оставить заявку
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default App;
