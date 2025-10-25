import React, { useEffect, useState } from 'react';
import './App.scss';
import { GoodsList } from './GoodsList';

import { getAll, get5First, getRedGoods } from './api/goods';
import { Good } from './types/Good';
// or
// import * as goodsAPI from './api/goods';

enum SortType {
  All = 'all',
  First5 = 'first-five',
  OnlyRed = 'only-red',
}

export const App: React.FC = () => {
  const [goods, setGoods] = useState<Good[]>([]);
  const [sortType, setSortType] = useState<SortType | null>(null);

  const handleClick = (sort: SortType) => {
    setSortType(sort);
  };

  useEffect(() => {
    if (sortType === SortType.All) {
      getAll().then(setGoods);
    }

    if (sortType === SortType.First5) {
      get5First().then(setGoods);
    }

    if (sortType === SortType.OnlyRed) {
      getRedGoods().then(setGoods);
    }
  }, [sortType]);

  return (
    <div className="App">
      <h1>Dynamic list of Goods</h1>

      <button
        type="button"
        data-cy="all-button"
        onClick={() => handleClick(SortType.All)}
      >
        Load all goods
      </button>

      <button
        type="button"
        data-cy="first-five-button"
        onClick={() => handleClick(SortType.First5)}
      >
        Load 5 first goods
      </button>

      <button
        type="button"
        data-cy="red-button"
        onClick={() => handleClick(SortType.OnlyRed)}
      >
        Load red goods
      </button>

      <GoodsList goods={goods} />
    </div>
  );
};
