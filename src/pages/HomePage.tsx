import React from 'react';
import MainLayoute from "../layouts/MainLayout/MainLayoute";
import Posts from '../features/posts/Posts';

const HomePage: React.FC = () =>{

  return (
    <div>
      <MainLayoute>
        <div>
          <h1>Главная страница</h1>
          <p>Добро пожаловать</p>
          <Posts/>
        </div>
      </MainLayoute>
    </div>
  );
};

export default HomePage;
