// eslint-disable-next-line no-unused-vars
import React, { useMemo, useState } from 'react';
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
  const minValuePricaCar = '1000000';
  const maxValuePricaCar = '6000000';
  const minValuePrepay = '10';
  const maxValuePrepay = '60';
  const minValueTime = '10';
  const maxValueTime = '60';

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
  const [isValue, setIsValue] = useState(true);

  const data = {
    car_coast: '',
    initail_payment: '',
    initail_payment_percent: '',
    lease_term: '',
    total_sum: '',
    monthly_payment_from: '',
  };

  const [request, isLodaing, Error] = useFetching(async () => {
    await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  });

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
    } else {
      setIsFormValid(!isFormValid);
      console.log('Косяк');
    }
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
                    pending={isLodaing}
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
                  isLodaing={isLodaing}
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
                    isLodaing={isLodaing}
                    valuePriceCar={valueSliderPriceCar}
                    valuePrepay={valueInputPrepay}
                    setValue={setValueSliderPriceCar}
                  />
                  <Prepay
                    isLodaing={isLodaing}
                    minValue={minValuePrepay}
                    maxValue={maxValuePrepay}
                    value={valueInputPrepay}
                    setValue={setValueInputPrepay}
                    setCorrectValue={setCorrectValue}
                  />
                </div>
                <ProgressBar
                  value={valueInputPrepay}
                  maxValue={maxValuePrepay}
                />
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
                    isLodaing={isLodaing}
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
              <Sum
                monthPay={monthPay}
                prepay={valueInputPrepay}
                priceCar={valueSliderPriceCar}
                valueTime={valueInputTime}
              />
              <MonthPay monthPay={monthPay} />
              <button
                onMouseDown={() => {
                  checkInputsValues();
                }}
                type="submit"
                className={isValue ? 'btn' : 'btn_disabled'}
                disabled={isValue ? false : true}
              >
                Оставить заявку
              </button>
            </div>
          </div>
        </div>
      </form>
    </Context.Provider>
  );
}

export default App;
