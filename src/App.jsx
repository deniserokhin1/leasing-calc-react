/* eslint-disable no-unused-vars */
import React from 'react';

function App() {
  return (
    <div className="container">
      <h1 className="title">Рассчитайте стоимость автомобиля в лизинг</h1>
      <div className="content">
        <div className="column-input">
          <div className="content__input price-car">
            <p className="text">Стоимость автомобиля</p>
            <div className="block-input">
              <input className="input-number" type="number" />
              <span className="units">₽</span>
            </div>
            <div className="block__slider">
              <div className="slider">
                <div className="slider__progress"></div>
              </div>
            </div>
            <div className="block-range">
              <div className="range">
                <input className="range__input" type="range" />
              </div>
            </div>
          </div>
          <div className="content__input price-car">
            <p className="text">Первоначальный взнос</p>
            <div className="block-input">
              <input className="input-number" type="number" />
              <span className="units">13%</span>
            </div>
            <div className="block__slider">
              <div className="slider">
                <div className="slider__progress"></div>
              </div>
            </div>
            <div className="range">
              <input className="range__input" type="range" />
            </div>
          </div>
          <div className="content__input price-car">
            <p className="text">Срок лизинга</p>
            <div className="block-input">
              <input className="input-number" type="number" />
              <span className="units">мес.</span>
            </div>
            <div className="block__slider">
              <div className="slider">
                <div className="slider__progress"></div>
              </div>
            </div>
            <div className="range">
              <input className="range__input" type="range" />
            </div>
          </div>
        </div>
        <div className="column-info">
          <div className="block-info">
            <p className="info__text">Сумма договора лизинга</p>
            <div className="info__money">
              4467313 <span>₽</span>
            </div>
          </div>
          <div className="block-info">
            <p className="info__text">Ежемесячный платеж от</p>
            <div className="info__money">
              4467313 <span>₽</span>
            </div>
          </div>
          <button className="btn">Оставить заявку</button>
        </div>
      </div>
    </div>
  );
}

export default App;
