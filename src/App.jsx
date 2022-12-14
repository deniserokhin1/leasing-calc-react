/* eslint-disable camelcase */
// eslint-disable-next-line no-unused-vars
import React, { useMemo, useRef, useState } from 'react';
import ProgressBar from './components/ProgressBar/ProgressBar';
import Slider from './components/Slider/Slider';
import Prepay from './components/Prepay/Prepay';
import InputPrepay from './components/InputPrepay/InputPrepay';
import Input from './components/Input/Input';
import InputTime from './components/InputTime/InputTime';
import { Context } from './context';
import MonthPay from './components/MonthPay/MonthPay';
import Sum from './components/Sum/Sum';
import useFetching from './hooks/useFetching';
import Button from './components/Button/Button';
import PopupSuccess from './components/PopupSuccess/PopupSuccess';
import PopupError from './components/PopupError/PopupError';

const minValuePricaCar = '1000000';
const maxValuePricaCar = '6000000';
const minValuePrepay = '10';
const maxValuePrepay = '60';
const minValueTime = '10';
const maxValueTime = '60';

const data = {
  car_coast: '',
  initail_payment: '',
  initail_payment_percent: '',
  lease_term: '',
  total_sum: '',
  monthly_payment_from: '',
};

function App() {
  const valuePriceCar = { value: '3300000', key: Math.random() };
  const valuePrepay = { value: '13', key: Math.random() };
  const valueTime = { value: '60', key: Math.random() };

  const [valueSliderPriceCar, setValueSliderPriceCar] = useState({
    ...valuePriceCar,
  });
  const [valueInputPrepay, setValueInputPrepay] = useState({ ...valuePrepay });
  const [valueInputTime, setValueInputTime] = useState({ ...valueTime });
  const [isClickPrepay, setIsClickPrepay] = useState(false);

  const calcMonthPay = () => {
    let monthPay = null;
    if (!valueInputTime.value) {
      monthPay = 0;
      return monthPay;
    }
    monthPay = Math.round(
      (valueSliderPriceCar.value -
        (valueSliderPriceCar.value * valueInputPrepay.value) / 100) *
        ((0.035 * Math.pow(1 + 0.035, valueInputTime.value)) /
          (Math.pow(1 + 0.035, valueInputTime.value) - 1))
    );
    return monthPay;
  };

  const [monthPay, setMonthPay] = useState(calcMonthPay());

  useMemo(() => {
    setMonthPay(calcMonthPay());
  }, [valueSliderPriceCar.value, valueInputPrepay.value, valueInputTime.value]);

  const arrMinValues = [minValuePricaCar, minValuePrepay, minValueTime];

  const arrValues = [
    valueSliderPriceCar.value,
    valueInputPrepay.value,
    valueInputTime.value,
  ];

  const [isFormValid, setIsFormValid] = useState(true);
  const [isValue, setIsValue] = useState(true);

  // eslint-disable-next-line no-unused-vars
  const [request, isLodaing, isSuccess, setIsSuccess] = useFetching(
    async () => {
      await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    }
  );

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

  const checkInputsValues = () => {
    for (let i = 0; i < arrMinValues.length; i++) {
      const minValue = arrMinValues[i];
      if (Number(minValue) > Number(arrValues[i])) {
        setIsFormValid(false);
      }
    }
  };

  const sendDataForm = (arrInputs) => {
    if (isFormValid) {
      const arrResultValues = [];
      const keysData = Object.keys(data);
      for (let i = 0; i < arrInputs.length - 1; i++) {
        const input = arrInputs[i];
        const inputValue = input.value.split('%').join('').split(' ').join('');
        if (arrResultValues.indexOf(inputValue) === -1) {
          arrResultValues.push(inputValue);
        }
      }
      for (let i = 0; i < keysData.length; i++) {
        const key = keysData[i];
        data[key] = arrResultValues[i];
      }
      request();
    }
  };

  const [heigthScreen, setHeigthScreen] = useState('');
  const [widthScreen, setWidthScreen] = useState('');

  window.onmousedown = (e) => {
    setHeigthScreen(e.srcElement.ownerDocument.documentElement.scrollHeight);
    setWidthScreen(e.srcElement.ownerDocument.documentElement.scrollWidth);
  };

  return (
    <Context.Provider
      value={{
        isClickPrepay,
        setIsClickPrepay,
        isValue,
        setIsValue,
      }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendDataForm(e.target.elements);
        }}
        onKeyDown={(e) => {
          e.key === 'Enter' ? checkInputsValues() : '';
        }}
      >
        <div className="container">
          <h1 className="title">
            ?????????????????????? ?????????????????? ???????????????????? ??&nbsp;????????????
          </h1>
          <div className="content">
            <div className="column-input">
              <div className="content__input price-car">
                <p className="text">?????????????????? ????????????????????</p>
                <div className="block-input">
                  <Input
                    pending={isLodaing}
                    minValue={minValuePricaCar}
                    maxValue={maxValuePricaCar}
                    value={valueSliderPriceCar}
                    setValue={setValueSliderPriceCar}
                    setCorrectValue={setCorrectValue}
                  />
                  <span
                    style={isLodaing ? { color: '#57575776' } : {}}
                    className="units"
                  >
                    ???
                  </span>
                </div>
                <ProgressBar
                  value={valueSliderPriceCar}
                  maxValue={maxValuePricaCar}
                  pending={isLodaing}
                />
                <Slider
                  isLodaing={isLodaing}
                  typeInput={'priceCar'}
                  value={valueSliderPriceCar}
                  maxValue={maxValuePricaCar}
                  setValue={setValueSliderPriceCar}
                  pending={isLodaing}
                />
              </div>
              <div className="content__input price-car">
                <p className="text">???????????????????????????? ??????????</p>
                <div className="block-input">
                  <InputPrepay
                    isLodaing={isLodaing}
                    valuePriceCar={valueSliderPriceCar}
                    valuePrepay={valueInputPrepay}
                    setValue={setValueSliderPriceCar}
                    pending={isLodaing}
                  />
                  <Prepay
                    isLodaing={isLodaing}
                    minValue={minValuePrepay}
                    maxValue={maxValuePrepay}
                    value={valueInputPrepay}
                    setValue={setValueInputPrepay}
                    setCorrectValue={setCorrectValue}
                    pending={isLodaing}
                  />
                </div>
                <ProgressBar
                  value={valueInputPrepay}
                  maxValue={maxValuePrepay}
                  pending={isLodaing}
                />
                <Slider
                  typeInput={'prepay'}
                  value={valueInputPrepay}
                  maxValue={maxValuePrepay}
                  setValue={setValueInputPrepay}
                  pending={isLodaing}
                />
              </div>
              <div className="content__input price-car">
                <p className="text">???????? ??????????????</p>
                <div className="block-input">
                  <InputTime
                    isLodaing={isLodaing}
                    minValue={minValueTime}
                    maxValue={maxValueTime}
                    value={valueInputTime}
                    setValue={setValueInputTime}
                    setCorrectValue={setCorrectValue}
                    pending={isLodaing}
                  />
                  <span
                    style={isLodaing ? { color: '#57575776' } : {}}
                    className="units"
                  >
                    ??????.
                  </span>
                </div>
                <ProgressBar
                  value={valueInputTime}
                  maxValue={maxValueTime}
                  pending={isLodaing}
                />
                <Slider
                  typeInput={'time'}
                  value={valueInputTime}
                  maxValue={maxValueTime}
                  setValue={setValueInputTime}
                  pending={isLodaing}
                />
              </div>
            </div>
            <div className="column-info">
              <Sum
                monthPay={monthPay}
                prepay={valueInputPrepay}
                priceCar={valueSliderPriceCar}
                valueTime={valueInputTime}
                pending={isLodaing}
              />
              <MonthPay monthPay={monthPay} pending={isLodaing} />
              <Button
                checkInputsValues={checkInputsValues}
                pending={isLodaing}
                isValue={isValue}
              >
                ???????????????? ????????????
              </Button>
            </div>
          </div>
        </div>
      </form>
      <PopupSuccess
        widthScreen={widthScreen}
        heigthScreen={heigthScreen}
        isSuccess={isSuccess}
        setIsSuccess={setIsSuccess}
      ></PopupSuccess>
      <PopupError
        widthScreen={widthScreen}
        heigthScreen={heigthScreen}
        isFormValid={isFormValid}
        setIsFormValid={setIsFormValid}
      ></PopupError>
    </Context.Provider>
  );
}

export default App;
